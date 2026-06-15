# language: en

@mobile-core @prototype @manual @E1
Feature: E1 - Reporte Rápido con Código QR

Esta épica agrupa las historias relacionadas con el reporte rápido de incidencias mediante código QR, ubicación automática o manual, evidencia, categoría, descripción, audio, envío del reporte y control de salida del flujo.

Rule: US00 - Dashboard Principal de Acceso Directo


# Como Alumno/Docente de CampusLink
# Quiero una pantalla de inicio con botones claros y visibles
# Para acceder a las funciones críticas (Reporte QR y Botón SOS) sin navegar por menús complejos.

@US00
Scenario: US00 - Scenario 1: Visualización del Home
  Given que el Alumno/Docente abre la aplicación y está autenticado
  When carga la pantalla principal
  Then el sistema muestra dos botones de alta prioridad: "Reportar Falla (QR)" y "Emergencia (SOS)"

@US00
Scenario: US00 - Scenario 2: Priorización visual
  Given que el Alumno/Docente está en el Dashboard
  When visualiza los botones principales
  Then el botón "SOS" debe tener un color distintivo de alerta
  And el botón "Reportar Falla (QR)" debe ser prominente para acceder rápidamente al flujo de reporte

@US00
Scenario: US00 - Scenario 3: Falla de carga inicial
  Given que el Alumno/Docente abre la app sin conexión a internet
  When el sistema no puede cargar los servicios iniciales
  Then muestra un mensaje de "Error de conexión"
  And muestra un botón de "Reintentar" para refrescar el Dashboard


Rule: US01 - Interfaz de escáner QR de infraestructura


# Como Alumno/Docente Reportante
# Quiero visualizar un marco de escaneo activo usando la cámara de mi dispositivo
# Para enfocar y leer rápidamente el código QR pegado en el ambiente afectado.

@US01
Scenario: US01 - Scenario 1: Activación exitosa del escáner QR
  Given que el Alumno/Docente presiona el botón "Reportar Falla"
  When la aplicación tiene los permisos de cámara concedidos
  Then se muestra la cámara a pantalla completa con un visor de escaneo
  And el sistema activa el enfoque automático de la lente

@US01
Scenario: US01 - Scenario 2: Validación de formato y feedback del QR
  Given que el Alumno/Docente está escaneando un código
  When la cámara reconoce un código QR
  Then el sistema debe verificar que el código pertenezca al dominio cifrado de CampusLink
  And si es válido, el dispositivo debe emitir una vibración corta
  And el sistema debe redirigir al formulario de reporte

@US01
Scenario: US01 - Scenario 3: Código QR no reconocido
  Given que el Alumno/Docente está escaneando un código
  When el QR leído no pertenece al dominio de CampusLink
  Then el sistema muestra un mensaje flotante "Código QR no válido para reporte"
  And mantiene el escáner activo para un nuevo intento

@US01
Scenario: US01 - Scenario 4: Permisos de cámara denegados
  Given que el Alumno/Docente no ha otorgado permisos de cámara
  When intenta abrir el escáner
  Then el sistema muestra un modal con el mensaje "Se requiere acceso a la cámara para esta función"
  And presenta un botón de "Ir a Ajustes" para que el Alumno/Docente pueda activarlo manualmente


Rule: US02 - Autocompletado de formulario post-escaneo


# Como Alumno/Docente Reportante
# Quiero que el sistema cargue automáticamente los datos del lugar tras escanear el QR
# Para no tener que tipear el nombre de la sede, pabellón y aula.

@US02
Scenario: US02 - Scenario 1: Autocompletado de ubicación
  Given que el Alumno/Docente escaneó un QR válido del campus
  When ingresa a la pantalla de "Nuevo Reporte"
  Then los campos "Sede", "Pabellón" y "Aula" aparecen llenos automáticamente con la información de la base de datos

@US02
Scenario: US02 - Scenario 2: Inmutabilidad de datos autocompletados
  Given que el sistema autocompletó la ubicación mediante QR
  When el Alumno/Docente visualiza el formulario
  Then el sistema mantiene los campos en estado "Bloqueado/Solo Lectura" para evitar alteraciones manuales
  And muestra un indicador visual que confirma el bloqueo

@US02
Scenario: US02 - Scenario 3: Código QR válido pero no registrado
  Given que el Alumno/Docente escanea un QR válido, pero no registrado en la base de datos
  When el sistema intenta hacer el "match"
  Then muestra una alerta "Ubicación no encontrada"
  And redirige al flujo de ingreso manual desbloqueando los campos para su selección


Rule: US03 - Ingreso manual de ubicación


