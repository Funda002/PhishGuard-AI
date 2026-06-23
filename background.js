function calculateEntropy(str) {
    let len = str.length;
    let freq = {};
    for (let i = 0; i < len; i++) {
        let char = str[i];
        freq[char] = (freq[char] || 0) + 1;
    }
    let entropy = 0;
    for (let char in freq) {
        let p = freq[char] / len;
        entropy -= p * Math.log2(p);
    }
    return entropy;
}

async function checkDNSIntegrity(domain) {
    try {
        const response = await fetch(`https://dns.google/resolve?name=${domain}`);
        const data = await response.json();
        return data.Status === 0;
    } catch (e) { return false; }
}

async function analyzeURL(url) {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.toLowerCase();
    const protocol = urlObj.protocol;

    const globalWhitelist = ['google.com', 'chatgpt.com', 'openai.com', 'github.com', 'microsoft.com', 'facebook.com', 'youtube.com', 'wikipedia.org', 'sastra.edu', 'linkedin.com', 'gmail.com', 'amazon.com', 'bing.com'];
    
    if (globalWhitelist.some(trusted => domain === trusted || domain.endsWith('.' + trusted))) {
        return { isMalicious: false, totalRisk: 0, innerScore: 0, auditRisk: 0, url: url, protocol: protocol };
    }

    let auditRisk = 0;
    if (protocol !== 'https:') auditRisk += 50;
    const isDnsValid = await checkDNSIntegrity(domain);
    if (!isDnsValid) auditRisk += 40;

    let innerScore = 0;
    const safeTLDs = ['.com', '.org', '.net', '.gov', '.edu'];
    if (!safeTLDs.some(tld => domain.endsWith(tld))) innerScore += 35;
    const brands = ['paypal', 'google', 'amazon', 'netflix', 'microsoft', 'bank'];
    if (brands.some(b => domain.includes(b) && !domain.endsWith(b + '.com'))) innerScore += 25;
    if (calculateEntropy(domain) > 3.8) innerScore += 20;
    if (url.includes('@')) innerScore += 20;

    let totalRisk = innerScore + auditRisk;
    let isMalicious = false;

    if (url.length > 75) {
        isMalicious = totalRisk >= 60;
    } else {
        if (url.includes('bit.ly') || url.includes('t.co') || totalRisk > 40) isMalicious = true;
    }

    return { isMalicious, totalRisk, innerScore, auditRisk, url, protocol };
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.startsWith('http')) {
        const report = await analyzeURL(tab.url);
        
        // Store report for the popup
        chrome.storage.local.set({ [tabId]: report });

        if (report.isMalicious) {
            chrome.action.setBadgeText({ text: "!!", tabId: tabId });
            chrome.action.setBadgeBackgroundColor({ color: "#ef4444" });
        } else {
            chrome.action.setBadgeText({ text: "OK", tabId: tabId });
            chrome.action.setBadgeBackgroundColor({ color: "#22c55e" });
        }
    }
});