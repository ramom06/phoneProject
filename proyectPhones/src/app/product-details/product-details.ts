import {Component, OnInit, inject, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';

import {Product, ProductListService} from '../products';
import {CurrencyPipe} from '@angular/common';
import { CartService } from '../cart.service';


@Component({
  selector: 'ProductDetails',
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})

// Se implemente Oninit para usar el metodo ngOnInit
export class ProductDetails implements OnInit {

  private productListService = inject(ProductListService);
  private chageDetectorRef = inject(ChangeDetectorRef);

  product: Product | undefined;

  async ngOnInit(): Promise<void> {

    const allProducts = await this.productListService.getProducts();
    //Buscamos el ID en la ruta
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    //Buscamos el producto en la lista que acabamos de traer
    this.product = allProducts.find(p => p.id = productIdFromRoute);
    this.chageDetectorRef.markForCheck()
  }


    //Sirve para recoger la ruta exacta (ActivatedRoute)
    //cart inicializa el carrito, para poder añadir productos en él
    constructor(private route: ActivatedRoute, private cart : CartService) { }

  //Esto llama al metodo addToCart del objeto cart
    addToCart(product: Product) {
      this.cart.addToCart(product);
      window.alert('Your product has been added to the cart!');
    }
}
