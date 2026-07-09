var IDIOMA_PREDETERMINADO = 'es';
var IDIOMAS_VALIDOS = ['es', 'en'];
var ATRIBUTOS_TRADUCIBLES = ['aria-label', 'alt', 'title', 'placeholder', 'content'];
var EVENTO_IDIOMA = 'campuslink:idioma';

var originalesTexto = new WeakMap();
var originalesAtributos = new WeakMap();
var i18nInicializado = false;
var idiomaActual = obtenerIdiomaDesdeUrl();

var TRADUCCIONES_EN = {
  'Saltar al contenido': 'Skip to content',
  'Saltar al formulario': 'Skip to form',
  'CampusLink, ir al inicio': 'CampusLink, go to home',
  'Navegación principal': 'Primary navigation',
  'Abrir o cerrar el menú de navegación': 'Open or close navigation menu',
  'Menú': 'Menu',
  'Problema': 'Problem',
  'Producto': 'Product',
  'Solución': 'Solution',
  'Sobre el producto': 'About the product',
  'Cómo funciona': 'How it works',
  'Vista de la app': 'App view',
  'Beneficios': 'Benefits',
  'Para quiénes': 'Who it is for',
  'Video del equipo': 'Team video',
  'Quiénes somos': 'Who we are',
  'Contacto': 'Contact',
  'Iniciar sesión': 'Log in',
  'Reporta incidencias al instante': 'Report incidents instantly',
  'CampusLink conecta a estudiantes, docentes y personal de soporte para reportar, ubicar y dar seguimiento a incidencias de infraestructura, bienestar y seguridad dentro del campus': 'CampusLink connects students, teachers, and support staff to report, locate, and track infrastructure, wellbeing, and security incidents on campus',
  'Estudiante usando CampusLink para reportar una incidencia del campus: escanea un QR, registra la falla con evidencia y el personal de soporte la atiende': 'Student using CampusLink to report a campus incident: scanning a QR code, recording the issue with evidence, and support staff resolving it',
  'Categorías de incidencia que puedes reportar': 'Incident categories you can report',
  'Mobiliario': 'Furniture',
  'Eléctrico': 'Electrical',
  'Multimedia': 'Multimedia',
  'Limpieza': 'Cleaning',
  'Internet': 'Internet',
  'Otro': 'Other',
  'Problema actual': 'Current problem',
  'La falta de un canal eficiente y centralizado para reportar incidencias de infraestructura, bienestar y seguridad en el campus genera demoras, poca visibilidad y frustración para los usuarios': 'The lack of an efficient, centralized channel for reporting infrastructure, wellbeing, and security incidents on campus creates delays, low visibility, and frustration for users',
  'Reportes dispersos': 'Scattered reports',
  'Falta de seguimiento': 'Lack of follow-up',
  'Información incompleta para soporte': 'Incomplete information for support',
  'Nuestra solución': 'Our solution',
  'CampusLink convierte una incidencia del campus en un reporte claro, ubicado y trazable, para que el equipo de soporte pueda actuar con mayor rapidez.': 'CampusLink turns a campus incident into a clear, located, and traceable report so the support team can act faster.',
  'Reporte rápido': 'Fast reporting',
  'QR y formulario breve': 'QR and short form',
  'Ubicación precisa': 'Precise location',
  'Ambiente identificado': 'Identified space',
  'Evidencia clara': 'Clear evidence',
  'Foto y descripción': 'Photo and description',
  'Seguimiento visible': 'Visible tracking',
  'Estado del reporte': 'Report status',
  'Reporta una incidencia en pocos pasos y permite que soporte reciba información clara desde el primer momento.': 'Report an incident in a few steps and help support receive clear information from the start.',
  'CampusLink — video de presentación del producto': 'CampusLink - product presentation video',
  '¿Cómo funciona CampusLink?': 'How does CampusLink work?',
  'Mira en un minuto cómo CampusLink facilita reportar y dar seguimiento a las incidencias de tu campus.': 'See in one minute how CampusLink makes it easier to report and track incidents on your campus.',
  'Detecta una incidencia': 'Detect an incident',
  'El usuario encuentra una falla en un aula, laboratorio, baño o zona común.': 'The user finds an issue in a classroom, lab, restroom, or common area.',
  'Escanea el QR del ambiente': 'Scan the space QR code',
  'CampusLink identifica el lugar del reporte sin que el usuario tenga que escribir toda la ubicación.': 'CampusLink identifies the report location without requiring the user to type the full location.',
  'Registra evidencia': 'Record evidence',
  'El usuario agrega una foto y una descripción breve del problema.': 'The user adds a photo and a short description of the problem.',
  'Soporte recibe el reporte': 'Support receives the report',
  'El personal de soporte visualiza la categoría, ubicación y evidencia para priorizar la atención.': 'Support staff see the category, location, and evidence to prioritize service.',
  'Revisa el seguimiento': 'Check the tracking',
  'El usuario consulta el estado del reporte: pendiente, en proceso o resuelto.': 'The user checks the report status: pending, in progress, or resolved.',
  'Pantallas del flujo de CampusLink': 'CampusLink flow screens',
  'Pantalla de CampusLink para detectar una incidencia en el campus': 'CampusLink screen for detecting a campus incident',
  'Pantalla de CampusLink para escanear el QR del ambiente': 'CampusLink screen for scanning the space QR code',
  'Pantalla de CampusLink para registrar evidencia de una incidencia': 'CampusLink screen for recording incident evidence',
  'Pantalla de soporte de CampusLink recibiendo un reporte de incidencia': 'CampusLink support screen receiving an incident report',
  'Pantalla de CampusLink para revisar el seguimiento de un reporte': 'CampusLink screen for checking report tracking',
  'Cada función de CampusLink mejora algo concreto para quien reporta y para quien resuelve': 'Each CampusLink feature improves something concrete for the person reporting and the person resolving',
  'Reporte más rápido': 'Faster reporting',
  'Reporta desde un QR y un formulario breve, sin perder tiempo buscando a quién avisar': 'Report from a QR code and a short form without wasting time finding who to notify',
  'Resultado:': 'Result:',
  'Menos fricción para estudiantes y docentes': 'Less friction for students and teachers',
  'Ubicación más precisa': 'More precise location',
  'Identifica el ambiente o zona afectada; soporte recibe el lugar exacto del problema': 'Identify the affected room or area; support receives the exact problem location',
  'Menos confusión y desplazamientos innecesarios': 'Less confusion and fewer unnecessary trips',
  'Foto y descripción breve para entender la falla antes de llegar': 'Photo and short description to understand the issue before arriving',
  'Mejor diagnóstico y atención más preparada': 'Better diagnosis and more prepared service',
  'Seguimiento transparente': 'Transparent tracking',
  'Estados visibles del reporte: pendiente, en proceso y resuelto': 'Visible report statuses: pending, in progress, and resolved',
  'Menos incertidumbre y mayor confianza': 'Less uncertainty and greater trust',
  'Priorización operativa': 'Operational prioritization',
  'Organiza los reportes por criticidad, categoría, estado o ubicación': 'Organize reports by criticality, category, status, or location',
  'Atención más eficiente de los casos importantes': 'More efficient handling of important cases',
  'CampusLink está diseñado para quienes reportan incidencias y para quienes las atienden dentro del campus.': 'CampusLink is designed for those who report incidents and those who handle them on campus.',
  'Estudiantes': 'Students',
  'Quienes usan los espacios del campus a diario.': 'People who use campus spaces every day.',
  'Detectan fallas en aulas, baños, laboratorios o zonas comunes, pero no siempre tienen un canal claro para reportarlas.': 'They detect issues in classrooms, restrooms, labs, or common areas, but they do not always have a clear channel to report them.',
  'Acción': 'Action',
  'Reportan incidencias con QR, foto y descripción breve.': 'They report incidents with a QR code, photo, and short description.',
  'Valor': 'Value',
  'Saben que su reporte no cae en el vacío y pueden revisar su seguimiento.': 'They know their report does not disappear and can check its progress.',
  'Docentes': 'Teachers',
  'Quienes dictan clase y dependen de los ambientes y equipos.': 'People who teach classes and depend on rooms and equipment.',
  'Una falla técnica o de infraestructura puede interrumpir el desarrollo de una clase.': 'A technical or infrastructure issue can interrupt a class.',
  'Solicitan atención cuando un ambiente o equipo afecta la continuidad académica.': 'They request support when a room or piece of equipment affects academic continuity.',
  'Reducen pérdida de tiempo y mantienen mayor control durante la sesión.': 'They reduce lost time and keep greater control during the session.',
  'Personal de soporte y operaciones': 'Support and operations staff',
  'Quienes reciben y resuelven los reportes.': 'People who receive and resolve reports.',
  'Reciben reportes incompletos, ambiguos o sin ubicación exacta.': 'They receive incomplete, ambiguous reports or reports without an exact location.',
  'Visualizan ubicación, categoría, evidencia y estado del reporte.': 'They see the report location, category, evidence, and status.',
  'Priorizan mejor y evitan desplazamientos innecesarios.': 'They prioritize better and avoid unnecessary trips.',
  'Prototipo interactivo de CampusLink': 'CampusLink interactive prototype',
  'CampusLink - video del equipo': 'CampusLink - team video',
  'Montimin es un equipo de estudiantes de Ingeniería de Software enfocado en crear soluciones digitales para mejorar la experiencia universitaria. Con CampusLink, buscamos facilitar el reporte y seguimiento de incidencias dentro del campus de forma rápida, clara y accesible.': 'Montimin is a team of Software Engineering students focused on creating digital solutions to improve the university experience. With CampusLink, we aim to make campus incident reporting and tracking fast, clear, and accessible.',
  'Estudiante de Ingeniería de Software. Aporta pensamiento lógico, análisis de requerimientos y enfoque técnico para estructurar funcionalidades claras, viables y orientadas a resolver necesidades reales del campus.': 'Software Engineering student. Contributes logical thinking, requirements analysis, and a technical approach to structure clear, viable features aimed at solving real campus needs.',
  'Estudiante de Ingeniería de Software. Aporta organización de contenido y desarrollo del landing page, comunicando la propuesta de valor de CampusLink de manera clara y funcional.': 'Software Engineering student. Contributes content organization and landing page development, communicating CampusLink’s value proposition clearly and functionally.',
  'Conversemos sobre CampusLink': 'Let’s talk about CampusLink',
  'CampusLink ayuda a universidades a centralizar el reporte y seguimiento de incidencias de infraestructura, bienestar y seguridad dentro del campus.': 'CampusLink helps universities centralize the reporting and tracking of infrastructure, wellbeing, and security incidents on campus.',
  'Solicitar información': 'Request information',
  'Reporte rápido mediante QR': 'Fast reporting via QR',
  'Seguimiento del estado del caso': 'Case status tracking',
  'Información más clara para soporte': 'Clearer information for support',
  'Mejor coordinación entre usuarios y operaciones': 'Better coordination between users and operations',
  'Ideal para instituciones que buscan una gestión más ordenada dentro del campus.': 'Ideal for institutions seeking more organized campus management.',
  'Tipo de institución': 'Institution type',
  'Selecciona una opción': 'Select an option',
  'Universidad': 'University',
  'Instituto': 'Institute',
  'Colegio': 'School',
  'Nombre de la institución': 'Institution name',
  'Ej. Universidad Nacional de Ingeniería': 'E.g. National University of Engineering',
  'Nombre del contacto': 'Contact name',
  'Ej. María Fernández': 'E.g. Maria Fernandez',
  'Cargo': 'Role',
  'Ej. Jefa de Servicios Generales': 'E.g. Head of General Services',
  'Correo institucional': 'Institutional email',
  'nombre@institucion.edu.pe': 'name@institution.edu.pe',
  'Teléfono': 'Phone',
  'Ej. 987 654 321': 'E.g. 987 654 321',
  'Número aproximado de estudiantes': 'Approximate number of students',
  'Selecciona un rango': 'Select a range',
  'Menos de 500': 'Less than 500',
  '500 a 2000': '500 to 2000',
  '2000 a 5000': '2000 to 5000',
  'Más de 5000': 'More than 5000',
  '¿Qué te interesa conocer?': 'What would you like to learn about?',
  'Una demostración de la app': 'An app demonstration',
  'Las funciones principales': 'The main features',
  'Cómo implementarlo en el campus': 'How to implement it on campus',
  'Información general': 'General information',
  'Cuéntanos sobre las necesidades de tu campus': 'Tell us about your campus needs',
  'Cuéntanos qué incidencias de infraestructura, bienestar o seguridad quieres gestionar mejor en tu campus.': 'Tell us which infrastructure, wellbeing, or security incidents you want to manage better on your campus.',
  'Enviar solicitud': 'Send request',
  'Al enviar tu solicitud aceptas que CampusLink trate los datos proporcionados con la única finalidad de responder tu consulta y contactarte vía WhatsApp. No compartimos tu información con terceros.': 'By sending your request, you agree that CampusLink may process the provided data solely to answer your inquiry and contact you via WhatsApp. We do not share your information with third parties.',
  'Reporte, ubicación, evidencia y seguimiento de incidencias del campus en un solo lugar': 'Campus incident reporting, location, evidence, and tracking in one place',
  'por Montimin': 'by Montimin',
  'Iniciar sesión | CampusLink': 'Log in | CampusLink',
  'Acceso basico a CampusLink con correo institucional UPC': 'Basic CampusLink access with a UPC institutional email',
  'Volver a la landing de CampusLink': 'Back to the CampusLink landing page',
  'Volver': 'Back',
  'Ingresa con tu correo institucional UPC para continuar en CampusLink.': 'Enter your UPC institutional email to continue in CampusLink.',
  'Contraseña': 'Password',
  'Mínimo 8 caracteres': 'Minimum 8 characters',
  'Usa tu cuenta institucional terminada en @upc.edu.pe.': 'Use your institutional account ending in @upc.edu.pe.',
  'Usa la contraseña de tu cuenta institucional.': 'Use your institutional account password.',
  '¿Olvidaste tu contraseña?': 'Forgot your password?',
  '¿No tienes cuenta?': 'Don’t have an account?',
  'Crear cuenta': 'Create account',
  'Ingresa tu correo institucional.': 'Enter your institutional email.',
  'Escribe un correo válido.': 'Enter a valid email.',
  'Solo se permiten correos institucionales UPC.': 'Only UPC institutional emails are allowed.',
  'Ingresa tu contraseña.': 'Enter your password.',
  'La contraseña debe tener al menos 8 caracteres.': 'The password must be at least 8 characters long.',
  'Recupera tu contraseña desde los canales oficiales de UPC': 'Recover your password through UPC’s official channels',
  'Solicita el registro con tu correo institucional UPC': 'Request registration with your UPC institutional email',
  'Revisa los campos marcados para continuar.': 'Review the marked fields to continue.',
  'Tus datos son válidos. Acceso concedido': 'Your data is valid. Access granted',
  'Selector de idioma': 'Language selector',
  'Cambiar idioma a español': 'Switch language to Spanish',
  'Cambiar idioma a inglés': 'Switch language to English',
  'Español': 'Spanish',
  'Inglés': 'English',
  'Estudiante': 'Student',
  'Docente': 'Teacher',
  'Soporte': 'Support',
  'Todas': 'All',
  'Nuevo reporte': 'New report',
  'Ubicación': 'Location',
  'Cancelar': 'Cancel',
  'Aula': 'Room',
  'Sede': 'Campus',
  'Pabellón': 'Building',
  'Piso': 'Floor',
  'Categoría': 'Category',
  'Descripción': 'Description',
  'Evidencia': 'Evidence',
  'Detalles': 'Details',
  'Estado': 'Status',
  'Pendiente': 'Pending',
  'En proceso': 'In progress',
  'En atención': 'Being handled',
  'Resuelto': 'Resolved',
  'Cancelado': 'Canceled',
  'Cancelados': 'Canceled',
  'Activos': 'Active',
  'Resueltos': 'Resolved',
  'Asignado': 'Assigned',
  'Asignadas': 'Assigned',
  'Recibido': 'Received',
  'Prioritario': 'Priority',
  'Prioritarias': 'Priority',
  'Normal': 'Normal',
  'Críticos': 'Critical',
  'Urgencia': 'Urgency',
  'Mis reportes': 'My reports',
  'Notificaciones': 'Notifications',
  'Perfil': 'Profile',
  'Preferencias': 'Preferences',
  'Seguridad y cuenta': 'Security and account',
  'Privacidad de datos': 'Data privacy',
  'Actualizaciones por correo': 'Email updates',
  'Cambiar contraseña': 'Change password',
  'Cerrar sesión': 'Log out',
  'Volver al inicio': 'Back home',
  'Volver a Mis reportes': 'Back to My reports',
  'Ver seguimiento': 'View tracking',
  'Ver Seguimiento': 'View tracking',
  'Ver historial': 'View history',
  'Editar': 'Edit',
  'Revisar': 'Review',
  'Continuar': 'Continue',
  'Enviar reporte': 'Send report',
  'Enviar S.O.S.': 'Send S.O.S.',
  'Enviar alerta S.O.S.': 'Send S.O.S. alert',
  'Enviar calificación': 'Send rating',
  'Enviar reapertura': 'Send reopening request',
  'Reabrir ticket': 'Reopen ticket',
  'Cerrar ticket': 'Close ticket',
  'Pausar ticket': 'Pause ticket',
  'Iniciar atención': 'Start service',
  'Iniciar Atencion': 'Start service',
  'Registrar solución': 'Register solution',
  'Registrar insumo': 'Register supply',
  'Registrar insumo requerido': 'Register required supply',
  'Pausar por insumos': 'Pause for supplies',
  'Confirmar solución': 'Confirm solution',
  'Confirmar llegada del técnico': 'Confirm technician arrival',
  'S.O.S. Aula': 'Classroom S.O.S.',
  '¿Qué es S.O.S. Aula?': 'What is Classroom S.O.S.?',
  'Envía una alerta prioritaria al equipo de soporte cuando una falla en el aula requiere atención inmediata. Incluye tu aula actual para que puedan ubicarte rápido. Úsalo solo para urgencias reales.': 'Send a priority alert to the support team when a classroom issue needs immediate attention. Include your current room so they can locate you quickly. Use it only for real emergencies.',
  'Código QR no reconocido': 'QR code not recognized',
  'Intenta escanear nuevamente o ingresa la ubicación manualmente.': 'Try scanning again or enter the location manually.',
  'Reintentar escaneo': 'Retry scan',
  'Ingresar ubicación manualmente': 'Enter location manually',
  'Escanea el código': 'Scan the code',
  'Apunta al código QR ubicado en el aula, laboratorio o ambiente afectado.': 'Point at the QR code located in the affected classroom, lab, or space.',
  'Simular QR válido': 'Simulate valid QR',
  'Seleccionar sede': 'Select campus',
  'Elige la sede donde ocurre la incidencia.': 'Choose the campus where the incident is happening.',
  'Selecciona el ambiente donde ocurre la incidencia.': 'Select the space where the incident is happening.',
  'Esta ubicación será enviada al equipo de soporte.': 'This location will be sent to the support team.',
  'Revisa tu reporte': 'Review your report',
  'El equipo de soporte recibirá la ubicación y evidencia para atender la incidencia.': 'The support team will receive the location and evidence to handle the incident.',
  'Recibirás notificaciones cuando el estado cambie.': 'You will receive notifications when the status changes.',
  'Reporte enviado': 'Report sent',
  'Tu incidencia fue registrada correctamente.': 'Your incident was registered successfully.',
  'Tu reporte ha sido ingresado al sistema y está en cola de revisión.': 'Your report has been entered into the system and is queued for review.',
  'Reporte descartado': 'Report discarded',
  'Tu reporte no fue enviado y la información ingresada fue eliminada.': 'Your report was not sent and the entered information was deleted.',
  'Imagen cargada correctamente': 'Image uploaded successfully',
  'Sin evidencia adjunta': 'No evidence attached',
  'Agregar foto': 'Add photo',
  'Agregar foto de evidencia': 'Add evidence photo',
  'Evidencia fotográfica': 'Photo evidence',
  'Descripción breve': 'Short description',
  'Derramaron gaseosa en el aula': 'Soda was spilled in the classroom',
  'Reporte confirmado': 'Report confirmed',
  'Ticket ID': 'Ticket ID',
  'Consulta el avance de las incidencias que registraste.': 'Check the progress of the incidents you registered.',
  'Escanea el código de un ambiente para reportar incidencias.': 'Scan a space code to report incidents.',
  'Tu reporte fue recibido por el equipo de soporte.': 'Your report was received by the support team.',
  'Puedes seguir el avance desde tus reportes activos.': 'You can follow the progress from your active reports.',
  'Un técnico está atendiendo la incidencia reportada.': 'A technician is handling the reported incident.',
  'El ticket TCK-20260512-0001 fue marcado como cancelado.': 'Ticket TCK-20260512-0001 was marked as canceled.',
  'Reporte cancelado': 'Report canceled',
  'La cancelación ya no está disponible porque la atención fue iniciada.': 'Cancellation is no longer available because service has started.',
  'Se registró una actualización en tu reporte multimedia.': 'An update was registered on your multimedia report.',
  'Tu ticket TCK-20260501-0005 fue resuelto.': 'Your ticket TCK-20260501-0005 was resolved.',
  'Tu ticket TCK-20260510-0008 está en proceso.': 'Your ticket TCK-20260510-0008 is in progress.',
  'Soporte recibió tu alerta prioritaria y revisará el aula indicada.': 'Support received your priority alert and will review the indicated room.',
  'Hola, Mateo': 'Hello, Mateo',
  'Hola, Elena': 'Hello, Elena',
  'Hola, Ricardo': 'Hello, Ricardo',
  'Buen trabajo, Ricardo': 'Good work, Ricardo',
  'Gestión inteligente del campus': 'Smart campus management',
  'Reporta incidencias, sigue su estado y ayuda a mejorar tu entorno universitario.': 'Report incidents, track their status, and help improve your university environment.',
  'Ingresa con tu correo institucional para continuar con tus reportes y seguimiento.': 'Enter your institutional email to continue with your reports and tracking.',
  'Crea tu cuenta institucional para reportar incidencias y revisar su atención.': 'Create your institutional account to report incidents and review service progress.',
  'Ingresar con cuenta UPC': 'Sign in with UPC account',
  'Ya tengo cuenta': 'I already have an account',
  'Únete a CampusLink': 'Join CampusLink',
  'Nombre y apellido': 'Full name',
  'Código UPC': 'UPC code',
  'Confirmar contraseña': 'Confirm password',
  'Conoce cómo protegemos tus datos': 'Learn how we protect your data',
  'Tu rol': 'Your role',
  'Configuracion experiencia': 'Experience settings',
  'Dashboard Principal-Estudiante': 'Student main dashboard',
  'Dashboard Docente': 'Teacher dashboard',
  'Dashboard Soporte': 'Support dashboard',
  'Datos institucionales': 'Institutional data',
  'Detalle del reporte': 'Report detail',
  'Detalle del ticket': 'Ticket detail',
  'Mapa del campus': 'Campus map',
  'Mapa campus': 'Campus map',
  'Mapa operativo': 'Operations map',
  'Mapa Operativo': 'Operations map',
  'Mi productividad': 'My productivity',
  'Lista de Tickets': 'Ticket list',
  'Ficha técnica': 'Technical sheet',
  'Ficha tecnica': 'Technical sheet',
  'Ver ficha técnica': 'View technical sheet',
  'Ver incidencias': 'View incidents',
  'Ver mapa': 'View map',
  'Ver productividad': 'View productivity',
  'Ir al mapa': 'Go to map',
  'Accesos rápidos': 'Quick access',
  'Estas son tus incidencias asignadas para hoy.': 'These are your assigned incidents for today.',
  'Nueva alerta prioritaria': 'New priority alert',
  'Nueva incidencia prioritaria': 'New priority incident',
  'Atender en menos de 5 min': 'Handle in under 5 min',
  'Ticket a cerrar': 'Ticket to close',
  'El ticket fue marcado como En atención': 'The ticket was marked as Being handled',
  'Atención iniciada': 'Service started',
  'Se notificó al usuario reportante.': 'The reporting user was notified.',
  'Descripción de solución aplicada': 'Description of the applied solution',
  'Ej. Se reconectó el cable de alimentación...': 'E.g. The power cable was reconnected...',
  'Se reconectó el cable de alimentación y se validó el proyector.': 'The power cable was reconnected and the projector was validated.',
  'Notificar al usuario reportante': 'Notify reporting user',
  'La incidencia fue cerrada correctamente.': 'The incident was closed successfully.',
  'Ticket resuelto': 'Ticket resolved',
  'Ticket pausado': 'Ticket paused',
  'Ticket pausado por insumos': 'Ticket paused for supplies',
  'El ticket fue pausado por falta de insumos. Se reanudará cuando el material requerido esté disponible.': 'The ticket was paused due to missing supplies. It will resume when the required material is available.',
  'Insumo requerido': 'Required supply',
  'Cable HDMI / adaptador': 'HDMI cable / adapter',
  'Comentario opcional': 'Optional comment',
  'Indica el insumo necesario para continuar la atención.': 'Indicate the supply needed to continue service.',
  'Foto del insumo adjuntada': 'Supply photo attached',
  'Adjuntar foto': 'Attach photo',
  'Adjuntar foto del insumo': 'Attach supply photo',
  'Resueltas hoy': 'Resolved today',
  'Resumen del día': 'Day summary',
  'Productividad diaria': 'Daily productivity',
  'Tickets resueltos hoy': 'Tickets resolved today',
  'Tickets pausados': 'Paused tickets',
  'Prioritarios atendidos': 'Priority cases handled',
  'Tiempo promedio': 'Average time',
  'Últimas atenciones resueltas': 'Latest resolved services',
  'Califica la atención': 'Rate the service',
  '¿Qué tal fue la atención?': 'How was the service?',
  'Tu respuesta ayuda a mejorar el servicio de soporte de CampusLink.': 'Your response helps improve CampusLink support service.',
  'Omitir': 'Skip',
  '¿El problema fue solucionado?': 'Was the problem solved?',
  'No resuelto': 'Not resolved',
  'Validar solución': 'Validate solution',
  'El técnico marcó la incidencia como resuelta.': 'The technician marked the incident as resolved.',
  'El equipo de soporte revisará nuevamente la incidencia.': 'The support team will review the incident again.',
  'El equipo de soporte revisará nuevamente la incidencia reportada.': 'The support team will review the reported incident again.',
  'El proyector volvió a fallar después de la atención.': 'The projector failed again after service.',
  'Describe el motivo para reabrir el ticket.': 'Describe the reason for reopening the ticket.',
  'Describe por qué el problema continúa.': 'Describe why the problem continues.',
  'Motivo de reapertura': 'Reason for reopening',
  'Ticket reabierto': 'Ticket reopened',
  'Reabierto': 'Reopened',
  'Reabierto / En revisión': 'Reopened / Under review',
  'Reabierto hoy': 'Reopened today',
  'Clase actual: Cálculo Aplicado': 'Current class: Applied Calculus',
  'Detectamos tu clase actual según tu horario académico.': 'We detected your current class from your academic schedule.',
  'Selecciona una opción para enviar la alerta inmediata.': 'Select an option to send the immediate alert.',
  'Soporte en camino': 'Support on the way',
  'En camino': 'On the way',
  'En camino al aula': 'On the way to the room',
  'Técnico asignado': 'Technician assigned',
  'Técnico en puerta': 'Technician at the door',
  'Llegó al aula': 'Arrived at the room',
  'Buscando técnico disponible...': 'Looking for an available technician...',
  'Carlos Méndez llegó al aula B-301.': 'Carlos Mendez arrived at room B-301.',
  'El equipo de soporte fue notificado con prioridad máxima.': 'The support team was notified with maximum priority.',
  'Prioridad máxima': 'Maximum priority',
  'Tiempo estimado': 'Estimated time',
  'Tiempo de atención': 'Service time',
  'Atención S.O.S. finalizada': 'S.O.S. service finished',
  'El ticket de emergencia fue cerrado correctamente.': 'The emergency ticket was closed successfully.',
  'La solicitud S.O.S. fue anulada correctamente.': 'The S.O.S. request was canceled successfully.',
  'Alerta enviada': 'Alert sent',
  'Alarma cancelada': 'Alarm canceled',
  'Alerta terminada': 'Alert ended',
  '¿Deseas enviar alerta S.O.S.?': 'Do you want to send an S.O.S. alert?',
  '¿Enviar alerta S.O.S.?': 'Send S.O.S. alert?',
  '¿Deseas cancelar la alarma?': 'Do you want to cancel the alarm?',
  'Cancelar alarma': 'Cancel alarm',
  'Mantener alerta': 'Keep alert',
  'Cancelar reporte': 'Cancel report',
  '¿Cancelar reporte?': 'Cancel report?',
  '¿Descartar reporte?': 'Discard report?',
  'Sí, cancelar reporte': 'Yes, cancel report',
  'Sí, descartar reporte': 'Yes, discard report',
  'Mantener reporte': 'Keep report',
  'Si descartas este reporte, se perderá la información ingresada.': 'If you discard this report, the entered information will be lost.',
  'El ticket será retirado si aún no ha iniciado la atención.': 'The ticket will be removed if service has not started yet.',
  '¿Cerrar sesión?': 'Log out?',
  'Mantener sesión': 'Keep session',
  'Volverás al inicio del prototipo y se limpiará el rol activo.': 'You will return to the prototype start and the active role will be cleared.',
  '¿Deseas enviar el reporte?': 'Do you want to send the report?',
  'El equipo de soporte recibirá la información de la incidencia.': 'The support team will receive the incident information.',
  'Volver a editar': 'Back to edit',
  'No se pudo enviar el reporte': 'The report could not be sent',
  'Revisa tu conexión e inténtalo nuevamente. La información ingresada se mantendrá guardada.': 'Check your connection and try again. The entered information will remain saved.',
  'Reintentar envío': 'Retry sending',
  'No se pudo enviar la alerta': 'The alert could not be sent',
  'Revisa tu conexión e inténtalo nuevamente.': 'Check your connection and try again.',
  'Reintentar': 'Retry',
  'No se pudo cerrar el ticket': 'The ticket could not be closed',
  'Reintentar cierre': 'Retry closing',
  'No se pudo reabrir el ticket': 'The ticket could not be reopened',
  'Volver a revisar': 'Back to review',
  'Volver a validar': 'Back to validate',
  '¿Iniciar atención?': 'Start service?',
  'El ticket será marcado como “En atención” y el usuario reportante podrá ver el avance.': 'The ticket will be marked as “Being handled” and the reporting user will be able to see the progress.',
  'Mantener atención': 'Keep service',
  '¿Pausar ticket?': 'Pause ticket?',
  'El ticket quedará en espera hasta contar con el insumo requerido.': 'The ticket will remain on hold until the required supply is available.',
  '¿Cerrar ticket?': 'Close ticket?',
  'Se marcará la incidencia como resuelta.': 'The incident will be marked as resolved.',
  'Ordenar por': 'Sort by',
  'Más reciente': 'Most recent',
  'Prioridad': 'Priority',
  'Vence hoy': 'Due today',
  'Sin asignar': 'Unassigned',
  'Filtros avanzados': 'Advanced filters',
  'Aplicar filtros': 'Apply filters',
  'Limpiar': 'Clear',
  'Restablecer': 'Reset',
  'Filtros': 'Filters',
  'Buscar': 'Search',
  'No hay tickets que coincidan con tu búsqueda.': 'No tickets match your search.',
  'QR detectado': 'QR detected',
  'correctamente': 'successfully',
  'Buscando código QR...': 'Searching for QR code...',
  'Qué es S.O.S. Aula': 'What is Classroom S.O.S.',
  'Buscar ambiente': 'Search space',
  'Buscar ambiente...': 'Search space...',
  'Buscar ID o aula': 'Search ID or room',
  'Mostrar u ocultar contraseña': 'Show or hide password',
  'Calificar con 1 estrella': 'Rate with 1 star',
  'Calificar con 2 estrellas': 'Rate with 2 stars',
  'Calificar con 3 estrellas': 'Rate with 3 stars',
  'Calificar con 4 estrellas': 'Rate with 4 stars',
  'Calificar con 5 estrellas': 'Rate with 5 stars',
  'Calificación de la atención': 'Service rating',
  'Área de escaneo': 'Scanning area',
  'No leída': 'Unread',
  'Cerrar': 'Close',
  'Cerrar detalle': 'Close detail',
  'Ver notificaciones': 'View notifications',
  'Ver incidencia prioritaria del pabellón B': 'View priority incident in building B',
  'Navegación del prototipo': 'Prototype navigation',
  'Inicio': 'Home',
  'Mapa': 'Map',
  'Reportar': 'Report',
  'Reportes': 'Reports',
  'Configura tu experiencia': 'Configure your experience',
  'Usaremos esta información para mostrarte funciones relevantes.': 'We will use this information to show you relevant features.',
  'Sede principal': 'Main campus',
  'Área': 'Area',
  'Código interno': 'Internal code',
  'Fecha y hora': 'Date and time',
  'Reportado por': 'Reported by',
  'Soporte audiovisual': 'Audiovisual support',
  'Silla rota': 'Broken chair',
  'PC del aula': 'Classroom PC',
  'Otro problema': 'Other problem',
  'Reporte de mobiliario en el aula C-204 actualmente en atención.': 'Furniture report in room C-204 currently being handled.',
  'Monterrico · Pabellón B · Aula B-301': 'Monterrico · Building B · Room B-301',
  'Aula B-301 · Pabellón B': 'Room B-301 · Building B',
  'Aula B-301 · Sede Monterrico': 'Room B-301 · Monterrico Campus',
  'Aula B-301 · Hoy, 10:15 AM': 'Room B-301 · Today, 10:15 AM',
  'Aula B-301 · Hoy, 10:30 AM': 'Room B-301 · Today, 10:30 AM',
  'Aula C-204 · Hace 2 días': 'Room C-204 · 2 days ago',
  'Aula D-105 · Hace 13 días': 'Room D-105 · 13 days ago',
  'Baño Pabellón A · Hace 11 días': 'Building A restroom · 11 days ago',
  'Biblioteca · Hace 4 días': 'Library · 4 days ago',
  'Hoy': 'Today',
  'Ayer, 04:20 PM': 'Yesterday, 04:20 PM',
  'Hoy, 10:30 AM': 'Today, 10:30 AM',
  'Hoy, 11:45 AM': 'Today, 11:45 AM',
  'Hace 2 días': '2 days ago',
  'SOS-20260512-0007 · Hace 10 min': 'SOS-20260512-0007 · 10 min ago',
  'TCK-20260512-0005 · Hace 1 hora': 'TCK-20260512-0005 · 1 hour ago',
  'Ver detalle →': 'View detail →'
};

