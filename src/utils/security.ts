/**
 * Simple encryption utility for demo purposes.
 * In a real app, use Web Crypto API or a robust library.
 */
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
