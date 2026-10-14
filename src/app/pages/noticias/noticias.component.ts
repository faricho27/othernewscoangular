import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiaCardComponent } from '../../components/noticia-card.component';

/** Listado de noticias con filtro por categoría y opción "solo favoritas". */
@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [FormsModule, NoticiaCardComponent],
  templateUrl: './noticias.component.html',
})
export class NoticiasComponent {
  readonly service = inject(NoticiasService);
  readonly favoritos = inject(FavoritosService);

  /** Valores del filtro; se enlazan con [(ngModel)] (binding de dos vías). */
  readonly categoria = signal(inject(ActivatedRoute).snapshot.queryParamMap.get('categoria') ?? '');
  readonly soloFavoritas = signal(false);

  /** Noticias que cumplen los filtros; se recalcula sola cuando algo cambia. */
  readonly filtradas = computed(() =>
    this.service.recientes().filter(
      (n) =>
        (!this.categoria() || n.categoria === this.categoria()) &&
        (!this.soloFavoritas() || this.favoritos.esFavorito(n.id)),
    ),
  );
}
