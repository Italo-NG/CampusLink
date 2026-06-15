# language: en

@landing @US52
Feature: Navegación por secciones informativas del Landing Page

  Como visitante del Landing Page
  Quiero navegar entre las secciones principales del sitio
  Para acceder fácilmente a información sobre el problema, la solución, el funcionamiento, los beneficios, los usuarios objetivo, la vista de la app y el contacto.

  @automated
  Scenario: Navegación exitosa entre secciones
    Given que el visitante se encuentra en el Landing Page de CampusLink
    When selecciona una opción del menú superior
    Then el sistema lo dirige a la sección correspondiente dentro de la misma página

  @automated
  Scenario: Acceso a la sección de contacto
    Given que el visitante desea solicitar información sobre CampusLink
    When selecciona la opción "Contacto"
    Then el sistema desplaza la página hacia el formulario de contacto

  @automated
  Scenario: Navegación en dispositivo móvil
    Given que el visitante accede al Landing Page desde un dispositivo móvil
    When utiliza el menú responsive
    Then el sistema le permite navegar por las secciones principales sin pérdida de contenido