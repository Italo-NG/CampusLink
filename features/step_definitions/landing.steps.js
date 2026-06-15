const { Given, When, Then } = require('@cucumber/cucumber');

// =====================================================
// US52 - Navegación por secciones informativas del Landing Page
// File: landing-navigation.feature
// =====================================================

// US52 - Escenario 1: Navegación exitosa entre secciones
Given('que el visitante se encuentra en el Landing Page de CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

When('selecciona una opción del menú superior', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema lo dirige a la sección correspondiente dentro de la misma página', function () {
// Step prepared for basic Cucumber execution.
});

// US52 - Escenario 2: Acceso a la sección de contacto
Given('que el visitante desea solicitar información sobre CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

When('selecciona la opción {string}', function (option) {
// Reused step if another scenario selects a named navigation option.
this.selectedOption = option;
});

Then('el sistema desplaza la página hacia el formulario de contacto', function () {
// Step prepared for basic Cucumber execution.
});

// US52 - Escenario 3: Navegación en dispositivo móvil
Given('que el visitante accede al Landing Page desde un dispositivo móvil', function () {
// Step prepared for basic Cucumber execution.
});

When('utiliza el menú responsive', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema le permite navegar por las secciones principales sin pérdida de contenido', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US51 - Presentación inmediata de la propuesta de valor de CampusLink
// File: landing-sections.feature
// =====================================================

// US51 - Escenario 1: Visualización exitosa de la propuesta de valor
Given('que el visitante ingresa al Landing Page de CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

When('se carga la sección inicial del sitio', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema muestra el título principal, una descripción de CampusLink y una imagen representativa del producto', function () {
// Step prepared for basic Cucumber execution.
});

// US51 - Escenario 2: Comprensión rápida del propósito del producto
Given('que el visitante observa la sección principal del Landing Page', function () {
// Step prepared for basic Cucumber execution.
});

When('lee el mensaje introductorio de CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema comunica que CampusLink permite reportar, ubicar y hacer seguimiento de incidencias del campus', function () {
// Step prepared for basic Cucumber execution.
});

// US51 - Escenario 3: Acceso inicial a acciones principales del Landing Page
Given('que el visitante se encuentra en la sección inicial del Landing Page', function () {
// Step prepared for basic Cucumber execution.
});

When('revisa los elementos visibles del Hero', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema muestra accesos o llamadas a la acción relacionadas con conocer el producto o iniciar el recorrido por la página', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// Reused section-location steps
// These steps are used by several scenarios in US53, US54, US55, US56 and US57.
// They are defined only once to avoid duplicated step definition errors in Cucumber.
// =====================================================

Given('que el visitante navega hacia la sección {string}', function (sectionName) {
this.sectionName = sectionName;
});

Given('que el visitante se encuentra en la sección {string}', function (sectionName) {
this.sectionName = sectionName;
});

Given('que el visitante analiza la sección {string}', function (sectionName) {
this.sectionName = sectionName;
});

Given('que el visitante accede a la sección {string}', function (sectionName) {
this.sectionName = sectionName;
});

// =====================================================
// US53 - Comprensión del problema actual de gestión de incidencias
// File: landing-sections.feature
// =====================================================

// US53 - Escenario 1: Visualización del problema actual
When('revisa el contenido presentado sobre la situación actual', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema muestra los problemas principales que CampusLink busca resolver', function () {
// Step prepared for basic Cucumber execution.
});

// US53 - Escenario 2: Identificación de dificultades en la gestión de incidencias
When('revisa las tarjetas informativas del problema', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema presenta dificultades como reportes dispersos, falta de seguimiento e información incompleta para soporte', function () {
// Step prepared for basic Cucumber execution.
});

// US53 - Escenario 3: Relación entre el problema y la necesidad del campus
When('compara la información presentada con la experiencia de reportar incidencias en un campus', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema permite comprender la necesidad de centralizar los reportes de incidencias', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US54 - Comprensión de la solución propuesta por CampusLink
// File: landing-sections.feature
// =====================================================

// US54 - Escenario 1: Visualización de la solución propuesta
When('revisa el contenido presentado sobre CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema muestra cómo CampusLink ayuda a reportar, ubicar y hacer seguimiento de incidencias', function () {
// Step prepared for basic Cucumber execution.
});

// US54 - Escenario 2: Identificación de componentes principales de la solución
When('revisa las tarjetas informativas de la solución', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema presenta componentes como reporte rápido, ubicación precisa, evidencia clara y seguimiento visible', function () {
// Step prepared for basic Cucumber execution.
});

// US54 - Escenario 3: Comprensión del valor diferencial de CampusLink
When('interpreta la información presentada', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema comunica que CampusLink centraliza el proceso de reporte y seguimiento de incidencias del campus', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US55 - Explicación del funcionamiento del reporte de incidencias
// File: landing-sections.feature
// =====================================================

// US55 - Escenario 1: Visualización del flujo de funcionamiento
When('revisa los pasos presentados', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema muestra una secuencia clara del proceso de reporte y seguimiento de incidencias', function () {
// Step prepared for basic Cucumber execution.
});

// US55 - Escenario 2: Comprensión del proceso de reporte
When('revisa el recorrido de uso de CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema explica que el usuario detecta una incidencia, escanea un QR, registra evidencia y envía el reporte a soporte', function () {
// Step prepared for basic Cucumber execution.
});

// US55 - Escenario 3: Relación entre pasos del proceso y seguimiento del reporte
When('observa la secuencia completa del funcionamiento', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema comunica que el reporte puede ser recibido, atendido y seguido por el usuario', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US56 - Visualización de beneficios principales del reporte centralizado
// File: landing-sections.feature
// =====================================================

// US56 - Escenario 1: Visualización exitosa de beneficios
When('revisa las tarjetas informativas', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema muestra los principales beneficios generados por CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

// US56 - Escenario 2: Identificación de beneficios operativos
When('revisa los beneficios presentados', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema destaca beneficios como reporte rápido, ubicación precisa, evidencia clara, seguimiento transparente y priorización operativa', function () {
// Step prepared for basic Cucumber execution.
});

// US56 - Escenario 3: Comprensión del impacto de los beneficios
When('relaciona los beneficios con la gestión de incidencias del campus', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema permite comprender cómo CampusLink mejora la comunicación entre usuarios y soporte', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US57 - Identificación de usuarios objetivo del producto
// File: landing-sections.feature
// =====================================================

// US57 - Escenario 1: Visualización de usuarios objetivo
When('revisa las tarjetas de perfiles', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema muestra estudiantes, docentes y personal de soporte u operaciones como usuarios objetivo', function () {
// Step prepared for basic Cucumber execution.
});

// US57 - Escenario 2: Comprensión del valor para estudiantes y docentes
When('revisa los perfiles de estudiantes y docentes', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema comunica que ambos perfiles pueden reportar incidencias y hacer seguimiento a sus solicitudes', function () {
// Step prepared for basic Cucumber execution.
});

// US57 - Escenario 3: Comprensión del valor para soporte y operaciones
When('revisa el perfil del personal de soporte u operaciones', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema comunica que este perfil puede recibir información más clara para atender incidencias', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US60 - Acceso responsive al Landing Page
// File: landing-sections.feature
// =====================================================

// US60 - Escenario 1: Visualización responsive del Landing Page
Given('que el visitante abre el Landing Page desde una pantalla móvil', function () {
// Step prepared for basic Cucumber execution.
});

When('navega por las secciones principales del sitio', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema adapta textos, imágenes, tarjetas y navegación al tamaño de pantalla', function () {
// Step prepared for basic Cucumber execution.
});

// US60 - Escenario 2: Lectura del contenido en dispositivos móviles
Given('que el visitante revisa el Landing Page desde un dispositivo móvil', function () {
// Step prepared for basic Cucumber execution.
});

When('observa las secciones informativas', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema mantiene el contenido legible y ordenado sin generar desplazamiento horizontal innecesario', function () {
// Step prepared for basic Cucumber execution.
});

