import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Product} from '../products';

@Component({
  selector: 'app-create-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-form.html',
  styleUrl: './create-form.css',
})
export class CreateForm {
  private fb = inject(NonNullableFormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    price: [0, [Validators.required]],
    providers: [1, [Validators.required]]
  })

  successMsg = '';
  errorMsg = '';
  submitting = false;

  //Cuando pulsa el boton
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    // Construimos el objeto final respetando la interfaz HousingLocationInfo
    // Omitimos el 'id' porque el servidor suele generarlo automáticamente
    const newHouse: Omit<Product, 'id'> = this.form.getRawValue() as unknown as Omit<Product, 'id'>;

    this.http.post<Product>('http://localhost:3000/products', newHouse).subscribe({
      next: (created) => {
        this.successMsg = `Vivienda «${created.name}» creada con ID: ${created.id}`;
        this.form.reset();
        this.submitting = false;

        //Redirigimos
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMsg = 'Error al conectar con el servidor.';
        this.submitting = false;
      }
    });
  }
  cancel() {
    this.router.navigate(['/']);
  }

}
