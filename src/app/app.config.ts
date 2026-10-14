import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withComponentInputBinding, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

registerLocaleData(localeEsCo);

/**
 * Configuración global de la aplicación.
 * - withHashLocation: usa rutas con "#" (/#/noticias) para que los enlaces directos
 *   funcionen en GitHub Pages, que no soporta rutas del lado del servidor.
 * - withComponentInputBinding: entrega los parámetros de la ruta (":id") como input().
 * - provideHttpClient: permite leer data/noticias.json.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation(), withComponentInputBinding(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
};
