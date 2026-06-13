import { ir, abrir, pantalla, headerBackReporte, tabEstudianteInicio } from './fabricas.js';

export const pantallasReporte = [
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
];
