import { IOCType, extractDomainFromURL, extractRootDomain } from './ioc-detection';
import CryptoJS from 'crypto-js';

export interface LookupSource {
  name: string;
  category: string;
  getUrl: (value: string) => string;
  icon?: string;
}

// SHA256 hash for VirusTotal URL lookups
function sha256(str: string): string {
  return CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
}

export const domainSources: LookupSource[] = [
  { name: 'VirusTotal', category: 'Threat Intel', getUrl: (v) => `https://www.virustotal.com/gui/domain/${v}` },
  { name: 'Talos Intelligence', category: 'Reputation', getUrl: (v) => `https://talosintelligence.com/reputation_center/lookup?search=${v}` },
  { name: 'IBM X-Force', category: 'Threat Intel', getUrl: (v) => `https://exchange.xforce.ibmcloud.com/url/${v}` },
  { name: 'AlienVault OTX', category: 'Threat Intel', getUrl: (v) => `https://otx.alienvault.com/indicator/url/${v}` },
  { name: 'URLScan.io', category: 'Analysis', getUrl: (v) => `https://urlscan.io/search/#page.domain:${v}` },
  { name: 'Blacklist Checker', category: 'Reputation', getUrl: (v) => `https://blacklistchecker.com/check?input=${v}` },
  { name: 'URLVoid', category: 'Reputation', getUrl: (v) => `https://urlvoid.com/scan/${v}/` },
  { name: 'URLhaus', category: 'Malware', getUrl: (v) => `https://urlhaus.abuse.ch/browse.php?search=${v}` },
  { name: 'WHOIS', category: 'Domain Info', getUrl: (v) => `https://www.whois.com/whois/${v}` },
  { name: 'Netcraft', category: 'Site Report', getUrl: (v) => `https://sitereport.netcraft.com/?url=${v}` },
  { name: 'Web-Check', category: 'Analysis', getUrl: (v) => `https://web-check.xyz/check/${v}` },
  { name: 'SecurityTrails', category: 'DNS Intel', getUrl: (v) => `https://securitytrails.com/domain/${v}` },
  { name: 'Hudson Rock', category: 'Breach Intel', getUrl: (v) => `https://www.hudsonrock.com/search/domain/${v}` },
  { name: 'Hudson Rock API', category: 'Breach Intel', getUrl: (v) => `https://cavalier.hudsonrock.com/api/json/v2/osint-tools/urls-by-domain?domain=${v}` },
  { name: 'Wayback Machine', category: 'Archive', getUrl: (v) => `https://web.archive.org/web/${v}` },
  { name: 'Wayback Save', category: 'Archive', getUrl: (v) => `https://web.archive.org/save/${v}` },
  { name: 'Browserling', category: 'Sandbox', getUrl: (v) => `https://www.browserling.com/browse/win10/chrome138/${v}` },
  { name: 'ANY.RUN', category: 'Sandbox', getUrl: (v) => `https://app.any.run/safe/${v}` },
  { name: 'Phishing Check', category: 'Phishing', getUrl: () => `https://phishing.finsin.cl/list.php` },
];

export const ipSources: LookupSource[] = [
  { name: 'VirusTotal', category: 'Threat Intel', getUrl: (v) => `https://www.virustotal.com/gui/ip-address/${v}` },
  { name: 'AbuseIPDB', category: 'Reputation', getUrl: (v) => `https://www.abuseipdb.com/check/${v}` },
  { name: 'Talos Intelligence', category: 'Reputation', getUrl: (v) => `https://talosintelligence.com/reputation_center/lookup?search=${v}` },
  { name: 'IBM X-Force', category: 'Threat Intel', getUrl: (v) => `https://exchange.xforce.ibmcloud.com/ip/${v}` },
  { name: 'AlienVault OTX', category: 'Threat Intel', getUrl: (v) => `https://otx.alienvault.com/indicator/ip/${v}` },
  { name: 'Blacklist Checker', category: 'Reputation', getUrl: (v) => `https://blacklistchecker.com/check?input=${v}` },
  { name: 'Shodan', category: 'Recon', getUrl: (v) => `https://www.shodan.io/search?query=${v}` },
  { name: 'Censys', category: 'Recon', getUrl: (v) => `https://search.censys.io/hosts/${v}` },
  { name: 'GreyNoise', category: 'Threat Intel', getUrl: (v) => `https://www.greynoise.io/viz/ip/${v}` },
  { name: 'IP Location', category: 'Geolocation', getUrl: (v) => `https://iplocation.io/ip/${v}` },
];