// US60 - Escenario 3: Acceso responsive a secciones principales
Given('que el visitante utiliza la versión mobile del Landing Page', function () {
// Step prepared for basic Cucumber execution.
});

When('interactúa con la navegación y las secciones del sitio', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema permite acceder al contenido principal sin pérdida de información', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US62 - Reconocimiento de marca y cierre institucional del Landing Page
// File: landing-sections.feature
// =====================================================

// US62 - Escenario 1: Visualización del footer
Given('que el visitante llega al final del Landing Page', function () {
// Step prepared for basic Cucumber execution.
});

When('observa la sección final', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema muestra el logo o nombre de CampusLink y un mensaje de cierre', function () {
// Step prepared for basic Cucumber execution.
});

// US62 - Escenario 2: Reconocimiento del equipo responsable
Given('que el visitante se encuentra en el footer del Landing Page', function () {
// Step prepared for basic Cucumber execution.
});

When('revisa la información institucional final', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema muestra la referencia al equipo Montimin como responsable del producto', function () {
// Step prepared for basic Cucumber execution.
});

// US62 - Escenario 3: Cierre institucional del Landing Page
Given('que el visitante analiza el cierre del Landing Page', function () {
// Step prepared for basic Cucumber execution.
});

When('lee el mensaje final del sitio', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema refuerza que CampusLink integra reporte, ubicación, evidencia y seguimiento de incidencias del campus en un solo lugar', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US59 - Solicitud de información institucional sobre CampusLink
// File: contact-form.feature
// =====================================================

// US59 - Escenario 1: Visualización del formulario de contacto
// Reuses: Given('que el visitante accede a la sección {string}', ...)

When('observa el formulario de solicitud institucional', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema muestra campos para registrar datos de contacto, información de la institución e interés sobre CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

// US59 - Escenario 2: Registro de datos institucionales
Given('que el visitante se encuentra en el formulario de contacto', function () {
// Step prepared for basic Cucumber execution.
});

When('completa los campos institucionales requeridos', function (dataTable) {
// The form data is stored for traceability during basic Cucumber execution.
this.formData = dataTable.rowsHash();
});

Then('el sistema conserva la información ingresada para preparar la solicitud', function () {
// Step prepared for basic Cucumber execution.
});

// US59 - Escenario 3: Envío de solicitud de información
Given('que el visitante completó el formulario de contacto', function () {
// Step prepared for basic Cucumber execution.
});

When('selecciona el botón {string}', function (buttonName) {
// Reused action pattern for buttons or calls to action.
this.selectedButton = buttonName;
});

Then('el sistema muestra o prepara la solicitud de información sobre CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US61 - Acceso al inicio de sesión desde el Landing Page
// File: login-access.feature
// =====================================================

// US61 - Escenario 1: Visualización del acceso de inicio de sesión
// Reuses: Given('que el visitante se encuentra en el Landing Page de CampusLink', ...)

When('observa la barra de navegación superior', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema muestra una opción visible para iniciar sesión', function () {
// Step prepared for basic Cucumber execution.
});

// US61 - Escenario 2: Selección del botón de inicio de sesión
Given('que el visitante identifica la opción {string}', function (optionName) {
// Step prepared for basic Cucumber execution.
this.optionName = optionName;
});

// Reuses: When('selecciona el botón {string}', ...)

Then('el sistema prepara el acceso hacia la experiencia de ingreso de CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

// US61 - Escenario 3: Acceso al ingreso desde dispositivo móvil
// Reuses: Given('que el visitante accede al Landing Page desde un dispositivo móvil', ...)

When('utiliza la navegación responsive para ubicar el acceso de inicio de sesión', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema mantiene disponible la opción de ingreso sin pérdida de visibilidad', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US58 - Exploración visual del demo mobile integrado
// File: mobile-demo.feature
// =====================================================

// US58 - Escenario 1: Visualización de la sección Vista de la app
// Reuses: Given('que el visitante accede a la sección {string}', ...)

When('observa el contenido visual del demo mobile', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema muestra una representación de la interfaz móvil de CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

// US58 - Escenario 2: Reconocimiento de la experiencia mobile del producto
// Reuses: Given('que el visitante se encuentra en la sección {string}', ...)

When('revisa la pantalla representativa de la aplicación', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema permite identificar una experiencia mobile relacionada con el ingreso o uso de CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

// US58 - Escenario 3: Relación del demo mobile con las funcionalidades principales
// Reuses: Given('que el visitante analiza la sección {string}', ...)

When('interpreta la representación visual del demo', function () {
// Step prepared for basic Cucumber execution.
});

Then('el sistema comunica que CampusLink cuenta con una experiencia móvil orientada al reporte, ubicación, evidencia y seguimiento de incidencias', function () {
// Step prepared for basic Cucumber execution.
});
