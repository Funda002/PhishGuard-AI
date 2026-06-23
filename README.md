# 🛡️ PhishGuard AI+ 
**Real-time Zero-Day Phishing Protection via Two-Stage Nested ML Inference**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)]()
[![Accuracy](https://img.shields.io/badge/Accuracy-91.4%25-green.svg)]()

PhishGuard AI+ is an advanced browser extension that detects phishing attempts in real-time by analyzing the "DNA" of a URL. Unlike traditional filters that rely on outdated blacklists, PhishGuard AI+ uses a **Hierarchical Nested Logic** to identify malicious intent and infrastructure flaws before the user interacts with the page.

---

## 🚀 Key Innovations

### 1. Breaking the "Feature Dominance" Bottleneck
Standard ML models for phishing often suffer from **Feature Dominance**, where URL length accounts for nearly 68% of predictive weight. This results in:
- **False Positives:** Flagging long, legitimate research or corporate URLs.
- **False Negatives:** Missing sneaky, obfuscated short-links (e.g., Bitly redirects).

**Our Solution:** A Two-Stage Nested Architecture.
- **Stage 1 (Outer Gate):** Uses length to set a contextual filter.
- **Stage 2 (Inner Brain):** Applies "Conditional Sensitivity." It gives long URLs a "Fair Trial" while maintaining high aggression toward short-links with risky metadata.

### 2. Triple-Audit Framework
We combine probabilistic AI with deterministic security audits:
- **Protocol Audit:** Instant detection of insecure `http` protocols.
- **Infrastructure Audit:** Real-time integration with the **Google DNS JSON API** to verify domain integrity.
- **Lexical Analysis:** Calculation of **Shannon Entropy** to identify algorithmically generated domains (DGA).

---

## 🧠 The Science

### Accuracy Evolution
- **Academic Baseline:** 86.4% (2016 Research)
- **PhishGuard AI+:** **91.4%** (Modernized Hybrid Model)

### Feature Engineering
We modernized a legacy dataset of 10,000 URLs by:
1. Integrating the **Majestic Million** dataset (10 lakh rows) for global trust ranking.
2. Implementing **Shannon Entropy** to detect bot-generated randomness.
3. Coding **Brand-Spoofing Heuristics** to catch look-alike subdomains.

---

## 📊 Risk Scoring Rubric

The engine aggregates penalty points based on weighted risk factors:

| Layer | Feature | Penalty | Reason |
| :--- | :--- | :--- | :--- |
| **Audit** | Insecure Protocol | +50 pts | Unencrypted HTTP |
| **Audit** | DNS Integrity Fail | +40 pts | Non-resolving "Ghost" domain |
| **ML DNA** | Untrusted TLD | +35 pts | Risky TLDs (.tk, .ml, .site, etc.) |
| **ML DNA** | Brand Spoofing | +25 pts | Spoofed brands in subdomains |
| **ML DNA** | High Entropy | +20 pts | Randomly generated characters |

---

## 🛠️ Installation & Usage

### Developer Mode Install
1. Clone this repository: `git clone https://github.com/YOUR_USERNAME/PhishGuard_AI.git`
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **"Developer mode"** in the top right corner.
4. Click **"Load unpacked"** and select the `PhishGuard_AI` folder.

### Testing
- **Safe Context:** Visit `google.com` or `chatgpt.com`. The extension will show a **Green OK** (Verified via Global Whitelist).
- **Risky Context:** Visit an insecure local IP (e.g., `http://192.168.1.1`). The extension will trigger a **Red !!** alert with a detailed Risk Score.

---

## 🏗️ Project Structure

```text
PhishGuard_AI/
├── manifest.json      # Extension configuration (Manifest V3)
├── background.js      # Core Engine (DNS API & Nested Inference)
├── popup.html         # Interactive Security Dashboard UI
├── popup.js           # Real-time Analytics & Storage Logic
├── icon.png           # Branding & UI Identity
├── models/            # XGBoost Tuning & Weight Extraction Scripts
└── data/              # Dataset documentation and logs
```

---
🛠️ Built With
JavaScript (ES6+) - Manifest V3 Extension API
Python 3.12 - XGBoost, Scikit-learn, Pandas
Google DNS API - Remote Infrastructure Auditing
Majestic Million - Global Traffic White-listing
📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
🤝 Acknowledgments
Inspired by the 2016 Phishing Research by Shreya Gopal.
DNS resolution provided by Google Public DNS.
code
Code

### Pro-Tips for GitHub:
1.  **Add a License:** Create a file named `LICENSE` and paste the MIT License text in it (standard for hackathons).
2.  **Add Screenshots:** Create a folder named `images` in your repo. Upload your screenshots there and link them in the README using `![Alt text](images/screenshot.png)`.
3.  **About Section:** On the right side of the GitHub page, add a description, the website link (if any), and tags like `#cybersecurity`, `#machine-learning`, and `#chrome-extension`.

**This README makes you look like a professional engineer. Ready to push to GitHub?**
