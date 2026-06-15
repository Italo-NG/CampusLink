# language: en

@landing @US61
Feature: Acceso al inicio de sesión desde el Landing Page

Como visitante del Landing Page
Quiero acceder al inicio de sesión o ingreso a la experiencia de CampusLink
Para explorar el producto desde una entrada clara hacia la aplicación o demo.

@automated
Scenario: US61 - Scenario 1: Visualización del acceso de inicio de sesión
Given que el visitante se encuentra en el Landing Page de CampusLink
When observa la barra de navegación superior
Then el sistema muestra una opción visible para iniciar sesión

@automated
Scenario: US61 - Scenario 2: Selección del botón de inicio de sesión
Given que el visitante identifica la opción "Iniciar sesión"
When selecciona el botón "Iniciar sesión"
Then el sistema prepara el acceso hacia la experiencia de ingreso de CampusLink

@automated
Scenario: US61 - Scenario 3: Acceso al ingreso desde dispositivo móvil
Given que el visitante accede al Landing Page desde un dispositivo móvil
When utiliza la navegación responsive para ubicar el acceso de inicio de sesión
Then el sistema mantiene disponible la opción de ingreso sin pérdida de visibilidad
