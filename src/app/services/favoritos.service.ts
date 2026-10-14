import { Injectable, computed, inject, signal } from '@angular/core';
import { StorageService } from './storage.service';

/** Guarda los id de las noticias favoritas y los conserva al recargar la página. */
@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly storage = inject(StorageService);
  private readonly ids = signal<string[]>(this.storage.leer<string[]>('favoritos', []));

  /** Cantidad de favoritas (se recalcula sola). */
  readonly total = computed(() => this.ids().length);

  esFavorito(id: string): boolean {
    return this.ids().includes(id);
  }

  alternar(id: string): void {
    this.ids.update((lista) => (lista.includes(id) ? lista.filter((f) => f !== id) : [...lista, id]));
    this.storage.escribir('favoritos', this.ids());
  }
}
