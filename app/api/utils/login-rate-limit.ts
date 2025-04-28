// utils/login-rate-limit.ts
const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();

export const loginRateLimit = (limit = 5, windowMs = 60 * 1000) => {
  return (ip: string) => {
    const now = Date.now();

    if (!loginAttempts.has(ip)) {
      loginAttempts.set(ip, { count: 1, firstAttempt: now });
      return { allowed: true };
    }

    const attemptInfo = loginAttempts.get(ip)!;

    if (now - attemptInfo.firstAttempt > windowMs) {
      // Reiniciar contador después de windowMs
      loginAttempts.set(ip, { count: 1, firstAttempt: now });
      return { allowed: true };
    }

    if (attemptInfo.count >= limit) {
      return { allowed: false };
    }

    attemptInfo.count += 1;
    loginAttempts.set(ip, attemptInfo);

    return { allowed: true };
  };
};
