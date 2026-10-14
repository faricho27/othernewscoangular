import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/** Encabezado con el logo y la navegación principal. */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="cabecera">
      <div class="contenedor cabecera-interna">
        <a routerLink="/" class="logo">OtherNewsCO</a>
        <nav aria-label="Principal">
          <ul>
            <!-- @for recorre la lista; [routerLink] es "property binding" -->
            @for (e of enlaces; track e.ruta) {
              <li>
                <a [routerLink]="e.ruta" routerLinkActive="activo" [routerLinkActiveOptions]="{ exact: e.ruta === '/' }">{{ e.texto }}</a>
              </li>
            }
          </ul>
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  readonly enlaces = [
    { ruta: '/', texto: 'Inicio' },
    { ruta: '/noticias', texto: 'Noticias' },
    { ruta: '/contacto', texto: 'Contacto' },
  ];
}
