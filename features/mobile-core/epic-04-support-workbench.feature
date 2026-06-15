# language: en

@mobile-core @prototype @manual @E4
Feature: E4 - Panel de Trabajo para Soporte

Esta épica agrupa las historias relacionadas con el trabajo operativo del personal de soporte: visualización de tickets, atención de emergencias, mapa de incidencias, revisión de ficha técnica, inicio de reparación, pausa por insumos, cierre del ticket y seguimiento de productividad.

Rule: US27 - Dashboard Técnico de Incidencias Pendientes


# Como Personal de Soporte Resolutor
# Quiero visualizar una lista centralizada de todos los reportes asignados
# Para organizar mi jornada laboral sin depender de órdenes físicas o llamadas.

@US27
Scenario: US27 - Scenario 1: Carga de lista de tareas
  Given que el técnico accede con su rol de Resolutor
  When abre el Dashboard técnico
  Then el sistema muestra una lista de "Tickets Pendientes"
  And muestra el ID de cada ticket
  And muestra la ubicación exacta
  And muestra un cronómetro con el tiempo transcurrido desde el reporte

@US27
Scenario: US27 - Scenario 2: Priorización por criticidad
  Given que existen múltiples reportes en la lista
  When se renderiza la interfaz
  Then el sistema coloca los tickets de tipo "S.O.S. Académico" en la parte superior
  And muestra un indicador visual de urgencia
  And usa una alerta visual roja parpadeante

@US27
Scenario: US27 - Scenario 3: Sincronización de lista
  Given que el técnico intenta actualizar su lista
  When hay una falla de conexión con el servidor central
  Then la app activa el "Modo Consulta Offline"
  And permite visualizar los tickets cargados en la última sesión exitosa


Rule: US28 - Notificación de Emergencia S.O.S. en Tiempo Real


# Como Personal de Soporte
# Quiero recibir una alerta intrusiva y sonora ante un S.O.S. docente
# Para acudir al aula inmediatamente y minimizar la pérdida de horas de clase.

@US28
Scenario: US28 - Scenario 1: Alerta de pantalla completa
  Given que la app está en ejecución en primer o segundo plano
  When un docente activa un S.O.S.
  Then el sistema despliega un modal de pantalla completa
  And reproduce un sonido de alerta
  And muestra información del aula

@US28
Scenario: US28 - Scenario 2: Persistencia de emergencia
  Given que llega una alerta S.O.S.
  When el técnico no interactúa con el modal
  Then la alerta sonora se repite cada 10 segundos
  And se mantiene hasta que el técnico presione "Aceptar Misión"
  And se mantiene hasta que el sistema derive la emergencia por falta de respuesta

@US28
Scenario: US28 - Scenario 3: Filtrado por geolocalización
  Given que se emite un S.O.S. en una sede específica
  When el sistema detecta vía GPS que el técnico está en una sede distinta
  Then omite el envío de la alerta a ese técnico
  And evita desplazamientos imposibles


Rule: US29 - Mapa Interactivo de Incidencias


# Como Personal de Soporte
# Quiero visualizar los reportes sobre el croquis del campus
# Para trazar rutas de atención eficientes basadas en la cercanía física.

@US29
Scenario: US29 - Scenario 1: Visualización geolocalizada
  Given que el técnico selecciona la vista de "Mapa"
  When carga el croquis interactivo
  Then visualiza pines de colores sobre los pabellones
  And los pines representan cada reporte activo

@US29
Scenario: US29 - Scenario 2: Semántica de colores en mapa
  Given que se muestran los pines
  When el sistema evalúa el tipo de ticket
  Then debe pintar de rojo los S.O.S.
  And debe pintar de amarillo los tickets "En Proceso"
  And debe pintar de gris los reportes estándar pendientes

@US29
Scenario: US29 - Scenario 3: Agrupación de pines
  Given que existen múltiples reportes en un mismo pabellón o aula
  When el nivel de zoom es bajo
  Then el sistema agrupa los pines en un indicador numérico
  And el indicador se expande al tocarlo
  And muestra la lista individual de reportes


Rule: US30 - Ficha Técnica de Detalle y Contacto


# Como Personal de Soporte
# Quiero revisar la evidencia y datos del reportante
# Para preparar las herramientas necesarias antes de desplazarme al aula.

@US30
Scenario: US30 - Scenario 1: Inspección de evidencia
  Given que el técnico abre el detalle de un ticket
  When visualiza la ficha técnica
  Then el sistema muestra la foto
  And muestra el audio de descripción si existe
  And muestra la categoría de la falla

@US30
Scenario: US30 - Scenario 2: Interacción con evidencia visual
  Given que el técnico necesita ver detalles del daño
  When toca la imagen adjunta
  Then la app la expande a pantalla completa
  And permite realizar "pinch-to-zoom"

