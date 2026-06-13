// vista-app/datos/pantallasDocente.js — flujo S.O.S. del docente

import { ir, abrir, pantalla, detalleTicket, tabEstudianteInicio, tabEstudiantePerfil } from './fabricas.js';

export const pantallasDocente = [
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
      { tipo: 'spacer', size: 8 },
      { tipo: 'pill', texto: 'Horario detectado automáticamente' },
      { tipo: 'title', texto: 'Clase actual: Cálculo Aplicado', centro: true },
      { tipo: 'text', texto: 'Aula B-301 · Sede Monterrico', centro: true, chico: true },
      { tipo: 'spacer', size: 12 },
      { tipo: 'sos', texto: 'S.O.S. Aula', docente: true, to: 'confirmacion-datos' },
      { tipo: 'spacer', size: 12 },
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
      { tipo: 'problemGrid', campo: 'problema', items: [
        { texto: 'Proyector', icono: 'proyector', tinte: 'rojo', modal: 'modal-confirm-send-sos' },
        { texto: 'PC del aula', icono: 'monitor', tinte: 'azul', modal: 'modal-confirm-send-sos' },
        { texto: 'Audio', icono: 'audio', tinte: 'verde', modal: 'modal-confirm-send-sos' },
        { texto: 'Internet', icono: 'wifi', tinte: 'morado', modal: 'modal-confirm-send-sos' }
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Otro problema', icono: 'otro', to: 'registrar-reporte', variante: 'secundario' }
      ] },
      { tipo: 'banda', tono: 'azul', texto: 'No se solicitará foto para priorizar la velocidad de atención.' }
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
      { tipo: 'hero', icono: 'triangulo', titulo: 'Alerta crítica enviada', texto: 'El equipo de soporte fue notificado con prioridad máxima.' },
      { tipo: 'slaCard', etiqueta: 'Prioridad máxima', badge: 'SLA < 5 min', estado: 'Buscando técnico disponible...', items: [
        { icono: 'pin', etiqueta: 'Ubicación', valor: 'Aula B-301 · Pabellón B' },
        { icono: 'alert', etiqueta: 'Problema reportado', valor: '{problema}' }
      ] }
    ],
    cta: { items: [
      { texto: 'Ver Seguimiento', to: 'estado-soporte', variante: 'primario' },
      { texto: 'Cancelar alarma', modal: 'modal-confirm-cancel-sos', variante: 'peligroSuave' }
    ] },
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
        ['En camino', 'Acercándose al Pabellón B', '', true, 'pulso'],
        ['Llegó al aula', '', '', false]
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Confirmar llegada del técnico', to: 'llegada-soporte', variante: 'primario' },
        { texto: 'Cancelar alarma', modal: 'modal-confirm-cancel-sos', variante: 'peligroSuave' }
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
        ['Problema', '{problema}'],
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
    header: { tipo: 'claro', titulo: 'Califica la atención' },
    blocks: [
      { tipo: 'text', texto: 'Tu respuesta ayuda a mejorar el servicio de soporte de CampusLink.', centro: true },
      { tipo: 'spacer', size: 8 },
      { tipo: 'rating' },
      { tipo: 'spacer', size: 8 },
      { tipo: 'inputs', fields: [
        { etiqueta: 'Comentario opcional', placeholder: '¿Qué tal fue la atención?', multilinea: true, filas: 4, suave: true }
      ] }
    ],
    cta: { items: [
      { texto: 'Enviar calificación', to: 'alerta-terminada', variante: 'primario', habilitaCon: 'calificacion' },
      { texto: 'Omitir', to: 'alerta-terminada', variante: 'secundario' }
    ] },
    acciones: [ir('Component / Rating / Stars / Support Rating', 'calificacion-atencion-seleccionada'), ir('Component / Button / Secondary / Skip Rating', 'alerta-terminada')]
  }),
  pantalla({
    id: 'calificacion-atencion-seleccionada',
    figmaId: '33:1500',
    nombre: 'Calificacion de atencion — Seleccionada',
    usuario: 'docente',
    alias: 'calificacion-atencion',
    preset: { rating: 5 }
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
      { tipo: 'inputs', fields: [
        { etiqueta: 'Motivo de reapertura', campo: 'motivoReapertura', placeholder: 'Ej. El proyector volvió a fallar después de la atención.', multilinea: true, mensajeRequerido: 'Describe el motivo para reabrir el ticket.' }
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Enviar reapertura', validar: 'motivoReapertura', to: 'ticket-reabierto', variante: 'primario' },
        { texto: 'Cancelar', to: 'confirmar-solucion', variante: 'secundario', atras: true }
      ] }
    ],
    acciones: [ir('Component / Button / Primary / Submit Reopen', 'ticket-reabierto')]
  }),
  pantalla({
    id: 'reabrir-ticket-required',
    figmaId: '1120:86',
    nombre: 'Reabrir ticket — Motivo requerido',
    usuario: 'docente',
    alias: 'reabrir-ticket',
    preset: { requeridos: { motivoReapertura: true } }
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
        ['Problema', '{problema}'],
        ['Motivo de reapertura', '{motivoReapertura}'],
        ['Estado actual', 'El equipo de soporte revisará nuevamente la incidencia.']
      ] },
      { tipo: 'buttonGroup', items: [{ texto: 'Volver a Mis reportes', to: 'mis-reportes-activos', variante: 'secundario' }] }
    ],
    acciones: [ir('Component / Button / Primary / Back To My Reports', 'mis-reportes-activos')]
  }),
];
