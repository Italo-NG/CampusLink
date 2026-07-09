import { goTo, openModal, screen, ticketDetail, tabStudentHome, tabStudentReport, tabStudentProfile } from './factories.js';

export const teacherScreens = [
  screen({
    id: 'teacher-profile',
    figmaId: '1322:4269',
    nombre: 'Profile / Teacher',
    usuario: 'docente',
    header: { tipo: 'perfil', titulo: 'Profile', initials: 'EV', nombre: 'Elena Vargas', rol: 'Teacher', email: 'elena.vargas@upc.edu.pe', accionDerecha: { texto: 'Edit' } },
    tabbar: tabStudentProfile,
    blocks: [
      { tipo: 'dataCard', titulo: 'Institutional data', rows: [
        ['UPC code', 'D202645678'],
        ['Campus', 'Monterrico'],
        ['Role', 'Teacher']
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
    acciones: [openModal('Component / Button / Destructive / Logout', 'modal-log-out')]
  }),
  screen({
    id: 'teacher-dashboard',
    figmaId: '1322:4531',
    nombre: 'Teacher dashboard',
    usuario: 'docente',
    header: {
      tipo: 'rojo',
      compacto: true,
      label: 'CampusLink',
      titulo: 'Hello, Elena',
      icon: 'u',
      notifications: 'notifications'
    },
    tabbar: tabStudentHome,
    blocks: [
      { tipo: 'spacer', size: 8 },
      { tipo: 'pill', texto: 'Schedule detected automatically' },
      { tipo: 'title', texto: 'Current class: Applied Calculus', centro: true },
      { tipo: 'text', texto: 'Room B-301 · Monterrico Campus', centro: true, chico: true },
      { tipo: 'spacer', size: 12 },
      { tipo: 'sos', texto: 'Classroom S.O.S.', docente: true, to: 'data-confirmation', ayuda: 'modal-sos-help' },
      { tipo: 'spacer', size: 12 },
      { tipo: 'card', titulo: 'Report a standard issue', texto: 'Via the classroom QR code', icon: 'qr', to: 'qr-scanner' },
      { tipo: 'gridCards', items: [
        { titulo: 'My reports', icon: 'doc', to: 'my-active-reports' },
        { titulo: 'Campus map', icon: 'map', to: 'manual-location' }
      ] }
    ],
    acciones: [
      goTo('Component / Button / Icon / Notifications', 'notifications'),
      goTo('Component / Button / Critical / Classroom SOS', 'data-confirmation'),
      goTo('Component / Tab Bar / Item / Report Center', 'qr-scanner')
    ]
  }),
  screen({
    id: 'data-confirmation',
    figmaId: '1322:4668',
    nombre: 'Data Confirmation',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Confirm classroom', volver: 'teacher-dashboard' },
    tabbar: tabStudentHome,
    blocks: [
      { tipo: 'text', texto: 'We detected your current class from your academic schedule.' },
      { tipo: 'dataCard', rows: [
        ['Campus', 'Monterrico'],
        ['Building', 'B'],
        ['Room', 'B-301'],
        ['Class', 'Applied Calculus']
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Use this location', to: 'problem-selector', variante: 'primario' },
        { texto: 'Change location', to: 'qr-scanner', variante: 'secundario' }
      ] }
    ],
    acciones: [goTo('Component / Button / Primary / Use This Location', 'problem-selector'), goTo('Component / Button / Secondary / Change Location', 'qr-scanner')]
  }),
  screen({
    id: 'problem-selector',
    figmaId: '1322:4822',
    nombre: 'Quick Problem Selector',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'What is the problem?', volver: 'data-confirmation' },
    blocks: [
      { tipo: 'text', texto: 'Select an option to send the immediate alert.' },
      { tipo: 'problemGrid', field: 'problema', items: [
        { texto: 'Projector', icon: 'projector', tinte: 'red', modal: 'modal-confirm-send-sos' },
        { texto: 'Classroom PC', icon: 'monitor', tinte: 'blue', modal: 'modal-confirm-send-sos' },
        { texto: 'Audio', icon: 'audio', tinte: 'green', modal: 'modal-confirm-send-sos' },
        { texto: 'Internet', icon: 'wifi', tinte: 'purple', modal: 'modal-confirm-send-sos' }
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Other problem', icon: 'other', to: 'register-report', variante: 'secundario' }
      ] },
      { tipo: 'banda', tono: 'azul', texto: 'No photo will be requested, to prioritize response speed.' }
    ],
    acciones: [openModal('Component / Card / Option / Projector', 'modal-confirm-send-sos')]
  }),
  screen({
    id: 'problem-selector-error',
    figmaId: '1021:61',
    nombre: 'Quick Problem Selector — S.O.S. Error Simulation',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'What is the problem?', volver: 'data-confirmation' },
    blocks: [
      { tipo: 'text', texto: 'Select an option to send the immediate alert.' },
      { tipo: 'categoryGrid', items: [
        { texto: 'Projector', modal: 'modal-confirm-send-sos-error' },
        { texto: 'Classroom PC', modal: 'modal-confirm-send-sos-error' },
        { texto: 'Audio', modal: 'modal-confirm-send-sos-error' },
        { texto: 'Internet', modal: 'modal-confirm-send-sos-error' }
      ] }
    ],
    acciones: [openModal('Component / Card / Option / Projector', 'modal-confirm-send-sos-error')]
  }),
  screen({
    id: 'alert-confirmation',
    figmaId: '1322:4888',
    nombre: 'Alert Confirmation',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Critical alert', volver: 'teacher-dashboard' },
    tabbar: tabStudentReport,
    blocks: [
      { tipo: 'hero', icon: 'triangle', titulo: 'Critical alert sent', texto: 'The support team was notified with maximum priority.' },
      { tipo: 'slaCard', etiqueta: 'Maximum priority', badge: 'SLA < 5 min', estado: 'Looking for an available technician...', items: [
        { icon: 'pin', etiqueta: 'Location', valor: 'Room B-301 · Building B' },
        { icon: 'alert', etiqueta: 'Reported problem', valor: '{problema}' }
      ] }
    ],
    cta: { items: [
      { texto: 'View tracking', to: 'support-status', variante: 'primario' },
      { texto: 'Cancel alarm', modal: 'modal-confirm-cancel-sos', variante: 'peligroSuave' }
    ] },
    acciones: [goTo('Component / Button / Critical / Simulate Technician Assigned', 'support-status'), openModal('Component / Button / Destructive / Cancel Alarm', 'modal-confirm-cancel-sos')]
  }),
  screen({
    id: 'support-status',
    figmaId: '1322:4994',
    nombre: 'Support Status',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Support on the way', volver: 'alert-confirmation' },
    tabbar: tabStudentReport,
    blocks: [
      { tipo: 'profile', initials: 'CM', nombre: 'Carlos Méndez', rol: 'Audiovisual support', email: 'On the way to the room' },
      { tipo: 'dataCard', rows: [['Estimated time', '4 min']] },
      { tipo: 'timeline', items: [
        ['Alert sent', '10:42 AM', '', true],
        ['Technician assigned', '10:43 AM', '', true],
        ['On the way', 'Approaching Building B', '', true, 'pulso'],
        ['Arrived at the room', '', '', false]
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Confirm technician arrival', to: 'support-arrival', variante: 'primario' },
        { texto: 'Cancel alarm', modal: 'modal-confirm-cancel-sos', variante: 'peligroSuave' }
      ] }
    ],
    acciones: [goTo('Component / Button / Critical / Confirm Technician Arrival', 'support-arrival')]
  }),
  screen({
    id: 'support-arrival',
    figmaId: '1322:5113',
    nombre: 'Support Arrival Confirmation',
    usuario: 'docente',
    template: 'success',
    success: {
      tono: 'green',
      titulo: 'Technician at the door',
      texto: 'Carlos Mendez arrived at room B-301.',
      nota: 'Status: Attending in classroom',
      botones: [{ texto: 'Continue service', to: 'confirm-solution', variante: 'primario' }]
    },
    acciones: [goTo('Component / Button / Critical / Continue Attention', 'confirm-solution')]
  }),
  screen({
    id: 'confirm-solution',
    figmaId: '1322:5137',
    nombre: 'Confirm Solution',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Validate solution', volver: 'support-status' },
    blocks: [
      { tipo: 'text', texto: 'The technician marked the incident as resolved.' },
      { tipo: 'dataCard', titulo: 'Summary', rows: [
        ['Problem', '{problema}'],
        ['Room', 'B-301'],
        ['Service time', '6 min']
      ] },
      { tipo: 'title', texto: 'Was the problem solved?', centro: true },
      { tipo: 'buttonGroup', items: [
        { texto: 'Confirm solution', to: 'service-rating', variante: 'primario' },
        { texto: 'Not resolved', modal: 'modal-confirm-reopen-ticket', variante: 'peligro' }
      ] }
    ],
    acciones: [goTo('Component / Button / Primary / Confirm Solution', 'service-rating'), openModal('Component / Button / Destructive / Not Resolved', 'modal-confirm-reopen-ticket')]
  }),
  screen({
    id: 'service-rating',
    figmaId: '1322:5189',
    nombre: 'Service Rating',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Rate the service' },
    blocks: [
      { tipo: 'text', texto: 'Your response helps improve CampusLink support service.', centro: true },
      { tipo: 'spacer', size: 8 },
      { tipo: 'rating' },
      { tipo: 'spacer', size: 8 },
      { tipo: 'inputs', fields: [
        { etiqueta: 'Optional comment', placeholder: 'How was the service?', multilinea: true, filas: 4, suave: true }
      ] }
    ],
    cta: { items: [
      { texto: 'Send rating', to: 'alert-ended', variante: 'primario', habilitaCon: 'calificacion' },
      { texto: 'Skip', to: 'alert-ended', variante: 'secundario' }
    ] },
    acciones: [goTo('Component / Rating / Stars / Support Rating', 'service-rating-selected'), goTo('Component / Button / Secondary / Skip Rating', 'alert-ended')]
  }),
  screen({
    id: 'service-rating-selected',
    figmaId: '33:1500',
    nombre: 'Service Rating — Selected',
    usuario: 'docente',
    alias: 'service-rating',
    preset: { rating: 5 }
  }),
  screen({
    id: 'alert-ended',
    figmaId: '1322:5263',
    nombre: 'Alert ended',
    usuario: 'docente',
    template: 'success',
    success: {
      tono: 'green',
      titulo: 'Ticket status',
      texto: 'The emergency ticket was closed successfully.',
      resumen: { label: 'Ticket ID', id: 'SOS-20260512-0007', badge: 'Resolved' },
      botones: [
        { texto: 'Back home', to: 'teacher-dashboard-final', variante: 'primario' },
        { texto: 'View history', to: 'my-resolved-reports', variante: 'secundario' }
      ]
    },
    acciones: [goTo('Component / Button / Primary / Back Home', 'teacher-dashboard-final')]
  }),
  screen({
    id: 'teacher-dashboard-final',
    figmaId: '1322:5226',
    nombre: 'Optimize design for iOS',
    usuario: 'docente',
    header: {
      tipo: 'rojo',
      compacto: true,
      label: 'CampusLink',
      titulo: 'Hello, Elena',
      icon: 'u',
      notifications: 'notifications'
    },
    tabbar: tabStudentHome,
    blocks: [
      { tipo: 'alertBanner', titulo: 'S.O.S. service finished', texto: 'Ticket SOS-20260512-0007 resolved', to: 'notifications' },
      { tipo: 'pill', texto: 'Schedule detected automatically' },
      { tipo: 'title', texto: 'Current class: Applied Calculus', centro: true },
      { tipo: 'text', texto: 'Room B-301 · Monterrico Campus', centro: true, chico: true },
      { tipo: 'sos', texto: 'Classroom S.O.S.', docente: true, to: 'data-confirmation', ayuda: 'modal-sos-help' },
      { tipo: 'card', titulo: 'Report a standard issue', texto: 'Via the classroom QR code', icon: 'qr', to: 'qr-scanner' }
    ],
    acciones: [goTo('Component / Banner / Success / SOS Finished', 'notifications')]
  }),
  screen({
    id: 'alarm-canceled',
    figmaId: '1021:37',
    nombre: 'Alarm canceled',
    usuario: 'docente',
    template: 'success',
    success: {
      titulo: 'Alarm canceled',
      texto: 'The S.O.S. request was canceled successfully.',
      botones: [{ texto: 'Back home', to: 'teacher-dashboard', variante: 'primario' }]
    },
    acciones: [goTo('Component / Button / Primary / Back Home', 'teacher-dashboard')]
  }),
  screen({
    id: 'reopen-ticket',
    figmaId: '1353:352',
    nombre: 'Reopen ticket',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Reopen ticket', volver: 'confirm-solution' },
    blocks: [
      { tipo: 'text', texto: 'Describe why the problem continues.' },
      { tipo: 'dataCard', titulo: 'Summary', rows: ticketDetail },
      { tipo: 'inputs', fields: [
        { etiqueta: 'Reason for reopening', field: 'motivoReapertura', placeholder: 'E.g. The projector failed again after service.', multilinea: true, mensajeRequerido: 'Describe the reason for reopening the ticket.' }
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Send reopening request', validar: 'motivoReapertura', to: 'ticket-reopened', variante: 'primario' },
        { texto: 'Cancel', to: 'confirm-solution', variante: 'secundario', atras: true }
      ] }
    ],
    acciones: [goTo('Component / Button / Primary / Submit Reopen', 'ticket-reopened')]
  }),
  screen({
    id: 'reopen-ticket-required',
    figmaId: '1120:86',
    nombre: 'Reopen ticket — Reason required',
    usuario: 'docente',
    alias: 'reopen-ticket',
    preset: { requeridos: { motivoReapertura: true } }
  }),
  screen({
    id: 'reopen-ticket-error',
    figmaId: '1120:144',
    nombre: 'Reopen ticket — Error simulation',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Reopen ticket', volver: 'confirm-solution' },
    blocks: [
      { tipo: 'text', texto: 'Describe why the problem continues.' },
      { tipo: 'dataCard', titulo: 'Summary', rows: ticketDetail },
      { tipo: 'inputs', fields: [['Reason for reopening', 'The projector failed again after service.']] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Send reopening request', modal: 'modal-reopen-ticket-error', variante: 'primario' },
        { texto: 'Cancel', to: 'confirm-solution', variante: 'secundario' }
      ] }
    ],
    acciones: [openModal('Component / Button / Primary / Submit Reopen', 'modal-reopen-ticket-error')]
  }),
  screen({
    id: 'ticket-reopened',
    figmaId: '1353:406',
    nombre: 'Ticket reopened',
    usuario: 'docente',
    template: 'success',
    success: {
      tono: 'green',
      titulo: 'Ticket reopened',
      texto: 'The support team will review the incident again.',
      resumen: { label: 'Ticket', id: 'SOS-20260512-0007', badge: 'Reopened' },
      botones: [
        { texto: 'View tracking', to: 'reopened-ticket-detail', variante: 'primario' },
        { texto: 'Back to My reports', to: 'my-active-reports', variante: 'secundario' }
      ]
    },
    acciones: [goTo('Component / Button / Primary / View Tracking', 'reopened-ticket-detail')]
  }),
  screen({
    id: 'reopened-ticket-detail',
    figmaId: '1353:430',
    nombre: 'Reopened Ticket Detail',
    usuario: 'docente',
    header: { tipo: 'claro', titulo: 'Ticket detail', volver: 'ticket-reopened' },
    blocks: [
      { tipo: 'dataCard', badge: 'Reopened', rows: [['SOS-20260512-0007', 'Reopened today']] },
      { tipo: 'timeline', items: [
        ['Received', '10:30 AM', '', true],
        ['Handled / Resolved', '', '', true],
        ['Reopened / Under review', '', '', true],
        ['Resolved', '', '', false]
      ] },
      { tipo: 'dataCard', titulo: 'Details', rows: [
        ['Location', 'Room B-301'],
        ['Problem', '{problema}'],
        ['Reason for reopening', '{motivoReapertura}'],
        ['Current status', 'The support team will review the incident again.']
      ] },
      { tipo: 'buttonGroup', items: [{ texto: 'Back to My reports', to: 'my-active-reports', variante: 'secundario' }] }
    ],
    acciones: [goTo('Component / Button / Primary / Back To My Reports', 'my-active-reports')]
  }),
];