@US30
Scenario: US30 - Scenario 3: Canal de comunicación
  Given que la información del reporte es insuficiente para hallar la falla
  When el técnico está en el lugar
  Then el sistema habilita un botón de "Contactar Reportante"
  And permite iniciar un chat o llamada rápida


Rule: US31 - Marcado de Inicio de Atención


# Como Personal de Soporte
# Quiero registrar el inicio de la reparación al llegar al sitio
# Para que el Alumno/Docente reciba feedback de atención y el sistema mida el tiempo de respuesta real.

@US31
Scenario: US31 - Scenario 1: Cambio de estado a En Proceso
  Given que el técnico llega al aula
  When presiona el botón "Iniciar Reparación"
  Then el estado del ticket cambia a "En Proceso"
  And se dispara la notificación al Alumno/Docente reportante

@US31
Scenario: US31 - Scenario 2: Restricción de simultaneidad
  Given que el técnico ya tiene una tarea activa
  When intenta iniciar otra reparación
  Then el sistema bloquea la acción
  And exige finalizar o pausar la tarea previa

@US31
Scenario: US31 - Scenario 3: Validación de proximidad
  Given que el técnico intenta iniciar la reparación
  When el GPS detecta que está a más de 50 metros del aula asignada
  Then el sistema solicita una confirmación adicional
  And asegura que el técnico se encuentra en la ubicación correcta


Rule: US32 - Gestión de Pausa por Repuestos e Insumos


# Como Personal de Soporte
# Quiero marcar un ticket como pendiente por materiales
# Para justificar la demora y solicitar el insumo al almacén central.

@US32
Scenario: US32 - Scenario 1: Solicitud de material
  Given que la reparación requiere un repuesto no disponible en el momento
  When el técnico selecciona "Pausar por Insumos"
  Then el sistema abre un catálogo rápido de piezas comunes
  And permite seleccionar el material requerido

@US32
Scenario: US32 - Scenario 2: Evidencia de necesidad
  Given que se pausa el ticket por falta de materiales
  When el técnico guarda el estado
  Then el sistema obliga a adjuntar una foto de la pieza a sustituir
  And registra la evidencia para control de inventario

@US32
Scenario: US32 - Scenario 3: Comunicación de retraso
  Given que se registra la pausa por insumos
  When se confirma la acción
  Then el sistema envía automáticamente un mensaje al Alumno/Docente
  And el mensaje indica "Tu reporte requiere repuestos externos; el tiempo de atención se extenderá"


Rule: US33 - Registro de Resolución y Cierre de Ticket


# Como Personal de Soporte
# Quiero registrar la solución y adjuntar evidencia del trabajo terminado
# Para cerrar el caso y generar el registro de cumplimiento SLA.

@US33
Scenario: US33 - Scenario 1: Cierre formal
  Given que la falla fue corregida
  When el técnico presiona "Finalizar"
  And sube la foto del equipo operativo
  Then el ticket se marca como "Resuelto"
  And se registra el tiempo total de atención

@US33
Scenario: US33 - Scenario 2: Validación de evidencia final
  Given que el sistema exige foto de cierre
  When el técnico intenta subir la misma imagen del reporte inicial
  Then el sistema rechaza el archivo
  And solicita una captura real de la solución

@US33
Scenario: US33 - Scenario 3: Justificación de cierre
  Given que el técnico intenta cerrar el ticket
  When el campo de "Acción Realizada" está vacío
  Then el sistema bloquea el cierre
  And resalta el campo de texto como obligatorio


Rule: US34 - Resumen de Productividad Diaria


# Como Personal de Soporte
# Quiero visualizar mi desempeño diario en la aplicación
# Para realizar un seguimiento personal de mis metas y eficiencia.

@US34
Scenario: US34 - Scenario 1: Visualización de métricas
  Given que el técnico accede a su perfil
  When consulta la sección "Mi Productividad"
  Then visualiza un contador de tickets resueltos hoy
  And visualiza su tiempo promedio de reparación

@US34
Scenario: US34 - Scenario 2: Reinicio de ciclo
  Given que el sistema mide la jornada diaria
  When inicia un nuevo día a las 00:00
  Then los contadores visuales se reinician a cero
  And los datos anteriores se archivan en el historial histórico de rendimiento

@US34
Scenario: US34 - Scenario 3: Comparativa de equipo
  Given que el técnico finaliza su turno
  When revisa su resumen
  Then la app muestra un indicador comparativo
  And el indicador puede mostrar un mensaje como "Estás un 5% sobre el promedio de atención del equipo"
  And fomenta la mejora continua mediante gamificación

