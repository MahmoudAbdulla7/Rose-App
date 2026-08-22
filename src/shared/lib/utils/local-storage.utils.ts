export const localStorageUtils = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to set localStorage key "${key}":`, error);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove localStorage key "${key}":`, error);
    }
  },

  // Read a specific item by id from an array stored under key
  getItemById<T extends { productId: string }>(key: string, productId: string): T | null {
    const items = this.get<T[]>(key) ?? [];
    return items.find((item) => item.productId === productId) || null;
  },

  // Add or update an item in an array stored under key
  setItem<T extends { productId: string }>(key: string, item: T): void {
    const items = this.get<T[]>(key) ?? [];
    const index = items.findIndex((i) => i.productId === item.productId);
    if (index >= 0) {
      items[index] = item;
    } else {
      items.push(item);
    }
    this.set(key, items);
  },

  // Remove an item by productId
  removeItem<T extends { productId: string }>(key: string, productId: string): void {
    let items = this.get<T[]>(key) ?? [];
    items = items.filter((item) => item.productId !== productId);
    this.set(key, items);
  },

  // Clear all items under a key
  clear(key: string): void {
    this.remove(key);
  },

  // Get all items
  getAll<T>(key: string): T[] {
    return this.get<T[]>(key) ?? [];
  },

  // Count items
  count(key: string): number {
    return this.getAll(key).length;
  },
};