export const urlSources: LookupSource[] = [
  { name: 'VirusTotal', category: 'Threat Intel', getUrl: (v) => `https://www.virustotal.com/gui/url/${sha256(v)}` },
  { name: 'Talos Intelligence', category: 'Reputation', getUrl: (v) => `https://talosintelligence.com/reputation_center/lookup?search=${encodeURIComponent(v)}` },
  { name: 'IBM X-Force', category: 'Threat Intel', getUrl: (v) => `https://exchange.xforce.ibmcloud.com/url/${encodeURIComponent(v)}` },
  { name: 'AlienVault OTX', category: 'Threat Intel', getUrl: (v) => `https://otx.alienvault.com/indicator/url/${v}` },
  { name: 'URLScan.io', category: 'Analysis', getUrl: (v) => `https://urlscan.io/search/#page.domain:${extractRootDomain(extractDomainFromURL(v))}` },
  { name: 'Blacklist Checker', category: 'Reputation', getUrl: (v) => `https://blacklistchecker.com/check?input=${extractDomainFromURL(v)}` },
  { name: 'URLVoid', category: 'Reputation', getUrl: (v) => `https://urlvoid.com/scan/${extractRootDomain(extractDomainFromURL(v))}/` },
  { name: 'URLhaus', category: 'Malware', getUrl: (v) => `https://urlhaus.abuse.ch/browse.php?search=${v}` },
  { name: 'WHOIS', category: 'Domain Info', getUrl: (v) => `https://www.whois.com/whois/${extractDomainFromURL(v)}` },
  { name: 'Netcraft', category: 'Site Report', getUrl: (v) => `https://sitereport.netcraft.com/?url=${encodeURIComponent(v)}` },
  { name: 'Web-Check', category: 'Analysis', getUrl: (v) => `https://web-check.xyz/check/${encodeURIComponent(v)}` },
  { name: 'SecurityTrails', category: 'DNS Intel', getUrl: (v) => `https://securitytrails.com/domain/${extractDomainFromURL(v)}` },
  { name: 'Hudson Rock', category: 'Breach Intel', getUrl: (v) => `https://www.hudsonrock.com/search/domain/${extractRootDomain(extractDomainFromURL(v))}` },
  { name: 'Hudson Rock API', category: 'Breach Intel', getUrl: (v) => `https://cavalier.hudsonrock.com/api/json/v2/osint-tools/urls-by-domain?domain=${extractRootDomain(extractDomainFromURL(v))}` },
  { name: 'Wayback Machine', category: 'Archive', getUrl: (v) => `https://web.archive.org/web/${encodeURIComponent(v)}` },
  { name: 'Wayback Save', category: 'Archive', getUrl: (v) => `https://web.archive.org/save/${encodeURIComponent(v)}` },
  { name: 'Browserling', category: 'Sandbox', getUrl: (v) => `https://www.browserling.com/browse/win10/chrome138/${v}` },
  { name: 'ANY.RUN', category: 'Sandbox', getUrl: (v) => `https://app.any.run/safe/${v}` },
  { name: 'Phishing Check', category: 'Phishing', getUrl: () => `https://phishing.finsin.cl/list.php` },
];

export const emailSources: LookupSource[] = [
  { name: 'Have I Been Pwned', category: 'Breach Check', getUrl: (v) => `https://haveibeenpwned.com/unifiedsearch/${v}` },
  { name: 'Hudson Rock API', category: 'Breach Intel', getUrl: (v) => `https://cavalier.hudsonrock.com/api/json/v2/osint-tools/search-by-email?email=${v}` },
  { name: 'IntelBase', category: 'Intel', getUrl: () => `https://intelbase.is/` },
  { name: 'Blacklist Checker', category: 'Reputation', getUrl: (v) => `https://blacklistchecker.com/check?input=${v}` },
];

