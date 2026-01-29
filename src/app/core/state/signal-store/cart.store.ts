import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

@Injectable({ providedIn: 'root' })
export class CartSignalStore {
  readonly items = signal<CartItem[]>([]);

  readonly totalItems = computed(() => 
    this.items().reduce((acc, item) => acc + item.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this.items().reduce((acc, item) => acc + (item.price * item.quantity), 0)
  );

  addItem(item: Omit<CartItem, 'id' | 'quantity'>) {
    const currentItems = this.items();
    const existingItem = currentItems.find(i => i.name === item.name);
    
    if (existingItem) {
      const updatedItems = currentItems.map(i => 
        i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
      );
      this.items.set(updatedItems);
    } else {
      const newItem: CartItem = {
        ...item,
        id: Date.now(),
        quantity: 1
      };
      this.items.update(items => [...items, newItem]);
    }
  }

  removeItem(id: number) {
    this.items.update(items => items.filter(item => item.id !== id));
  }

  updateQuantity(id: number, quantity: number) {
    this.items.update(items => 
      items.map(item => item.id === id ? { ...item, quantity } : item)
    );
  }

  clearCart() {
    this.items.set([]);
  }
}
