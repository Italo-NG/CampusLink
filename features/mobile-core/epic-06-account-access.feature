# language: en

@mobile-core @prototype @manual @E6
Feature: E6 - Configuración de Cuenta y Accesos

Esta épica agrupa las historias relacionadas con autenticación institucional, configuración inicial, perfil, notificaciones, apariencia visual, ayuda, cierre de sesión y políticas de privacidad.

Rule: US43 - Inicio de sesión con credenciales institucionales


# Como Miembro de la comunidad universitaria
# Quiero iniciar sesión con mis credenciales institucionales de Microsoft 365
# Para acceder de forma segura sin necesidad de crear o recordar una cuenta nueva.

@US43
Scenario: US43 - Scenario 1: Inicio de sesión institucional exitoso
  Given que el Alumno/Docente ingresa con una cuenta institucional válida
  When el sistema valida las credenciales mediante Microsoft 365
  Then el usuario accede correctamente a CampusLink
  And el sistema lo dirige al Dashboard correspondiente según su rol

@US43
Scenario: US43 - Scenario 2: Restricción de dominio externo
  Given que el usuario intenta ingresar con un correo personal como "@gmail.com"
  When el sistema valida el formato del correo
  Then bloquea el acceso
  And muestra el mensaje "Acceso restringido: Solo se permiten correos institucionales de la UPC"

@US43
Scenario: US43 - Scenario 3: Error de credenciales
  Given que el usuario ingresa datos erróneos
  When el servicio de autenticación rechaza la solicitud
  Then el sistema resalta los campos
  And muestra el mensaje "Credenciales incorrectas. Intente nuevamente o recupere su clave en los canales oficiales"


Rule: US44 - Selección y Persistencia de Sede Predeterminada


# Como Alumno/Docente recurrente
# Quiero elegir mi sede principal tras el primer inicio de sesión
# Para que la aplicación personalice mi experiencia de navegación y reportes automáticamente.

@US44
Scenario: US44 - Scenario 1: Configuración inicial
  Given que es el primer ingreso del Alumno/Docente a la app
  When se despliega el selector de bienvenida
  Then el Alumno/Docente elige su sede
  And el sistema guarda esta preferencia en el perfil de la cuenta

@US44
Scenario: US44 - Scenario 2: Carga automática de preferencia
  Given que el Alumno/Docente ya seleccionó una sede en sesiones previas
  When abre la aplicación en el futuro
  Then el Dashboard carga por defecto la información de esa sede
  And no requiere una nueva selección

@US44
Scenario: US44 - Scenario 3: Obligatoriedad de selección
  Given que el Alumno/Docente intenta omitir el paso de selección de sede
  When presiona fuera del área de selección o intenta avanzar
  Then el sistema le impide continuar
  And solicita que elija una opción válida para configurar su entorno


Rule: US45 - Visualización de Perfil y Rol Institucional


# Como Alumno/Docente autenticado
# Quiero consultar mis datos personales y el rol asignado por la universidad
# Para verificar que mi identidad y permisos de uso son correctos.

@US45
Scenario: US45 - Scenario 1: Consulta de perfil
  Given que el Alumno/Docente accede a la sección "Mi Perfil"
  When carga la información desde la base de datos de la universidad
  Then visualiza su nombre completo
  And visualiza su código de alumno o trabajador
  And visualiza una etiqueta distintiva con su rol

@US45
Scenario: US45 - Scenario 2: Protección de categoría de rol
  Given que el rol es un dato sensible asignado administrativamente
  When el Alumno/Docente visualiza su perfil
  Then el campo "Rol" aparece como solo lectura
  And se impide cualquier intento de edición manual por seguridad

@US45
Scenario: US45 - Scenario 3: Fallo de sincronización de datos
  Given que el servidor de perfiles no responde
  When el Alumno/Docente intenta entrar a su perfil
  Then el sistema muestra estados de carga
  And muestra un botón de "Reintentar carga de perfil"


Rule: US46 - Configuración de Notificaciones Push


# Como Alumno/Docente enfocado
# Quiero personalizar el comportamiento de las notificaciones push
# Para evitar distracciones sonoras durante actividades académicas críticas.

@US46
Scenario: US46 - Scenario 1: Activación o desactivación de notificaciones
  Given que el Alumno/Docente accede a la sección de configuración
  When modifica el estado de las notificaciones push
  Then el sistema guarda la preferencia seleccionada
  And aplica la configuración en futuras alertas

@US46
Scenario: US46 - Scenario 2: Silenciar notificaciones durante actividades académicas
  Given que el Alumno/Docente necesita evitar distracciones
  When activa una opción de silencio o modo enfocado
  Then el sistema reduce las alertas sonoras
  And mantiene disponibles las notificaciones dentro de la bandeja interna

