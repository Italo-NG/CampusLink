import { ir, cerrar, logout, modal } from './fabricas.js';

export const modales = [
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
      cerrar('Revisar solución'),
      ir('Cerrar ticket', 'ticket-resuelto')
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
      ir('Volver a revisar', 'cierre-ticket-error-sim'),
      ir('Reintentar cierre', 'ticket-resuelto')
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
      cerrar('Revisar solución'),
      ir('Cerrar ticket', 'modal-close-ticket-error')
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
      cerrar('Mantener atención'),
      ir('Pausar ticket', 'registrar-insumo')
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
