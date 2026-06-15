# language: en

@mobile-core @prototype @manual @E5
Feature: E5 - Mapa y Disponibilidad de Aulas

Esta épica agrupa las historias relacionadas con la visualización del mapa del campus, disponibilidad de aulas, pines de operatividad, búsqueda, filtros, navegación táctil, geolocalización, cambio de piso y leyenda de símbolos.

Rule: US35 - Acceso al Croquis Interactivo del Campus


# Como Usuario (Estudiante/Docente/Soporte)
# Quiero visualizar una representación gráfica de los pabellones de mi sede
# Para identificar la ubicación de las áreas comunes y aulas de forma espacial.

@US35
Scenario: US35 - Scenario 1: Carga del mapa base
  Given que el usuario presiona el botón "Mapa" en la barra de navegación
  When la app identifica la sede mediante perfil o GPS
  Then renderiza un croquis 2D optimizado
  And muestra etiquetas legibles de los pabellones

@US35
Scenario: US35 - Scenario 2: Cambio de sede manual
  Given que el usuario consulta una sede distinta a la actual
  When selecciona una sede diferente en el menú superior
  Then el sistema reemplaza el croquis en menos de 2 segundos
  And garantiza la fluidez de la navegación

@US35
Scenario: US35 - Scenario 3: Falla de carga de recursos
  Given que la conexión es inestable
  When el mapa no logra descargar la imagen base
  Then se muestra un estado de carga progresivo
  And se muestra un botón de "Reintentar carga"


Rule: US36 - Visualización de Pines de Estado


# Como Usuario
# Quiero ver pines de colores sobre las aulas en el mapa
# Para conocer el estado de los equipos multimedia o mobiliario de un vistazo.

@US36
Scenario: US36 - Scenario 1: Identificación visual
  Given que el mapa está cargado
  When existen reportes activos en la base de datos
  Then el sistema dibuja pines de estado sobre las aulas
  And usa Verde para "Operativo"
  And usa Amarillo para "Incidencia leve"
  And usa Rojo para "Fuera de servicio"

@US36
Scenario: US36 - Scenario 2: Prioridad de gravedad
  Given que un aula tiene múltiples reportes de distinta gravedad
  When el sistema asigna el color al pin de esa aula
  Then debe prevalecer el color del fallo más crítico
  And se aplica la prioridad Rojo sobre Amarillo
  And se aplica la prioridad Amarillo sobre Verde

@US36
Scenario: US36 - Scenario 3: Aula sin reportes activos
  Given que un aula no tiene reportes activos asociados
  When el sistema renderiza el estado del aula en el mapa
  Then el pin del aula se muestra en color Verde
  And el sistema comunica que el aula se encuentra operativa


Rule: US37 - Búsqueda Rápida de Aula


# Como Usuario con prisa
# Quiero buscar un aula específica por su nombre
# Para que el mapa se centre automáticamente en su ubicación y estado.

@US37
Scenario: US37 - Scenario 1: Búsqueda exitosa de aula
  Given que el usuario abre el campo de búsqueda del mapa
  When ingresa el nombre de un aula existente
  Then el mapa se centra automáticamente en la ubicación del aula
  And muestra el estado actual del aula seleccionada

@US37
Scenario: US37 - Scenario 2: Sugerencias durante la búsqueda
  Given que el usuario empieza a escribir el nombre de un aula
  When el sistema encuentra coincidencias parciales
  Then se muestran sugerencias de aulas relacionadas
  And el usuario puede seleccionar una sugerencia para centrar el mapa

@US37
Scenario: US37 - Scenario 3: Aula no encontrada
  Given que el usuario escribe el nombre de un aula inexistente
  When ejecuta la búsqueda
  Then el sistema muestra el mensaje "Aula no encontrada"
  And mantiene visible el campo de búsqueda para intentar nuevamente


Rule: US38 - Detalle de Fallos por Aula


# Como Usuario
# Quiero tocar un pin para ver el detalle de los fallos de esa aula
# Para decidir si el aula es apta para mi actividad o si debo buscar otra.

@US38
Scenario: US38 - Scenario 1: Visualización del detalle de aula
  Given que el usuario visualiza un pin sobre un aula
  When toca el pin del aula
  Then el sistema muestra una tarjeta con el detalle de fallos
  And muestra el nombre del aula
  And muestra el estado de operatividad actual

