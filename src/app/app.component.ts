import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CartSummaryComponent],
  template: `
    <div class="app-container">
      <app-navbar />
      <main class="main-content">
        <router-outlet />
      </main>
      <app-cart-summary />
    </div>
  `,
  styles: `
    .app-container {
      display: flex;
      min-height: 100vh;
      font-family: system-ui, sans-serif;
    }
    .main-content {
      flex: 1;
      padding: 2rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
