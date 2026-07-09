import { goTo, openModal, screen, headerBackReport, tabStudentHome, tabStudentReport } from './factories.js';

export const reportScreens = [
  screen({
    id: 'qr-scanner',
    figmaId: '1233:180',
    nombre: 'QR Scanner',
    usuario: 'shared',
    fondo: '#000000',
    header: { tipo: 'oscuro', titulo: 'Scan the code', volver: 'home' },
    blocks: [
      { tipo: 'scanner', modal: 'modal-qr-not-recognized' },
      { tipo: 'bottomPanel', blocks: [
        { tipo: 'text', texto: 'Point at the QR code located in the affected classroom, lab, or space.', centro: true, chico: true, claro: true },
        { tipo: 'buttonGroup', items: [
          { texto: 'Simulate valid QR', accion: 'escanear', variante: 'secundario', icon: 'scan' },
          { texto: 'Enter location manually', to: 'manual-location', variante: 'texto', icon: 'keyboard' }
        ] }
      ] }
    ],
    acciones: [
      goTo('Component / Button / Navigation / Back', 'home'),
      openModal('Component / Scanner / QR / Active Area', 'modal-qr-not-recognized'),
      goTo('Component / Button / Text Action / Manual Location Entry', 'manual-location'),
      goTo('Component / Button / Secondary / Simulate Valid QR', 'register-report')
    ]
  }),
  screen({
    id: 'manual-location',
    figmaId: '1233:1268',
    nombre: 'Manual location',
    usuario: 'shared',
    header: headerBackReport,
    tabbar: tabStudentHome,
    blocks: [
      { tipo: 'text', texto: 'Select the space where the incident is happening.' },
      { tipo: 'dataCard', rows: [
        { etiqueta: 'Campus', valor: '{sede}', to: 'campus-selector', flecha: true },
        { etiqueta: 'Building', valor: 'B', flecha: true },
        { etiqueta: 'Floor', valor: '3', flecha: true },
        { etiqueta: 'Room', valor: 'B-301', flecha: true }
      ] },
      { tipo: 'banda', texto: 'This location will be sent to the support team.' }
    ],
    cta: { items: [
      { texto: 'Continue', to: 'register-report', variante: 'primario' }
    ] },
    acciones: [goTo('Component / Button / Primary / Continue', 'register-report'), goTo('Campus', 'campus-selector')]
  }),
  screen({
    id: 'campus-selector',
    figmaId: '1233:1422',
    nombre: 'Manual location — Campus Selector',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Select campus', volver: 'manual-location' },
    tabbar: tabStudentHome,
    blocks: [
      { tipo: 'text', texto: 'Choose the campus where the incident is happening.' },
      { tipo: 'options', agrupado: true, field: 'sede', to: 'manual-location', items: [
        { texto: 'Monterrico' },
        { texto: 'San Isidro' },
        { texto: 'Villa' }
      ] }
    ],
    acciones: [goTo('Component / Button / Navigation / Back', 'manual-location')]
  }),
  screen({
    id: 'register-report',
    figmaId: '1233:224',
    nombre: 'Register Report',
    usuario: 'shared',
    header: headerBackReport,
    blocks: [
      { tipo: 'title', texto: 'Location' },
      { tipo: 'locationCard', verificada: true, columnas: [
        ['Campus', '{sede}'],
        ['Building', 'B'],
        ['Room', 'B-301']
      ] },
      { tipo: 'title', texto: 'Issue category' },
      { tipo: 'categoryGrid', field: 'categoria', items: ['Furniture', 'Electrical', 'Multimedia', 'Cleaning', 'Internet', 'Other'] },
      { tipo: 'title', texto: 'Evidence' },
      { tipo: 'upload', field: 'evidencia', texto: 'Add evidence photo', textoCargada: 'Image uploaded successfully' },
      { tipo: 'inputs', fields: [
        { etiqueta: 'Short description', field: 'descripcion', placeholder: 'Description', multilinea: true }
      ] }
    ],
    cta: { items: [
      { texto: 'Continue', to: 'report-summary', variante: 'primario' }
    ] },
    acciones: [
      goTo('Component / Button / Primary / Continue Report', 'report-summary'),
      goTo('Component / Button / Navigation / Back', 'qr-scanner'),
      openModal('Component / Button / Text Action / Cancel Report', 'modal-confirm-cancel-report')
    ]
  }),
  screen({
    id: 'report-summary',
    figmaId: '1233:308',
    nombre: 'Report Summary',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Review your report', volver: 'register-report', accionDerecha: { texto: 'Cancel', modal: 'modal-confirm-cancel-report' } },
    tabbar: tabStudentReport,
    blocks: [
      { tipo: 'resumenCard', items: [
        { icon: 'pin', etiqueta: 'Location', valor: '{ubicacion}' },
        { icon: 'alert', tono: 'rojo', etiqueta: 'Category', valor: '{categoria}' }
      ] },
      { tipo: 'resumenCard', items: [
        { icon: 'image', etiqueta: 'Photo evidence', image: true },
        { icon: 'chat', etiqueta: 'Description', valor: '{descripcion}' }
      ] },
      { tipo: 'banda', tono: 'gris', texto: 'The support team will receive the location and evidence to handle the incident.' }
    ],
    cta: { items: [
      { texto: 'Send report', modal: 'modal-confirm-send-report', variante: 'primario' },
      { texto: 'Edit', to: 'register-report', variante: 'secundario', atras: true }
    ] },
    acciones: [
      openModal('Component / Button / Primary / Submit Report', 'modal-confirm-send-report'),
      goTo('Component / Button / Text Action / Edit Report', 'register-report'),
      openModal('Component / Button / Text Action / Cancel Report', 'modal-confirm-cancel-report')
    ]
  }),
  screen({
    id: 'report-summary-error',
    figmaId: '1233:1140',
    nombre: 'Report Summary — Send Error Simulation',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Review your report', volver: 'register-report' },
    tabbar: tabStudentHome,
    blocks: [
      { tipo: 'dataCard', rows: [
        ['Location', 'Monterrico · Building B · Room B-301'],
        ['Category', 'Cleaning'],
        ['Photo evidence', 'Image uploaded successfully'],
        ['Description', 'Soda was spilled in the classroom']
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Send report', modal: 'modal-send-report-error', variante: 'primario' },
        { texto: 'Edit', to: 'register-report', variante: 'secundario' },
        { texto: 'Cancel', modal: 'modal-confirm-cancel-report', variante: 'texto' }
      ] }
    ],
    acciones: [openModal('Component / Button / Primary / Submit Report', 'modal-send-report-error')]
  }),
  screen({
    id: 'report-confirmed',
    figmaId: '1233:424',
    nombre: 'Report confirmed',
    usuario: 'shared',
    template: 'success',
    success: {
      tono: 'green',
      titulo: 'Report sent',
      texto: 'Your incident was registered successfully.',
      resumen: { label: 'Ticket ID', id: 'TCK-20260512-0001', badge: 'Received' },
      nota: 'You will receive notifications when the status changes.',
      botones: [
        { texto: 'View tracking', to: 'report-details', variante: 'primario' },
        { texto: 'Back home', to: 'home', variante: 'secundario' }
      ]
    },
    tabbar: tabStudentReport,
    acciones: [goTo('Component / Button / Primary / View Tracking', 'report-details'), goTo('Component / Button / Secondary / Back Home', 'home')]
  }),
  screen({
    id: 'report-details',
    figmaId: '1233:503',
    nombre: 'Report Details',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Report detail', volver: 'report-confirmed' },
    blocks: [
      { tipo: 'dataCard', badge: 'Received', rows: [['TCK-20260512-0001', 'Today, 10:30 AM']] },
      { tipo: 'timeline', items: [
        ['Received', '10:30 AM', 'Your report has been entered into the system and is queued for review.', true],
        ['In progress', '', '', false],
        ['Resolved', '', '', false]
      ] },
      { tipo: 'title', texto: 'Details' },
      { tipo: 'dataCard', rows: [
        ['Location', '{ubicacion}'],
        ['Category', '{categoria}'],
        ['Description', '{descripcion}']
      ] },
      { tipo: 'buttonGroup', items: [{ texto: 'Back home', to: 'home', variante: 'secundario' }] }
    ],
    acciones: [goTo('Component / Button / Secondary / Back Home', 'home')]
  }),
  screen({
    id: 'report-discarded',
    figmaId: '1233:1117',
    nombre: 'Report discarded',
    usuario: 'shared',
    template: 'success',
    success: {
      tono: 'green',
      titulo: 'Report discarded',
      texto: 'Your report was not sent and the entered information was deleted.',
      botones: [{ texto: 'Back home', to: 'home', variante: 'primario' }]
    },
    acciones: [goTo('Component / Button / Primary / Back Home', 'home')]
  }),
];
