import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Datos, Noticia, Opinion, Tema } from '../models/noticia.model';
import { StorageService } from './storage.service';

/**
 * Carga las noticias, temas y opiniones desde public/data/noticias.json
 * y las expone como "signals" para que las plantillas se actualicen solas.
 */
@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private readonly http = inject(HttpClient);
  private readonly storage = inject(StorageService);

  private readonly datos = signal<Datos | null>(null);
  private readonly opinionesLectores = signal<Opinion[]>(this.storage.leer<Opinion[]>('opiniones', []));

  /** true cuando falló la carga del JSON. */
  readonly error = signal(false);
  readonly cargado = computed(() => this.datos() !== null);

  readonly noticias = computed<Noticia[]>(() => this.datos()?.noticias ?? []);
  readonly temas = computed<Tema[]>(() => this.datos()?.temas ?? []);
  /** Opiniones del JSON más las que escribieron los lectores. */
  readonly opiniones = computed<Opinion[]>(() => [...(this.datos()?.opiniones ?? []), ...this.opinionesLectores()]);
  /** Categorías únicas, para el filtro del listado. */
  readonly categorias = computed(() => [...new Set(this.noticias().map((n) => n.categoria))]);
  /** Las noticias más recientes primero. */
  readonly recientes = computed(() => [...this.noticias()].sort((a, b) => b.fecha.localeCompare(a.fecha)));

  constructor() {
    this.http.get<Datos>('data/noticias.json').subscribe({
      next: (d) => this.datos.set(d),
      error: () => this.error.set(true),
    });
  }

  porId(id: string): Noticia | undefined {
    return this.noticias().find((n) => n.id === id);
  }

  agregarOpinion(opinion: Opinion): void {
    this.opinionesLectores.update((lista) => [...lista, opinion]);
    this.storage.escribir('opiniones', this.opinionesLectores());
  }
}
