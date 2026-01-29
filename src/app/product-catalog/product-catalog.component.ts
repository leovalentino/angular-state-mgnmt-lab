import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CartRxjsStore } from '../core/state/rxjs-store/cart.store';
import { CartSignalStore } from '../core/state/signal-store/cart.store';
import { CartNgrxStore } from '../core/state/ngrx-store/cart.store';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  template: `
    <div class="catalog">
      <h2>Product Catalog</h2>
      <div class="product-grid">
        <div class="product-card" *ngFor="let product of products">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <div class="product-footer">
            <span class="price">\${{ product.price }}</span>
            <div class="actions">
              <button (click)="addToRxjsStore(product)">Add to RxJS</button>
              <button (click)="addToSignalStore(product)">Add to Signal</button>
              <button (click)="addToNgrxStore(product)">Add to NgRx</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .catalog {
      padding: 1rem;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }
    .product-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
    }
    .product-card h3 {
      margin-top: 0;
    }
    .product-footer {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .price {
      font-weight: bold;
      font-size: 1.2rem;
      color: #1976d2;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: #1976d2;
      color: white;
      cursor: pointer;
      font-size: 0.8rem;
    }
    button:hover {
      background-color: #1565c0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCatalogComponent {
  private rxjsStore = inject(CartRxjsStore);
  private signalStore = inject(CartSignalStore);
  private ngrxStore = inject(CartNgrxStore);

  products: Product[] = [
    { id: 1, name: 'Laptop', price: 999, description: 'High-performance laptop' },
    { id: 2, name: 'Mouse', price: 25, description: 'Wireless mouse' },
    { id: 3, name: 'Keyboard', price: 75, description: 'Mechanical keyboard' },
    { id: 4, name: 'Monitor', price: 300, description: '27-inch 4K monitor' },
    { id: 5, name: 'Headphones', price: 150, description: 'Noise-cancelling headphones' },
    { id: 6, name: 'Webcam', price: 80, description: 'HD webcam' }
  ];

  addToRxjsStore(product: Omit<Product, 'description'>) {
    this.rxjsStore.addItem({ name: product.name, price: product.price });
  }

  addToSignalStore(product: Omit<Product, 'description'>) {
    this.signalStore.addItem({ name: product.name, price: product.price });
  }

  addToNgrxStore(product: Omit<Product, 'description'>) {
    this.ngrxStore.addItem({ name: product.name, price: product.price });
  }
}
