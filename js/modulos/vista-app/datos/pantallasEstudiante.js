// vista-app/datos/pantallasEstudiante.js — flujo del estudiante y flujo de reporte compartido

import { ir, abrir, pantalla, headerBackReporte, tabEstudianteInicio, tabEstudianteReportes, tabEstudiantePerfil } from './fabricas.js';

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
          { texto: 'Simular QR válido', accion: 'escanear', variante: 'secundario', icono: 'scan' },
          { texto: 'Ingresar ubicación manualmente', to: 'ubicacion-manual', variante: 'texto', icono: 'teclado' }
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
        { etiqueta: 'Sede', valor: '{sede}', to: 'selector-sede', flecha: true },
        { etiqueta: 'Pabellón', valor: 'B', flecha: true },
        { etiqueta: 'Piso', valor: '3', flecha: true },
        { etiqueta: 'Aula', valor: 'B-301', flecha: true }
      ] },
      { tipo: 'banda', texto: 'Esta ubicación será enviada al equipo de soporte.' }
    ],
    cta: { items: [
      { texto: 'Continuar', to: 'registrar-reporte', variante: 'primario' }
    ] },
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
      { tipo: 'options', agrupado: true, campo: 'sede', to: 'ubicacion-manual', items: [
        { texto: 'Monterrico' },
        { texto: 'San Isidro' },
        { texto: 'Villa' }
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
    blocks: [
      { tipo: 'title', texto: 'Ubicación' },
      { tipo: 'locationCard', verificada: true, columnas: [
        ['Sede', '{sede}'],
        ['Pabellón', 'B'],
        ['Aula', 'B-301']
      ] },
      { tipo: 'title', texto: 'Categoría de falla' },
      { tipo: 'categoryGrid', campo: 'categoria', items: ['Mobiliario', 'Eléctrico', 'Multimedia', 'Limpieza', 'Internet', 'Otro'] },
      { tipo: 'title', texto: 'Evidencia' },
      { tipo: 'upload', campo: 'evidencia', texto: 'Agregar foto de evidencia', textoCargada: 'Imagen cargada correctamente' },
      { tipo: 'inputs', fields: [
        { etiqueta: 'Descripción breve', campo: 'descripcion', placeholder: 'Descripción', multilinea: true }
      ] }
    ],
    cta: { items: [
      { texto: 'Continuar', to: 'resumen-reporte', variante: 'primario' }
    ] },
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
    header: { tipo: 'claro', titulo: 'Revisa tu reporte', volver: 'registrar-reporte', accionDerecha: { texto: 'Cancelar', modal: 'modal-confirm-cancel-report' } },
    tabbar: tabEstudianteInicio,
    blocks: [
      { tipo: 'resumenCard', items: [
        { icono: 'pin', etiqueta: 'Ubicación', valor: '{ubicacion}' },
        { icono: 'alert', tono: 'rojo', etiqueta: 'Categoría', valor: '{categoria}' }
      ] },
      { tipo: 'resumenCard', items: [
        { icono: 'imagen', etiqueta: 'Evidencia fotográfica', imagen: true },
        { icono: 'chat', etiqueta: 'Descripción', valor: '{descripcion}' }
      ] },
      { tipo: 'banda', tono: 'gris', texto: 'El equipo de soporte recibirá la ubicación y evidencia para atender la incidencia.' }
    ],
    cta: { items: [
      { texto: 'Enviar reporte', modal: 'modal-confirm-send-report', variante: 'primario' },
      { texto: 'Editar', to: 'registrar-reporte', variante: 'secundario', atras: true }
    ] },
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
        ['Ubicación', '{ubicacion}'],
        ['Categoría', '{categoria}'],
        ['Descripción', '{descripcion}']
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
];
