import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { AgradecimientoComponent } from './components/agradecimiento.component';
import { FooterComponent } from './components/footer.component';

/** Componente raíz: encabezado + página actual + agradecimiento + pie de página. */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AgradecimientoComponent, FooterComponent],
  template: `
    <a class="saltar" href="#principal">Saltar al contenido</a>
    <app-header />
    <main id="principal" class="contenedor"><router-outlet /></main>
    <app-agradecimiento />
    <app-footer />
  `,
})
export class AppComponent {}