# Como Alumno/Docente Reportante
# Quiero poder ingresar mi ubicación manualmente mediante listas desplegables
# Para poder reportar la falla incluso si el código QR físico está arrancado o ilegible.

@US03
Scenario: US03 - Scenario 1: Selección manual en cascada
  Given que el Alumno/Docente elige el ingreso manual
  When selecciona una "Sede"
  Then el sistema habilita el siguiente desplegable filtrando únicamente los pabellones de esa sede
  And al elegir un pabellón, se filtran automáticamente las aulas correspondientes

@US03
Scenario: US03 - Scenario 2: Obligatoriedad de jerarquía en ubicación
  Given que el Alumno/Docente está en el formulario manual
  When intenta interactuar con el desplegable de "Aula" sin haber elegido una "Sede" y "Pabellón" previos
  Then el desplegable de "Aula" debe permanecer inactivo
  And el sistema debe mostrar una ayuda visual indicando que debe seguir el orden jerárquico

@US03
Scenario: US03 - Scenario 3: Falla de conexión a base de datos
  Given que el Alumno/Docente abre el formulario manual
  When hay una caída de internet y las listas no pueden cargar desde el servidor
  Then el sistema muestra el mensaje "Error de conexión. Toca para reintentar cargar las ubicaciones"
  And mantiene un estado de carga hasta que la conexión se restablezca


Rule: US04 - Componente de carga de evidencia fotográfica


# Como Alumno/Docente Reportante
# Quiero adjuntar una foto del problema desde mi galería o cámara
# Para proveer evidencia visual exacta al equipo de mantenimiento.

@US04
Scenario: US04 - Scenario 1: Carga exitosa de evidencia fotográfica
  Given que el Alumno/Docente selecciona una foto de su galería o la captura con la cámara
  When la imagen se procesa correctamente
  Then el sistema muestra una miniatura de la foto en el formulario
  And habilita un botón de "Eliminar" por si el Alumno/Docente desea cambiar la imagen

@US04
Scenario: US04 - Scenario 2: Límite de peso y formato de imagen
  Given que el Alumno/Docente intenta adjuntar un archivo
  When el sistema valida el archivo seleccionado
  Then solo debe permitir extensiones JPG o PNG
  And solo debe permitir un peso máximo de 5MB
  And en caso de cumplir con los requisitos, se muestra una barra de progreso durante la carga

@US04
Scenario: US04 - Scenario 3: Exceso de peso o formato inválido
  Given que el Alumno/Docente elige un archivo de 8MB o un formato no permitido
  When intenta cargarlo al formulario
  Then la carga se detiene automáticamente
  And el sistema muestra un mensaje de error "Archivo no permitido. Asegúrate que sea una imagen JPG/PNG de máximo 5MB"


Rule: US05 - Selección visual de categoría de falla


# Como Alumno/Docente Reportante
# Quiero elegir el tipo de problema tocando un botón visual
# Para clasificar el problema rápidamente sin escribir.

@US05
Scenario: US05 - Scenario 1: Selección de chip de categoría
  Given que el Alumno/Docente visualiza la lista de categorías
  When toca la categoría "Mobiliario"
  Then el chip cambia su estilo visual para indicar que está seleccionado
  And se habilita el botón de "Enviar Reporte" si el resto de campos obligatorios están listos

@US05
Scenario: US05 - Scenario 2: Exclusividad mutua de categoría
  Given que el Alumno/Docente ya tiene seleccionada la categoría "Mobiliario"
  When toca la categoría "Eléctrico"
  Then el sistema marca "Eléctrico" como la única opción activa
  And desmarca automáticamente la selección anterior
  And asegura que solo se envíe una categoría por reporte

@US05
Scenario: US05 - Scenario 3: Omisión de selección de categoría
  Given que el Alumno/Docente intenta presionar el botón de envío
  When no ha seleccionado ningún chip de categoría
  Then el sistema impide el envío del formulario
  And la sección de categorías muestra una alerta visual o un mensaje de "Selección obligatoria"


Rule: US06 - Ingreso de descripción de texto breve


# Como Alumno/Docente Reportante
# Quiero disponer de un cuadro de texto en el formulario
# Para agregar detalles específicos que la foto no pueda mostrar.

@US06
Scenario: US06 - Scenario 1: Ingreso de texto en descripción
  Given que el Alumno/Docente selecciona el campo de "Descripción"
  When escribe los detalles específicos de la falla detectada
  Then el sistema visualiza el texto en tiempo real
  And actualiza un contador de caracteres indicando el espacio disponible

