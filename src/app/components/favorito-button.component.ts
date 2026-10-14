import { Component, computed, inject, input } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service';

/** Botón "Guardar" que marca o desmarca una noticia como favorita. */
@Component({
  selector: 'app-favorito-button',
  standalone: true,
  template: `
    <button type="button" class="btn-fav" [attr.aria-pressed]="activo()" (click)="alternar()">
      {{ activo() ? '★ Guardada' : '☆ Guardar' }}
    </button>
  `,
})
export class FavoritoButtonComponent {
  private readonly favoritos = inject(FavoritosService);

  /** Id de la noticia (dato que entrega el componente padre). */
  readonly noticiaId = input.required<string>();
  readonly activo = computed(() => this.favoritos.esFavorito(this.noticiaId()));

  alternar(): void {
    this.favoritos.alternar(this.noticiaId());
  }
}
