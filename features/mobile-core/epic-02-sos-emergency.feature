# language: en

@mobile-core @prototype @manual @E2
Feature: E2 - Emergencias en Clase con Botón S.O.S.

Esta épica agrupa las historias relacionadas con la activación de alertas S.O.S. durante clases, sugerencia de ubicación, selección rápida del problema, confirmación de alerta crítica, seguimiento del técnico, cancelación, llegada, valoración y confirmación de solución.

Rule: US10 - Botón S.O.S. de emergencia en clase


# Como Docente de CampusLink
# Quiero tener un botón S.O.S. visible en el Dashboard
# Para solicitar ayuda técnica urgente durante una clase sin navegar por otros menús.

@US10
Scenario: US10 - Scenario 1: Acceso inmediato al botón S.O.S.
  Given que el docente inicia sesión
  When visualiza el Dashboard
  Then el sistema muestra un botón circular rojo etiquetado como "S.O.S. Aula" en un área de fácil acceso táctil

@US10
Scenario: US10 - Scenario 2: Restricción por rol
  Given que un usuario con rol "Estudiante" inicia sesión
  When carga el Dashboard
  Then el sistema oculta completamente el botón S.O.S. para evitar usos indebidos

@US10
Scenario: US10 - Scenario 3: Estado fuera de línea
  Given que el dispositivo pierde conexión a internet
  When el docente intenta interactuar con el botón S.O.S.
  Then el botón cambia a color gris
  And muestra un mensaje "Sin conexión para emergencias"


Rule: US11 - Sugerencia automática de ubicación por horario académico


# Como Docente de CampusLink
# Quiero que el sistema sugiera automáticamente el aula donde estoy dictando clase
# Para activar una emergencia sin ingresar manualmente la ubicación.

@US11
Scenario: US11 - Scenario 1: Cruce de horario
  Given que el docente presiona S.O.S.
  When el sistema consulta la API de horarios
  Then el modal se abre con el aula pre-cargada "Aula B-301 - Clase de Cálculo"

@US11
Scenario: US11 - Scenario 2: Cambio de aula
  Given que la ubicación sugerida no es donde se encuentra el docente
  When presiona el botón "Cambiar ubicación"
  Then se habilita el escáner QR
  And se habilita la lista rápida para corregir la locación

@US11
Scenario: US11 - Scenario 3: Falla de API de horarios
  Given que la base de datos de horarios no responde
  When el docente activa el S.O.S.
  Then el sistema solicita obligatoriamente el escaneo del QR del podio
  And usa el QR para identificar el aula


Rule: US12 - Selección rápida del tipo de falla


# Como Docente de CampusLink
# Quiero seleccionar rápidamente el tipo de emergencia mediante botones simples
# Para enviar la alerta sin llenar formularios largos durante la clase.

@US12
Scenario: US12 - Scenario 1: Envío directo de alerta crítica
  Given que el aula está confirmada
  When el docente toca un botón de categoría "Proyector"
  Then el sistema envía la alerta crítica de forma inmediata
  And no solicita datos adicionales obligatorios

@US12
Scenario: US12 - Scenario 2: Omisión de evidencia fotográfica
  Given que es un flujo S.O.S.
  When se selecciona el problema
  Then el sistema salta el paso de "Adjuntar foto"
  And prioriza la velocidad de respuesta

@US12
Scenario: US12 - Scenario 3: Problema no listado
  Given que la falla es distinta a las categorías principales
  When el docente presiona "Otro"
  Then se despliega una lista corta de opciones secundarias como "Mobiliario" o "Luces"
  And se evita el uso del teclado


Rule: US13 - Confirmación visual de alerta prioritaria


# Como Docente de CampusLink
# Quiero recibir una confirmación visual clara después de enviar el S.O.S.
# Para saber que la alerta crítica fue registrada y priorizada.

@US13
Scenario: US13 - Scenario 1: Confirmación de envío de alerta crítica
  Given que el docente seleccionó el problema
  When el servidor procesa la solicitud
  Then se muestra una pantalla con una sirena pulsante
  And se visualiza el texto "Alerta Crítica Enviada"

@US13
Scenario: US13 - Scenario 2: Etiquetado de prioridad
  Given que la alerta proviene del flujo S.O.S.
  When llega al panel de técnicos
  Then el sistema le asigna automáticamente la etiqueta "SLA menor a 5 min"
  And la coloca al inicio de la cola

@US13
Scenario: US13 - Scenario 3: Falla de servidor
  Given que el sistema no puede emitir la alerta
  When ocurre un error de red
  Then la pantalla muestra un botón de emergencia de "Llamada directa a Central de Soporte"


