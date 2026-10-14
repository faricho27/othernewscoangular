import { Injectable } from '@angular/core';

const PREFIJO = 'othernewsco:';

/** Acceso seguro a localStorage: si el navegador lo bloquea, la app sigue funcionando. */
@Injectable({ providedIn: 'root' })
export class StorageService {
  leer<T>(clave: string, porDefecto: T): T {
    try {
      const crudo = localStorage.getItem(PREFIJO + clave);
      return crudo ? (JSON.parse(crudo) as T) : porDefecto;
    } catch {
      return porDefecto;
    }
  }

  escribir(clave: string, valor: unknown): void {
    try {
      localStorage.setItem(PREFIJO + clave, JSON.stringify(valor));
    } catch {
      /* sin almacenamiento: no se guarda, pero no se rompe la página */
    }
  }
}
