import { goTo, closeAction, logout, modal } from './factories.js';

export const modals = [
  modal({
    id: 'modal-qr-not-recognized',
    figmaId: '1036:3',
    nombre: 'Overlay / Modal / QR Not Recognized',
    usuario: 'shared',
    titulo: 'QR code not recognized',
    texto: 'Try scanning again or enter the location manually.',
    acciones: [
      goTo('Enter location manually', 'manual-location'),
      closeAction('Retry scan')
    ]
  }),
  modal({
    id: 'modal-send-report-error',
    figmaId: '995:13',
    nombre: 'Overlay / Modal / Send Report Error',
    usuario: 'shared',
    titulo: 'The report could not be sent',
    texto: 'Check your connection and try again.',
    acciones: [
      goTo('Exit', 'report-summary-error'),
      goTo('Retry sending', 'report-confirmed')
    ]
  }),
  modal({
    id: 'modal-confirm-send-report',
    figmaId: '995:2',
    nombre: 'Overlay / Modal / Confirm Send Report',
    usuario: 'shared',
    titulo: 'Do you want to send the report?',
    texto: 'The support team will receive the incident information.',
    acciones: [
      closeAction('Review again'),
      goTo('Send report', 'report-confirmed')
    ]
  }),
  modal({
    id: 'modal-confirm-cancel-report',
    figmaId: '978:13',
    nombre: 'Overlay / Modal / Confirm Cancel Report',
    usuario: 'shared',
    titulo: 'Discard report?',
    texto: 'If you discard this report, the entered information will be lost.',
    acciones: [
      closeAction('Keep report'),
      goTo('Yes, discard report', 'report-discarded')
    ]
  }),
  modal({
    id: 'modal-cancel-report',
    figmaId: '1233:1083',
    nombre: 'Overlay / Modal / Cancel Report',
    usuario: 'shared',
    titulo: 'Cancel report?',
    texto: 'The ticket will be removed if service has not started yet.',
    acciones: [
      closeAction('Keep report'),
      goTo('Yes, cancel report', 'report-canceled-confirmation')
    ]
  }),
  modal({
    id: 'modal-confirm-send-sos-student',
    figmaId: 'inferred:modal-confirm-send-sos-student',
    nombre: 'Overlay / Modal / Confirm Send SOS Estudiante',
    usuario: 'estudiante',
    titulo: 'Send S.O.S. alert?',
    texto: 'Support will receive a priority alert associated with your current location.',
    acciones: [
      closeAction('Review'),
      goTo('Send S.O.S.', 'student-sos-sent')
    ]
  }),
  modal({
    id: 'modal-sos-help',
    figmaId: '1898:15',
    nombre: 'SOS Help Overlay',
    usuario: 'shared',
    sinIcono: true,
    titulo: 'What is Classroom S.O.S.?',
    texto: 'Send a priority alert to the support team when a classroom issue needs immediate attention. Include your current room so they can locate you quickly. Use it only for real emergencies.',
    acciones: [
      closeAction('Got it')
    ]
  }),
  modal({
    id: 'modal-confirm-reopen-ticket',
    figmaId: '1114:4',
    nombre: 'Overlay / Modal / Confirm Reopen Ticket',
    usuario: 'docente',
    titulo: 'Reopen ticket?',
    texto: 'The support team will review the reported incident again.',
    acciones: [
      closeAction('Back to validate'),
      goTo('Reopen ticket', 'reopen-ticket')
    ]
  }),
  modal({
    id: 'modal-reopen-ticket-error',
    figmaId: '1120:198',
    nombre: 'Overlay / Modal / Reopen Ticket Error',
    usuario: 'docente',
    titulo: 'The ticket could not be reopened',
    texto: 'Check your connection and try again.',
    acciones: [
      goTo('Back to edit', 'reopen-ticket-error'),
      goTo('Retry', 'ticket-reopened')
    ]
  }),
  modal({
    id: 'modal-confirm-send-sos',
    figmaId: '1021:4',
    nombre: 'Overlay / Modal / Confirm Send SOS',
    usuario: 'docente',
    titulo: 'Do you want to send an S.O.S. alert?',
    texto: 'Support staff will receive a priority alert.',
    acciones: [
      closeAction('Review'),
      goTo('Send S.O.S.', 'alert-confirmation')
    ]
  }),
  modal({
    id: 'modal-confirm-send-sos-error',
    figmaId: '1021:127',
    nombre: 'Overlay / Modal / Confirm Send SOS — Error Simulation',
    usuario: 'docente',
    titulo: 'Do you want to send an S.O.S. alert?',
    texto: 'Support staff will receive a priority alert.',
    acciones: [
      closeAction('Review'),
      goTo('Send S.O.S.', 'modal-send-sos-error')
    ]
  }),
  modal({
    id: 'modal-send-sos-error',
    figmaId: '1021:26',
    nombre: 'Overlay / Modal / Send SOS Error',
    usuario: 'docente',
    titulo: 'The alert could not be sent',
    texto: 'Check your connection and try again.',
    acciones: [
      goTo('Call Support Center', 'alert-confirmation'),
      goTo('Retry', 'alert-confirmation')
    ]
  }),
  modal({
    id: 'modal-confirm-cancel-sos',
    figmaId: '1021:15',
    nombre: 'Overlay / Modal / Confirm Cancel SOS',
    usuario: 'docente',
    titulo: 'Do you want to cancel the alarm?',
    texto: 'If you cancel, the assigned technician will be freed up to attend other cases.',
    acciones: [
      closeAction('Keep alert'),
      goTo('Cancel alarm', 'alarm-canceled')
    ]
  }),
  modal({
    id: 'modal-confirm-close-ticket',
    figmaId: '1074:10',
    nombre: 'Overlay / Modal / Confirm Close Ticket',
    usuario: 'soporte',
    titulo: 'Close ticket?',
    texto: 'The incident will be marked as resolved.',
    acciones: [
      closeAction('Review solution'),
      goTo('Close ticket', 'ticket-resolved')
    ]
  }),
  modal({
    id: 'modal-confirm-start-attention',
    figmaId: '1317:2',
    nombre: 'Overlay / Modal / Confirm Start Attention',
    usuario: 'soporte',
    titulo: 'Start service?',
    texto: 'The ticket will be marked as “Being handled” and the reporting user will be able to see the progress.',
    acciones: [
      closeAction('Review technical sheet'),
      goTo('Start service', 'start-service')
    ]
  }),
  modal({
    id: 'modal-close-ticket-error',
    figmaId: '1074:86',
    nombre: 'Overlay / Modal / Close Ticket Error',
    usuario: 'soporte',
    titulo: 'The ticket could not be closed',
    texto: 'Check your connection and try again. The entered information will remain saved.',
    acciones: [
      goTo('Back to review', 'ticket-closing-error-sim'),
      goTo('Retry closing', 'ticket-resolved')
    ]
  }),
  modal({
    id: 'modal-confirm-close-ticket-error-sim',
    figmaId: '1074:75',
    nombre: 'Overlay / Modal / Confirm Close Ticket — Error Simulation',
    usuario: 'soporte',
    titulo: 'Close ticket?',
    texto: 'The incident will be marked as resolved.',
    acciones: [
      closeAction('Review solution'),
      goTo('Close ticket', 'modal-close-ticket-error')
    ]
  }),
  modal({
    id: 'modal-confirm-pause-ticket',
    figmaId: '1079:3',
    nombre: 'Overlay / Modal / Confirm Pause Ticket',
    usuario: 'soporte',
    titulo: 'Pause ticket?',
    texto: 'The ticket will remain on hold until the required supply is available.',
    acciones: [
      closeAction('Keep service'),
      goTo('Pause ticket', 'register-supply')
    ]
  }),
  modal({
    id: 'modal-support-filters',
    figmaId: '1898:28',
    nombre: 'Advanced Filters Overlay / Support Tickets',
    usuario: 'soporte',
    tipo: 'sheetFiltros',
    titulo: 'Advanced filters',
    grupos: [
      { label: 'Priority', chips: ['All', 'Priority', 'Normal'], activo: 'All' },
      { label: 'Status', chips: ['Assigned', 'Being handled', 'Resolved'], activo: 'Assigned' },
      { label: 'Assignment', chips: ['My tickets', 'Unassigned', 'Team'], activo: 'My tickets' },
      { label: 'Location', campos: [['Campus', 'All'], ['Room', 'Room or space']] },
      { label: 'SLA', chips: ['Due today', '+24 h', 'Critical'], activo: 'Critical' },
      { label: 'Sort by', chips: ['Urgency', 'Most recent', 'SLA'], activo: 'Urgency' }
    ],
    acciones: [closeAction('Apply filters')]
  }),
  modal({
    id: 'modal-log-out',
    figmaId: 'inferred:modal-log-out',
    nombre: 'Overlay / Modal / Log Out',
    usuario: 'shared',
    titulo: 'Log out?',
    texto: 'You will return to the prototype start and the active role will be cleared.',
    icon: 'logout',
    acciones: [
      closeAction('Keep session'),
      logout('Log out')
    ]
  })
];
