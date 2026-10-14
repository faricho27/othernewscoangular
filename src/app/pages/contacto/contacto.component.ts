import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { CORREO, SOLO_LETRAS, mensajeError } from '../../utils/errores';

type Campo = 'nombre' | 'apellido' | 'email' | 'mensaje';

/** Página "Acerca de nosotros" + formulario de contacto con validaciones. */
@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.component.html',
})
export class ContactoComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly storage = inject(StorageService);

  readonly enviado = signal(false);

  readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(SOLO_LETRAS)]],
    apellido: ['', [Validators.required, Validators.pattern(SOLO_LETRAS)]],
    email: ['', [Validators.required, Validators.pattern(CORREO)]],
    mensaje: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
  });

  /** Mensaje de error del campo indicado ('' si es válido). */
  error(campo: Campo): string {
    const patron = campo === 'email' ? 'Escribe un correo válido, como nombre@dominio.com.' : 'Usa solo letras (entre 2 y 40 caracteres).';
    return mensajeError(this.form.controls[campo], patron);
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.enviado.set(false);
      return;
    }
    // Simulación: no hay servidor, así que el mensaje se guarda en el navegador.
    const mensajes = this.storage.leer<unknown[]>('mensajes', []);
    this.storage.escribir('mensajes', [...mensajes, { ...this.form.getRawValue(), fecha: new Date().toISOString() }]);
    this.form.reset();
    this.enviado.set(true);
  }
}
