export type IOCType = 'domain' | 'ip' | 'url' | 'email' | 'hash' | 'text';

export interface IOCInfo {
  type: IOCType;
  value: string;
  defanged: string;
  hashType?: 'md5' | 'sha1' | 'sha256';
}

// Regex patterns for IOC detection
const patterns = {
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  url: /^https?:\/\/.+/i,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  md5: /^[a-fA-F0-9]{32}$/,
  sha1: /^[a-fA-F0-9]{40}$/,
  sha256: /^[a-fA-F0-9]{64}$/,
  domain: /^(?!-)(?:[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,}$/,
};

export function defangValue(value: string, type: IOCType): string {
  let defanged = value;
  
  // Replace dots with [.]
  defanged = defanged.replace(/\./g, '[.]');
  
  // Replace http/https with hxxp/hxxps
  defanged = defanged.replace(/https/gi, 'hxxps');
  defanged = defanged.replace(/http/gi, 'hxxp');
  
  // Replace @ with [@] for emails
  if (type === 'email') {
    defanged = defanged.replace(/@/g, '[@]');
  }
  
  return defanged;
}

export function detectIOCType(input: string): IOCInfo {
  const trimmed = input.trim();
  
  if (!trimmed) {
    return { type: 'text', value: trimmed, defanged: trimmed };
  }
  
  // Check for URL first (before domain check)
  if (patterns.url.test(trimmed)) {
    return {
      type: 'url',
      value: trimmed,
      defanged: defangValue(trimmed, 'url'),
    };
  }
  
  // Check for IP address
  if (patterns.ipv4.test(trimmed)) {
    return {
      type: 'ip',
      value: trimmed,
      defanged: defangValue(trimmed, 'ip'),
    };
  }
  
  // Check for email
  if (patterns.email.test(trimmed)) {
    return {
      type: 'email',
      value: trimmed,
      defanged: defangValue(trimmed, 'email'),
    };
  }
  
  // Check for hashes
  if (patterns.sha256.test(trimmed)) {
    return {
      type: 'hash',
      value: trimmed,
      defanged: trimmed,
      hashType: 'sha256',
    };
  }
  
  if (patterns.sha1.test(trimmed)) {
    return {
      type: 'hash',
      value: trimmed,
      defanged: trimmed,
      hashType: 'sha1',
    };
  }
  
  if (patterns.md5.test(trimmed)) {
    return {
      type: 'hash',
      value: trimmed,
      defanged: trimmed,
      hashType: 'md5',
    };
  }
  
  // Check for domain
  if (patterns.domain.test(trimmed)) {
    return {
      type: 'domain',
      value: trimmed,
      defanged: defangValue(trimmed, 'domain'),
    };
  }
  
  // Default to text
  return {
    type: 'text',
    value: trimmed,
    defanged: trimmed,
  };
}

export function extractDomainFromURL(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return url;
  }
}

export function extractRootDomain(hostname: string): string {
  const parts = hostname.split('.');
  if (parts.length >= 2) {
    return parts.slice(-2).join('.');
  }
  return hostname;
}
