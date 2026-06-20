import { ir, abrir, pantalla, tabEstudianteInicio, tabEstudianteMapa, tabEstudianteReportes, tabEstudiantePerfil } from './fabricas.js';

export const pantallasEstudiante = [
  pantalla({
    id: 'dashboard-estudiante',
    figmaId: '1233:2',
    nombre: 'Dashboard Principal-Estudiante',
    usuario: 'estudiante',
    header: {
      tipo: 'rojo',
      label: 'CampusLink',
      titulo: 'Hola, Mateo',
      prompt: '¿Qué necesitas hacer hoy?',
      icono: 'u',
      notificaciones: 'notificaciones'
    },
    tabbar: tabEstudianteInicio,
    blocks: [
      { tipo: 'spacer', size: 8 },
      { tipo: 'card', titulo: 'Reportar Falla (QR)', texto: 'Escanea el código de un ambiente para reportar incidencias.', icono: 'qr', accent: true, to: 'escaner-qr' },
      { tipo: 'gridCards', items: [
        { titulo: 'Mis reportes', icono: 'doc', to: 'mis-reportes-activos' },
        { titulo: 'Mapa del campus', icono: 'map', to: 'mapa-campus' }
      ] },
      { tipo: 'spacer', size: 8 },
      { tipo: 'sos', texto: 'S.O.S. Aula', modal: 'modal-confirm-send-sos-estudiante', ayuda: 'modal-sos-ayuda' }
    ],
    acciones: [ir('Component / Card / Action / Report QR', 'escaner-qr'), ir('Component / Tab Bar / Item / Report Center', 'escaner-qr')]
  }),
  pantalla({
    id: 'sos-estudiante-enviada',
    figmaId: 'inferred:sos-estudiante-enviada',
    nombre: 'S.O.S. estudiante enviado',
    usuario: 'estudiante',
    template: 'success',
    success: {
      tono: 'verde',
      titulo: 'Alerta enviada',
      texto: 'Soporte recibió tu alerta prioritaria y revisará el aula indicada.',
      resumen: { label: 'Ticket', id: 'SOS-20260512-0008', badge: 'Recibido' },
      nota: 'Puedes seguir el avance desde tus reportes activos.',
      botones: [
        { texto: 'Ver seguimiento', to: 'detalles-reporte', variante: 'primario' },
        { texto: 'Volver al inicio', to: 'home', variante: 'secundario' }
      ]
    },
    tabbar: tabEstudianteInicio,
    acciones: [ir('Component / Button / Primary / View Tracking', 'detalles-reporte'), ir('Component / Button / Secondary / Back Home', 'home')]
  }),
  pantalla({
    id: 'mis-reportes-activos',
    figmaId: '1233:699',
    nombre: 'Mis reportes Activos',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Mis reportes', volver: 'home' },
    tabbar: tabEstudianteReportes,
    blocks: [
      { tipo: 'text', texto: 'Consulta el avance de las incidencias que registraste.' },
      { tipo: 'segmented', active: 'Activos', items: [
        { texto: 'Activos', to: 'mis-reportes-activos' },
        { texto: 'Resueltos', to: 'mis-reportes-resueltos' },
        { texto: 'Cancelados', to: 'mis-reportes-cancelados' }
      ] },
      { tipo: 'reportCards', items: [
        { id: 'TCK-20260512-0001', estado: 'Pendiente', categoria: 'Multimedia', lugar: 'Aula B-301 · Hoy, 10:30 AM', to: 'detalle-reporte-pendiente' },
        { id: 'TCK-20260510-0008', estado: 'En proceso', categoria: 'Mobiliario', lugar: 'Aula C-204 · Hace 2 días', to: 'detalle-reporte-en-proceso' },
        { id: 'TCK-20260508-0003', estado: 'En proceso', categoria: 'Internet', lugar: 'Biblioteca · Hace 4 días', to: 'detalle-reporte-en-proceso' }
      ] }
    ],
    acciones: [ir('Card', 'detalle-reporte-pendiente'), ir('Card', 'detalle-reporte-en-proceso')]
  }),
  pantalla({
    id: 'mis-reportes-resueltos',
    figmaId: '1233:817',
    nombre: 'Mis reportes Resueltos',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Mis reportes', volver: 'home' },
    tabbar: tabEstudianteReportes,
    blocks: [
      { tipo: 'text', texto: 'Consulta el avance de las incidencias que registraste.' },
      { tipo: 'segmented', active: 'Resueltos', items: [
        { texto: 'Activos', to: 'mis-reportes-activos' },
        { texto: 'Resueltos', to: 'mis-reportes-resueltos' },
        { texto: 'Cancelados', to: 'mis-reportes-cancelados' }
      ] },
      { tipo: 'reportCards', items: [
        { id: 'TCK-20260501-0005', estado: 'Resuelto', categoria: 'Limpieza', lugar: 'Baño Pabellón A · Hace 11 días' },
        { id: 'TCK-20260429-0002', estado: 'Resuelto', categoria: 'Eléctrico', lugar: 'Aula D-105 · Hace 13 días' }
      ] }
    ],
    acciones: [ir('Component / Segmented Control Item / Active Default', 'mis-reportes-activos')]
  }),
  pantalla({
    id: 'mis-reportes-cancelados',
    figmaId: '1233:917',
    nombre: 'Mis reportes Cancelados',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Mis reportes', volver: 'home' },
    tabbar: tabEstudianteReportes,
    blocks: [
      { tipo: 'text', texto: 'Consulta el avance de las incidencias que registraste.' },
      { tipo: 'segmented', active: 'Cancelados', items: [
        { texto: 'Activos', to: 'mis-reportes-activos' },
        { texto: 'Resueltos', to: 'mis-reportes-resueltos' },
        { texto: 'Cancelados', to: 'mis-reportes-cancelados' }
      ] },
      { tipo: 'reportCards', items: [
        { id: 'TCK-20260512-0002', estado: 'Cancelado', categoria: 'Multimedia', lugar: 'Aula B-301 · Hoy, 10:15 AM' }
      ] }
    ],
    acciones: [ir('Component / Segmented Control Item / Active Default', 'mis-reportes-activos')]
  }),
  pantalla({
    id: 'detalle-reporte-pendiente',
    figmaId: '1233:1001',
    nombre: 'Detalles del reporte',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Detalle del reporte', volver: 'mis-reportes-activos' },
    blocks: [
      { tipo: 'ticketHeader', id: 'TCK-20260512-0001', badge: 'Pendiente', fecha: 'Hoy, 10:30 AM' },
      { tipo: 'timeline', items: [
        ['Recibido', '10:30 AM', 'Tu reporte ha sido ingresado al sistema y está en cola de revisión.', true],
        ['En proceso', '', '', false],
        ['Resuelto', '', '', false]
      ] },
      { tipo: 'title', texto: 'Detalles' },
      { tipo: 'dataCard', rows: [
        ['Ubicación', 'Monterrico · Pabellón B · Aula B-301'],
        ['Categoría', 'Multimedia'],
        ['Evidencia', 'Evidencia enviada'],
        ['Descripción', 'El proyector del aula no enciende y la clase ya inició.']
      ] }
    ],
    cta: { items: [{ texto: 'Cancelar reporte', modal: 'modal-cancelar-reporte', variante: 'peligroSuave' }] },
    acciones: [abrir('Component / Button / Destructive / Cancel Report', 'modal-cancelar-reporte')]
  }),
  pantalla({
    id: 'detalle-reporte-en-proceso',
    figmaId: '1233:1485',
    nombre: 'Detalle reporte en proceso',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Detalle del reporte', volver: 'mis-reportes-activos' },
    blocks: [
      { tipo: 'ticketHeader', id: 'TCK-20260510-0008', badge: 'En proceso', fecha: 'Hace 2 días' },
      { tipo: 'timeline', items: [
        ['Recibido', '10:30 AM', 'Tu reporte fue recibido por el equipo de soporte.', true],
        ['En proceso', 'Hoy', 'Un técnico está atendiendo la incidencia reportada.', true, 'pulso'],
        ['Resuelto', '', '', false]
      ] },
      { tipo: 'title', texto: 'Detalles' },
      { tipo: 'dataCard', rows: [
        ['Ubicación', 'Aula C-204'],
        ['Categoría', 'Mobiliario'],
        ['Evidencia', 'Evidencia no disponible'],
        ['Descripción', 'Reporte de mobiliario en el aula C-204 actualmente en atención.']
      ] },
      { tipo: 'banda', tono: 'gris', texto: 'La cancelación ya no está disponible porque la atención fue iniciada.' }
    ],
    acciones: [ir('Component / Button / Navigation / Back', 'mis-reportes-activos')]
  }),
  pantalla({
    id: 'confirmacion-reporte-cancelado',
    figmaId: '1233:1095',
    nombre: 'Confirmacion de reporte cancelado',
    usuario: 'shared',
    template: 'success',
    success: {
      tono: 'rojoSuave',
      icono: 'basura',
      titulo: 'Reporte cancelado',
      texto: 'El ticket TCK-20260512-0001 fue marcado como cancelado.',
      botones: [
        { texto: 'Volver a Mis reportes', to: 'mis-reportes-cancelados', variante: 'primario' },
        { texto: 'Volver al inicio', to: 'home', variante: 'secundario' }
      ]
    },
    acciones: [ir('Component / Button / Primary / Back To My Reports', 'mis-reportes-cancelados')]
  }),
  pantalla({
    id: 'notificaciones',
    figmaId: '1233:1568',
    nombre: 'Notificaciones',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Notificaciones', volver: 'home' },
    tabbar: tabEstudianteInicio,
    blocks: [
      { tipo: 'list', items: [
        { texto: 'Tu ticket TCK-20260510-0008 está en proceso.', hora: 'Hoy, 11:45 AM', icono: 'alert', tono: 'ambar', nuevo: true },
        { texto: 'Tu ticket TCK-20260501-0005 fue resuelto.', hora: 'Ayer, 04:20 PM', icono: 'check', tono: 'verde' },
        { texto: 'Se registró una actualización en tu reporte multimedia.', hora: 'Hace 2 días', icono: 'bell', tono: 'azul' }
      ] }
    ],
    acciones: [ir('Component / Tab Bar / Item / Report Center', 'escaner-qr')]
  }),
  pantalla({
    id: 'mapa-campus',
    figmaId: '1248:1785',
    nombre: 'Mapa del campus',
    usuario: 'estudiante',
    header: { tipo: 'claro', titulo: 'Mapa del campus', volver: 'home' },
    tabbar: tabEstudianteMapa,
    blocks: [
      { tipo: 'inputs', fields: [['Buscar ambiente', 'Buscar ambiente...']] },
      { tipo: 'map', estatico: true, ubicar: true, leyenda: ['Prioritario', 'Asignado', 'En atención', 'Resuelto'] }
    ],
    acciones: [ir('Component / Tab Bar / Item / Home', 'home')]
  }),
  pantalla({
    id: 'perfil-estudiante',
    figmaId: '1322:2182',
    nombre: 'Perfil / Estudiante',
    usuario: 'estudiante',
    header: { tipo: 'perfil', titulo: 'Perfil', initials: 'MS', nombre: 'Mateo Salazar', rol: 'Estudiante', email: 'u202612345@upc.edu.pe', accionDerecha: { texto: 'Editar' } },
    tabbar: tabEstudiantePerfil,
    blocks: [
      { tipo: 'dataCard', titulo: 'Datos institucionales', rows: [
        ['Código UPC', 'U202612345'],
        ['Sede', 'Monterrico'],
        ['Rol', 'Estudiante']
      ] },
      { tipo: 'settingsCard', titulo: 'Preferencias', rows: [
        { insignia: 'N', etiqueta: 'Notificaciones', switch: 'prefNotificaciones' },
        { insignia: '@', etiqueta: 'Actualizaciones por correo', switch: 'prefCorreo' }
      ] },
      { tipo: 'settingsCard', titulo: 'Seguridad y cuenta', rows: [
        { insignia: '*', etiqueta: 'Cambiar contraseña', flecha: true },
        { insignia: 'P', etiqueta: 'Privacidad de datos', flecha: true },
        { insignia: 'S', etiqueta: 'Cerrar sesión', peligro: true, modal: 'modal-cerrar-sesion' }
      ] }
    ],
    acciones: [ir('Component / Tab Bar / Item / Report Center', 'escaner-qr')]
  }),
];
