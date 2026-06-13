import { ir, abrir, pantalla, tabEstudianteInicio, tabEstudianteReportes, tabEstudiantePerfil } from './fabricas.js';

export const pantallasEstudiante = [
  pantalla({
    id: 'dashboard-estudiante',
    figmaId: '18:4',
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
        { titulo: 'Mapa del campus', icono: 'map', to: 'ubicacion-manual' }
      ] },
      { tipo: 'spacer', size: 8 },
      { tipo: 'sos', texto: 'S.O.S. Aula', modal: 'modal-confirm-send-sos-estudiante' }
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
      titulo: 'Alerta enviada',
      texto: 'Soporte recibió tu alerta prioritaria y revisará el aula indicada.',
      rows: [['Ticket', 'SOS-20260512-0008'], ['Estado', 'Recibido']],
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
    figmaId: '35:1994',
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
    figmaId: '35:2069',
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
    figmaId: '35:2125',
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
    figmaId: '35:2165',
    nombre: 'Detalles del reporte',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Detalle del reporte', volver: 'mis-reportes-activos' },
    blocks: [
      { tipo: 'dataCard', badge: 'Pendiente', rows: [['TCK-20260512-0001', 'Hoy, 10:30 AM']] },
      { tipo: 'timeline', items: [
        ['Recibido', '10:30 AM', 'Tu reporte ha sido ingresado al sistema y está en cola de revisión.', true],
        ['En proceso', '', '', false],
        ['Resuelto', '', '', false]
      ] },
      { tipo: 'dataCard', rows: [
        ['Ubicación', 'Monterrico · Pabellón B · Aula B-301'],
        ['Categoría', 'Multimedia'],
        ['Evidencia', 'Evidencia enviada'],
        ['Descripción', 'El proyector del aula no enciende y la clase ya inició.']
      ] },
      { tipo: 'buttonGroup', items: [{ texto: 'Cancelar reporte', modal: 'modal-cancelar-reporte', variante: 'peligro' }] }
    ],
    acciones: [abrir('Component / Button / Destructive / Cancel Report', 'modal-cancelar-reporte')]
  }),
  pantalla({
    id: 'detalle-reporte-en-proceso',
    figmaId: '1109:2',
    nombre: 'Detalle reporte en proceso',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Detalle del reporte', volver: 'mis-reportes-activos' },
    blocks: [
      { tipo: 'dataCard', badge: 'En proceso', rows: [['TCK-20260510-0008', 'Hace 2 días']] },
      { tipo: 'timeline', items: [
        ['Recibido', '10:30 AM', 'Tu reporte fue recibido y ya está siendo atendido por soporte.', true],
        ['Resuelto', '', '', false]
      ] },
      { tipo: 'dataCard', rows: [
        ['Ubicación', 'Aula C-204'],
        ['Categoría', 'Mobiliario'],
        ['Evidencia', 'Evidencia no disponible'],
        ['Descripción', 'Reporte de mobiliario en el aula C-204 actualmente en atención.']
      ] },
      { tipo: 'text', texto: 'La cancelación ya no está disponible porque la atención fue iniciada.', chico: true }
    ],
    acciones: [ir('Component / Button / Navigation / Back', 'mis-reportes-activos')]
  }),
  pantalla({
    id: 'confirmacion-reporte-cancelado',
    figmaId: '35:2342',
    nombre: 'Confirmacion de reporte cancelado',
    usuario: 'shared',
    template: 'success',
    success: {
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
    figmaId: '35:2365',
    nombre: 'Notificaciones',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Notificaciones', volver: 'home' },
    tabbar: tabEstudianteInicio,
    blocks: [
      { tipo: 'list', items: [
        ['Tu ticket TCK-20260510-0008 está en proceso.', 'Hoy, 11:45 AM'],
        ['Tu ticket TCK-20260501-0005 fue resuelto.', 'Ayer, 04:20 PM'],
        ['Se registró una actualización en tu reporte multimedia.', 'Hace 2 días']
      ] }
    ],
    acciones: [ir('Component / Tab Bar / Item / Report Center', 'escaner-qr')]
  }),
  pantalla({
    id: 'perfil-estudiante',
    figmaId: '1260:2',
    nombre: 'Perfil / Estudiante',
    usuario: 'estudiante',
    header: { tipo: 'claro', titulo: 'Perfil' },
    tabbar: tabEstudiantePerfil,
    blocks: [
      { tipo: 'profile', initials: 'MS', nombre: 'Mateo Salazar', rol: 'Estudiante', email: 'mateo.salazar@upc.edu.pe' },
      { tipo: 'dataCard', titulo: 'Datos institucionales', rows: [
        ['Código UPC', 'U202612345'],
        ['Sede', 'Monterrico'],
        ['Rol', 'Estudiante']
      ] },
      { tipo: 'dataCard', titulo: 'Preferencias', rows: [
        ['Notificaciones', 'Activadas'],
        ['Actualizaciones por correo', 'Activadas']
      ] },
      { tipo: 'dataCard', titulo: 'Seguridad y cuenta', rows: [
        ['Cambiar contraseña', '›'],
        ['Privacidad de datos', '›']
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Cerrar sesión', modal: 'modal-cerrar-sesion', variante: 'peligro' }
      ] }
    ],
    acciones: [ir('Component / Tab Bar / Item / Report Center', 'escaner-qr')]
  }),
];
