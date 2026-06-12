export const VISTA_APP_MEDIDAS = {
  ancho: 393,
  alto: 852
};

export const VISTA_APP_PANTALLA_INICIAL = 'login';

export const VISTA_APP_ROLES = [
  { id: 'estudiante', etiqueta: 'Estudiante', destino: 'dashboard-estudiante' },
  { id: 'docente', etiqueta: 'Docente', destino: 'dashboard-docente' },
  { id: 'soporte', etiqueta: 'Soporte', destino: 'dashboard-soporte' }
];

function ir(control, destino) {
  return { control: control, tipo: 'pantalla', destino: destino };
}

function abrir(control, destino) {
  return { control: control, tipo: 'modal', destino: destino };
}

function cerrar(control) {
  return { control: control, tipo: 'cerrar' };
}

function logout(control) {
  return { control: control, tipo: 'logout' };
}

function pantalla(datos) {
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
    success: datos.success || null
  };
}

function modal(datos) {
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

const tabEstudianteInicio = { tipo: 'student', activo: 'inicio' };
const tabEstudianteReportes = { tipo: 'student', activo: 'reportes' };
const tabEstudiantePerfil = { tipo: 'student', activo: 'perfil' };
const tabSoporteInicio = { tipo: 'support', activo: 'inicio' };
const tabSoporteMapa = { tipo: 'support', activo: 'mapa' };
const tabSoporteTickets = { tipo: 'support', activo: 'tickets' };
const tabSoportePerfil = { tipo: 'support', activo: 'perfil' };

const headerBackReporte = {
  tipo: 'claro',
  titulo: 'Nuevo reporte',
  volver: 'escaner-qr',
  accionDerecha: { texto: 'Cancelar', modal: 'modal-confirm-cancel-report' }
};

const detalleTicket = [
  ['Ticket', 'SOS-20260512-0007'],
  ['Problema', 'Proyector'],
  ['Ubicación', 'Aula B-301']
];

const pantallas = [
  pantalla({
    id: 'login',
    figmaId: '19:186',
    nombre: 'Login',
    usuario: 'general',
    template: 'auth',
    auth: {
      tipo: 'sso',
      titulo: 'CampusLink',
      subtitulo: 'Gestión inteligente del campus',
      descripcion: 'Reporta incidencias, sigue su estado y ayuda a mejorar tu entorno universitario.',
      boton: { texto: 'Ingresar con cuenta UPC', to: 'login-datos' },
      enlace: 'Conoce cómo protegemos tus datos'
    },
    acciones: [ir('Component / Button / Primary / UPC Login', 'login-datos')]
  }),
  pantalla({
    id: 'login-datos',
    figmaId: '1216:55',
    nombre: 'Login / Datos',
    usuario: 'general',
    template: 'authForm',
    auth: {
      titulo: 'CampusLink',
      subtitulo: 'Gestión inteligente del campus',
      descripcion: 'Ingresa con tu correo institucional para continuar con tus reportes y seguimiento.',
      fields: [
        ['Correo institucional', 'nombre@upc.edu.pe'],
        ['Contraseña', '••••••••']
      ],
      boton: { texto: 'Iniciar sesión', to: 'config-experiencia' },
      accionesExtra: [
        { texto: '¿Olvidaste tu contraseña?' },
        { texto: '¿No tienes cuenta? Crear cuenta', to: 'registro-upc' },
        { texto: 'Conoce cómo protegemos tus datos' }
      ]
    },
    acciones: [ir('Component / Button / Primary / Login Data', 'config-experiencia')]
  }),
  pantalla({
    id: 'registro-upc',
    figmaId: '1218:2',
    nombre: 'Registro / Usuario UPC',
    usuario: 'general',
    template: 'register',
    header: { tipo: 'claro', titulo: 'Crear cuenta', volver: 'login-datos' },
    blocks: [
      { tipo: 'title', texto: 'Únete a CampusLink' },
      { tipo: 'text', texto: 'Crea tu cuenta institucional para reportar incidencias y revisar su atención.' },
      { tipo: 'inputs', fields: [
        ['Nombre y apellido', 'Ej. Elena Vargas'],
        ['Correo institucional', 'nombre.apellido@upc.edu.pe'],
        ['Código UPC', 'U202612345']
      ] },
      { tipo: 'selectRow', items: [['Tu rol', 'Estudiante'], ['Sede', 'Monterrico']] },
      { tipo: 'inputs', fields: [
        ['Contraseña', '••••••••'],
        ['Confirmar contraseña', '••••••••']
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Crear cuenta', to: 'config-experiencia', variante: 'primario' },
        { texto: '¿Ya tienes cuenta? Iniciar sesión', to: 'login-datos', variante: 'texto' }
      ] }
    ],
    acciones: [ir('Component / Button / Primary / Create Account', 'config-experiencia')]
  }),
  pantalla({
    id: 'config-experiencia',
    figmaId: '19:208',
    nombre: 'Configuracion experiencia',
    usuario: 'general',
    template: 'config',
    acciones: [ir('Component / Button / Primary / Continue', 'dashboard-estudiante')]
  }),
  pantalla({
    id: 'config-experiencia-soporte',
    figmaId: '861:133',
    nombre: 'Configuracion experiencia',
    usuario: 'soporte',
    template: 'config',
    acciones: [ir('Component / Button / Primary / Continue', 'dashboard-soporte')]
  }),

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
      { tipo: 'spacer', size: 32 },
      { tipo: 'card', titulo: 'Reportar Falla (QR)', texto: 'Escanea el código de un ambiente para reportar incidencias.', icono: 'qr', accent: true, to: 'escaner-qr' },
      { tipo: 'spacer', size: 24 },
      { tipo: 'gridCards', items: [
        { titulo: 'Mis reportes', icono: 'doc', to: 'mis-reportes-activos' },
        { titulo: 'Mapa del campus', icono: 'map', to: 'ubicacion-manual' }
      ] },
      { tipo: 'spacer', size: 20 },
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
    id: 'escaner-qr',
    figmaId: '19:257',
    nombre: 'Escaner QR',
    usuario: 'shared',
    fondo: '#000000',
    header: { tipo: 'oscuro', titulo: 'Escanea el código', volver: 'home' },
    blocks: [
      { tipo: 'scanner', modal: 'modal-qr-no-reconocido' },
      { tipo: 'bottomPanel', blocks: [
        { tipo: 'text', texto: 'Apunta al código QR ubicado en el aula, laboratorio o ambiente afectado.', centro: true, chico: true, claro: true },
        { tipo: 'buttonGroup', items: [
          { texto: 'Simular QR válido', to: 'registrar-reporte', variante: 'secundario', icono: 'scan' },
          { texto: 'Ingresar ubicación manualmente', to: 'ubicacion-manual', variante: 'texto' }
        ] }
      ] }
    ],
    acciones: [
      ir('Component / Button / Navigation / Back', 'home'),
      abrir('Component / Scanner / QR / Active Area', 'modal-qr-no-reconocido'),
      ir('Component / Button / Text Action / Manual Location Entry', 'ubicacion-manual'),
      ir('Component / Button / Secondary / Simulate Valid QR', 'registrar-reporte')
    ]
  }),
  pantalla({
    id: 'ubicacion-manual',
    figmaId: '1036:14',
    nombre: 'Ubicación manual',
    usuario: 'shared',
    header: headerBackReporte,
    tabbar: tabEstudianteInicio,
    blocks: [
      { tipo: 'text', texto: 'Selecciona el ambiente donde ocurre la incidencia.' },
      { tipo: 'dataCard', rows: [
        ['Sede', 'Monterrico'],
        ['Pabellón', 'B'],
        ['Piso', '3'],
        ['Aula', 'B-301']
      ] },
      { tipo: 'text', texto: 'Esta ubicación será enviada al equipo de soporte.', chico: true },
      { tipo: 'buttonGroup', items: [
        { texto: 'Continuar', to: 'registrar-reporte', variante: 'primario' },
        { texto: 'Cambiar sede', to: 'selector-sede', variante: 'secundario' }
      ] }
    ],
    acciones: [ir('Component / Button / Primary / Continue', 'registrar-reporte'), ir('Sede', 'selector-sede')]
  }),
  pantalla({
    id: 'selector-sede',
    figmaId: '1048:32',
    nombre: 'Ubicación manual — Selector Sede',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Seleccionar sede', volver: 'ubicacion-manual' },
    tabbar: tabEstudianteInicio,
    blocks: [
      { tipo: 'text', texto: 'Elige la sede donde ocurre la incidencia.' },
      { tipo: 'options', items: [
        { texto: 'Monterrico', active: true, to: 'ubicacion-manual' },
        { texto: 'San Isidro', to: 'ubicacion-manual' },
        { texto: 'Villa', to: 'ubicacion-manual' }
      ] }
    ],
    acciones: [ir('Component / Button / Navigation / Back', 'ubicacion-manual')]
  }),
  pantalla({
    id: 'registrar-reporte',
    figmaId: '21:456',
    nombre: 'Registrar Reporte',
    usuario: 'shared',
    header: headerBackReporte,
    tabbar: tabEstudianteInicio,
    blocks: [
      { tipo: 'title', texto: 'Ubicación' },
      { tipo: 'dataCard', badge: 'Ubicación verificada por QR', rows: [
        ['Sede', 'Monterrico'],
        ['Pabellón', 'B'],
        ['Aula', 'B-301']
      ] },
      { tipo: 'title', texto: 'Categoría de falla' },
      { tipo: 'categoryGrid', items: ['Mobiliario', 'Eléctrico', 'Multimedia', 'Limpieza', 'Internet', 'Otro'] },
      { tipo: 'title', texto: 'Evidencia' },
      { tipo: 'upload', texto: 'Imagen cargada correctamente' },
      { tipo: 'inputs', fields: [['Descripción breve', 'Derramaron gaseosa en el aula']] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Continuar', to: 'resumen-reporte', variante: 'primario' },
        { texto: 'Cancelar reporte', modal: 'modal-confirm-cancel-report', variante: 'texto' }
      ] }
    ],
    acciones: [
      ir('Component / Button / Primary / Continue Report', 'resumen-reporte'),
      ir('Component / Button / Navigation / Back', 'escaner-qr'),
      abrir('Component / Button / Text Action / Cancel Report', 'modal-confirm-cancel-report')
    ]
  }),
  pantalla({
    id: 'resumen-reporte',
    figmaId: '21:611',
    nombre: 'Resumen Reporte',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Revisa tu reporte', volver: 'registrar-reporte' },
    tabbar: tabEstudianteInicio,
    blocks: [
      { tipo: 'dataCard', rows: [
        ['Ubicación', 'Monterrico · Pabellón B · Aula B-301'],
        ['Categoría', 'Limpieza'],
        ['Evidencia fotográfica', 'Imagen cargada correctamente'],
        ['Descripción', 'Derramaron gaseosa en el aula']
      ] },
      { tipo: 'text', texto: 'El equipo de soporte recibirá la ubicación y evidencia para atender la incidencia.' },
      { tipo: 'buttonGroup', items: [
        { texto: 'Enviar reporte', modal: 'modal-confirm-send-report', variante: 'primario' },
        { texto: 'Editar', to: 'registrar-reporte', variante: 'secundario' },
        { texto: 'Cancelar', modal: 'modal-confirm-cancel-report', variante: 'texto' }
      ] }
    ],
    acciones: [
      abrir('Component / Button / Primary / Submit Report', 'modal-confirm-send-report'),
      ir('Component / Button / Text Action / Edit Report', 'registrar-reporte'),
      abrir('Component / Button / Text Action / Cancel Report', 'modal-confirm-cancel-report')
    ]
  }),
  pantalla({
    id: 'resumen-reporte-error',
    figmaId: '1006:3',
    nombre: 'Resumen Reporte — Simulación error de envío',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Revisa tu reporte', volver: 'registrar-reporte' },
    tabbar: tabEstudianteInicio,
    blocks: [
      { tipo: 'dataCard', rows: [
        ['Ubicación', 'Monterrico · Pabellón B · Aula B-301'],
        ['Categoría', 'Limpieza'],
        ['Evidencia fotográfica', 'Imagen cargada correctamente'],
        ['Descripción', 'Derramaron gaseosa en el aula']
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Enviar reporte', modal: 'modal-send-report-error', variante: 'primario' },
        { texto: 'Editar', to: 'registrar-reporte', variante: 'secundario' },
        { texto: 'Cancelar', modal: 'modal-confirm-cancel-report', variante: 'texto' }
      ] }
    ],
    acciones: [abrir('Component / Button / Primary / Submit Report', 'modal-send-report-error')]
  }),
  pantalla({
    id: 'reporte-confirmado',
    figmaId: '21:681',
    nombre: 'Reporte confirmado',
    usuario: 'shared',
    template: 'success',
    success: {
      titulo: 'Reporte enviado',
      texto: 'Tu incidencia fue registrada correctamente.',
      rows: [['Ticket ID', 'TCK-20260512-0001'], ['Estado', 'Recibido']],
      nota: 'Recibirás notificaciones cuando el estado cambie.',
      botones: [
        { texto: 'Ver seguimiento', to: 'detalles-reporte', variante: 'primario' },
        { texto: 'Volver al inicio', to: 'home', variante: 'secundario' }
      ]
    },
    tabbar: tabEstudianteInicio,
    acciones: [ir('Component / Button / Primary / View Tracking', 'detalles-reporte'), ir('Component / Button / Secondary / Back Home', 'home')]
  }),
  pantalla({
    id: 'detalles-reporte',
    figmaId: '21:785',
    nombre: 'Detalles del Reporte',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Detalle del reporte', volver: 'reporte-confirmado' },
    blocks: [
      { tipo: 'dataCard', badge: 'Recibido', rows: [['TCK-20260512-0001', 'Hoy, 10:30 AM']] },
      { tipo: 'timeline', items: [
        ['Recibido', '10:30 AM', 'Tu reporte ha sido ingresado al sistema y está en cola de revisión.', true],
        ['En proceso', '', '', false],
        ['Resuelto', '', '', false]
      ] },
      { tipo: 'title', texto: 'Detalles' },
      { tipo: 'dataCard', rows: [
        ['Ubicación', 'Monterrico · Pabellón B · Aula B-301'],
        ['Categoría', 'Multimedia'],
        ['Descripción', 'El proyector del aula no enciende y la clase ya inició.']
      ] },
      { tipo: 'buttonGroup', items: [{ texto: 'Volver al inicio', to: 'home', variante: 'secundario' }] }
    ],
    acciones: [ir('Component / Button / Secondary / Back Home', 'home')]
  }),
  pantalla({
    id: 'mis-reportes-activos',
    figmaId: '35:1994',
    nombre: 'Mis reportes Activos',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Mis reportes' },
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
        { id: 'TCK-20260508-0003', estado: 'Internet', categoria: 'Internet', lugar: 'Biblioteca · Hace 4 días', to: 'detalle-reporte-en-proceso' }
      ] }
    ],
    acciones: [ir('Card', 'detalle-reporte-pendiente'), ir('Card', 'detalle-reporte-en-proceso')]
  }),
  pantalla({
    id: 'mis-reportes-resueltos',
    figmaId: '35:2069',
    nombre: 'Mis reportes Resueltos',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Mis reportes' },
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
    header: { tipo: 'claro', titulo: 'Mis reportes' },
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
    id: 'reporte-descartado',
    figmaId: '985:2',
    nombre: 'Reporte descartado',
    usuario: 'shared',
    template: 'success',
    success: {
      titulo: 'Reporte descartado',
      texto: 'Tu reporte no fue enviado y la información ingresada fue eliminada.',
      botones: [{ texto: 'Volver al inicio', to: 'home', variante: 'primario' }]
    },
    acciones: [ir('Component / Button / Primary / Back Home', 'home')]
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

  pantalla({
    id: 'perfil-docente',
    figmaId: 'inferred:perfil-docente',
    nombre: 'Perfil / Docente',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Perfil' },
    tabbar: tabEstudiantePerfil,
    blocks: [
      { tipo: 'profile', initials: 'EV', nombre: 'Elena Vargas', rol: 'Docente', email: 'elena.vargas@upc.edu.pe' },
      { tipo: 'dataCard', titulo: 'Datos institucionales', rows: [
        ['Código UPC', 'D202645678'],
        ['Sede', 'Monterrico'],
        ['Rol', 'Docente']
      ] },
      { tipo: 'dataCard', titulo: 'Preferencias', rows: [
        ['Notificaciones S.O.S.', 'Activadas'],
        ['Aula detectada', 'Automática']
      ] },
      { tipo: 'dataCard', titulo: 'Seguridad y cuenta', rows: [
        ['Cambiar contraseña', '›'],
        ['Privacidad de datos', '›']
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Cerrar sesión', modal: 'modal-cerrar-sesion', variante: 'peligro' }
      ] }
    ],
    acciones: [abrir('Component / Button / Destructive / Logout', 'modal-cerrar-sesion')]
  }),

  pantalla({
    id: 'perfil-soporte',
    figmaId: 'inferred:perfil-soporte',
    nombre: 'Perfil / Soporte',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Perfil', volver: 'dashboard-soporte' },
    tabbar: tabSoportePerfil,
    blocks: [
      { tipo: 'profile', initials: 'RT', nombre: 'Ricardo Torres', rol: 'Soporte audiovisual', email: 'ricardo.torres@upc.edu.pe' },
      { tipo: 'dataCard', titulo: 'Datos institucionales', rows: [
        ['Código interno', 'SOP-2048'],
        ['Sede', 'Monterrico'],
        ['Área', 'Soporte audiovisual']
      ] },
      { tipo: 'metrics', items: [
        ['6', 'Tickets resueltos'],
        ['11m', 'Promedio'],
        ['2', 'Prioritarios']
      ] },
      { tipo: 'dataCard', titulo: 'Seguridad y cuenta', rows: [
        ['Cambiar contraseña', '›'],
        ['Privacidad de datos', '›']
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Cerrar sesión', modal: 'modal-cerrar-sesion', variante: 'peligro' }
      ] }
    ],
    acciones: [abrir('Component / Button / Destructive / Logout', 'modal-cerrar-sesion')]
  }),

  pantalla({
    id: 'dashboard-docente',
    figmaId: '33:875',
    nombre: 'Dashboard Docente',
    usuario: 'docente',
    header: {
      tipo: 'rojo',
      compacto: true,
      label: 'CampusLink',
      titulo: 'Hola, Elena',
      icono: 'u',
      notificaciones: 'notificaciones'
    },
    tabbar: tabEstudianteInicio,
    blocks: [
      { tipo: 'pill', texto: 'Horario detectado automáticamente' },
      { tipo: 'title', texto: 'Clase actual: Cálculo Aplicado', centro: true },
      { tipo: 'text', texto: 'Aula B-301 · Sede Monterrico', centro: true, chico: true },
      { tipo: 'spacer', size: 32 },
      { tipo: 'sos', texto: 'S.O.S. Aula', docente: true, to: 'confirmacion-datos' },
      { tipo: 'spacer', size: 32 },
      { tipo: 'card', titulo: 'Reportar falla normal', texto: 'Mediante código QR del aula', icono: 'qr', to: 'escaner-qr' },
      { tipo: 'gridCards', items: [
        { titulo: 'Mis reportes', icono: 'doc', to: 'mis-reportes-activos' },
        { titulo: 'Mapa campus', icono: 'map', to: 'ubicacion-manual' }
      ] }
    ],
    acciones: [
      ir('Component / Button / Icon / Notifications', 'notificaciones'),
      ir('Component / Button / Critical / Classroom SOS', 'confirmacion-datos'),
      ir('Component / Tab Bar / Item / Report Center', 'escaner-qr')
    ]
  }),
  pantalla({
    id: 'confirmacion-datos',
    figmaId: '33:986',
    nombre: 'Confirmacion de datos',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Confirmar aula', volver: 'dashboard-docente' },
    tabbar: tabEstudianteInicio,
    blocks: [
      { tipo: 'text', texto: 'Detectamos tu clase actual según tu horario académico.' },
      { tipo: 'dataCard', rows: [
        ['Sede', 'Monterrico'],
        ['Pabellón', 'B'],
        ['Aula', 'B-301'],
        ['Clase', 'Cálculo Aplicado']
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Usar esta ubicación', to: 'selector-problema', variante: 'primario' },
        { texto: 'Cambiar ubicación', to: 'escaner-qr', variante: 'secundario' }
      ] }
    ],
    acciones: [ir('Component / Button / Primary / Use This Location', 'selector-problema'), ir('Component / Button / Secondary / Change Location', 'escaner-qr')]
  }),
  pantalla({
    id: 'selector-problema',
    figmaId: '33:1139',
    nombre: 'Selector rapido de problema',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: '¿Qué problema ocurre?', volver: 'confirmacion-datos' },
    blocks: [
      { tipo: 'text', texto: 'Selecciona una opción para enviar la alerta inmediata.' },
      { tipo: 'categoryGrid', items: [
        { texto: 'Proyector', modal: 'modal-confirm-send-sos' },
        { texto: 'PC del aula', modal: 'modal-confirm-send-sos' },
        { texto: 'Audio', modal: 'modal-confirm-send-sos' },
        { texto: 'Internet', modal: 'modal-confirm-send-sos' }
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Otro problema', to: 'registrar-reporte', variante: 'texto' }
      ] },
      { tipo: 'text', texto: 'No se solicitará foto para priorizar la velocidad de atención.', centro: true, chico: true }
    ],
    acciones: [abrir('Component / Card / Option / Projector', 'modal-confirm-send-sos')]
  }),
  pantalla({
    id: 'selector-problema-error',
    figmaId: '1021:61',
    nombre: 'Selector rápido de problema — Simulación error S.O.S.',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: '¿Qué problema ocurre?', volver: 'confirmacion-datos' },
    blocks: [
      { tipo: 'text', texto: 'Selecciona una opción para enviar la alerta inmediata.' },
      { tipo: 'categoryGrid', items: [
        { texto: 'Proyector', modal: 'modal-confirm-send-sos-error' },
        { texto: 'PC del aula', modal: 'modal-confirm-send-sos-error' },
        { texto: 'Audio', modal: 'modal-confirm-send-sos-error' },
        { texto: 'Internet', modal: 'modal-confirm-send-sos-error' }
      ] }
    ],
    acciones: [abrir('Component / Card / Option / Projector', 'modal-confirm-send-sos-error')]
  }),
  pantalla({
    id: 'confirmacion-alerta',
    figmaId: '33:1201',
    nombre: 'Confirmacion de alerta',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Alerta crítica', volver: 'dashboard-docente' },
    tabbar: tabEstudianteInicio,
    blocks: [
      { tipo: 'successInline', titulo: 'Alerta crítica enviada', texto: 'El equipo de soporte fue notificado con prioridad máxima.', badge: 'Prioridad máxima' },
      { tipo: 'dataCard', rows: [
        ['SLA', '< 5 min'],
        ['Ubicación', 'Aula B-301 · Pabellón B'],
        ['Problema reportado', 'Proyector']
      ] },
      { tipo: 'text', texto: 'Buscando técnico disponible...', centro: true },
      { tipo: 'buttonGroup', items: [
        { texto: 'Ver Seguimiento', to: 'estado-soporte', variante: 'primario' },
        { texto: 'Cancelar alarma', modal: 'modal-confirm-cancel-sos', variante: 'peligro' }
      ] }
    ],
    acciones: [ir('Component / Button / Critical / Simulate Technician Assigned', 'estado-soporte'), abrir('Component / Button / Destructive / Cancel Alarm', 'modal-confirm-cancel-sos')]
  }),
  pantalla({
    id: 'estado-soporte',
    figmaId: '33:1309',
    nombre: 'Estado de soporte',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Soporte en camino', volver: 'confirmacion-alerta' },
    tabbar: tabEstudianteInicio,
    blocks: [
      { tipo: 'profile', initials: 'CM', nombre: 'Carlos Méndez', rol: 'Soporte audiovisual', email: 'En camino al aula' },
      { tipo: 'dataCard', rows: [['Tiempo estimado', '4 min']] },
      { tipo: 'timeline', items: [
        ['Alerta enviada', '10:42 AM', '', true],
        ['Técnico asignado', '10:43 AM', '', true],
        ['En camino', 'Acercándose al Pabellón B', '', true],
        ['Llegó al aula', '', '', false]
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Confirmar llegada del técnico', to: 'llegada-soporte', variante: 'primario' },
        { texto: 'Cancelar alarma', modal: 'modal-confirm-cancel-sos', variante: 'peligro' }
      ] }
    ],
    acciones: [ir('Component / Button / Critical / Confirm Technician Arrival', 'llegada-soporte')]
  }),
  pantalla({
    id: 'llegada-soporte',
    figmaId: '33:1385',
    nombre: 'Confirmacion de llegada de soporte',
    usuario: 'docente',
    template: 'success',
    success: {
      titulo: 'Técnico en puerta',
      texto: 'Carlos Méndez llegó al aula B-301.',
      nota: 'Estado: Atendiendo en aula',
      botones: [{ texto: 'Continuar atención', to: 'confirmar-solucion', variante: 'primario' }]
    },
    acciones: [ir('Component / Button / Critical / Continue Attention', 'confirmar-solucion')]
  }),
  pantalla({
    id: 'confirmar-solucion',
    figmaId: '33:1409',
    nombre: 'Confirmar solucion',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Validar solución', volver: 'estado-soporte' },
    blocks: [
      { tipo: 'text', texto: 'El técnico marcó la incidencia como resuelta.' },
      { tipo: 'dataCard', titulo: 'Resumen', rows: [
        ['Problema', 'Proyector'],
        ['Aula', 'B-301'],
        ['Tiempo de atención', '6 min']
      ] },
      { tipo: 'title', texto: '¿El problema fue solucionado?', centro: true },
      { tipo: 'buttonGroup', items: [
        { texto: 'Confirmar solución', to: 'calificacion-atencion', variante: 'primario' },
        { texto: 'No resuelto', modal: 'modal-confirm-reopen-ticket', variante: 'peligro' }
      ] }
    ],
    acciones: [ir('Component / Button / Primary / Confirm Solution', 'calificacion-atencion'), abrir('Component / Button / Destructive / Not Resolved', 'modal-confirm-reopen-ticket')]
  }),
  pantalla({
    id: 'calificacion-atencion',
    figmaId: '33:1462',
    nombre: 'Calificacion de atencion',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Califica la atención', volver: 'confirmar-solucion' },
    blocks: [
      { tipo: 'text', texto: 'Tu respuesta ayuda a mejorar el servicio de soporte de CampusLink.', centro: true },
      { tipo: 'rating', to: 'calificacion-atencion-seleccionada' },
      { tipo: 'inputs', fields: [['Comentario opcional', '']] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Enviar calificación', to: 'alerta-terminada', variante: 'primario' },
        { texto: 'Omitir', to: 'alerta-terminada', variante: 'secundario' }
      ] }
    ],
    acciones: [ir('Component / Rating / Stars / Support Rating', 'calificacion-atencion-seleccionada'), ir('Component / Button / Secondary / Skip Rating', 'alerta-terminada')]
  }),
  pantalla({
    id: 'calificacion-atencion-seleccionada',
    figmaId: '33:1500',
    nombre: 'Optimizar diseño para iOS',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Califica la atención', volver: 'confirmar-solucion' },
    blocks: [
      { tipo: 'text', texto: 'Tu respuesta ayuda a mejorar el servicio de soporte de CampusLink.', centro: true },
      { tipo: 'rating', selected: true, to: 'calificacion-atencion-seleccionada' },
      { tipo: 'inputs', fields: [['Comentario opcional', '']] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Enviar calificación', to: 'alerta-terminada', variante: 'primario' },
        { texto: 'Omitir', to: 'alerta-terminada', variante: 'secundario' }
      ] }
    ],
    acciones: [ir('Component / Button / Primary / Submit Rating', 'alerta-terminada')]
  }),
  pantalla({
    id: 'alerta-terminada',
    figmaId: '33:1538',
    nombre: 'Alerta terminada',
    usuario: 'docente',
    template: 'success',
    success: {
      titulo: 'Estado del Ticket',
      texto: 'El ticket de emergencia fue cerrado correctamente.',
      rows: [['ID del ticket', 'SOS-20260512-0007'], ['Estado', 'Resuelto']],
      botones: [
        { texto: 'Volver al inicio', to: 'dashboard-docente-final', variante: 'primario' },
        { texto: 'Ver historial', to: 'mis-reportes-resueltos', variante: 'secundario' }
      ]
    },
    acciones: [ir('Component / Button / Primary / Back Home', 'dashboard-docente-final')]
  }),
  pantalla({
    id: 'dashboard-docente-final',
    figmaId: '33:1567',
    nombre: 'Optimizar diseño para iOS',
    usuario: 'docente',
    header: {
      tipo: 'rojo',
      compacto: true,
      label: 'CampusLink',
      titulo: 'Hola, Elena',
      icono: 'u',
      notificaciones: 'notificaciones'
    },
    tabbar: tabEstudianteInicio,
    blocks: [
      { tipo: 'alertBanner', titulo: 'Atención S.O.S. finalizada', texto: 'Ticket SOS-20260512-0007 resuelto', to: 'notificaciones' },
      { tipo: 'pill', texto: 'Horario detectado automáticamente' },
      { tipo: 'title', texto: 'Clase actual: Cálculo Aplicado', centro: true },
      { tipo: 'text', texto: 'Aula B-301 · Sede Monterrico', centro: true, chico: true },
      { tipo: 'sos', texto: 'S.O.S. Aula', docente: true, to: 'confirmacion-datos' },
      { tipo: 'card', titulo: 'Reportar falla normal', texto: 'Mediante código QR del aula', icono: 'qr', to: 'escaner-qr' }
    ],
    acciones: [ir('Component / Banner / Success / SOS Finished', 'notificaciones')]
  }),
  pantalla({
    id: 'alarma-cancelada',
    figmaId: '1021:37',
    nombre: 'Alarma cancelada',
    usuario: 'docente',
    template: 'success',
    success: {
      titulo: 'Alarma cancelada',
      texto: 'La solicitud S.O.S. fue anulada correctamente.',
      botones: [{ texto: 'Volver al inicio', to: 'dashboard-docente', variante: 'primario' }]
    },
    acciones: [ir('Component / Button / Primary / Back Home', 'dashboard-docente')]
  }),
  pantalla({
    id: 'reabrir-ticket',
    figmaId: '1114:16',
    nombre: 'Reabrir ticket',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Reabrir ticket', volver: 'confirmar-solucion' },
    blocks: [
      { tipo: 'text', texto: 'Describe por qué el problema continúa.' },
      { tipo: 'dataCard', titulo: 'Resumen', rows: detalleTicket },
      { tipo: 'inputs', fields: [['Motivo de reapertura', '']] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Enviar reapertura', to: 'reabrir-ticket-required', variante: 'primario' },
        { texto: 'Cancelar', to: 'confirmar-solucion', variante: 'secundario' }
      ] }
    ],
    acciones: [ir('Component / Button / Primary / Submit Reopen', 'reabrir-ticket-required')]
  }),
  pantalla({
    id: 'reabrir-ticket-required',
    figmaId: '1120:86',
    nombre: 'Reabrir ticket — Motivo requerido',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Reabrir ticket', volver: 'confirmar-solucion' },
    blocks: [
      { tipo: 'text', texto: 'Describe por qué el problema continúa.' },
      { tipo: 'dataCard', titulo: 'Resumen', rows: detalleTicket },
      { tipo: 'inputs', fields: [['Motivo de reapertura', 'Describe el motivo para reabrir el ticket.']] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Enviar reapertura', to: 'ticket-reabierto', variante: 'primario' },
        { texto: 'Cancelar', to: 'confirmar-solucion', variante: 'secundario' }
      ] }
    ],
    acciones: [ir('Component / Button / Primary / Submit Reopen', 'ticket-reabierto')]
  }),
  pantalla({
    id: 'reabrir-ticket-error',
    figmaId: '1120:144',
    nombre: 'Reabrir ticket — Simulación error',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Reabrir ticket', volver: 'confirmar-solucion' },
    blocks: [
      { tipo: 'text', texto: 'Describe por qué el problema continúa.' },
      { tipo: 'dataCard', titulo: 'Resumen', rows: detalleTicket },
      { tipo: 'inputs', fields: [['Motivo de reapertura', 'El proyector volvió a fallar después de la atención.']] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Enviar reapertura', modal: 'modal-reopen-ticket-error', variante: 'primario' },
        { texto: 'Cancelar', to: 'confirmar-solucion', variante: 'secundario' }
      ] }
    ],
    acciones: [abrir('Component / Button / Primary / Submit Reopen', 'modal-reopen-ticket-error')]
  }),
  pantalla({
    id: 'ticket-reabierto',
    figmaId: '1114:71',
    nombre: 'Ticket reabierto',
    usuario: 'docente',
    template: 'success',
    success: {
      titulo: 'Ticket reabierto',
      texto: 'El equipo de soporte revisará nuevamente la incidencia.',
      rows: [['SOS-20260512-0007', 'Reabierto']],
      botones: [
        { texto: 'Ver seguimiento', to: 'detalle-ticket-reabierto', variante: 'primario' },
        { texto: 'Volver a Mis reportes', to: 'mis-reportes-activos', variante: 'secundario' }
      ]
    },
    acciones: [ir('Component / Button / Primary / View Tracking', 'detalle-ticket-reabierto')]
  }),
  pantalla({
    id: 'detalle-ticket-reabierto',
    figmaId: '1120:2',
    nombre: 'Detalle del ticket reabierto',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Detalle del ticket', volver: 'ticket-reabierto' },
    blocks: [
      { tipo: 'dataCard', badge: 'Reabierto', rows: [['SOS-20260512-0007', 'Reabierto hoy']] },
      { tipo: 'timeline', items: [
        ['Recibido', '10:30 AM', '', true],
        ['Atendido / Resuelto', '', '', true],
        ['Reabierto / En revisión', '', '', true],
        ['Resuelto', '', '', false]
      ] },
      { tipo: 'dataCard', titulo: 'Detalles', rows: [
        ['Ubicación', 'Aula B-301'],
        ['Problema', 'Proyector'],
        ['Motivo de reapertura', 'El proyector volvió a fallar después de la atención.'],
        ['Estado actual', 'El equipo de soporte revisará nuevamente la incidencia.']
      ] },
      { tipo: 'buttonGroup', items: [{ texto: 'Volver a Mis reportes', to: 'mis-reportes-activos', variante: 'secundario' }] }
    ],
    acciones: [ir('Component / Button / Primary / Back To My Reports', 'mis-reportes-activos')]
  }),

  pantalla({
    id: 'dashboard-soporte',
    figmaId: '38:2635',
    nombre: 'Dashboard Soporte',
    usuario: 'soporte',
    fondo: '#FEE2E2',
    header: { tipo: 'claro', titulo: 'Dashboard' },
    tabbar: tabSoporteInicio,
    blocks: [
      { tipo: 'title', texto: 'Hola, Ricardo' },
      { tipo: 'text', texto: 'Estas son tus incidencias asignadas para hoy.' },
      { tipo: 'metrics', items: [
        ['4', 'Pendientes'],
        ['2', 'En atención', true],
        ['6', 'Resueltas hoy', false, 'verde']
      ] },
      { tipo: 'card', titulo: 'Nueva alerta prioritaria', texto: 'Aula B-301 · Proyector', icono: '!', danger: true, badge: 'Prioritario', link: 'Ver detalle →', to: 'alerta-sos' },
      { tipo: 'title', texto: 'Accesos rápidos' },
      { tipo: 'gridCards', items: [
        { titulo: 'Ver incidencias', icono: 'list', to: 'lista-tickets' },
        { titulo: 'Ver mapa', icono: 'map', to: 'mapa-operativo' }
      ] },
      { tipo: 'card', titulo: 'Mi productividad', icono: 'bars', to: 'productividad-diaria' }
    ],
    acciones: [
      ir('Component / Card / Alert / Priority Ticket', 'alerta-sos'),
      ir('Component / Card / Action / View Incidents', 'lista-tickets'),
      ir('Component / Card / Action / View Map', 'mapa-operativo'),
      ir('Component / Card / Action / My Productivity', 'productividad-diaria')
    ]
  }),
  pantalla({
    id: 'alerta-sos',
    figmaId: '38:2738',
    nombre: 'Alerta SOS',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Alerta Prioritaria', volver: 'dashboard-soporte' },
    blocks: [
      { tipo: 'successInline', titulo: 'Nueva incidencia prioritaria', texto: 'Atender en menos de 5 min', badge: 'Prioritario', danger: true },
      { tipo: 'dataCard', rows: [
        ['Ticket', 'SOS-20260512-0007'],
        ['Ubicación', 'Aula B-301 · Pabellón B'],
        ['Problema', 'Proyector']
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Ver ficha técnica', to: 'ficha-tecnica', variante: 'primario' },
        { texto: 'Ir al mapa', to: 'mapa-operativo-seleccion', variante: 'secundario' }
      ] }
    ],
    acciones: [ir('Component / Button / Critical / View Technical Sheet', 'ficha-tecnica'), ir('Component / Button / Secondary / Go To Map', 'mapa-operativo-seleccion')]
  }),
  pantalla({
    id: 'ficha-tecnica',
    figmaId: '38:2795',
    nombre: 'Ficha tecnica',
    usuario: 'soporte',
    fondo: '#FEE2E2',
    header: { tipo: 'claro', titulo: 'Ficha técnica', volver: 'alerta-sos' },
    blocks: [
      { tipo: 'dataCard', badge: 'Prioritario', rows: [['SOS-20260512-0007', '']] },
      { tipo: 'dataCard', titulo: 'Ubicación', rows: [
        ['Sede', 'Monterrico'],
        ['Pabellón', 'B'],
        ['Aula', 'B-301']
      ] },
      { tipo: 'dataCard', titulo: 'Detalle', rows: [
        ['Problema', 'Proyector'],
        ['Reportado por', 'Docente'],
        ['Fecha y hora', 'Hoy, 10:30 AM'],
        ['Estado', 'Asignado']
      ] },
      { tipo: 'upload', texto: 'imagen del incidente' },
      { tipo: 'buttonGroup', items: [
        { texto: 'Iniciar atención', modal: 'modal-confirm-start-attention', variante: 'primario' },
        { texto: 'Pausar por insumos', modal: 'modal-confirm-pause-ticket', variante: 'secundario' }
      ] }
    ],
    acciones: [abrir('Component / Button / Critical / Start Attention', 'modal-confirm-start-attention'), abrir('Component / Button / Secondary / Pause For Supplies', 'modal-confirm-pause-ticket')]
  }),
  pantalla({
    id: 'iniciar-atencion',
    figmaId: '39:2877',
    nombre: 'Iniciar Atencion',
    usuario: 'soporte',
    template: 'success',
    success: {
      titulo: 'Atención iniciada',
      texto: 'El ticket fue marcado como En atención',
      rows: [
        ['Estado', 'En atención'],
        ['Ticket', 'SOS-20260512-0007'],
        ['Ubicación', 'Aula B-301'],
        ['Problema', 'Proyector']
      ],
      botones: [
        { texto: 'Registrar solución', to: 'cerrar-ticket', variante: 'primario' },
        { texto: 'Pausar por insumos', modal: 'modal-confirm-pause-ticket', variante: 'secundario' }
      ]
    },
    acciones: [ir('Component / Button / Primary / Register Solution', 'cerrar-ticket')]
  }),
  pantalla({
    id: 'cerrar-ticket',
    figmaId: '39:2956',
    nombre: 'Cerrar ticket',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Cerrar ticket', volver: 'iniciar-atencion' },
    blocks: [
      { tipo: 'dataCard', titulo: 'Ticket a cerrar', rows: detalleTicket },
      { tipo: 'upload', texto: 'Adjuntar foto', to: 'cerrar-ticket-foto' },
      { tipo: 'inputs', fields: [['Descripción de solución aplicada', 'Ej. Se reconectó el cable de alimentación...']] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Notificar al usuario reportante', to: 'cerrar-ticket-opcion', variante: 'secundario' },
        { texto: 'Cerrar ticket', disabled: true, variante: 'primario' }
      ] }
    ],
    acciones: [ir('Component / Upload Area / Evidence / Add Final Photo', 'cerrar-ticket-foto'), ir('Component / Checkbox / Notification / Notify Reporter Unchecked', 'cerrar-ticket-opcion')]
  }),
  pantalla({
    id: 'cerrar-ticket-opcion',
    figmaId: '39:2908',
    nombre: 'Cerrar ticker opcion seleccionada',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Cerrar ticket', volver: 'cerrar-ticket' },
    blocks: [
      { tipo: 'dataCard', titulo: 'Ticket a cerrar', rows: detalleTicket },
      { tipo: 'upload', texto: 'Adjuntar foto', to: 'cerrar-ticket-foto' },
      { tipo: 'inputs', fields: [['Descripción de solución aplicada', 'Ej. Se reconectó el cable de alimentación...']] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Notificar al usuario reportante', variante: 'secundario' },
        { texto: 'Cerrar ticket', disabled: true, variante: 'primario' }
      ] }
    ],
    acciones: [ir('Component / Upload Area / Evidence / Add Final Photo', 'cerrar-ticket-foto')]
  }),
  pantalla({
    id: 'cerrar-ticket-foto',
    figmaId: '39:3001',
    nombre: 'Cerrar ticker foto adjuntada',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Cerrar ticket', volver: 'cerrar-ticket-opcion' },
    blocks: [
      { tipo: 'dataCard', titulo: 'Ticket a cerrar', rows: detalleTicket },
      { tipo: 'upload', texto: 'Foto final.jpg', to: 'cerrar-ticket-opcion' },
      { tipo: 'inputs', fields: [['Descripción de solución aplicada', 'Ej. Se reconectó el cable de alimentación...']] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Cerrar ticket', to: 'cierre-ticket-completo', variante: 'primario' }
      ] }
    ],
    acciones: [ir('Component / Button / Primary / Close Ticket', 'cierre-ticket-completo')]
  }),
  pantalla({
    id: 'cierre-ticket-completo',
    figmaId: '39:3050',
    nombre: 'Cierre de ticket formulario completo',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Cerrar ticket', volver: 'cerrar-ticket-foto' },
    blocks: [
      { tipo: 'dataCard', titulo: 'Ticket a cerrar', rows: detalleTicket },
      { tipo: 'upload', texto: 'Foto final.jpg' },
      { tipo: 'inputs', fields: [['Descripción de solución aplicada', 'Se reconectó el cable de alimentación y se validó el proyector.']] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Cerrar ticket', modal: 'modal-confirm-close-ticket', variante: 'primario' }
      ] }
    ],
    acciones: [abrir('Component / Button / Primary / Close Ticket', 'modal-confirm-close-ticket')]
  }),
  pantalla({
    id: 'cierre-ticket-error-sim',
    figmaId: '1074:24',
    nombre: 'Cierre de ticket — Simulación error',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Cerrar ticket', volver: 'cerrar-ticket-foto' },
    blocks: [
      { tipo: 'dataCard', titulo: 'Ticket a cerrar', rows: detalleTicket },
      { tipo: 'upload', texto: 'Foto final.jpg' },
      { tipo: 'inputs', fields: [['Descripción de solución aplicada', 'Se reconectó el cable de alimentación y se validó el proyector.']] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Cerrar ticket', modal: 'modal-confirm-close-ticket-error-sim', variante: 'primario' }
      ] }
    ],
    acciones: [abrir('Component / Button / Primary / Close Ticket', 'modal-confirm-close-ticket-error-sim')]
  }),
  pantalla({
    id: 'ticket-resuelto',
    figmaId: '39:3099',
    nombre: 'Ticket resuelto',
    usuario: 'soporte',
    template: 'success',
    success: {
      titulo: 'Ticket resuelto',
      texto: 'La incidencia fue cerrada correctamente.',
      rows: [['SOS-20260512-0007', 'Resuelto'], ['Estado', 'Completado']],
      nota: 'Se notificó al usuario reportante.',
      botones: [
        { texto: 'Volver al dashboard', to: 'dashboard-soporte', variante: 'primario' },
        { texto: 'Ver productividad', to: 'productividad-diaria', variante: 'secundario' }
      ]
    },
    acciones: [ir('Component / Button / Primary / Back To Dashboard', 'dashboard-soporte')]
  }),
  pantalla({
    id: 'lista-tickets',
    figmaId: '39:3228',
    nombre: 'Lista de Tickets',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Lista de Tickets', volver: 'dashboard-soporte' },
    tabbar: tabSoporteTickets,
    blocks: [
      { tipo: 'segmented', active: 'Todas', items: [
        { texto: 'Todas' },
        { texto: 'Prioritarias' },
        { texto: 'Asignadas' }
      ] },
      { tipo: 'segmented', active: 'En atención', items: [
        { texto: 'En atención' },
        { texto: 'Resueltas' },
        { texto: 'Todas' }
      ] },
      { tipo: 'inputs', fields: [['Buscar', 'Buscar por ID, ubicación...']] },
      { tipo: 'reportCards', items: [
        { id: 'SOS-20260512-0007', estado: 'Prioritario', categoria: 'Proyector', lugar: 'Aula B-301 · Estado: Asignado', to: 'ficha-tecnica' },
        { id: 'TCK-20260512-0010', estado: 'Normal', categoria: 'Internet', lugar: 'Biblioteca' },
        { id: 'TCK-20260511-0004', estado: 'Asignado', categoria: 'Mobiliario', lugar: 'Aula C-204' }
      ] }
    ],
    acciones: [ir('Component / Tab Bar / Item / Home Inactive', 'dashboard-soporte'), ir('Component / Tab Bar / Item / Map Inactive', 'mapa-operativo')]
  }),
  pantalla({
    id: 'registrar-insumo',
    figmaId: '1079:14',
    nombre: 'Registrar insumo requerido',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Registrar insumo', volver: 'iniciar-atencion' },
    blocks: [
      { tipo: 'dataCard', titulo: 'Ticket', rows: detalleTicket },
      { tipo: 'inputs', fields: [
        ['Insumo requerido', 'Cable HDMI / adaptador'],
        ['Comentario opcional', 'Indica el insumo necesario para continuar la atención.']
      ] },
      { tipo: 'upload', texto: 'Adjuntar foto del insumo' },
      { tipo: 'buttonGroup', items: [
        { texto: 'Confirmar pausa', to: 'ticket-pausado', variante: 'primario' },
        { texto: 'Volver a atención', to: 'iniciar-atencion', variante: 'secundario' }
      ] }
    ],
    acciones: [ir('Component / Button / Primary / Confirm Pause', 'ticket-pausado')]
  }),
  pantalla({
    id: 'ticket-pausado',
    figmaId: '1079:35',
    nombre: 'Ticket pausado por insumos',
    usuario: 'soporte',
    template: 'success',
    success: {
      titulo: 'Ticket pausado',
      texto: 'El ticket fue pausado por falta de insumos. Se reanudará cuando el material requerido esté disponible.',
      rows: [['Estado', 'Pausado']],
      icono: 'Ⅱ',
      botones: [
        { texto: 'Volver al dashboard', to: 'dashboard-soporte', variante: 'primario' },
        { texto: 'Ver incidencias', to: 'lista-tickets', variante: 'secundario' }
      ]
    },
    acciones: [ir('Component / Button / Primary / Back To Dashboard', 'dashboard-soporte')]
  }),
  pantalla({
    id: 'mapa-operativo',
    figmaId: '39:3314',
    nombre: 'Mapa Operativo',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Mapa operativo', volver: 'dashboard-soporte' },
    tabbar: tabSoporteMapa,
    blocks: [
      { tipo: 'inputs', fields: [['Buscar ambiente', 'Buscar ambiente...']] },
      { tipo: 'map', selected: false },
      { tipo: 'legend', items: ['Prioritario', 'Asignado', 'En atención', 'Resuelto'] }
    ],
    acciones: [ir('Component / Map Marker / Status / Building B Priority', 'mapa-operativo-seleccion')]
  }),
  pantalla({
    id: 'mapa-operativo-seleccion',
    figmaId: '39:3397',
    nombre: 'Mapa Operativo con seleccion',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Mapa operativo', volver: 'mapa-operativo' },
    tabbar: tabSoporteMapa,
    blocks: [
      { tipo: 'inputs', fields: [['Buscar ambiente', 'Buscar ambiente...']] },
      { tipo: 'map', selected: true },
      { tipo: 'mapSheet', titulo: 'Proyector', texto: 'Aula B-301 · Pabellón B', badge: 'Prioritario', to: 'ficha-tecnica' }
    ],
    acciones: [ir('Component / Button / Critical / View Technical Sheet', 'ficha-tecnica')]
  }),
  pantalla({
    id: 'productividad-diaria',
    figmaId: '39:3480',
    nombre: 'Productividad diaria',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Mi productividad', volver: 'dashboard-soporte' },
    tabbar: tabSoportePerfil,
    blocks: [
      { tipo: 'title', texto: 'Resumen del día' },
      { tipo: 'text', texto: 'Buen trabajo, Ricardo' },
      { tipo: 'metrics', items: [
        ['6', 'Tickets resueltos hoy'],
        ['11m', 'Tiempo promedio'],
        ['2', 'Prioritarios atendidos']
      ] },
      { tipo: 'dataCard', titulo: 'Últimas atenciones resueltas', rows: [
        ['Proyector', 'SOS-20260512-0007 · Hace 10 min'],
        ['Silla rota', 'TCK-20260512-0005 · Hace 1 hora'],
        ['Tickets pausados', '1']
      ] }
    ],
    acciones: [ir('Component / Button / Navigation / Back', 'dashboard-soporte')]
  })
];

