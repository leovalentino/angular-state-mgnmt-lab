import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartRxjsStore } from '../core/state/rxjs-store/cart.store';
import { CartSignalStore } from '../core/state/signal-store/cart.store';
import { CartNgrxStore } from '../core/state/ngrx-store/cart.store';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  template: `
    <aside class="sidebar">
      <h2>Cart Summary</h2>
      
      <div class="store-section">
        <h3>RxJS Store</h3>
        <p>Items: {{ rxjsItems() }}</p>
        <p>Total: \${{ rxjsTotal() }}</p>
      </div>

      <div class="store-section">
        <h3>Signal Store</h3>
        <p>Items: {{ signalItems() }}</p>
        <p>Total: \${{ signalTotal() }}</p>
      </div>

      <div class="store-section">
        <h3>NgRx Store</h3>
        <p>Items: {{ ngrxItems() }}</p>
        <p>Total: \${{ ngrxTotal() }}</p>
      </div>

      <div class="actions">
        <button (click)="clearAll()">Clear All Carts</button>
      </div>
    </aside>
  `,
  styles: `
    .sidebar {
      width: 300px;
      background-color: #f5f5f5;
      padding: 1.5rem;
      border-left: 1px solid #ddd;
      height: 100vh;
      overflow-y: auto;
    }
    h2 {
      margin-top: 0;
      color: #1976d2;
    }
    .store-section {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .store-section h3 {
      margin-top: 0;
      color: #333;
    }
    .store-section p {
      margin: 0.5rem 0;
      color: #666;
    }
    .actions {
      margin-top: 2rem;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #d32f2f;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
    button:hover {
      background-color: #c62828;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartSummaryComponent {
  private rxjsStore = inject(CartRxjsStore);
  private signalStore = inject(CartSignalStore);
  private ngrxStore = inject(CartNgrxStore);

  rxjsItems = toSignal(this.rxjsStore.totalItems$, { initialValue: 0 });
  rxjsTotal = toSignal(this.rxjsStore.totalPrice$, { initialValue: 0 });
  
  signalItems = this.signalStore.totalItems;
  signalTotal = this.signalStore.totalPrice;
  
  ngrxItems = this.ngrxStore.totalItems;
  ngrxTotal = this.ngrxStore.totalPrice;

  clearAll() {
    this.rxjsStore.clearCart();
    this.signalStore.clearCart();
    this.ngrxStore.clearCart();
  }
}
