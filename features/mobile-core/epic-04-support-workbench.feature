# language: en

@mobile-core @prototype @manual @E4
Feature: E4 - Support Work Panel

This epic groups the stories related to the operational work of support staff: viewing tickets, handling emergencies, incident map, reviewing the technical sheet, starting repairs, pausing for supplies, closing the ticket, and productivity tracking.

Rule: US27 - Technical Dashboard of Pending Incidents


# As Support Staff (Resolver)
# I want to view a centralized list of all assigned reports
# So that I can organize my workday without relying on physical orders or calls.

@US27
Scenario: US27 - Scenario 1: Task list load
  Given the technician logs in with their Resolver role
  When they open the technical Dashboard
  Then the system shows a "Pending Tickets" list
  And shows the ID of each ticket
  And shows the exact location
  And shows a timer with the time elapsed since the report

@US27
Scenario: US27 - Scenario 2: Prioritization by criticality
  Given there are multiple reports in the list
  When the interface renders
  Then the system places "Academic S.O.S." type tickets at the top
  And shows a visual urgency indicator
  And uses a blinking red visual alert

@US27
Scenario: US27 - Scenario 3: List synchronization
  Given the technician tries to refresh their list
  When there is a connection failure with the central server
  Then the app activates "Offline Query Mode"
  And allows viewing the tickets loaded during the last successful session


Rule: US28 - Real-Time S.O.S. Emergency Notification


# As Support Staff
# I want to receive an intrusive, audible alert on a teacher's S.O.S.
# So that I can go to the classroom immediately and minimize lost class time.

@US28
Scenario: US28 - Scenario 1: Full-screen alert
  Given the app is running in the foreground or background
  When a teacher activates an S.O.S.
  Then the system displays a full-screen modal
  And plays an alert sound
  And shows classroom information

@US28
Scenario: US28 - Scenario 2: Emergency persistence
  Given an S.O.S. alert arrives
  When the technician does not interact with the modal
  Then the alert sound repeats every 10 seconds
  And continues until the technician presses "Accept Mission"
  And continues until the system reroutes the emergency due to lack of response

@US28
Scenario: US28 - Scenario 3: Filtering by geolocation
  Given an S.O.S. is issued at a specific campus
  When the system detects via GPS that the technician is at a different campus
  Then it skips sending the alert to that technician
  And avoids impossible travel


Rule: US29 - Interactive Incident Map


# As Support Staff
# I want to view reports over the campus layout
# So that I can plan efficient service routes based on physical proximity.

@US29
Scenario: US29 - Scenario 1: Geolocated display
  Given the technician selects the "Map" view
  When the interactive layout loads
  Then they see colored pins over the buildings
  And the pins represent each active report

@US29
Scenario: US29 - Scenario 2: Color semantics on the map
  Given the pins are displayed
  When the system evaluates the ticket type
  Then it must color S.O.S. tickets red
  And it must color "In Progress" tickets yellow
  And it must color pending standard reports gray

@US29
Scenario: US29 - Scenario 3: Pin clustering
  Given there are multiple reports in the same building or room
  When the zoom level is low
  Then the system groups the pins into a numeric indicator
  And the indicator expands when tapped
  And shows the individual list of reports


Rule: US30 - Technical Sheet Detail and Contact


# As Support Staff
# I want to review the reporter's evidence and data
# So that I can prepare the necessary tools before heading to the classroom.

@US30
Scenario: US30 - Scenario 1: Evidence inspection
  Given the technician opens a ticket's detail
  When they view the technical sheet
  Then the system shows the photo
  And shows the description audio if it exists
  And shows the issue category

@US30
Scenario: US30 - Scenario 2: Interaction with visual evidence
  Given the technician needs to see damage details
  When they tap the attached image
  Then the app expands it to full screen
  And allows "pinch-to-zoom"

@US30
Scenario: US30 - Scenario 3: Communication channel
  Given the report information is insufficient to locate the issue
  When the technician is on-site
  Then the system enables a "Contact Reporter" button
  And allows starting a quick chat or call


Rule: US31 - Marking the Start of Service


# As Support Staff
# I want to record the start of the repair upon arriving on-site
# So that the Student/Teacher gets service feedback and the system measures the real response time.

@US31
Scenario: US31 - Scenario 1: Status change to In Progress
  Given the technician arrives at the classroom
  When they press the "Start Repair" button
  Then the ticket status changes to "In Progress"
  And a notification is triggered to the reporting Student/Teacher

@US31
Scenario: US31 - Scenario 2: Concurrency restriction
  Given the technician already has an active task
  When they try to start another repair
  Then the system blocks the action
  And requires finishing or pausing the previous task

@US31
Scenario: US31 - Scenario 3: Proximity validation
  Given the technician tries to start the repair
  When the GPS detects they are more than 50 meters from the assigned classroom
  Then the system requests additional confirmation
  And ensures the technician is at the correct location


Rule: US32 - Managing Pauses for Parts and Supplies


# As Support Staff
# I want to mark a ticket as pending due to materials
# So that I can justify the delay and request the supply from the central warehouse.

@US32
Scenario: US32 - Scenario 1: Material request
  Given the repair requires a part not currently available
  When the technician selects "Pause for Supplies"
  Then the system opens a quick catalog of common parts
  And allows selecting the required material

@US32
Scenario: US32 - Scenario 2: Evidence of need
  Given the ticket is paused due to lack of materials
  When the technician saves the status
  Then the system requires attaching a photo of the part to be replaced
  And records the evidence for inventory control

@US32
Scenario: US32 - Scenario 3: Delay communication
  Given the pause for supplies is recorded
  When the action is confirmed
  Then the system automatically sends a message to the Student/Teacher
  And the message states "Your report requires external parts; service time will be extended"


Rule: US33 - Recording the Resolution and Closing the Ticket


# As Support Staff
# I want to record the solution and attach evidence of the finished work
# So that I can close the case and generate the SLA compliance record.

@US33
Scenario: US33 - Scenario 1: Formal closing
  Given the issue was fixed
  When the technician presses "Finish"
  And uploads a photo of the working equipment
  Then the ticket is marked as "Resolved"
  And the total service time is recorded

@US33
Scenario: US33 - Scenario 2: Final evidence validation
  Given the system requires a closing photo
  When the technician tries to upload the same image from the initial report
  Then the system rejects the file
  And requests a real capture of the solution

@US33
Scenario: US33 - Scenario 3: Closing justification
  Given the technician tries to close the ticket
  When the "Action Taken" field is empty
  Then the system blocks the closing
  And highlights the text field as required


Rule: US34 - Daily Productivity Summary


# As Support Staff
# I want to view my daily performance in the app
# So that I can personally track my goals and efficiency.

@US34
Scenario: US34 - Scenario 1: Metrics display
  Given the technician accesses their profile
  When they check the "My Productivity" section
  Then they see a counter of tickets resolved today
  And they see their average repair time

@US34
Scenario: US34 - Scenario 2: Cycle reset
  Given the system measures the daily workday
  When a new day starts at 00:00
  Then the visual counters reset to zero
  And previous data is archived in the historical performance record

@US34
Scenario: US34 - Scenario 3: Team comparison
  Given the technician ends their shift
  When they review their summary
  Then the app shows a comparative indicator
  And the indicator may show a message such as "You're 5% above the team's average service rate"
  And it encourages continuous improvement through gamification

