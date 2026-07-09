import { goTo, openModal, screen, tabStudentHome, tabStudentMap, tabStudentReports, tabStudentProfile } from './factories.js';

export const studentScreens = [
  screen({
    id: 'student-dashboard',
    figmaId: '1233:2',
    nombre: 'Student Main Dashboard',
    usuario: 'estudiante',
    header: {
      tipo: 'rojo',
      label: 'CampusLink',
      titulo: 'Hello, Mateo',
      prompt: 'What do you need to do today?',
      icon: 'u',
      notifications: 'notifications'
    },
    tabbar: tabStudentHome,
    blocks: [
      { tipo: 'spacer', size: 8 },
      { tipo: 'card', titulo: 'Report Issue (QR)', texto: 'Scan a space code to report incidents.', icon: 'qr', accent: true, to: 'qr-scanner' },
      { tipo: 'gridCards', items: [
        { titulo: 'My reports', icon: 'doc', to: 'my-active-reports' },
        { titulo: 'Campus map', icon: 'map', to: 'campus-map' }
      ] },
      { tipo: 'spacer', size: 8 },
      { tipo: 'sos', texto: 'Classroom S.O.S.', modal: 'modal-confirm-send-sos-student', ayuda: 'modal-sos-help' }
    ],
    acciones: [goTo('Component / Card / Action / Report QR', 'qr-scanner'), goTo('Component / Tab Bar / Item / Report Center', 'qr-scanner')]
  }),
  screen({
    id: 'student-sos-sent',
    figmaId: 'inferred:student-sos-sent',
    nombre: 'S.O.S. student sent',
    usuario: 'estudiante',
    template: 'success',
    success: {
      tono: 'green',
      titulo: 'Alert sent',
      texto: 'Support received your priority alert and will review the indicated room.',
      resumen: { label: 'Ticket', id: 'SOS-20260512-0008', badge: 'Received' },
      nota: 'You can follow the progress from your active reports.',
      botones: [
        { texto: 'View tracking', to: 'report-details', variante: 'primario' },
        { texto: 'Back home', to: 'home', variante: 'secundario' }
      ]
    },
    tabbar: tabStudentHome,
    acciones: [goTo('Component / Button / Primary / View Tracking', 'report-details'), goTo('Component / Button / Secondary / Back Home', 'home')]
  }),
  screen({
    id: 'my-active-reports',
    figmaId: '1233:699',
    nombre: 'My Active Reports',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'My reports', volver: 'home' },
    tabbar: tabStudentReports,
    blocks: [
      { tipo: 'text', texto: 'Check the progress of the incidents you registered.' },
      { tipo: 'segmented', active: 'Active', items: [
        { texto: 'Active', to: 'my-active-reports' },
        { texto: 'Resolved', to: 'my-resolved-reports' },
        { texto: 'Canceled', to: 'my-canceled-reports' }
      ] },
      { tipo: 'reportCards', items: [
        { id: 'TCK-20260512-0001', estado: 'Pending', categoria: 'Multimedia', lugar: 'Room B-301 · Today, 10:30 AM', to: 'report-detail-pending' },
        { id: 'TCK-20260510-0008', estado: 'In progress', categoria: 'Furniture', lugar: 'Room C-204 · 2 days ago', to: 'report-detail-in-progress' },
        { id: 'TCK-20260508-0003', estado: 'In progress', categoria: 'Internet', lugar: 'Library · 4 days ago', to: 'report-detail-in-progress' }
      ] }
    ],
    acciones: [goTo('Card', 'report-detail-pending'), goTo('Card', 'report-detail-in-progress')]
  }),
  screen({
    id: 'my-resolved-reports',
    figmaId: '1233:817',
    nombre: 'My Resolved Reports',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'My reports', volver: 'home' },
    tabbar: tabStudentReports,
    blocks: [
      { tipo: 'text', texto: 'Check the progress of the incidents you registered.' },
      { tipo: 'segmented', active: 'Resolved', items: [
        { texto: 'Active', to: 'my-active-reports' },
        { texto: 'Resolved', to: 'my-resolved-reports' },
        { texto: 'Canceled', to: 'my-canceled-reports' }
      ] },
      { tipo: 'reportCards', items: [
        { id: 'TCK-20260501-0005', estado: 'Resolved', categoria: 'Cleaning', lugar: 'Building A restroom · 11 days ago' },
        { id: 'TCK-20260429-0002', estado: 'Resolved', categoria: 'Electrical', lugar: 'Room D-105 · 13 days ago' }
      ] }
    ],
    acciones: [goTo('Component / Segmented Control Item / Active Default', 'my-active-reports')]
  }),
  screen({
    id: 'my-canceled-reports',
    figmaId: '1233:917',
    nombre: 'My Canceled Reports',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'My reports', volver: 'home' },
    tabbar: tabStudentReports,
    blocks: [
      { tipo: 'text', texto: 'Check the progress of the incidents you registered.' },
      { tipo: 'segmented', active: 'Canceled', items: [
        { texto: 'Active', to: 'my-active-reports' },
        { texto: 'Resolved', to: 'my-resolved-reports' },
        { texto: 'Canceled', to: 'my-canceled-reports' }
      ] },
      { tipo: 'reportCards', items: [
        { id: 'TCK-20260512-0002', estado: 'Canceled', categoria: 'Multimedia', lugar: 'Room B-301 · Today, 10:15 AM' }
      ] }
    ],
    acciones: [goTo('Component / Segmented Control Item / Active Default', 'my-active-reports')]
  }),
  screen({
    id: 'report-detail-pending',
    figmaId: '1233:1001',
    nombre: 'Report Details',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Report detail', volver: 'my-active-reports' },
    blocks: [
      { tipo: 'ticketHeader', id: 'TCK-20260512-0001', badge: 'Pending', fecha: 'Today, 10:30 AM' },
      { tipo: 'timeline', items: [
        ['Received', '10:30 AM', 'Your report has been entered into the system and is queued for review.', true],
        ['In progress', '', '', false],
        ['Resolved', '', '', false]
      ] },
      { tipo: 'title', texto: 'Details' },
      { tipo: 'dataCard', rows: [
        ['Location', 'Monterrico · Building B · Room B-301'],
        ['Category', 'Multimedia'],
        ['Evidence', 'Evidence submitted'],
        ['Description', 'The classroom projector won\'t turn on and class has already started.']
      ] }
    ],
    cta: { items: [{ texto: 'Cancel report', modal: 'modal-cancel-report', variante: 'peligroSuave' }] },
    acciones: [openModal('Component / Button / Destructive / Cancel Report', 'modal-cancel-report')]
  }),
  screen({
    id: 'report-detail-in-progress',
    figmaId: '1233:1485',
    nombre: 'Report Detail In Progress',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Report detail', volver: 'my-active-reports' },
    blocks: [
      { tipo: 'ticketHeader', id: 'TCK-20260510-0008', badge: 'In progress', fecha: '2 days ago' },
      { tipo: 'timeline', items: [
        ['Received', '10:30 AM', 'Your report was received by the support team.', true],
        ['In progress', 'Today', 'A technician is handling the reported incident.', true, 'pulso'],
        ['Resolved', '', '', false]
      ] },
      { tipo: 'title', texto: 'Details' },
      { tipo: 'dataCard', rows: [
        ['Location', 'Room C-204'],
        ['Category', 'Furniture'],
        ['Evidence', 'Evidence not available'],
        ['Description', 'Furniture report in room C-204 currently being handled.']
      ] },
      { tipo: 'banda', tono: 'gris', texto: 'Cancellation is no longer available because service has started.' }
    ],
    acciones: [goTo('Component / Button / Navigation / Back', 'my-active-reports')]
  }),
  screen({
    id: 'report-canceled-confirmation',
    figmaId: '1233:1095',
    nombre: 'Report Canceled Confirmation',
    usuario: 'shared',
    template: 'success',
    success: {
      tono: 'softRed',
      icon: 'trash',
      titulo: 'Report canceled',
      texto: 'Ticket TCK-20260512-0001 was marked as canceled.',
      botones: [
        { texto: 'Back to My reports', to: 'my-canceled-reports', variante: 'primario' },
        { texto: 'Back home', to: 'home', variante: 'secundario' }
      ]
    },
    acciones: [goTo('Component / Button / Primary / Back To My Reports', 'my-canceled-reports')]
  }),
  screen({
    id: 'notifications',
    figmaId: '1233:1568',
    nombre: 'Notifications',
    usuario: 'shared',
    header: { tipo: 'claro', titulo: 'Notifications', volver: 'home' },
    tabbar: tabStudentHome,
    blocks: [
      { tipo: 'list', items: [
        { texto: 'Your ticket TCK-20260510-0008 is in progress.', hora: 'Today, 11:45 AM', icon: 'alert', tono: 'amber', nuevo: true },
        { texto: 'Your ticket TCK-20260501-0005 was resolved.', hora: 'Yesterday, 04:20 PM', icon: 'check', tono: 'green' },
        { texto: 'An update was registered on your multimedia report.', hora: '2 days ago', icon: 'bell', tono: 'blue' }
      ] }
    ],
    acciones: [goTo('Component / Tab Bar / Item / Report Center', 'qr-scanner')]
  }),
  screen({
    id: 'campus-map',
    figmaId: '1248:1785',
    nombre: 'Campus map',
    usuario: 'estudiante',
    header: { tipo: 'claro', titulo: 'Campus map', volver: 'home' },
    tabbar: tabStudentMap,
    blocks: [
      { tipo: 'inputs', fields: [['Search space', 'Search space...']] },
      { tipo: 'map', estatico: true, ubicar: true, leyenda: ['Priority', 'Assigned', 'Being handled', 'Resolved'] }
    ],
    acciones: [goTo('Component / Tab Bar / Item / Home', 'home')]
  }),
  screen({
    id: 'student-profile',
    figmaId: '1322:2182',
    nombre: 'Profile / Student',
    usuario: 'estudiante',
    header: { tipo: 'perfil', titulo: 'Profile', initials: 'MS', nombre: 'Mateo Salazar', rol: 'Student', email: 'u202612345@upc.edu.pe', accionDerecha: { texto: 'Edit' } },
    tabbar: tabStudentProfile,
    blocks: [
      { tipo: 'dataCard', titulo: 'Institutional data', rows: [
        ['UPC code', 'U202612345'],
        ['Campus', 'Monterrico'],
        ['Role', 'Student']
      ] },
      { tipo: 'settingsCard', titulo: 'Preferences', rows: [
        { insignia: 'N', etiqueta: 'Notifications', switch: 'prefNotificaciones' },
        { insignia: '@', etiqueta: 'Email updates', switch: 'prefCorreo' }
      ] },
      { tipo: 'settingsCard', titulo: 'Security and account', rows: [
        { insignia: '*', etiqueta: 'Change password', flecha: true },
        { insignia: 'P', etiqueta: 'Data privacy', flecha: true },
        { insignia: 'S', etiqueta: 'Log out', peligro: true, modal: 'modal-log-out' }
      ] }
    ],
    acciones: [goTo('Component / Tab Bar / Item / Report Center', 'qr-scanner')]
  }),
];