var REEMPLAZOS_EN = [
  [/Estado:/g, 'Status:'],
  [/Pabellón/g, 'Building'],
  [/Aula/g, 'Room'],
  [/Sede/g, 'Campus'],
  [/Hoy/g, 'Today'],
  [/Ayer/g, 'Yesterday'],
  [/Hace 1 hora/g, '1 hour ago'],
  [/Hace (\d+) min/g, '$1 min ago'],
  [/Hace (\d+) días/g, '$1 days ago']
];

export function obtenerIdiomaActual() {
  return idiomaActual;
}

export function esIdiomaValido(idioma) {
  return IDIOMAS_VALIDOS.indexOf(idioma) !== -1;
}

export function obtenerIdiomaDesdeUrl() {
  if (typeof window === 'undefined') return IDIOMA_PREDETERMINADO;

  var parametros = new URLSearchParams(window.location.search);
  var idioma = parametros.get('lang');
  return esIdiomaValido(idioma) ? idioma : IDIOMA_PREDETERMINADO;
}

export function normalizarTexto(valor) {
  return String(valor == null ? '' : valor)
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function traducirTexto(valor) {
  var texto = String(valor == null ? '' : valor);
  if (idiomaActual === IDIOMA_PREDETERMINADO) return texto;

  var normalizado = normalizarTexto(texto);
  if (!normalizado) return texto;

  var traduccion = TRADUCCIONES_EN[normalizado];
  if (traduccion) return traduccion;

  var reemplazado = normalizado;
  for (var i = 0; i < REEMPLAZOS_EN.length; i++) {
    reemplazado = reemplazado.replace(REEMPLAZOS_EN[i][0], REEMPLAZOS_EN[i][1]);
  }
  return reemplazado !== normalizado ? reemplazado : texto;
}

function traducirConEspacios(valor) {
  var texto = String(valor == null ? '' : valor);
  var inicio = texto.match(/^\s*/)[0];
  var fin = texto.match(/\s*$/)[0];
  var traducido = traducirTexto(texto);
  return inicio + normalizarTexto(traducido) + fin;
}

function aceptarNodoTexto(nodo) {
  if (!normalizarTexto(nodo.nodeValue)) return NodeFilter.FILTER_REJECT;

  var padre = nodo.parentElement;
  if (!padre) return NodeFilter.FILTER_REJECT;
  if (padre.closest('[data-i18n-skip]')) return NodeFilter.FILTER_REJECT;

  var etiqueta = padre.tagName;
  if (etiqueta === 'SCRIPT' || etiqueta === 'STYLE' || etiqueta === 'NOSCRIPT') {
    return NodeFilter.FILTER_REJECT;
  }

  return NodeFilter.FILTER_ACCEPT;
}

function traducirNodosTexto(raiz) {
  var base = raiz.nodeType === Node.DOCUMENT_NODE ? raiz.documentElement : raiz;
  if (!base) return;

  var walker = document.createTreeWalker(
    base,
    NodeFilter.SHOW_TEXT,
    { acceptNode: aceptarNodoTexto }
  );

  var nodo = walker.nextNode();
  while (nodo) {
    if (!originalesTexto.has(nodo)) originalesTexto.set(nodo, nodo.nodeValue);
    nodo.nodeValue = traducirConEspacios(originalesTexto.get(nodo));
    nodo = walker.nextNode();
  }
}

function datosAtributos(elemento) {
  var datos = originalesAtributos.get(elemento);
  if (!datos) {
    datos = {};
    originalesAtributos.set(elemento, datos);
  }
  return datos;
}

function traducirAtributos(raiz) {
  var base = raiz.nodeType === Node.DOCUMENT_NODE ? raiz.documentElement : raiz;
  if (!base) return;

  var elementos = base.querySelectorAll('*');
  for (var i = 0; i < elementos.length; i++) {
    var elemento = elementos[i];
    if (elemento.closest('[data-i18n-skip]')) continue;

    var datos = datosAtributos(elemento);
    for (var a = 0; a < ATRIBUTOS_TRADUCIBLES.length; a++) {
      var atributo = ATRIBUTOS_TRADUCIBLES[a];
      if (!elemento.hasAttribute(atributo)) continue;
      if (!datos[atributo]) datos[atributo] = elemento.getAttribute(atributo);
      elemento.setAttribute(atributo, traducirTexto(datos[atributo]));
    }
  }
}

function actualizarDocumento() {
  document.documentElement.lang = idiomaActual;
  traducirNodosTexto(document);
  traducirAtributos(document);
  actualizarSelectoresIdioma();
  actualizarEnlacesIdioma();
}

export function urlConIdioma(href, idioma) {
  var destino = esIdiomaValido(idioma) ? idioma : idiomaActual;
  var url = new URL(href, window.location.href);
  url.searchParams.set('lang', destino);
  return url.pathname + url.search + url.hash;
}

function actualizarUrlIdioma(idioma) {
  var url = new URL(window.location.href);
  url.searchParams.set('lang', idioma);
  window.history.pushState({ lang: idioma }, '', url.pathname + url.search + url.hash);
}

function actualizarEnlacesIdioma() {
  var enlaces = document.querySelectorAll('a[data-preserva-idioma]');
  for (var i = 0; i < enlaces.length; i++) {
    var original = enlaces[i].getAttribute('data-href-original');
    if (!original) {
      original = enlaces[i].getAttribute('href');
      enlaces[i].setAttribute('data-href-original', original);
    }
    enlaces[i].setAttribute('href', urlConIdioma(original, idiomaActual));
  }
}

function actualizarSelectoresIdioma() {
  var botones = document.querySelectorAll('[data-idioma]');
  for (var i = 0; i < botones.length; i++) {
    var boton = botones[i];
    var idioma = boton.getAttribute('data-idioma');
    var activo = idioma === idiomaActual;
    boton.classList.toggle('estaActivo', activo);
    boton.setAttribute('aria-current', activo ? 'true' : 'false');
    boton.setAttribute('aria-pressed', activo ? 'true' : 'false');
    boton.setAttribute(
      'aria-label',
      idiomaActual === 'en'
        ? (idioma === 'es' ? 'Switch language to Spanish' : 'Switch language to English')
        : (idioma === 'es' ? 'Cambiar idioma a español' : 'Cambiar idioma a inglés')
    );
  }
}

export function cambiarIdioma(idioma, opciones) {
  var siguiente = esIdiomaValido(idioma) ? idioma : IDIOMA_PREDETERMINADO;
  var debeActualizarUrl = !opciones || opciones.actualizarUrl !== false;
  var debeEmitir = !opciones || opciones.emitir !== false;

  idiomaActual = siguiente;
  if (debeActualizarUrl) actualizarUrlIdioma(siguiente);
  actualizarDocumento();

  if (debeEmitir) {
    window.dispatchEvent(new CustomEvent(EVENTO_IDIOMA, {
      detail: { idioma: idiomaActual }
    }));
  }
}

export function inicializarI18n() {
  idiomaActual = obtenerIdiomaDesdeUrl();
  actualizarDocumento();

  if (i18nInicializado) return;
  i18nInicializado = true;

  document.addEventListener('click', function (evento) {
    var boton = evento.target.closest && evento.target.closest('[data-idioma]');
    if (!boton) return;
    evento.preventDefault();
    cambiarIdioma(boton.getAttribute('data-idioma'));
  });

  window.addEventListener('popstate', function () {
    cambiarIdioma(obtenerIdiomaDesdeUrl(), {
      actualizarUrl: false
    });
  });
}
