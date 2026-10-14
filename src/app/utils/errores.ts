import { AbstractControl } from '@angular/forms';

/**
 * Devuelve el mensaje de error de un campo del formulario, o '' si es válido
 * o si el usuario todavía no lo ha tocado.
 * @param patron mensaje a mostrar cuando falla la expresión regular del campo.
 */
export function mensajeError(control: AbstractControl | null, patron = 'El formato no es válido.'): string {
  if (!control || !control.errors || !(control.touched || control.dirty)) return '';
  const e = control.errors;
  if (e['required']) return 'Este campo es obligatorio.';
  if (e['minlength']) return `Escribe al menos ${e['minlength'].requiredLength} caracteres.`;
  if (e['maxlength']) return `Máximo ${e['maxlength'].requiredLength} caracteres.`;
  if (e['pattern']) return patron;
  return 'Valor no válido.';
}

/** Solo letras, espacios y . ' - (entre 2 y 40 caracteres). */
export const SOLO_LETRAS = /^[\p{L}\s'.-]{2,40}$/u;
/** Correo con dominio, por ejemplo nombre@dominio.com. */
export const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
