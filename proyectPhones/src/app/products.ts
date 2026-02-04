import {Provider} from './provider';
import {Injectable} from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  provider: number;
}

@Injectable({
  providedIn: 'root'
})

export class ProductListService {
  private readonly url = 'assets/products.json';

  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('No se pudo cargar el archivo local');

      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error de infraestructura:', error);
      return [];
    }
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
