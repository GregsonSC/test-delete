export function isValidIP(ip: string): boolean {
  if (!ip) return false;

  const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d\d|\d\d|\d)(\.(25[0-5]|2[0-4]\d|1\d\d|\d\d|\d)){3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

export function isPrivateIP(ip: string): boolean {
  if (!ip) return false;

  // Rango de IPs privadas (IPv4)
  const privateRanges = [
    /^10\./, // 10.0.0.0 - 10.255.255.255
    /^172\.(1[6-9]|2\d|3[0-1])\./, // 172.16.0.0 - 172.31.255.255
    /^192\.168\./, // 192.168.0.0 - 192.168.255.255
    /^127\./, // 127.0.0.0 - 127.255.255.255 (localhost)
    /^169\.254\./, // 169.254.0.0 - 169.254.255.255 (APIPA)
  ];

  return privateRanges.some((range) => range.test(ip));
}