const modales = [
  modal({
    id: 'modal-qr-no-reconocido',
    figmaId: '1036:3',
    nombre: 'Overlay / Modal / QR Not Recognized',
    usuario: 'shared',
    titulo: 'Código QR no reconocido',
    texto: 'Intenta escanear nuevamente o ingresa la ubicación manualmente.',
    acciones: [
      ir('Ingresar ubicación manualmente', 'ubicacion-manual'),
      cerrar('Reintentar escaneo')
    ]
  }),
  modal({
    id: 'modal-send-report-error',
    figmaId: '995:13',
    nombre: 'Overlay / Modal / Send Report Error',
    usuario: 'shared',
    titulo: 'No se pudo enviar el reporte',
    texto: 'Revisa tu conexión e inténtalo nuevamente.',
    acciones: [
      ir('Salir', 'resumen-reporte-error'),
      ir('Reintentar envío', 'reporte-confirmado')
    ]
  }),
  modal({
    id: 'modal-confirm-send-report',
    figmaId: '995:2',
    nombre: 'Overlay / Modal / Confirm Send Report',
    usuario: 'shared',
    titulo: '¿Deseas enviar el reporte?',
    texto: 'El equipo de soporte recibirá la información de la incidencia.',
    acciones: [
      cerrar('Revisar nuevamente'),
      ir('Enviar reporte', 'reporte-confirmado')
    ]
  }),
  modal({
    id: 'modal-confirm-cancel-report',
    figmaId: '978:13',
    nombre: 'Overlay / Modal / Confirm Cancel Report',
    usuario: 'shared',
    titulo: '¿Descartar reporte?',
    texto: 'Si descartas este reporte, se perderá la información ingresada.',
    acciones: [
      cerrar('Mantener reporte'),
      ir('Sí, descartar reporte', 'reporte-descartado')
    ]
  }),
  modal({
    id: 'modal-cancelar-reporte',
    figmaId: '35:2248',
    nombre: 'Overlay / Modal / Cancelar reporte',
    usuario: 'shared',
    titulo: '¿Cancelar reporte?',
    texto: 'El ticket será retirado si aún no ha iniciado la atención.',
    acciones: [
      cerrar('Mantener reporte'),
      ir('Sí, cancelar reporte', 'confirmacion-reporte-cancelado')
    ]
  }),
  modal({
    id: 'modal-confirm-send-sos-estudiante',
    figmaId: 'inferred:modal-confirm-send-sos-estudiante',
    nombre: 'Overlay / Modal / Confirm Send SOS Estudiante',
    usuario: 'estudiante',
    titulo: '¿Enviar alerta S.O.S.?',
    texto: 'Soporte recibirá una alerta prioritaria asociada a tu ubicación actual.',
    acciones: [
      cerrar('Revisar'),
      ir('Enviar S.O.S.', 'sos-estudiante-enviada')
    ]
  }),
  modal({
    id: 'modal-confirm-reopen-ticket',
    figmaId: '1114:4',
    nombre: 'Overlay / Modal / Confirm Reopen Ticket',
    usuario: 'docente',
    titulo: '¿Reabrir ticket?',
    texto: 'El equipo de soporte revisará nuevamente la incidencia reportada.',
    acciones: [
      cerrar('Volver a validar'),
      ir('Reabrir ticket', 'reabrir-ticket')
    ]
  }),
  modal({
    id: 'modal-reopen-ticket-error',
    figmaId: '1120:198',
    nombre: 'Overlay / Modal / Reopen Ticket Error',
    usuario: 'docente',
    titulo: 'No se pudo reabrir el ticket',
    texto: 'Revisa tu conexión e inténtalo nuevamente.',
    acciones: [
      ir('Volver a editar', 'reabrir-ticket-error'),
      ir('Reintentar', 'ticket-reabierto')
    ]
  }),
  modal({
    id: 'modal-confirm-send-sos',
    figmaId: '1021:4',
    nombre: 'Overlay / Modal / Confirm Send SOS',
    usuario: 'docente',
    titulo: '¿Deseas enviar alerta S.O.S.?',
    texto: 'El personal de soporte recibirá una alerta prioritaria.',
    acciones: [
      cerrar('Revisar'),
      ir('Enviar S.O.S.', 'confirmacion-alerta')
    ]
  }),
  modal({
    id: 'modal-confirm-send-sos-error',
    figmaId: '1021:127',
    nombre: 'Overlay / Modal / Confirm Send SOS — Error Simulation',
    usuario: 'docente',
    titulo: '¿Deseas enviar alerta S.O.S.?',
    texto: 'El personal de soporte recibirá una alerta prioritaria.',
    acciones: [
      cerrar('Revisar'),
      ir('Enviar S.O.S.', 'modal-send-sos-error')
    ]
  }),
  modal({
    id: 'modal-send-sos-error',
    figmaId: '1021:26',
    nombre: 'Overlay / Modal / Send SOS Error',
    usuario: 'docente',
    titulo: 'No se pudo enviar la alerta',
    texto: 'Revisa tu conexión e inténtalo nuevamente.',
    acciones: [
      ir('Llamar a Central de Soporte', 'confirmacion-alerta'),
      ir('Reintentar', 'confirmacion-alerta')
    ]
  }),
  modal({
    id: 'modal-confirm-cancel-sos',
    figmaId: '1021:15',
    nombre: 'Overlay / Modal / Confirm Cancel SOS',
    usuario: 'docente',
    titulo: '¿Deseas cancelar la alarma?',
    texto: 'Si cancelas, el técnico asignado será liberado para atender otros casos.',
    acciones: [
      cerrar('Mantener alerta'),
      ir('Cancelar alarma', 'alarma-cancelada')
    ]
  }),
  modal({
    id: 'modal-confirm-close-ticket',
    figmaId: '1074:10',
    nombre: 'Overlay / Modal / Confirm Close Ticket',
    usuario: 'soporte',
    titulo: '¿Cerrar ticket?',
    texto: 'Se marcará la incidencia como resuelta.',
    acciones: [
      ir('Cerrar ticket', 'ticket-resuelto'),
      cerrar('Revisar solución')
    ]
  }),
  modal({
    id: 'modal-confirm-start-attention',
    figmaId: '1317:2',
    nombre: 'Overlay / Modal / Confirm Start Attention',
    usuario: 'soporte',
    titulo: '¿Iniciar atención?',
    texto: 'El ticket será marcado como “En atención” y el usuario reportante podrá ver el avance.',
    acciones: [
      cerrar('Revisar ficha'),
      ir('Iniciar atención', 'iniciar-atencion')
    ]
  }),
  modal({
    id: 'modal-close-ticket-error',
    figmaId: '1074:86',
    nombre: 'Overlay / Modal / Close Ticket Error',
    usuario: 'soporte',
    titulo: 'No se pudo cerrar el ticket',
    texto: 'Revisa tu conexión e inténtalo nuevamente. La información ingresada se mantendrá guardada.',
    acciones: [
      ir('Reintentar cierre', 'ticket-resuelto'),
      ir('Volver a revisar', 'cierre-ticket-error-sim')
    ]
  }),
  modal({
    id: 'modal-confirm-close-ticket-error-sim',
    figmaId: '1074:75',
    nombre: 'Overlay / Modal / Confirm Close Ticket — Error Simulation',
    usuario: 'soporte',
    titulo: '¿Cerrar ticket?',
    texto: 'Se marcará la incidencia como resuelta.',
    acciones: [
      ir('Cerrar ticket', 'modal-close-ticket-error'),
      cerrar('Revisar solución')
    ]
  }),
  modal({
    id: 'modal-confirm-pause-ticket',
    figmaId: '1079:3',
    nombre: 'Overlay / Modal / Confirm Pause Ticket',
    usuario: 'soporte',
    titulo: '¿Pausar ticket?',
    texto: 'El ticket quedará en espera hasta contar con el insumo requerido.',
    acciones: [
      ir('Pausar ticket', 'registrar-insumo'),
      cerrar('Mantener atención')
    ]
  }),
  modal({
    id: 'modal-cerrar-sesion',
    figmaId: 'inferred:modal-cerrar-sesion',
    nombre: 'Overlay / Modal / Cerrar sesion',
    usuario: 'shared',
    titulo: '¿Cerrar sesión?',
    texto: 'Volverás al inicio del prototipo y se limpiará el rol activo.',
    icono: 'logout',
    acciones: [
      cerrar('Mantener sesión'),
      logout('Cerrar sesión')
    ]
  })
];

export const VISTA_APP_PANTALLAS = pantallas.reduce(function (mapa, item) {
  mapa[item.id] = item;
  return mapa;
}, {});

export const VISTA_APP_MODALES = modales.reduce(function (mapa, item) {
  mapa[item.id] = item;
  return mapa;
}, {});
