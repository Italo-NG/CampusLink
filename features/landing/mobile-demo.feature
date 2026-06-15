# language: en

@landing @US58
Feature: Exploración visual del demo mobile integrado

Como visitante del Landing Page
Quiero explorar una vista visual del demo mobile de CampusLink
Para comprender cómo se vería la experiencia principal del producto en una aplicación móvil.

@automated
Scenario: US58 - Scenario 1: Visualización de la sección Vista de la app
Given que el visitante accede a la sección "Vista de la app"
When observa el contenido visual del demo mobile
Then el sistema muestra una representación de la interfaz móvil de CampusLink

@automated
Scenario: US58 - Scenario 2: Reconocimiento de la experiencia mobile del producto
Given que el visitante se encuentra en la sección "Vista de la app"
When revisa la pantalla representativa de la aplicación
Then el sistema permite identificar una experiencia mobile relacionada con el ingreso o uso de CampusLink

@automated
Scenario: US58 - Scenario 3: Relación del demo mobile con las funcionalidades principales
Given que el visitante analiza la sección "Vista de la app"
When interpreta la representación visual del demo
Then el sistema comunica que CampusLink cuenta con una experiencia móvil orientada al reporte, ubicación, evidencia y seguimiento de incidencias