export const hashSources: LookupSource[] = [
  { name: 'VirusTotal', category: 'Threat Intel', getUrl: (v) => `https://www.virustotal.com/gui/file/${v}` },
  { name: 'Hybrid Analysis', category: 'Sandbox', getUrl: (v) => `https://www.hybrid-analysis.com/sample/${v}` },
  { name: 'Joe Sandbox', category: 'Sandbox', getUrl: (v) => `https://www.joesandbox.com/analysis/search?q=${v}` },
  { name: 'Triage', category: 'Sandbox', getUrl: (v) => `https://tria.ge/s?q=${v}` },
  { name: 'MalShare', category: 'Malware', getUrl: (v) => `https://malshare.com/sample.php?action=detail&hash=${v}` },
  { name: 'IBM X-Force', category: 'Threat Intel', getUrl: (v) => `https://exchange.xforce.ibmcloud.com/malware/${v}` },
  { name: 'Talos Intelligence', category: 'Reputation', getUrl: (v) => `https://talosintelligence.com/talos_file_reputation?s=${v}` },
  { name: 'AlienVault OTX', category: 'Threat Intel', getUrl: (v) => `https://otx.alienvault.com/indicator/file/${v}` },
];

export const textSources: LookupSource[] = [
  { name: 'Google Search', category: 'Search', getUrl: (v) => `https://www.google.com/search?q=${encodeURIComponent(v)}` },
  { name: 'Google Translate', category: 'Translation', getUrl: (v) => `https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(v)}&op=translate` },
  { name: 'LOLBAS', category: 'Living Off Land', getUrl: (v) => `https://lolbas-project.github.io/#${encodeURIComponent(v)}` },
  { name: 'GTFOBins', category: 'Living Off Land', getUrl: (v) => `https://gtfobins.github.io/#${encodeURIComponent(v)}` },
  { name: 'MITRE ATT&CK', category: 'Framework', getUrl: (v) => `https://www.google.com/search?q=inurl:attack.mitre.org+${encodeURIComponent(v)}` },
  { name: 'NVD', category: 'Vulnerabilities', getUrl: (v) => `https://nvd.nist.gov/vuln/search#/nvd/home?keyword=${encodeURIComponent(v)}&resultType=records` },
  { name: 'CVE.org', category: 'Vulnerabilities', getUrl: (v) => `https://www.cve.org/CVERecord?id=${encodeURIComponent(v)}` },
  { name: 'Exploit-DB', category: 'Exploits', getUrl: (v) => `https://www.exploit-db.com/search?q=${encodeURIComponent(v)}` },
  { name: 'Windows Security Log', category: 'Reference', getUrl: (v) => `https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventid=${encodeURIComponent(v)}` },
  { name: 'Azure Error Codes', category: 'Reference', getUrl: () => `https://login.microsoftonline.com/error` },
  { name: 'Hudson Rock Username', category: 'Breach Intel', getUrl: (v) => `https://cavalier.hudsonrock.com/api/json/v2/osint-tools/search-by-username?username=${encodeURIComponent(v)}` },
  { name: 'WikiLeaks', category: 'Intel', getUrl: (v) => `https://search.wikileaks.org/?query=${encodeURIComponent(v)}` },
  { name: 'CyberChef', category: 'Tools', getUrl: () => `https://gchq.github.io/CyberChef/` },
  { name: 'MXToolbox Headers', category: 'Email Analysis', getUrl: () => `https://mxtoolbox.com/EmailHeaders.aspx` },
  { name: 'No More Ransom', category: 'Ransomware', getUrl: () => `https://www.nomoreransom.org/crypto-sheriff.php` },
];

export function getSourcesForType(type: IOCType): LookupSource[] {
  switch (type) {
    case 'domain':
      return domainSources;
    case 'ip':
      return ipSources;
    case 'url':
      return urlSources;
    case 'email':
      return emailSources;
    case 'hash':
      return hashSources;
    case 'text':
      return textSources;
    default:
      return textSources;
  }
}
