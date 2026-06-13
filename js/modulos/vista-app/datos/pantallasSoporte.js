// vista-app/datos/pantallasSoporte.js — flujo del equipo de soporte

import { ir, abrir, pantalla, detalleTicket, tabSoporteInicio, tabSoporteMapa, tabSoporteTickets, tabSoportePerfil } from './fabricas.js';

export const pantallasSoporte = [
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
    id: 'dashboard-soporte',
    figmaId: '38:2635',
    nombre: 'Dashboard Soporte',
    usuario: 'soporte',
    fondo: '#FDE5E5',
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
      { tipo: 'alertaCard', titulo: 'Nueva alerta prioritaria', texto: 'Aula B-301 · {problema}', badge: 'Prioritario', link: 'Ver detalle →', to: 'alerta-sos' },
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
        ['Problema', '{problema}']
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
    fondo: '#FDE5E5',
    header: { tipo: 'claro', titulo: 'Ficha técnica', volver: 'alerta-sos' },
    blocks: [
      { tipo: 'fichaCabecera', id: 'SOS-20260512-0007', badge: 'Prioritario' },
      { tipo: 'dataCard', titulo: 'Ubicación', caps: true, rows: [
        ['Sede', 'Monterrico'],
        ['Pabellón', 'B'],
        ['Aula', 'B-301']
      ] },
      { tipo: 'dataCard', titulo: 'Detalle', caps: true, rows: [
        ['Problema', '{problema}'],
        ['Reportado por', 'Docente'],
        ['Fecha y hora', 'Hoy, 10:30 AM'],
        { etiqueta: 'Estado', badge: 'Asignado' }
      ] },
      { tipo: 'fotoCard', titulo: 'Evidencia', texto: 'imagen del incidente' }
    ],
    cta: { items: [
      { texto: 'Iniciar atención', modal: 'modal-confirm-start-attention', variante: 'primario' },
      { texto: 'Pausar por insumos', modal: 'modal-confirm-pause-ticket', variante: 'secundario' }
    ] },
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
        ['Problema', '{problema}']
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
      { tipo: 'upload', campo: 'fotoCierre', texto: 'Adjuntar foto', textoCargada: 'Foto final.jpg' },
      { tipo: 'inputs', fields: [
        { etiqueta: 'Descripción de solución aplicada', campo: 'solucionCierre', placeholder: 'Ej. Se reconectó el cable de alimentación...', multilinea: true }
      ] },
      { tipo: 'checkRow', campo: 'notificarCierre', texto: 'Notificar al usuario reportante' },
      { tipo: 'buttonGroup', items: [
        { texto: 'Cerrar ticket', modal: 'modal-confirm-close-ticket', variante: 'primario', habilitaCon: 'cierre-ticket' }
      ] }
    ],
    acciones: [ir('Component / Upload Area / Evidence / Add Final Photo', 'cerrar-ticket-foto'), ir('Component / Checkbox / Notification / Notify Reporter Unchecked', 'cerrar-ticket-opcion')]
  }),
  pantalla({
    id: 'cerrar-ticket-opcion',
    figmaId: '39:2908',
    nombre: 'Cerrar ticket — Notificación seleccionada',
    usuario: 'soporte',
    alias: 'cerrar-ticket',
    preset: { notificarCierre: true }
  }),
  pantalla({
    id: 'cerrar-ticket-foto',
    figmaId: '39:3001',
    nombre: 'Cerrar ticket — Foto adjuntada',
    usuario: 'soporte',
    alias: 'cerrar-ticket',
    preset: { fotoCierre: true }
  }),
  pantalla({
    id: 'cierre-ticket-completo',
    figmaId: '39:3050',
    nombre: 'Cierre de ticket formulario completo',
    usuario: 'soporte',
    alias: 'cerrar-ticket',
    preset: { fotoCierre: true, notificarCierre: true, solucionCierre: 'Se reconectó el cable de alimentación y se validó el proyector.' }
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
    fondo: '#FDECEC',
    header: { tipo: 'claro', titulo: 'Lista de Tickets', volver: 'dashboard-soporte' },
    tabbar: tabSoporteTickets,
    blocks: [
      { tipo: 'filterChips', campo: 'filtroTickets', items: ['Todas', 'Prioritarias', 'Asignadas', 'En atención'] },
      { tipo: 'inputs', fields: [['Buscar', 'Buscar por ID, ubicación...']] },
      { tipo: 'ticketCards', items: [
        { id: 'SOS-20260512-0007', badge: 'Prioritario', prioridad: true, titulo: '{problema}', lugar: 'Aula B-301', estadoTexto: 'Asignado', etiquetas: ['Prioritarias', 'Asignadas'], to: 'ficha-tecnica' },
        { id: 'TCK-20260512-0010', badge: 'Normal', titulo: 'Internet', lugar: 'Biblioteca', estadoTexto: 'Asignado', etiquetas: ['Asignadas'], to: 'ficha-tecnica' },
        { id: 'TCK-20260511-0004', badge: 'Normal', titulo: 'Eléctrico', lugar: 'Aula D-105', estadoTexto: 'En atención', etiquetas: ['En atención'], to: 'ficha-tecnica' }
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
        { etiqueta: 'Insumo requerido', placeholder: 'Cable HDMI / adaptador' },
        { etiqueta: 'Comentario opcional', placeholder: 'Indica el insumo necesario para continuar la atención.', multilinea: true }
      ] },
      { tipo: 'upload', campo: 'campos.foto-insumo', texto: 'Adjuntar foto del insumo', textoCargada: 'Foto del insumo adjuntada' },
      { tipo: 'buttonGroup', items: [
        { texto: 'Confirmar pausa', to: 'ticket-pausado', variante: 'primario' },
        { texto: 'Volver a atención', to: 'iniciar-atencion', variante: 'secundario', atras: true }
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
      icono: 'pausa',
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
      { tipo: 'map', leyenda: ['Prioritario', 'Asignado', 'En atención', 'Resuelto'] }
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
      { tipo: 'map', selected: true, leyenda: ['Prioritario', 'Asignado', 'En atención', 'Resuelto'] },
      { tipo: 'mapSheet', titulo: '{problema}', texto: 'Aula B-301 · Pabellón B', badge: 'Prioritario', to: 'ficha-tecnica' }
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
