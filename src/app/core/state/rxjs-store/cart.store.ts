import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

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
export class CartRxjsStore {
  private readonly state = new BehaviorSubject<CartState>({
    items: []
  });

  readonly items$ = this.state.pipe(map(state => state.items));
  readonly totalItems$ = this.state.pipe(
    map(state => state.items.reduce((acc, item) => acc + item.quantity, 0))
  );
  readonly totalPrice$ = this.state.pipe(
    map(state => state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0))
  );

  addItem(item: Omit<CartItem, 'id' | 'quantity'>) {
    const current = this.state.value;
    const existingItem = current.items.find(i => i.name === item.name);
    
    if (existingItem) {
      const updatedItems = current.items.map(i => 
        i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
      );
      this.state.next({ items: updatedItems });
    } else {
      const newItem: CartItem = {
        ...item,
        id: Date.now(),
        quantity: 1
      };
      this.state.next({ items: [...current.items, newItem] });
    }
  }

  removeItem(id: number) {
    const current = this.state.value;
    const updatedItems = current.items.filter(item => item.id !== id);
    this.state.next({ items: updatedItems });
  }

  updateQuantity(id: number, quantity: number) {
    const current = this.state.value;
    const updatedItems = current.items.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    this.state.next({ items: updatedItems });
  }

  clearCart() {
    this.state.next({ items: [] });
  }
}
