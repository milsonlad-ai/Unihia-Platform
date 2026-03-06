/**
 * Simple encryption utility for demo purposes.
 * In a real app, use Web Crypto API or a robust library.
 */
/**
 * Simulated hash function (e.g., bcrypt/argon2)
 * In a real app, this would be done on the server.
 */
export const hashPassword = async (password: string): Promise<string> => {
  // Simulate network delay and computation
  await new Promise(resolve => setTimeout(resolve, 100));
  return `hash_${btoa(password).split('').reverse().join('')}`;
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  const computedHash = await hashPassword(password);
  return computedHash === hash;
};

export const getDeviceFingerprint = (): string => {
  const nav = window.navigator;
  const screen = window.screen;
  const data = [
    nav.userAgent,
    nav.language,
    screen.colorDepth,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset()
  ].join('|');
  return btoa(data);
};

export const encrypt = (data: string): string => {
  return btoa(data); // Simple base64 for demo
};

export const decrypt = (encryptedData: string): string => {
  return atob(encryptedData);
};

export const secureStorage = {
  setItem: (key: string, value: any) => {
    const encrypted = encrypt(JSON.stringify(value));
    localStorage.setItem(`unihia_secure_${key}`, encrypted);
  },
  getItem: (key: string): any => {
    const encrypted = localStorage.getItem(`unihia_secure_${key}`);
    if (!encrypted) return null;
    try {
      return JSON.parse(decrypt(encrypted));
    } catch {
      return null;
    }
  },
  removeItem: (key: string) => {
    localStorage.removeItem(`unihia_secure_${key}`);
  }
};

export const validatePassword = (password: string): boolean => {
  const minLength = 8;
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && hasNumber && hasLetter && hasSymbol;
};
