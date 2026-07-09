export function goTo(control, destino) {
  return { control: control, tipo: 'pantalla', destino: destino };
}

export function openModal(control, destino) {
  return { control: control, tipo: 'modal', destino: destino };
}

export function closeAction(control) {
  return { control: control, tipo: 'cerrar' };
}

export function logout(control) {
  return { control: control, tipo: 'logout' };
}

export function screen(datos) {
  return {
    id: datos.id,
    figmaId: datos.figmaId,
    nombre: datos.nombre,
    usuario: datos.usuario,
    template: datos.template || 'standard',
    acciones: datos.acciones || [],
    header: datos.header || null,
    tabbar: datos.tabbar || null,
    fondo: datos.fondo || '#F5F7FB',
    blocks: datos.blocks || [],
    auth: datos.auth || null,
    form: datos.form || null,
    success: datos.success || null,
    cta: datos.cta || null,
    alias: datos.alias || null,
    preset: datos.preset || null
  };
}

export function modal(datos) {
  return {
    id: datos.id,
    figmaId: datos.figmaId,
    nombre: datos.nombre,
    usuario: datos.usuario,
    titulo: datos.titulo,
    texto: datos.texto,
    icon: datos.icon || '!',
    sinIcono: datos.sinIcono || false,
    tipo: datos.tipo || 'alerta',
    grupos: datos.grupos || null,
    ubicacion: datos.ubicacion || null,
    acciones: datos.acciones || []
  };
}

export const tabStudentHome = { tipo: 'student', activo: 'inicio' };
export const tabStudentMap = { tipo: 'student', activo: 'mapa' };
export const tabStudentReport = { tipo: 'student', activo: 'reportar' };
export const tabStudentReports = { tipo: 'student', activo: 'reportes' };
export const tabStudentProfile = { tipo: 'student', activo: 'perfil' };
export const tabSupportHome = { tipo: 'support', activo: 'inicio' };
export const tabSupportMap = { tipo: 'support', activo: 'mapa' };
export const tabSupportTickets = { tipo: 'support', activo: 'tickets' };
export const tabSupportProfile = { tipo: 'support', activo: 'perfil' };

export const headerBackReport = {
  tipo: 'claro',
  titulo: 'New report',
  volver: 'qr-scanner',
  accionDerecha: { texto: 'Cancel', modal: 'modal-confirm-cancel-report' }
};

export const ticketDetail = [
  ['Ticket', 'SOS-20260512-0007'],
  ['Problem', '{problema}'],
  ['Location', 'Room B-301']
];
