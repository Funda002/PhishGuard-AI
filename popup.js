function updateUI() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (!tabs[0]) return;
        const tabId = tabs[0].id;
        
        chrome.storage.local.get([tabId.toString()], function(result) {
            const data = result[tabId];
            if (data) {
                document.getElementById('site-url').textContent = data.url.split('/')[2]; // Show only domain
                document.getElementById('risk-val').textContent = data.totalRisk;
                
                const meter = document.getElementById('meter-color');
                if (data.totalRisk > 40) {
                    meter.style.borderColor = "#ef4444";
                    document.getElementById('risk-val').style.color = "#ef4444";
                } else {
                    meter.style.borderColor = "#22c55e";
                    document.getElementById('risk-val').style.color = "#22c55e";
                }

                // Use simple text for statuses
                document.getElementById('ssl-stat').innerHTML = data.protocol === 'https:' ? "<span class='status-ok'>SECURE</span>" : "<span class='status-warn'>INSECURE</span>";
                document.getElementById('dns-stat').innerHTML = data.auditRisk < 40 ? "<span class='status-ok'>VERIFIED</span>" : "<span class='status-warn'>FAILED</span>";
                document.getElementById('ml-stat').innerHTML = data.innerScore < 30 ? "<span class='status-ok'>SAFE</span>" : "<span class='status-warn'>RISKY</span>";
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', updateUI);