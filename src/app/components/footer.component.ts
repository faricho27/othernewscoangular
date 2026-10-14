import { Component } from '@angular/core';

/** Pie de página con los medios de contacto. */
@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="pie">
      <div class="contenedor footer-interno">
        <p class="logo-footer">OtherNewsCO</p>
        <dl>
          @for (c of contactos; track c.etiqueta) {
            <dt>{{ c.etiqueta }}</dt>
            <dd>{{ c.valor }}</dd>
          }
        </dl>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly contactos = [
    { etiqueta: 'Email', valor: 'contacto@othernewsco.com' },
    { etiqueta: 'Facebook', valor: 'OtherNewsCO' },
    { etiqueta: 'Instagram', valor: '@othernews_co' },
    { etiqueta: 'Celular', valor: '300 000 0000' },
  ];
}