@US06
Scenario: US06 - Scenario 2: Límite de caracteres en descripción
  Given que el Alumno/Docente está redactando la descripción
  When alcanza el límite máximo de 250 caracteres
  Then el campo bloquea cualquier entrada de texto adicional
  And el contador de caracteres resalta para advertir el límite

@US06
Scenario: US06 - Scenario 3: Sanitización de entradas
  Given que el Alumno/Docente intenta pegar fragmentos de código o scripts
  When el campo procesa la entrada de texto
  Then el sistema limpia automáticamente los caracteres especiales no permitidos
  And muestra un mensaje de advertencia "Se han removido caracteres no permitidos por seguridad"


Rule: US07 - Grabación de nota de voz como descripción


# Como Alumno/Docente Reportante en movimiento
# Quiero mantener presionado un botón de micrófono para grabar la descripción
# Para enviar el reporte rápidamente si no puedo detenerme a escribir.

@US07
Scenario: US07 - Scenario 1: Grabación exitosa de nota de voz
  Given que el Alumno/Docente mantiene presionado el botón de micrófono
  When habla y suelta el botón tras terminar su mensaje
  Then el sistema genera un archivo de audio comprimido
  And lo adjunta al formulario mostrando un reproductor con el botón "Reproducir" y "Eliminar"

@US07
Scenario: US07 - Scenario 2: Límite de tiempo de grabación
  Given que el Alumno/Docente está grabando una nota de voz
  When la grabación alcanza los 30 segundos de duración
  Then el sistema detiene la captura automáticamente
  And guarda el fragmento grabado
  And notifica al Alumno/Docente que se alcanzó el límite de tiempo

@US07
Scenario: US07 - Scenario 3: Grabación demasiado corta
  Given que el Alumno/Docente presiona el botón de micrófono por accidente
  When la grabación dura menos de 2 segundos antes de ser soltada
  Then el sistema descarta el archivo automáticamente
  And muestra un mensaje flotante "Grabación muy corta. Mantén presionado para grabar"


Rule: US08 - Pantalla de estado de éxito y generación de ticket


# Como Alumno/Docente Reportante
# Quiero ver una pantalla de confirmación tras el envío
# Para tener la seguridad visual de que mi reporte fue recibido y tener mi código de seguimiento.

@US08
Scenario: US08 - Scenario 1: Confirmación de envío del reporte
  Given que el Alumno/Docente completó el formulario con datos válidos
  When presiona el botón "Enviar Reporte"
  Then el sistema muestra una pantalla de éxito con una ilustración o check verde
  And visualiza de forma destacada el ID del ticket generado
  And muestra un botón para "Volver al Inicio"

@US08
Scenario: US08 - Scenario 2: Nomenclatura del ticket
  Given que el sistema procesa el nuevo reporte exitosamente
  When genera el identificador único de seguimiento
  Then este debe seguir obligatoriamente la estructura "TCK-YYYYMMDD-XXXX"
  And el ID debe ser seleccionable para que el Alumno/Docente pueda copiarlo al portapapeles

@US08
Scenario: US08 - Scenario 3: Falla de servidor al enviar reporte
  Given que el Alumno/Docente presiona el botón de enviar
  When el servidor no responde por tiempo de espera o falta de conexión
  Then la aplicación muestra una pantalla de error con el mensaje "Servidores ocupados temporalmente"
  And ofrece la opción de guardar el reporte en la sección de "Borradores Pendientes"
  And permite reintentar el envío más tarde


Rule: US09 - Control de flujo y salida de emergencia


# Como Alumno/Docente Reportante
# Quiero tener un botón de "Cancelar" o "Atrás" siempre disponible durante el reporte
# Para poder abandonar el proceso si cometí un error o decidí no enviar la información.

@US09
Scenario: US09 - Scenario 1: Abandono de formulario con datos
  Given que el Alumno/Docente ha ingresado información en el formulario
  When presiona el botón "Cancelar" o la flecha de retroceso
  Then el sistema lanza un mensaje de confirmación "¿Deseas descartar el reporte actual? Se perderán los datos"

@US09
Scenario: US09 - Scenario 2: Salida de formulario vacío
  Given que el Alumno/Docente entró al formulario, pero no ha ingresado ningún dato ni adjunto
  When presiona el botón "Atrás" o "Cancelar"
  Then el sistema lo redirige al Dashboard inmediatamente
  And no muestra mensajes de confirmación

@US09
Scenario: US09 - Scenario 3: Confirmación de descarte del reporte
  Given que el Alumno/Docente ve el mensaje de confirmación tras intentar cancelar
  When selecciona la opción "Sí, descartar"
  Then el sistema elimina todos los datos temporales
  And elimina todos los archivos adjuntos
  And regresa a la pantalla de inicio

