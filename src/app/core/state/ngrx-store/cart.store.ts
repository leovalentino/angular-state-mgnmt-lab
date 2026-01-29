import { Injectable } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
};

@Injectable({ providedIn: 'root' })
export class CartNgrxStore extends signalStore(
  withState(initialState),
  withComputed(({ items }) => ({
    totalItems: computed(() => items().reduce((acc, item) => acc + item.quantity, 0)),
    totalPrice: computed(() => items().reduce((acc, item) => acc + (item.price * item.quantity), 0))
  })),
  withMethods((store) => ({
    addItem(item: Omit<CartItem, 'id' | 'quantity'>) {
      const currentItems = store.items();
      const existingItem = currentItems.find(i => i.name === item.name);
      
      if (existingItem) {
        const updatedItems = currentItems.map(i => 
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
        patchState(store, { items: updatedItems });
      } else {
        const newItem: CartItem = {
          ...item,
          id: Date.now(),
          quantity: 1
        };
        patchState(store, { items: [...currentItems, newItem] });
      }
    },

    removeItem(id: number) {
      const updatedItems = store.items().filter(item => item.id !== id);
      patchState(store, { items: updatedItems });
    },

    updateQuantity(id: number, quantity: number) {
      const updatedItems = store.items().map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      patchState(store, { items: updatedItems });
    },

    clearCart() {
      patchState(store, { items: [] });
    }
  }))
) {}
