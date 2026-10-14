import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaCardComponent } from '../../components/noticia-card.component';
import { FormularioOpinionComponent } from '../../components/formulario-opinion.component';

/** Página de inicio: presentación, noticias recientes, temas y opiniones. */
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, NoticiaCardComponent, FormularioOpinionComponent],
  templateUrl: './inicio.component.html',
})
export class InicioComponent {
  readonly service = inject(NoticiasService);
  /** Las 3 noticias más recientes. */
  readonly relevantes = computed(() => this.service.recientes().slice(0, 3));
}
