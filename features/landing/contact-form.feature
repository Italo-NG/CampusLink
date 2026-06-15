# language: en

@landing @US59
Feature: Solicitud de información institucional sobre CampusLink

Como representante de una institución educativa
Quiero completar un formulario de contacto en el Landing Page
Para solicitar información sobre CampusLink y evaluar su posible implementación en mi campus.

@automated
Scenario: US59 - Scenario 1: Visualización del formulario de contacto
Given que el visitante accede a la sección "Contacto"
When observa el formulario de solicitud institucional
Then el sistema muestra campos para registrar datos de contacto, información de la institución e interés sobre CampusLink

@automated
Scenario: US59 - Scenario 2: Registro de datos institucionales
Given que el visitante se encuentra en el formulario de contacto
When completa los campos institucionales requeridos
| tipoInstitucion | Universidad |
| institucion     | UPC         |
| contacto        | Diego       |
| cargo           | Estudiante  |
| correo          | [contacto@upc.edu.pe](mailto:contacto@upc.edu.pe) |
| telefono        | 999999999   |
| estudiantes     | 10000       |
| interes         | Conocer CampusLink |
| necesidades     | Mejorar el reporte y seguimiento de incidencias |
Then el sistema conserva la información ingresada para preparar la solicitud

@automated
Scenario: US59 - Scenario 3: Envío de solicitud de información
Given que el visitante completó el formulario de contacto
When selecciona el botón "Enviar solicitud"
Then el sistema muestra o prepara la solicitud de información sobre CampusLink
