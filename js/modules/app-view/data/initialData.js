export const APP_VIEW_INITIAL_SCREEN = 'login';

export const APP_VIEW_RULES = {
  'cierre-ticket': function (data) {
    return !!data.fotoCierre && String(data.solucionCierre || '').trim() !== '';
  },
  calificacion: function (data) {
    return (data.rating || 0) > 0;
  }
};

export const APP_VIEW_INITIAL_DATA = {
  sede: 'Monterrico',
  categoria: 'Cleaning',
  evidencia: true,
  descripcion: '',
  problema: 'Projector',
  rating: 0,
  solucionCierre: '',
  fotoCierre: false,
  notificarCierre: false,
  motivoReapertura: '',
  qrDetectado: false,
  filtroTickets: 'All',
  prefNotificaciones: true,
  prefCorreo: true,
  requeridos: {},
  clavesVisibles: {},
  campos: {}
};

export function createInitialData() {
  var copy = JSON.parse(JSON.stringify(APP_VIEW_INITIAL_DATA));
  return copy;
}

export function readData(data, path) {
  if (!path) return undefined;
  if (path.indexOf('campos.') === 0) {
    return data.campos[path.slice(7)];
  }
  return data[path];
}

export function setData(data, path, value) {
  if (!path) return;
  if (path.indexOf('campos.') === 0) {
    data.campos[path.slice(7)] = value;
    return;
  }
  data[path] = value;
}

export const APP_VIEW_ROLES = [
  { id: 'estudiante', etiqueta: 'Student', destino: 'student-dashboard' },
  { id: 'docente', etiqueta: 'Teacher', destino: 'teacher-dashboard' },
  { id: 'soporte', etiqueta: 'Support', destino: 'support-dashboard' }
];
