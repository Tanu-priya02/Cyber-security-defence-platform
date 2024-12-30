import { format } from 'date-fns';

const EVENT_TYPES = [
  'failed_login',
  'suspicious_ip',
  'malware_detected',
  'port_scan',
  'ddos_attempt',
  'unauthorized_access',
  'data_exfiltration',
  'system_error'
];

const SEVERITY_LEVELS = ['low', 'medium', 'high', 'critical'] as const;

function generateRandomIP() {
  return Array.from({ length: 4 }, () => 
    Math.floor(Math.random() * 256)
  ).join('.');
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateSecurityEvent() {
  const eventType = getRandomElement(EVENT_TYPES);
  const severity = getRandomElement(SEVERITY_LEVELS);
  const sourceIP = generateRandomIP();
  
  const descriptions = {
    failed_login: `Multiple failed login attempts detected from IP ${sourceIP}`,
    suspicious_ip: `Suspicious activity detected from IP ${sourceIP}`,
    malware_detected: `Potential malware activity detected in system files`,
    port_scan: `Port scan detected from IP ${sourceIP}`,
    ddos_attempt: `Potential DDoS attempt detected from IP ${sourceIP}`,
    unauthorized_access: `Unauthorized access attempt to restricted resource`,
    data_exfiltration: `Unusual data transfer pattern detected`,
    system_error: `Critical system error detected in security module`
  };

  return {
    event_type: eventType,
    severity,
    source_ip: sourceIP,
    description: descriptions[eventType as keyof typeof descriptions],
    raw_data: {
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      details: {
        event_type: eventType,
        source_ip: sourceIP,
        severity
      }
    }
  };
}
