# language: en

@mobile-core @prototype @manual @E5
Feature: E5 - Campus Map and Room Availability

This epic groups the stories related to viewing the campus map, room availability, operational status pins, search, filters, touch navigation, geolocation, floor switching, and the symbol legend.

Rule: US35 - Access to the Interactive Campus Layout


# As a User (Student/Teacher/Support)
# I want to view a graphical representation of my campus's buildings
# So that I can identify the location of common areas and rooms spatially.

@US35
Scenario: US35 - Scenario 1: Base map load
  Given the user presses the "Map" button in the navigation bar
  When the app identifies the campus via profile or GPS
  Then it renders an optimized 2D layout
  And shows readable building labels

@US35
Scenario: US35 - Scenario 2: Manual campus change
  Given the user checks a campus other than the current one
  When they select a different campus in the top menu
  Then the system replaces the layout in under 2 seconds
  And ensures smooth navigation

@US35
Scenario: US35 - Scenario 3: Resource load failure
  Given the connection is unstable
  When the map fails to download the base image
  Then a progressive loading state is shown
  And a "Retry loading" button is shown


Rule: US36 - Display of Status Pins


# As a User
# I want to see colored pins over the rooms on the map
# So that I can tell the status of multimedia equipment or furniture at a glance.

@US36
Scenario: US36 - Scenario 1: Visual identification
  Given the map is loaded
  When there are active reports in the database
  Then the system draws status pins over the rooms
  And uses Green for "Operational"
  And uses Yellow for "Minor issue"
  And uses Red for "Out of service"

@US36
Scenario: US36 - Scenario 2: Severity priority
  Given a room has multiple reports of different severity
  When the system assigns the color to that room's pin
  Then the color of the most critical issue must prevail
  And Red takes priority over Yellow
  And Yellow takes priority over Green

@US36
Scenario: US36 - Scenario 3: Room with no active reports
  Given a room has no associated active reports
  When the system renders the room's status on the map
  Then the room's pin is shown in Green
  And the system communicates that the room is operational


Rule: US37 - Quick Room Search


# As a User in a hurry
# I want to search for a specific room by its name
# So that the map automatically centers on its location and status.

@US37
Scenario: US37 - Scenario 1: Successful room search
  Given the user opens the map's search field
  When they enter the name of an existing room
  Then the map automatically centers on the room's location
  And shows the selected room's current status

@US37
Scenario: US37 - Scenario 2: Suggestions while searching
  Given the user starts typing a room name
  When the system finds partial matches
  Then related room suggestions are shown
  And the user can select a suggestion to center the map

@US37
Scenario: US37 - Scenario 3: Room not found
  Given the user types the name of a nonexistent room
  When they run the search
  Then the system shows the message "Room not found"
  And keeps the search field visible to try again


Rule: US38 - Failure Detail per Room


# As a User
# I want to tap a pin to see the failure detail for that room
# So that I can decide whether the room is fit for my activity or I should look for another.

@US38
Scenario: US38 - Scenario 1: Room detail display
  Given the user views a pin over a room
  When they tap the room's pin
  Then the system shows a card with the failure detail
  And shows the room's name
  And shows the current operational status

@US38
Scenario: US38 - Scenario 2: Room with multiple failures
  Given the room has more than one active report
  When the user opens the pin's detail
  Then the system lists the failures associated with the room
  And shows the category of each issue
  And shows the corresponding severity level

@US38
Scenario: US38 - Scenario 3: Room with no incidents
  Given the user taps the pin of an operational room
  When the system checks the associated reports
  Then it shows the message "Operational room"
  And allows the user to close the detail card without switching views


Rule: US39 - Filtering Pins by Failure Type


# As a User of the map view
# I want to filter pins by failure type
# So that I don't clutter the view with irrelevant information at that moment.

@US39
Scenario: US39 - Scenario 1: Applying filters
  Given the user opens the category menu
  When they select an option such as "Multimedia"
  Then the map hides all pins that don't match that failure category

@US39
Scenario: US39 - Scenario 2: Clearing filters
  Given there are active filters on the map
  When the user presses "Clear filters"
  Then the map immediately shows all status pins again

@US39
Scenario: US39 - Scenario 3: Filter persistence
  Given the user applied filters and leaves the map section
  When they return to the map in the same session
  Then the system keeps the previously applied filters
  And saves the user time during navigation


Rule: US40 - Touch Navigation and Re-centering


# As a mobile User
# I want to use gestures to zoom in or out on the map
# So that I can precisely observe the layout of the equipment in the building.

@US40
Scenario: US40 - Scenario 1: Smooth zoom and pan
  Given the user uses pinch or swipe gestures
  When they interact with the layout
  Then the map responds with smooth scaling
  And the map responds with movement without visual jumps

@US40
Scenario: US40 - Scenario 2: Navigation limits
  Given the user drags the map toward the edges
  When they reach the limit of the campus image
  Then the system stops the panning
  And prevents the user from seeing an empty background

@US40
Scenario: US40 - Scenario 3: Re-center button
  Given the user has moved far from the center
  When they press the "Compass/Home" icon
  Then the map instantly returns to the full campus overview


Rule: US41 - Geolocation and Floor Switching


# As a User on campus
# I want to see my current position and switch levels on the map
# So that I can correctly orient myself within multi-floor buildings.

@US41
Scenario: US41 - Scenario 1: Real-time location
  Given the GPS is active
  When the user views the map
  Then a blue dot is shown indicating their approximate position within the premises

@US41
Scenario: US41 - Scenario 2: Navigation by levels or floors
  Given a building has several levels
  When the user selects a floor in the side selector
  Then the layout changes to show the room distribution for that specific level

@US41
Scenario: US41 - Scenario 3: GPS disabled
  Given the user has location turned off
  When they try to use geolocation
  Then the system shows a persuasive message requesting the permissions needed for the feature


Rule: US42 - Dynamic Symbol Legend


# As an infrequent User
# I want to check a legend of symbols and colors
# So that I can correctly interpret the map's operational-status information.

@US42
Scenario: US42 - Scenario 1: Checking the legend
  Given the user has questions about an icon
  When they tap the info button
  Then a floating window is displayed
  And the window explains the meaning of the category colors and icons

@US42
Scenario: US42 - Scenario 2: Accessibility
  Given the user has "Night Mode" active
  When they open the legend
  Then the contrasts adjust to ensure comfortable reading
  And the icon colors adapt to the active mode

@US42
Scenario: US42 - Scenario 3: Dismissing the help
  Given the legend is open
  When the user taps any area outside the info box
  Then the legend closes automatically
  And does not obstruct map navigation