@US46
Scenario: US46 - Scenario 3: Permisos del sistema desactivados
  Given que el Alumno/Docente desactivó las notificaciones desde el sistema operativo
  When intenta activar las notificaciones desde CampusLink
  Then la aplicación muestra un aviso explicativo
  And orienta al usuario para habilitar los permisos desde la configuración del dispositivo


Rule: US47 - Alternancia entre Tema Claro y Modo Oscuro


# Como Alumno/Docente con fatiga visual o en ambientes oscuros
# Quiero alternar entre el tema claro y el modo oscuro
# Para mejorar la legibilidad y reducir el cansancio ocular.

@US47
Scenario: US47 - Scenario 1: Cambio de tema manual
  Given que el Alumno/Docente selecciona "Modo Oscuro" en los ajustes
  When confirma la elección
  Then la interfaz cambia inmediatamente su paleta de colores
  And usa fondos oscuros y textos de alto contraste

@US47
Scenario: US47 - Scenario 2: Adaptación automática
  Given que el Alumno/Docente elige la opción "Sincronizar con el sistema"
  When el dispositivo móvil cambia de modo por horario o ahorro de energía
  Then CampusLink ajusta su tema visual automáticamente en tiempo real

@US47
Scenario: US47 - Scenario 3: Contraste en elementos multimedia
  Given que la app está en modo oscuro
  When se visualiza una fotografía de evidencia clara
  Then el sistema aplica un borde o sombreado sutil a la imagen
  And asegura su diferenciación del fondo oscuro


Rule: US48 - Centro de Ayuda y Reporte de Errores Técnicos


# Como Alumno/Docente que detecta un fallo en el funcionamiento de la app
# Quiero enviar un comentario técnico a los desarrolladores
# Para contribuir a la mejora constante de la herramienta.

@US48
Scenario: US48 - Scenario 1: Envío de feedback exitoso
  Given que el Alumno/Docente redacta una sugerencia en el módulo de "Ayuda"
  When presiona "Enviar"
  Then el sistema procesa el mensaje
  And confirma la recepción con un mensaje de agradecimiento

@US48
Scenario: US48 - Scenario 2: Recolección de datos de diagnóstico
  Given que se envía un reporte de error
  When el Alumno/Docente confirma el envío
  Then la aplicación adjunta automáticamente metadatos técnicos
  And incluye la versión de app y el modelo de dispositivo

@US48
Scenario: US48 - Scenario 3: Validación de contenido
  Given que el Alumno/Docente intenta enviar un comentario en blanco
  When presiona el botón de envío
  Then el sistema bloquea la acción
  And solicita ingresar al menos una descripción breve del suceso


Rule: US49 - Cierre de Sesión Seguro y Limpieza de Datos


# Como Alumno/Docente que utiliza dispositivos compartidos o públicos
# Quiero cerrar mi sesión de forma definitiva
# Para proteger mi identidad y el historial de mis reportes.

@US49
Scenario: US49 - Scenario 1: Salida del sistema
  Given que el Alumno/Docente presiona "Cerrar Sesión"
  And confirma en el diálogo
  When el sistema procesa la petición
  Then se invalida el token de acceso
  And se redirige al usuario a la pantalla de bienvenida

@US49
Scenario: US49 - Scenario 2: Protección de caché
  Given que se ha cerrado la sesión exitosamente
  When un nuevo usuario intenta abrir la app en el mismo dispositivo
  Then el sistema asegura que los datos del usuario anterior hayan sido borrados
  And elimina historial, fotos temporales y datos locales sensibles

@US49
Scenario: US49 - Scenario 3: Confirmación preventiva
  Given que el Alumno/Docente pulsa accidentalmente el botón de salida
  When se detecta la interacción
  Then el sistema muestra un modal de confirmación obligatoria
  And evita cierres de sesión no deseados


Rule: US50 - Transparencia Legal y Políticas de Privacidad


# Como Alumno/Docente consciente de su privacidad
# Quiero acceder a los términos y condiciones de la aplicación
# Para conocer el tratamiento legal que reciben mis datos y fotografías dentro del campus.

@US50
Scenario: US50 - Scenario 1: Consulta de términos
  Given que el Alumno/Docente entra al menú de "Información Legal"
  When selecciona "Políticas de Privacidad"
  Then el sistema despliega el documento oficial actualizado
  And el documento se muestra conforme a la Ley de Protección de Datos Personales

@US50
Scenario: US50 - Scenario 2: Identificación de versión
  Given que el Alumno/Docente revisa la información legal o el pie de página del perfil
  When visualiza los detalles
  Then el sistema muestra claramente la versión actual del software instalada
  And puede visualizar un identificador como "v1.0.0"

@US50
Scenario: US50 - Scenario 3: Disponibilidad Offline
  Given que el Alumno/Docente intenta leer los términos sin conexión a internet
  When accede a la sección
  Then la aplicación carga una versión resumida almacenada localmente
  And garantiza el acceso a la información básica de privacidad

