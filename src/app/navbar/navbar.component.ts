import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartRxjsStore } from '../core/state/rxjs-store/cart.store';
import { CartSignalStore } from '../core/state/signal-store/cart.store';
import { CartNgrxStore } from '../core/state/ngrx-store/cart.store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav class="navbar">
      <h1>Angular Store Demo</h1>
      <div class="cart-counts">
        <div class="count-item">
          <span>RxJS:</span>
          <strong>{{ rxjsCount() }}</strong>
        </div>
        <div class="count-item">
          <span>Signal:</span>
          <strong>{{ signalCount() }}</strong>
        </div>
        <div class="count-item">
          <span>NgRx:</span>
          <strong>{{ ngrxCount() }}</strong>
        </div>
      </div>
    </nav>
  `,
  styles: `
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #1976d2;
      color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    .cart-counts {
      display: flex;
      gap: 2rem;
    }
    .count-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(255,255,255,0.1);
      padding: 0.5rem 1rem;
      border-radius: 8px;
    }
    .count-item span {
      font-size: 0.8rem;
      opacity: 0.8;
    }
    .count-item strong {
      font-size: 1.2rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private rxjsStore = inject(CartRxjsStore);
  private signalStore = inject(CartSignalStore);
  private ngrxStore = inject(CartNgrxStore);

  rxjsCount = toSignal(this.rxjsStore.totalItems$, { initialValue: 0 });
  signalCount = this.signalStore.totalItems;
  ngrxCount = this.ngrxStore.totalItems;
}
