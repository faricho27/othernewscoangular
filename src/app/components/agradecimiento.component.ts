import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

/** Franja de agradecimiento previa al pie de página, con dos botones. */
@Component({
  selector: 'app-agradecimiento',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="agradecimiento">
      <div class="contenedor cta-interno">
        <p>¡Gracias por confiar en nosotros!</p>
        <div class="cta-botones">
          <a class="btn btn-rojo" routerLink="/contacto">Contacto</a>
          <!-- (click) es "event binding": ejecuta el método del componente -->
          <button type="button" class="btn btn-claro" (click)="irAOpinion()">Déjanos aquí tu opinión</button>
        </div>
      </div>
    </section>
  `,
})
export class AgradecimientoComponent {
  private readonly router = inject(Router);

  /** Lleva al inicio y baja hasta el formulario de opiniones. */
  irAOpinion(): void {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => document.getElementById('opinion')?.scrollIntoView({ behavior: 'smooth' }), 50);
    });
  }
}
