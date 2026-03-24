export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    try {
      return crypto.randomUUID();
    } catch {
      // Fallback if randomUUID throws
    }
  }
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
