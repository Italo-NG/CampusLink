# language: en

@mobile-core @prototype @manual @E3
Feature: E3 - Seguimiento y Transparencia de Tickets

Esta épica agrupa las historias relacionadas con la consulta de reportes enviados, visualización de estados, detalle del ticket, avance de atención, notificaciones y bandeja interna.

Rule: US19 - Historial de reportes enviados


# Como Alumno/Docente Reportante
# Quiero visualizar una lista de mis reportes enviados
# Para consultar rápidamente el estado general de mis incidencias.

@US19
Scenario: US19 - Scenario 1: Visualización de lista
  Given que el Alumno/Docente presiona "Mis Reportes" en el menú de navegación
  When la pantalla carga los datos desde el servidor
  Then el sistema muestra una lista de tarjetas con el ícono de la categoría
  And muestra el ID del ticket
  And muestra la fecha de creación

@US19
Scenario: US19 - Scenario 2: Ordenamiento cronológico
  Given que el Alumno/Docente tiene múltiples reportes en su historial
  When visualiza la lista
  Then las tarjetas deben mostrarse en orden descendente
  And se muestra primero el reporte más reciente
  And se muestra al final el reporte más antiguo

@US19
Scenario: US19 - Scenario 3: Estado vacío del historial
  Given que un Alumno/Docente nuevo ingresa al historial sin haber reportado antes
  When el sistema detecta que no existen registros asociados a su ID
  Then muestra una ilustración amigable
  And muestra el mensaje "Aún no has reportado nada"
  And muestra un botón para "Crear nuevo reporte"


Rule: US20 - Filtro de reportes por estado


# Como Alumno/Docente Reportante
# Quiero filtrar mis reportes por estado
# Para encontrar rápidamente los tickets activos, resueltos o cancelados.

@US20
Scenario: US20 - Scenario 1: Navegación por pestañas
  Given que el usuario está en la pantalla de "Mis Reportes"
  When toca la pestaña superior de "Resueltos"
  Then la lista se filtra automáticamente
  And muestra únicamente los tickets con estado finalizado

@US20
Scenario: US20 - Scenario 2: Indicador visual de selección
  Given que el usuario navega entre categorías de estado
  When una pestaña es seleccionada
  Then el sistema aplica un estilo visual distintivo
  And usa color de marca
  And muestra subrayado para confirmar la selección activa

@US20
Scenario: US20 - Scenario 3: Navegación entre reportes activos, resueltos y cancelados
  Given que el usuario se encuentra en la pantalla de "Mis Reportes"
  When alterna entre las pestañas "Activos", "Resueltos" y "Cancelados"
  Then el sistema muestra los reportes correspondientes a cada estado
  And no mezcla tickets de otras categorías


Rule: US21 - Detalle de reporte enviado


# Como Alumno/Docente Reportante
# Quiero abrir el detalle de un ticket enviado
# Para revisar la evidencia, ubicación, descripción y datos registrados en el reporte.

@US21
Scenario: US21 - Scenario 1: Acceso al detalle
  Given que el Alumno/Docente visualiza su lista de reportes
  When hace "tap" sobre la tarjeta de un ticket específico
  Then la app navega a la pantalla "Detalle del Reporte"
  And muestra la foto adjunta
  And muestra el mapa de ubicación
  And muestra la descripción completa

@US21
Scenario: US21 - Scenario 2: Inmutabilidad del reporte enviado
  Given que el Alumno/Docente está visualizando un ticket ya emitido
  When interactúa con la pantalla de detalle
  Then el sistema no muestra opciones de edición de texto
  And no permite cambiar la imagen
  And preserva la integridad del reporte

@US21
Scenario: US21 - Scenario 3: Falla de carga de evidencia
  Given que el servidor de imágenes no responde
  When el Alumno/Docente entra al detalle del ticket
  Then el sistema muestra un recuadro de error en lugar de la foto
  And muestra el mensaje "La evidencia visual no pudo cargar"


Rule: US22 - Visualización del avance del ticket


# Como Alumno/Docente Reportante
# Quiero visualizar el avance de atención de mi ticket
# Para saber si mi reporte fue recibido, está en proceso o ya fue resuelto.

@US22
Scenario: US22 - Scenario 1: Progreso visual
  Given que el usuario revisa el detalle de un ticket activo
  When visualiza la parte superior de la pantalla
  Then se muestra un stepper de 3 puntos
  And el stepper muestra "Recibido", "En Proceso" y "Resuelto"
  And el estado actual aparece resaltado

@US22
Scenario: US22 - Scenario 2: Semántica de colores
  Given que el sistema actualiza el estado del ticket
  When el estado es "En Proceso" o "Resuelto"
  Then el estado "En Proceso" se ilumina en ámbar
  And el estado "Resuelto" cambia a verde

@US22
Scenario: US22 - Scenario 3: Notificación de rechazo
  Given que soporte técnico rechaza el ticket por falta de evidencia
  When el usuario entra al detalle
  Then el stepper se muestra en color rojo
  And visualiza el motivo del rechazo de forma obligatoria


Rule: US23 - Notificaciones de actualización de ticket


# Como Alumno/Docente Reportante
# Quiero recibir notificaciones cuando cambie el estado de mi ticket
# Para enterarme oportunamente del avance sin revisar manualmente la aplicación.

@US23
Scenario: US23 - Scenario 1: Deep Linking desde notificación
  Given que el usuario recibe una notificación de ticket resuelto
  When toca la notificación en la pantalla de bloqueo
  Then la aplicación se abre automáticamente en la pantalla de detalle
  And muestra el ticket específico asociado a la notificación

@US23
Scenario: US23 - Scenario 2: Respeto a permisos nativos
  Given que el usuario desactivó las notificaciones en los ajustes del sistema operativo
  When ocurre una actualización de ticket
  Then la app no emite alerta sonora
  And la app no emite alerta visual
  And acumula la notificación solo en la bandeja interna

@US23
Scenario: US23 - Scenario 3: Solicitud de permisos
  Given que es el primer reporte del usuario
  When termina el envío
  Then el sistema verifica si los permisos Push están inactivos
  And solicita su activación mediante un modal explicativo


Rule: US24 - Bandeja interna de notificaciones


# Como Alumno/Docente Reportante
# Quiero tener una bandeja interna de notificaciones
# Para consultar las novedades de mis reportes incluso si no vi la alerta push.

@US24
Scenario: US24 - Scenario 1: Insignia de lectura
  Given que el usuario tiene 2 novedades sin leer
  When abre la app
  Then el ícono de la campana muestra un círculo rojo
  And el círculo rojo muestra el número de alertas pendientes

@US24
Scenario: US24 - Scenario 2: Marcado de lectura
  Given que el usuario entra a la bandeja
  When toca una alerta sombreada
  Then el sistema marca el mensaje como leído
  And el contador del badge disminuye en una unidad

@US24
Scenario: US24 - Scenario 3: Limpieza automática
  Given que existen notificaciones con más de 30 días de antigüedad
  When se inicia la aplicación
  Then el sistema elimina automáticamente esos registros
  And optimiza el almacenamiento local