@US38
Scenario: US38 - Scenario 2: Aula con múltiples fallos
  Given que el aula tiene más de un reporte activo
  When el usuario abre el detalle del pin
  Then el sistema lista los fallos asociados al aula
  And muestra la categoría de cada falla
  And muestra el nivel de gravedad correspondiente

@US38
Scenario: US38 - Scenario 3: Aula sin incidencias
  Given que el usuario toca el pin de un aula operativa
  When el sistema consulta los reportes asociados
  Then muestra el mensaje "Aula operativa"
  And permite al usuario cerrar la tarjeta de detalle sin cambiar de vista


Rule: US39 - Filtro de Pines por Tipo de Falla


# Como Usuario de la vista de mapa
# Quiero filtrar los pines por tipo de falla
# Para no saturar la vista con información irrelevante en ese momento.

@US39
Scenario: US39 - Scenario 1: Aplicación de filtros
  Given que el usuario abre el menú de categorías
  When selecciona una opción como "Multimedia"
  Then el mapa oculta todos los pines que no correspondan a esa categoría de falla

@US39
Scenario: US39 - Scenario 2: Limpieza de filtros
  Given que existen filtros activos en el mapa
  When el usuario presiona "Limpiar filtros"
  Then el mapa vuelve a mostrar todos los pines de estado inmediatamente

@US39
Scenario: US39 - Scenario 3: Persistencia de filtros
  Given que el usuario aplicó filtros y sale de la sección de mapa
  When regresa al mapa en la misma sesión
  Then el sistema mantiene los filtros aplicados previamente
  And ahorra tiempo al usuario durante la navegación


Rule: US40 - Navegación Táctil y Re-centrado


# Como Usuario móvil
# Quiero usar gestos para acercar o alejar el mapa
# Para observar con precisión la distribución de los equipos en el pabellón.

@US40
Scenario: US40 - Scenario 1: Zoom y Pan fluido
  Given que el usuario usa gestos de pinza o deslizamiento
  When interactúa con el croquis
  Then el mapa responde con una escala fluida
  And el mapa responde con movimiento sin saltos visuales

@US40
Scenario: US40 - Scenario 2: Límites de navegación
  Given que el usuario arrastra el mapa hacia los bordes
  When llega al límite de la imagen de la sede
  Then el sistema detiene el desplazamiento
  And evita que el usuario visualice un fondo vacío

@US40
Scenario: US40 - Scenario 3: Botón de re-centrado
  Given que el usuario se ha desplazado lejos del centro
  When presiona el icono de "Brújula/Inicio"
  Then el mapa regresa instantáneamente a la vista general de la sede completa


Rule: US41 - Geolocalización y Cambio de Piso


# Como Usuario en el campus
# Quiero ver mi posición actual y cambiar de nivel en el mapa
# Para orientarme correctamente dentro de pabellones de varios pisos.

@US41
Scenario: US41 - Scenario 1: Ubicación en tiempo real
  Given que el GPS está activo
  When el usuario visualiza el mapa
  Then se muestra un punto azul indicando su posición aproximada dentro del predio

@US41
Scenario: US41 - Scenario 2: Navegación por niveles o pisos
  Given que un pabellón tiene varios niveles
  When el usuario selecciona un piso en el selector lateral
  Then el croquis cambia para mostrar la distribución de aulas de ese nivel específico

@US41
Scenario: US41 - Scenario 3: GPS desactivado
  Given que el usuario tiene la ubicación apagada
  When intenta usar la geolocalización
  Then el sistema muestra un mensaje persuasivo solicitando los permisos necesarios para la función


Rule: US42 - Leyenda Dinámica de Simbología


# Como Usuario poco frecuente
# Quiero consultar una leyenda de símbolos y colores
# Para interpretar correctamente la información de operatividad del mapa.

@US42
Scenario: US42 - Scenario 1: Consulta de leyenda
  Given que el usuario tiene dudas sobre un icono
  When toca el botón de información
  Then se despliega una ventana flotante
  And la ventana explica el significado de colores e iconos de categorías

@US42
Scenario: US42 - Scenario 2: Accesibilidad
  Given que el usuario tiene activo el "Modo Noche"
  When abre la leyenda
  Then los contrastes se ajustan para garantizar una lectura cómoda
  And los colores de los iconos se adaptan al modo activo

@US42
Scenario: US42 - Scenario 3: Descarte de ayuda
  Given que la leyenda está abierta
  When el usuario toca cualquier zona fuera del cuadro informativo
  Then la leyenda se cierra automáticamente
  And no obstruye la navegación del mapa

