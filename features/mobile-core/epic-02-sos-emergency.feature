# language: en

@mobile-core @prototype @manual @E2
Feature: E2 - In-Class Emergencies with the S.O.S. Button

This epic groups the stories related to activating S.O.S. alerts during class, location suggestion, quick issue selection, critical alert confirmation, technician tracking, cancellation, arrival, rating, and solution confirmation.

Rule: US10 - In-class emergency S.O.S. button


# As a CampusLink Teacher
# I want to have a visible S.O.S. button on the Dashboard
# So that I can request urgent technical help during a class without navigating other menus.

@US10
Scenario: US10 - Scenario 1: Immediate access to the S.O.S. button
  Given the teacher logs in
  When they view the Dashboard
  Then the system shows a red circular button labeled "Classroom S.O.S." in an easily tappable area

@US10
Scenario: US10 - Scenario 2: Role-based restriction
  Given a user with the "Student" role logs in
  When they load the Dashboard
  Then the system completely hides the S.O.S. button to prevent misuse

@US10
Scenario: US10 - Scenario 3: Offline state
  Given the device loses internet connection
  When the teacher tries to interact with the S.O.S. button
  Then the button turns gray
  And shows a "No connection for emergencies" message


Rule: US11 - Automatic location suggestion from academic schedule


# As a CampusLink Teacher
# I want the system to automatically suggest the classroom where I'm teaching
# So that I can trigger an emergency without manually entering the location.

@US11
Scenario: US11 - Scenario 1: Schedule matching
  Given the teacher presses S.O.S.
  When the system queries the schedule API
  Then the modal opens with the room pre-filled as "Room B-301 - Applied Calculus Class"

@US11
Scenario: US11 - Scenario 2: Changing classroom
  Given the suggested location is not where the teacher is
  When they press the "Change location" button
  Then the QR scanner is enabled
  And the quick list is enabled to correct the location

@US11
Scenario: US11 - Scenario 3: Schedule API failure
  Given the schedule database is not responding
  When the teacher activates the S.O.S.
  Then the system mandatorily requests scanning the podium's QR code
  And uses the QR code to identify the classroom


Rule: US12 - Quick selection of issue type


# As a CampusLink Teacher
# I want to quickly select the type of emergency using simple buttons
# So that I can send the alert without filling out long forms during class.

@US12
Scenario: US12 - Scenario 1: Direct submission of a critical alert
  Given the classroom is confirmed
  When the teacher taps a "Projector" category button
  Then the system sends the critical alert immediately
  And does not request any mandatory additional data

@US12
Scenario: US12 - Scenario 2: Skipping photo evidence
  Given it is an S.O.S. flow
  When the issue is selected
  Then the system skips the "Attach photo" step
  And prioritizes response speed

@US12
Scenario: US12 - Scenario 3: Unlisted issue
  Given the issue is different from the main categories
  When the teacher presses "Other"
  Then a short list of secondary options such as "Furniture" or "Lights" is displayed
  And keyboard use is avoided


Rule: US13 - Visual confirmation of a priority alert


# As a CampusLink Teacher
# I want to receive a clear visual confirmation after sending the S.O.S.
# So that I know the critical alert was registered and prioritized.

@US13
Scenario: US13 - Scenario 1: Critical alert submission confirmation
  Given the teacher selected the issue
  When the server processes the request
  Then a screen with a pulsing siren is shown
  And the text "Critical Alert Sent" is displayed

@US13
Scenario: US13 - Scenario 2: Priority tagging
  Given the alert comes from the S.O.S. flow
  When it reaches the technicians' panel
  Then the system automatically assigns it the "SLA under 5 min" tag
  And places it at the front of the queue

@US13
Scenario: US13 - Scenario 3: Server failure
  Given the system cannot issue the alert
  When a network error occurs
  Then the screen shows a "Direct call to Support Center" emergency button


Rule: US14 - Display of assigned technician and estimated arrival time


# As a CampusLink Teacher
# I want to see which technician was assigned and how long they will take to arrive
# So that I can decide how to continue the class while I wait for assistance.

@US14
Scenario: US14 - Scenario 1: Assigned technician
  Given a technician accepts the emergency
  When the teacher checks their screen
  Then the technician's name is displayed
  And an ETA countdown in minutes is displayed

@US14
Scenario: US14 - Scenario 2: Dynamic ETA update
  Given the technician is moving
  When their geolocation changes
  Then the counter updates automatically every 30 seconds

@US14
Scenario: US14 - Scenario 3: Delay notice
  Given the arrival time exceeds the initial estimate
  When the counter reaches zero and the technician has not marked arrival
  Then the indicator turns orange
  And shows the message "Technician delayed - On the way"


Rule: US15 - Canceling an S.O.S. alert


# As a CampusLink Teacher
# I want to cancel an S.O.S. alert sent by mistake or no longer needed
# So that support doesn't respond to a nonexistent emergency.

@US15
Scenario: US15 - Scenario 1: Abort mission
  Given the ticket is active but the technician has not arrived
  When the teacher presses "Cancel Alarm"
  Then the system closes the ticket
  And notifies the technician immediately

@US15
Scenario: US15 - Scenario 2: Cancellation lock
  Given the technician already marked "Attending in Classroom"
  When the teacher tries to cancel
  Then the cancel button disappears
  And the technician must formally record the closure

@US15
Scenario: US15 - Scenario 3: Safety confirmation
  Given the teacher presses cancel
  When the system detects the action
  Then it requests confirmation: "Do you want to cancel the technical assistance?"
  And prevents accidental closures


Rule: US16 - Technician arrival notification


# As a CampusLink Teacher
# I want to receive a clear notification when the technician arrives at the classroom
# So that I can quickly recognize that help is now available.

@US16
Scenario: US16 - Scenario 1: Proximity notice
  Given the technician marks "I arrived at the classroom"
  When the teacher's phone is locked
  Then the screen turns on automatically
  And shows the arrival notice

@US16
Scenario: US16 - Scenario 2: Intense visual feedback
  Given the arrival notification arrives
  When the teacher views the app
  Then the screen edges flash green
  And the system captures the teacher's attention

@US16
Scenario: US16 - Scenario 3: Push failure
  Given the notification service is not working
  When the teacher opens the app manually
  Then the ticket status must read "Technician at the Door"
  And the text must be displayed in large, bold letters


Rule: US17 - Rating of technical service


# As a CampusLink Teacher
# I want to rate the service received after the emergency
# So that I can record the quality of the technical support provided.

@US17
Scenario: US17 - Scenario 1: Star rating
  Given the technician closed the case
  When the rating banner appears
  Then the teacher selects 1 to 5 stars
  And the modal closes automatically

@US17
Scenario: US17 - Scenario 2: Automatic rating dismissal
  Given the teacher does not interact with the rating
  When 15 seconds pass
  Then the banner disappears on its own
  And does not interrupt the interface


Rule: US18 - Emergency solution confirmation


# As a CampusLink Teacher
# I want to confirm whether the issue was resolved after the technical service
# So that I can ensure the ticket only closes once the problem has been solved.

@US18
Scenario: US18 - Scenario 1: Confirmation of resolution
  Given the technician marks "Issue resolved" in their app
  When the teacher receives the closing alert
  Then they must press a "Confirm solution" button
  And the system marks the ticket as finished

@US18
Scenario: US18 - Scenario 2: Disagreement with the solution
  Given the problem persists
  When the teacher marks "Not resolved"
  Then the ticket returns to "Being handled" status
  And an alert is escalated to the supervisor

