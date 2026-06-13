export function ir(control, destino) {
  return { control: control, tipo: 'pantalla', destino: destino };
}

export function abrir(control, destino) {
  return { control: control, tipo: 'modal', destino: destino };
}

export function cerrar(control) {
  return { control: control, tipo: 'cerrar' };
}

export function logout(control) {
  return { control: control, tipo: 'logout' };
}

export function pantalla(datos) {
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
    icono: datos.icono || '!',
    acciones: datos.acciones || []
  };
}

export const tabEstudianteInicio = { tipo: 'student', activo: 'inicio' };
export const tabEstudianteReportes = { tipo: 'student', activo: 'reportes' };
export const tabEstudiantePerfil = { tipo: 'student', activo: 'perfil' };
export const tabSoporteInicio = { tipo: 'support', activo: 'inicio' };
export const tabSoporteMapa = { tipo: 'support', activo: 'mapa' };
export const tabSoporteTickets = { tipo: 'support', activo: 'tickets' };
export const tabSoportePerfil = { tipo: 'support', activo: 'perfil' };

export const headerBackReporte = {
  tipo: 'claro',
  titulo: 'Nuevo reporte',
  volver: 'escaner-qr',
  accionDerecha: { texto: 'Cancelar', modal: 'modal-confirm-cancel-report' }
};

export const detalleTicket = [
  ['Ticket', 'SOS-20260512-0007'],
  ['Problema', '{problema}'],
  ['Ubicación', 'Aula B-301']
];
