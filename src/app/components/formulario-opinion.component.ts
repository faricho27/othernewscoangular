import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoticiasService } from '../services/noticias.service';
import { SOLO_LETRAS, mensajeError } from '../utils/errores';

/** Formulario para que los lectores dejen su opinión (con validaciones). */
@Component({
  selector: 'app-formulario-opinion',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form class="formulario" [formGroup]="form" (ngSubmit)="enviar()" novalidate>
      <h3>Déjanos tu opinión</h3>

      <div class="campo">
        <label for="o-nombre">Nombre</label>
        <input id="o-nombre" formControlName="nombre" autocomplete="given-name"
               [attr.aria-invalid]="!!error('nombre')" aria-describedby="error-o-nombre" />
        <p class="error" id="error-o-nombre">{{ error('nombre') }}</p>
      </div>

      <div class="campo">
        <label for="o-texto">Tu opinión</label>
        <textarea id="o-texto" rows="3" formControlName="opinion"
                  [attr.aria-invalid]="!!error('opinion')" aria-describedby="error-o-texto"></textarea>
        <p class="error" id="error-o-texto">{{ error('opinion') }}</p>
      </div>

      <button class="btn btn-negro" type="submit">Publicar opinión</button>
      @if (enviado()) {
        <p class="estado" role="status">Gracias, tu opinión ya aparece en la página.</p>
      }
    </form>
  `,
})
export class FormularioOpinionComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly noticias = inject(NoticiasService);

  readonly enviado = signal(false);

  readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(SOLO_LETRAS)]],
    opinion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
  });

  error(campo: 'nombre' | 'opinion'): string {
    return mensajeError(this.form.controls[campo], 'Usa solo letras (entre 2 y 40 caracteres).');
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // muestra todos los errores a la vez
      this.enviado.set(false);
      return;
    }
    const { nombre, opinion } = this.form.getRawValue();
    this.noticias.agregarOpinion({ autor: nombre.trim(), rol: 'Lector', texto: opinion.trim() });
    this.form.reset();
    this.enviado.set(true);
  }
}
