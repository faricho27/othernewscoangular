import { Component, computed, effect, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritoButtonComponent } from '../../components/favorito-button.component';

/** Noticia completa. El parámetro ":id" de la ruta llega como input(). */
@Component({
  selector: 'app-noticia-detalle',
  standalone: true,
  imports: [DatePipe, RouterLink, FavoritoButtonComponent],
  templateUrl: './noticia-detalle.component.html',
})
export class NoticiaDetalleComponent {
  private readonly service = inject(NoticiasService);
  private readonly titulo = inject(Title);

  readonly id = input.required<string>();
  readonly cargado = this.service.cargado;
  readonly noticia = computed(() => this.service.porId(this.id()));

  constructor() {
    // Actualiza el título de la pestaña cuando se conoce la noticia.
    effect(() => {
      const n = this.noticia();
      this.titulo.setTitle(n ? `${n.titulo} – OtherNewsCO` : 'Noticia – OtherNewsCO');
    });
  }
}
