import {ChangeDetectorRef, Component, inject, Injectable, OnInit} from '@angular/core';
import {ProductAlerts} from '../product-alerts/product-alerts';
import {RouterLink} from '@angular/router';
import {Product, ProductListService} from '../products';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  imports: [
    ProductAlerts,
    RouterLink
  ]
})
export class ProductList implements OnInit {

  private productService = inject(ProductListService);
  private chageDetectorRef = inject(ChangeDetectorRef);


  products: Product[] | undefined;

  async ngOnInit(): Promise<void> {
    this.products = await this.productService.getProducts();
    this.chageDetectorRef.markForCheck()

  }

  share() {
    window.alert('The product has been shared!');
  }

  //Esta es lo que manda el padre cuando en el hijo (product-alert) se pulsa notify
  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}
