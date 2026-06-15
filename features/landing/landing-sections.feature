# language: en

@landing
Feature: Secciones informativas del Landing Page

Como visitante del Landing Page
Quiero revisar las secciones informativas principales de CampusLink
Para comprender la propuesta de valor, el problema, la solución, el funcionamiento, los beneficios, los usuarios objetivo, la adaptación responsive y el cierre institucional del producto.

@US51 @automated
Scenario: US51 - Scenario 1: Visualización exitosa de la propuesta de valor
Given que el visitante ingresa al Landing Page de CampusLink
When se carga la sección inicial del sitio
Then el sistema muestra el título principal, una descripción de CampusLink y una imagen representativa del producto

@US51 @automated
Scenario: US51 - Scenario 2: Comprensión rápida del propósito del producto
Given que el visitante observa la sección principal del Landing Page
When lee el mensaje introductorio de CampusLink
Then el sistema comunica que CampusLink permite reportar, ubicar y hacer seguimiento de incidencias del campus

@US51 @automated
Scenario: US51 - Scenario 3: Acceso inicial a acciones principales del Landing Page
Given que el visitante se encuentra en la sección inicial del Landing Page
When revisa los elementos visibles del Hero
Then el sistema muestra accesos o llamadas a la acción relacionadas con conocer el producto o iniciar el recorrido por la página

@US53 @automated
Scenario: US53 - Scenario 1: Visualización del problema actual
Given que el visitante navega hacia la sección "Problema"
When revisa el contenido presentado sobre la situación actual
Then el sistema muestra los problemas principales que CampusLink busca resolver

@US53 @automated
Scenario: US53 - Scenario 2: Identificación de dificultades en la gestión de incidencias
Given que el visitante se encuentra en la sección "Problema"
When revisa las tarjetas informativas del problema
Then el sistema presenta dificultades como reportes dispersos, falta de seguimiento e información incompleta para soporte

@US53 @automated
Scenario: US53 - Scenario 3: Relación entre el problema y la necesidad del campus
Given que el visitante analiza la sección "Problema"
When compara la información presentada con la experiencia de reportar incidencias en un campus
Then el sistema permite comprender la necesidad de centralizar los reportes de incidencias

@US54 @automated
Scenario: US54 - Scenario 1: Visualización de la solución propuesta
Given que el visitante navega hacia la sección "Solución"
When revisa el contenido presentado sobre CampusLink
Then el sistema muestra cómo CampusLink ayuda a reportar, ubicar y hacer seguimiento de incidencias

@US54 @automated
Scenario: US54 - Scenario 2: Identificación de componentes principales de la solución
Given que el visitante se encuentra en la sección "Solución"
When revisa las tarjetas informativas de la solución
Then el sistema presenta componentes como reporte rápido, ubicación precisa, evidencia clara y seguimiento visible

@US54 @automated
Scenario: US54 - Scenario 3: Comprensión del valor diferencial de CampusLink
Given que el visitante analiza la sección "Solución"
When interpreta la información presentada
Then el sistema comunica que CampusLink centraliza el proceso de reporte y seguimiento de incidencias del campus

@US55 @automated
Scenario: US55 - Scenario 1: Visualización del flujo de funcionamiento
Given que el visitante accede a la sección "Cómo funciona"
When revisa los pasos presentados
Then el sistema muestra una secuencia clara del proceso de reporte y seguimiento de incidencias

@US55 @automated
Scenario: US55 - Scenario 2: Comprensión del proceso de reporte
Given que el visitante se encuentra en la sección "Cómo funciona"
When revisa el recorrido de uso de CampusLink
Then el sistema explica que el usuario detecta una incidencia, escanea un QR, registra evidencia y envía el reporte a soporte

@US55 @automated
Scenario: US55 - Scenario 3: Relación entre pasos del proceso y seguimiento del reporte
Given que el visitante analiza la sección "Cómo funciona"
When observa la secuencia completa del funcionamiento
Then el sistema comunica que el reporte puede ser recibido, atendido y seguido por el usuario

@US56 @automated
Scenario: US56 - Scenario 1: Visualización exitosa de beneficios
Given que el visitante accede a la sección "Beneficios"
When revisa las tarjetas informativas
Then el sistema muestra los principales beneficios generados por CampusLink

@US56 @automated
Scenario: US56 - Scenario 2: Identificación de beneficios operativos
Given que el visitante se encuentra en la sección "Beneficios"
When revisa los beneficios presentados
Then el sistema destaca beneficios como reporte rápido, ubicación precisa, evidencia clara, seguimiento transparente y priorización operativa

@US56 @automated
Scenario: US56 - Scenario 3: Comprensión del impacto de los beneficios
Given que el visitante analiza la sección "Beneficios"
When relaciona los beneficios con la gestión de incidencias del campus
Then el sistema permite comprender cómo CampusLink mejora la comunicación entre usuarios y soporte

@US57 @automated
Scenario: US57 - Scenario 1: Visualización de usuarios objetivo
Given que el visitante accede a la sección "Para quiénes"
When revisa las tarjetas de perfiles
Then el sistema muestra estudiantes, docentes y personal de soporte u operaciones como usuarios objetivo

@US57 @automated
Scenario: US57 - Scenario 2: Comprensión del valor para estudiantes y docentes
Given que el visitante se encuentra en la sección "Para quiénes"
When revisa los perfiles de estudiantes y docentes
Then el sistema comunica que ambos perfiles pueden reportar incidencias y hacer seguimiento a sus solicitudes

@US57 @automated
Scenario: US57 - Scenario 3: Comprensión del valor para soporte y operaciones
Given que el visitante analiza la sección "Para quiénes"
When revisa el perfil del personal de soporte u operaciones
Then el sistema comunica que este perfil puede recibir información más clara para atender incidencias

@US60 @automated
Scenario: US60 - Scenario 1: Visualización responsive del Landing Page
Given que el visitante abre el Landing Page desde una pantalla móvil
When navega por las secciones principales del sitio
Then el sistema adapta textos, imágenes, tarjetas y navegación al tamaño de pantalla

@US60 @automated
Scenario: US60 - Scenario 2: Lectura del contenido en dispositivos móviles
Given que el visitante revisa el Landing Page desde un dispositivo móvil
When observa las secciones informativas
Then el sistema mantiene el contenido legible y ordenado sin generar desplazamiento horizontal innecesario

@US60 @automated
Scenario: US60 - Scenario 3: Acceso responsive a secciones principales
Given que el visitante utiliza la versión mobile del Landing Page
When interactúa con la navegación y las secciones del sitio
Then el sistema permite acceder al contenido principal sin pérdida de información

@US62 @automated
Scenario: US62 - Scenario 1: Visualización del footer
Given que el visitante llega al final del Landing Page
When observa la sección final
Then el sistema muestra el logo o nombre de CampusLink y un mensaje de cierre

@US62 @automated
Scenario: US62 - Scenario 2: Reconocimiento del equipo responsable
Given que el visitante se encuentra en el footer del Landing Page
When revisa la información institucional final
Then el sistema muestra la referencia al equipo Montimin como responsable del producto

@US62 @automated
Scenario: US62 - Scenario 3: Cierre institucional del Landing Page
Given que el visitante analiza el cierre del Landing Page
When lee el mensaje final del sitio
Then el sistema refuerza que CampusLink integra reporte, ubicación, evidencia y seguimiento de incidencias del campus en un solo lugar
