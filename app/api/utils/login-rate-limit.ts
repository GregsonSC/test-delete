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

//  Limpieza automática cada 5 minutos
setInterval(() => {
  const now = Date.now();
  const windowMs = 60 * 1000;

  for (const [ip, attemptInfo] of loginAttempts.entries()) {
    if (now - attemptInfo.firstAttempt > windowMs) {
      loginAttempts.delete(ip);
    }
  }
}, 5 * 60 * 1000); //Cada 5 minutos 
