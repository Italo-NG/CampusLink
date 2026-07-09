import { goTo, openModal, screen, ticketDetail, tabSupportHome, tabSupportMap, tabSupportTickets, tabSupportProfile } from './factories.js';

export const supportScreens = [
  screen({
    id: 'support-profile',
    figmaId: '1322:6970',
    nombre: 'Profile / Support',
    usuario: 'soporte',
    header: { tipo: 'perfil', titulo: 'Profile', initials: 'RT', nombre: 'Ricardo Torres', rol: 'Audiovisual support', email: 'ricardo.torres@upc.edu.pe', accionDerecha: { texto: 'Edit' } },
    tabbar: tabSupportProfile,
    blocks: [
      { tipo: 'dataCard', titulo: 'Institutional data', rows: [
        ['Internal code', 'SOP-2048'],
        ['Campus', 'Monterrico'],
        ['Area', 'Audiovisual support']
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
    id: 'support-dashboard',
    figmaId: '1322:5660',
    nombre: 'Support dashboard',
    usuario: 'soporte',
    fondo: '#FDE5E5',
    header: { tipo: 'claro', titulo: 'Dashboard' },
    tabbar: tabSupportHome,
    blocks: [
      { tipo: 'title', texto: 'Hello, Ricardo' },
      { tipo: 'text', texto: 'These are your assigned incidents for today.' },
      { tipo: 'metrics', items: [
        ['4', 'Pending'],
        ['2', 'Being handled', true],
        ['6', 'Resolved today', false, 'verde']
      ] },
      { tipo: 'alertaCard', titulo: 'New priority alert', texto: 'Room B-301 · {problema}', badge: 'Priority', link: 'View detail →', to: 'sos-alert' },
      { tipo: 'title', texto: 'Quick access' },
      { tipo: 'gridCards', items: [
        { titulo: 'View incidents', icon: 'list', to: 'ticket-list' },
        { titulo: 'View map', icon: 'map', to: 'operations-map' }
      ] },
      { tipo: 'card', titulo: 'My productivity', icon: 'bars', to: 'daily-productivity' }
    ],
    acciones: [
      goTo('Component / Card / Alert / Priority Ticket', 'sos-alert'),
      goTo('Component / Card / Action / View Incidents', 'ticket-list'),
      goTo('Component / Card / Action / View Map', 'operations-map'),
      goTo('Component / Card / Action / My Productivity', 'daily-productivity')
    ]
  }),
  screen({
    id: 'sos-alert',
    figmaId: '1322:5764',
    nombre: 'SOS Alert',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Priority Alert', volver: 'support-dashboard' },
    blocks: [
      { tipo: 'successInline', titulo: 'New priority incident', texto: 'Handle in under 5 min', badge: 'Priority', danger: true },
      { tipo: 'dataCard', rows: [
        ['Ticket', 'SOS-20260512-0007'],
        ['Location', 'Room B-301 · Building B'],
        ['Problem', '{problema}']
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'View technical sheet', to: 'technical-sheet', variante: 'primario' },
        { texto: 'Go to map', to: 'operations-map-selection', variante: 'secundario' }
      ] }
    ],
    acciones: [goTo('Component / Button / Critical / View Technical Sheet', 'technical-sheet'), goTo('Component / Button / Secondary / Go To Map', 'operations-map-selection')]
  }),
  screen({
    id: 'technical-sheet',
    figmaId: '1322:5820',
    nombre: 'Technical sheet',
    usuario: 'soporte',
    fondo: '#FDE5E5',
    header: { tipo: 'claro', titulo: 'Technical sheet', volver: 'sos-alert' },
    blocks: [
      { tipo: 'fichaCabecera', id: 'SOS-20260512-0007', badge: 'Priority' },
      { tipo: 'dataCard', titulo: 'Location', caps: true, rows: [
        ['Campus', 'Monterrico'],
        ['Building', 'B'],
        ['Room', 'B-301']
      ] },
      { tipo: 'dataCard', titulo: 'Detail', caps: true, rows: [
        ['Problem', '{problema}'],
        ['Reported by', 'Teacher'],
        ['Date and time', 'Today, 10:30 AM'],
        { etiqueta: 'Status', badge: 'Assigned' }
      ] },
      { tipo: 'fotoCard', titulo: 'Evidence', texto: 'incident image' }
    ],
    cta: { items: [
      { texto: 'Start service', modal: 'modal-confirm-start-attention', variante: 'primario' },
      { texto: 'Pause for supplies', modal: 'modal-confirm-pause-ticket', variante: 'secundario' }
    ] },
    acciones: [openModal('Component / Button / Critical / Start Attention', 'modal-confirm-start-attention'), openModal('Component / Button / Secondary / Pause For Supplies', 'modal-confirm-pause-ticket')]
  }),
  screen({
    id: 'start-service',
    figmaId: '1322:5901',
    nombre: 'Start Service',
    usuario: 'soporte',
    template: 'success',
    success: {
      tono: 'green',
      titulo: 'Service started',
      texto: 'The ticket was marked as Being handled',
      rows: [
        ['Status', 'Being handled'],
        ['Ticket', 'SOS-20260512-0007'],
        ['Location', 'Room B-301'],
        ['Problem', '{problema}']
      ],
      botones: [
        { texto: 'Register solution', to: 'close-ticket', variante: 'primario' },
        { texto: 'Pause for supplies', modal: 'modal-confirm-pause-ticket', variante: 'secundario' }
      ]
    },
    acciones: [goTo('Component / Button / Primary / Register Solution', 'close-ticket')]
  }),
  screen({
    id: 'close-ticket',
    figmaId: '1322:5985',
    nombre: 'Close ticket',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Close ticket', volver: 'start-service' },
    blocks: [
      { tipo: 'dataCard', titulo: 'Ticket to close', rows: ticketDetail },
      { tipo: 'upload', field: 'fotoCierre', texto: 'Attach photo', textoCargada: 'Foto final.jpg' },
      { tipo: 'inputs', fields: [
        { etiqueta: 'Description of the applied solution', field: 'solucionCierre', placeholder: 'E.g. The power cable was reconnected...', multilinea: true }
      ] },
      { tipo: 'checkRow', field: 'notificarCierre', texto: 'Notify reporting user' },
      { tipo: 'buttonGroup', items: [
        { texto: 'Close ticket', modal: 'modal-confirm-close-ticket', variante: 'primario', habilitaCon: 'cierre-ticket' }
      ] }
    ],
    acciones: [goTo('Component / Upload Area / Evidence / Add Final Photo', 'close-ticket-photo'), goTo('Component / Checkbox / Notification / Notify Reporter Unchecked', 'close-ticket-option')]
  }),
  screen({
    id: 'close-ticket-option',
    figmaId: '1322:5935',
    nombre: 'Close ticket — Notification selected',
    usuario: 'soporte',
    alias: 'close-ticket',
    preset: { notificarCierre: true }
  }),
  screen({
    id: 'close-ticket-photo',
    figmaId: '1322:6032',
    nombre: 'Close ticket — Photo attached',
    usuario: 'soporte',
    alias: 'close-ticket',
    preset: { fotoCierre: true }
  }),
  screen({
    id: 'ticket-closing-complete',
    figmaId: '1322:6083',
    nombre: 'Ticket Closing — Complete Form',
    usuario: 'soporte',
    alias: 'close-ticket',
    preset: { fotoCierre: true, notificarCierre: true, solucionCierre: 'The power cable was reconnected and the projector was validated.' }
  }),
  screen({
    id: 'ticket-closing-error-sim',
    figmaId: '1322:6641',
    nombre: 'Ticket Closing — Error Simulation',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Close ticket', volver: 'close-ticket-photo' },
    blocks: [
      { tipo: 'dataCard', titulo: 'Ticket to close', rows: ticketDetail },
      { tipo: 'upload', texto: 'Foto final.jpg' },
      { tipo: 'inputs', fields: [['Description of the applied solution', 'The power cable was reconnected and the projector was validated.']] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Close ticket', modal: 'modal-confirm-close-ticket-error-sim', variante: 'primario' }
      ] }
    ],
    acciones: [openModal('Component / Button / Primary / Close Ticket', 'modal-confirm-close-ticket-error-sim')]
  }),
  screen({
    id: 'ticket-resolved',
    figmaId: '1322:6134',
    nombre: 'Ticket resolved',
    usuario: 'soporte',
    template: 'success',
    success: {
      tono: 'green',
      titulo: 'Ticket resolved',
      texto: 'The incident was closed successfully.',
      resumen: { label: 'Ticket', id: 'SOS-20260512-0007', badge: 'Resolved' },
      nota: 'The reporting user was notified.',
      botones: [
        { texto: 'Back to dashboard', to: 'support-dashboard', variante: 'primario' },
        { texto: 'View productivity', to: 'daily-productivity', variante: 'secundario' }
      ]
    },
    acciones: [goTo('Component / Button / Primary / Back To Dashboard', 'support-dashboard')]
  }),
  screen({
    id: 'ticket-list',
    figmaId: '1322:6163',
    nombre: 'Ticket list',
    usuario: 'soporte',
    fondo: '#FDECEC',
    header: { tipo: 'claro', titulo: 'Ticket list', volver: 'support-dashboard' },
    tabbar: tabSupportTickets,
    blocks: [
      { tipo: 'filterChips', field: 'filtroTickets', items: ['All', 'Priority', 'Assigned', 'Being handled'] },
      { tipo: 'searchFilter', field: 'campos.buscar', placeholder: 'Search ID or room', modal: 'modal-support-filters' },
      { tipo: 'ticketCards', items: [
        { id: 'SOS-20260512-0007', badge: 'Priority', prioridad: true, titulo: '{problema}', lugar: 'Room B-301', estadoTexto: 'Assigned', etiquetas: ['Priority', 'Assigned'], to: 'technical-sheet' },
        { id: 'TCK-20260512-0010', badge: 'Normal', titulo: 'Internet', lugar: 'Library', estadoTexto: 'Assigned', etiquetas: ['Assigned'], to: 'technical-sheet' },
        { id: 'TCK-20260511-0004', badge: 'Normal', titulo: 'Electrical', lugar: 'Room D-105', estadoTexto: 'Being handled', etiquetas: ['Being handled'], to: 'technical-sheet' }
      ] }
    ],
    acciones: [goTo('Component / Tab Bar / Item / Home Inactive', 'support-dashboard'), goTo('Component / Tab Bar / Item / Map Inactive', 'operations-map')]
  }),
  screen({
    id: 'register-supply',
    figmaId: '1322:6726',
    nombre: 'Register required supply',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Register supply', volver: 'start-service' },
    blocks: [
      { tipo: 'dataCard', titulo: 'Ticket', rows: ticketDetail },
      { tipo: 'inputs', fields: [
        { etiqueta: 'Required supply', placeholder: 'HDMI cable / adapter' },
        { etiqueta: 'Optional comment', placeholder: 'Indicate the supply needed to continue service.', multilinea: true }
      ] },
      { tipo: 'upload', field: 'campos.foto-insumo', texto: 'Attach supply photo', textoCargada: 'Supply photo attached' },
      { tipo: 'buttonGroup', items: [
        { texto: 'Confirm pause', to: 'ticket-paused', variante: 'primario' },
        { texto: 'Back to service', to: 'start-service', variante: 'secundario', atras: true }
      ] }
    ],
    acciones: [goTo('Component / Button / Primary / Confirm Pause', 'ticket-paused')]
  }),
  screen({
    id: 'ticket-paused',
    figmaId: '1322:6747',
    nombre: 'Ticket paused for supplies',
    usuario: 'soporte',
    template: 'success',
    success: {
      titulo: 'Ticket paused',
      texto: 'The ticket was paused due to missing supplies. It will resume when the required material is available.',
      rows: [['Status', 'Paused']],
      icon: 'pause',
      botones: [
        { texto: 'Back to dashboard', to: 'support-dashboard', variante: 'primario' },
        { texto: 'View incidents', to: 'ticket-list', variante: 'secundario' }
      ]
    },
    acciones: [goTo('Component / Button / Primary / Back To Dashboard', 'support-dashboard')]
  }),
  screen({
    id: 'operations-map',
    figmaId: '1322:6278',
    nombre: 'Operations map',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Operations map', volver: 'support-dashboard' },
    tabbar: tabSupportMap,
    blocks: [
      { tipo: 'inputs', fields: [['Search space', 'Search space...']] },
      { tipo: 'map', leyenda: ['Priority', 'Assigned', 'Being handled', 'Resolved'] }
    ],
    acciones: [goTo('Component / Map Marker / Status / Building B Priority', 'operations-map-selection')]
  }),
  screen({
    id: 'operations-map-selection',
    figmaId: '1322:6391',
    nombre: 'Operations Map with Selection',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'Operations map', volver: 'operations-map' },
    tabbar: tabSupportMap,
    blocks: [
      { tipo: 'inputs', fields: [['Search space', 'Search space...']] },
      { tipo: 'map', selected: true, leyenda: ['Priority', 'Assigned', 'Being handled', 'Resolved'] },
      { tipo: 'mapSheet', titulo: '{problema}', texto: 'Room B-301 · Building B', badge: 'Priority', to: 'technical-sheet' }
    ],
    acciones: [goTo('Component / Button / Critical / View Technical Sheet', 'technical-sheet')]
  }),
  screen({
    id: 'daily-productivity',
    figmaId: '1322:6504',
    nombre: 'Daily productivity',
    usuario: 'soporte',
    header: { tipo: 'claro', titulo: 'My productivity', volver: 'support-dashboard' },
    tabbar: tabSupportProfile,
    blocks: [
      { tipo: 'title', texto: 'Day summary' },
      { tipo: 'text', texto: 'Good work, Ricardo' },
      { tipo: 'metrics', items: [
        ['6', 'Tickets resolved today'],
        ['11m', 'Average time'],
        ['2', 'Priority cases handled']
      ] },
      { tipo: 'dataCard', titulo: 'Latest resolved services', rows: [
        ['Projector', 'SOS-20260512-0007 · 10 min ago'],
        ['Broken chair', 'TCK-20260512-0005 · 1 hour ago'],
        ['Paused tickets', '1']
      ] }
    ],
    acciones: [goTo('Component / Button / Navigation / Back', 'support-dashboard')]
  })
];
