import { Component, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Noticia } from '../models/noticia.model';
import { FavoritoButtonComponent } from './favorito-button.component';

/** Tarjeta con imagen, título, categoría, fecha y botón de favoritos. */
@Component({
  selector: 'app-noticia-card',
  standalone: true,
  imports: [DatePipe, RouterLink, FavoritoButtonComponent],
  template: `
    <article class="tarjeta">
      <a class="tarjeta-enlace" [routerLink]="['/noticias', noticia().id]">
        @if (!imagenFallida()) {
          <img [src]="noticia().imagen" [alt]="noticia().titulo" loading="lazy" (error)="imagenFallida.set(true)" />
        } @else {
          <div class="img-placeholder" aria-hidden="true"></div>
        }
        <h3>{{ noticia().titulo }}</h3>
      </a>
      <p class="meta">
        <span>{{ noticia().categoria }}</span>
        <time [attr.datetime]="noticia().fecha">{{ noticia().fecha | date: 'longDate' }}</time>
      </p>
      <app-favorito-button [noticiaId]="noticia().id" />
    </article>
  `,
})
export class NoticiaCardComponent {
  /** Noticia a mostrar (dato que entrega el componente padre). */
  readonly noticia = input.required<Noticia>();
  /** Si la imagen no carga, se muestra un recuadro gris. */
  readonly imagenFallida = signal(false);
}