Rule: US14 - Visualización de técnico asignado y tiempo estimado de llegada


# Como Docente de CampusLink
# Quiero ver qué técnico fue asignado y cuánto tardará en llegar
# Para decidir cómo continuar la clase mientras espero la asistencia.

@US14
Scenario: US14 - Scenario 1: Técnico asignado
  Given que un técnico acepta la emergencia
  When el docente consulta su pantalla
  Then se visualiza el nombre del técnico
  And se visualiza un contador regresivo de minutos ETA

@US14
Scenario: US14 - Scenario 2: Actualización dinámica del ETA
  Given que el técnico se desplaza
  When cambia su geolocalización
  Then el contador se actualiza automáticamente cada 30 segundos

@US14
Scenario: US14 - Scenario 3: Aviso de retraso
  Given que el tiempo de llegada supera el estimado inicial
  When el contador llega a cero y el técnico no ha marcado llegada
  Then el indicador cambia a color naranja
  And muestra el mensaje "Técnico retrasado - En camino"


Rule: US15 - Cancelación de alerta S.O.S.


# Como Docente de CampusLink
# Quiero cancelar una alerta S.O.S. enviada por error o que ya no sea necesaria
# Para evitar que soporte atienda una emergencia inexistente.

@US15
Scenario: US15 - Scenario 1: Abortar misión
  Given que el ticket está activo pero el técnico no ha llegado
  When el docente presiona "Cancelar Alarma"
  Then el sistema cierra el ticket
  And notifica al técnico inmediatamente

@US15
Scenario: US15 - Scenario 2: Bloqueo de cancelación
  Given que el técnico ya marcó "Atendiendo en Aula"
  When el docente intenta cancelar
  Then el botón de cancelación desaparece
  And el técnico debe registrar el cierre formalmente

@US15
Scenario: US15 - Scenario 3: Confirmación de seguridad
  Given que el docente presiona cancelar
  When el sistema detecta la acción
  Then solicita una confirmación "¿Deseas anular la ayuda técnica?"
  And evita cierres accidentales


Rule: US16 - Notificación de llegada del técnico


# Como Docente de CampusLink
# Quiero recibir una notificación clara cuando el técnico llegue al aula
# Para identificar rápidamente que la ayuda ya está disponible.

@US16
Scenario: US16 - Scenario 1: Aviso de proximidad
  Given que el técnico marca "Llegué al aula"
  When el docente tiene el celular bloqueado
  Then la pantalla se enciende automáticamente
  And muestra el aviso de llegada

@US16
Scenario: US16 - Scenario 2: Feedback visual intenso
  Given que llega la notificación de llegada
  When el docente visualiza la app
  Then los bordes de la pantalla parpadean en verde
  And el sistema capta la atención del docente

@US16
Scenario: US16 - Scenario 3: Falla de push
  Given que el servicio de notificaciones no funciona
  When el docente abre la app manualmente
  Then el estado del ticket debe decir "Técnico en Puerta"
  And el texto debe mostrarse en letras grandes y negritas


Rule: US17 - Valoración de atención técnica


# Como Docente de CampusLink
# Quiero valorar la atención recibida después de la emergencia
# Para registrar la calidad del soporte técnico brindado.

@US17
Scenario: US17 - Scenario 1: Valoración de estrellas
  Given que el técnico cerró el caso
  When aparece el banner de calificación
  Then el docente selecciona de 1 a 5 estrellas
  And el modal se cierra automáticamente

@US17
Scenario: US17 - Scenario 2: Autodescarte de calificación
  Given que el docente no interactúa con la calificación
  When pasan 15 segundos
  Then el banner desaparece solo
  And no interrumpe la interfaz


Rule: US18 - Confirmación de solución de emergencia


# Como Docente de CampusLink
# Quiero confirmar si la falla fue solucionada después de la atención técnica
# Para asegurar que el ticket se cierre solo cuando el problema haya sido resuelto.

@US18
Scenario: US18 - Scenario 1: Confirmación de conformidad
  Given que el técnico marca "Falla resuelta" en su app
  When el docente recibe la alerta de cierre
  Then debe presionar un botón de "Confirmar solución"
  And el sistema da por finalizado el ticket

@US18
Scenario: US18 - Scenario 2: Disconformidad con la solución
  Given que el problema persiste
  When el docente marca "No resuelto"
  Then el ticket regresa a estado "En atención"
  And se escala una alerta al supervisor

