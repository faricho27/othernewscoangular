import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { NoticiaDetalleComponent } from './pages/noticia-detalle/noticia-detalle.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

/** Rutas de la aplicación: una por cada página del mockup. */
export const routes: Routes = [
  { path: '', component: InicioComponent, title: 'Inicio – OtherNewsCO' },
  { path: 'noticias', component: NoticiasComponent, title: 'Noticias – OtherNewsCO' },
  { path: 'noticias/:id', component: NoticiaDetalleComponent },
  { path: 'contacto', component: ContactoComponent, title: 'Contacto – OtherNewsCO' },
  { path: '**', redirectTo: '' },
];
