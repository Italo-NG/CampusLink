// vista-app/datos/datosIniciales.js — reglas, datos por defecto, helpers de lectura/escritura y roles

export const VISTA_APP_PANTALLA_INICIAL = 'login';

export const VISTA_APP_REGLAS = {
  'cierre-ticket': function (datos) {
    return !!datos.fotoCierre && String(datos.solucionCierre || '').trim() !== '';
  },
  calificacion: function (datos) {
    return (datos.rating || 0) > 0;
  }
};

export const VISTA_APP_DATOS_INICIALES = {
  sede: 'Monterrico',
  categoria: 'Limpieza',
  evidencia: true,
  descripcion: '',
  problema: 'Proyector',
  rating: 0,
  solucionCierre: '',
  fotoCierre: false,
  notificarCierre: false,
  motivoReapertura: '',
  qrDetectado: false,
  filtroTickets: 'Todas',
  requeridos: {},
  clavesVisibles: {},
  campos: {}
};

export function crearDatosIniciales() {
  var copia = JSON.parse(JSON.stringify(VISTA_APP_DATOS_INICIALES));
  return copia;
}

export function leerDato(datos, ruta) {
  if (!ruta) return undefined;
  if (ruta.indexOf('campos.') === 0) {
    return datos.campos[ruta.slice(7)];
  }
  return datos[ruta];
}

export function asignarDato(datos, ruta, valor) {
  if (!ruta) return;
  if (ruta.indexOf('campos.') === 0) {
    datos.campos[ruta.slice(7)] = valor;
    return;
  }
  datos[ruta] = valor;
}

export const VISTA_APP_ROLES = [
  { id: 'estudiante', etiqueta: 'Estudiante', destino: 'dashboard-estudiante' },
  { id: 'docente', etiqueta: 'Docente', destino: 'dashboard-docente' },
  { id: 'soporte', etiqueta: 'Soporte', destino: 'dashboard-soporte' }
];
