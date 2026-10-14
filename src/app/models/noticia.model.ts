/** Una noticia tal como viene en public/data/noticias.json. */
export interface Noticia {
  id: string;
  titulo: string;
  categoria: string;
  /** Fecha en formato AAAA-MM-DD. */
  fecha: string;
  fuente: string;
  url: string;
  imagen: string;
  resumen: string;
  /** Párrafos del cuerpo de la noticia. */
  contenido: string[];
}

/** Tema de interés que filtra el listado por categoría. */
export interface Tema {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
}

/** Opinión de un lector. */
export interface Opinion {
  autor: string;
  rol: string;
  texto: string;
}

/** Estructura completa del archivo JSON. */
export interface Datos {
  noticias: Noticia[];
  temas: Tema[];
  opiniones: Opinion[];
}
