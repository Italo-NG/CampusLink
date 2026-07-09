# language: en

@mobile-core @prototype @manual @E3
Feature: E3 - Ticket Tracking and Transparency

This epic groups the stories related to viewing submitted reports, status display, ticket detail, service progress, notifications, and the internal inbox.

Rule: US19 - History of submitted reports


# As a Reporting Student/Teacher
# I want to view a list of my submitted reports
# So that I can quickly check the overall status of my incidents.

@US19
Scenario: US19 - Scenario 1: List display
  Given the Student/Teacher presses "My Reports" in the navigation menu
  When the screen loads the data from the server
  Then the system shows a list of cards with the category icon
  And shows the ticket ID
  And shows the creation date

@US19
Scenario: US19 - Scenario 2: Chronological ordering
  Given the Student/Teacher has multiple reports in their history
  When they view the list
  Then the cards must be displayed in descending order
  And the most recent report is shown first
  And the oldest report is shown last

@US19
Scenario: US19 - Scenario 3: Empty history state
  Given a new Student/Teacher enters the history without having reported before
  When the system detects there are no records associated with their ID
  Then it shows a friendly illustration
  And shows the message "You haven't reported anything yet"
  And shows a "Create new report" button


Rule: US20 - Filtering reports by status


# As a Reporting Student/Teacher
# I want to filter my reports by status
# So that I can quickly find active, resolved, or canceled tickets.

@US20
Scenario: US20 - Scenario 1: Tab navigation
  Given the user is on the "My Reports" screen
  When they tap the top "Resolved" tab
  Then the list is automatically filtered
  And shows only the tickets with a finished status

@US20
Scenario: US20 - Scenario 2: Visual selection indicator
  Given the user navigates between status categories
  When a tab is selected
  Then the system applies a distinctive visual style
  And uses the brand color
  And shows an underline to confirm the active selection

@US20
Scenario: US20 - Scenario 3: Navigation between active, resolved, and canceled reports
  Given the user is on the "My Reports" screen
  When they switch between the "Active", "Resolved", and "Canceled" tabs
  Then the system shows the reports corresponding to each status
  And does not mix tickets from other categories


Rule: US21 - Submitted report detail


# As a Reporting Student/Teacher
# I want to open the detail of a submitted ticket
# So that I can review the evidence, location, description, and data recorded in the report.

@US21
Scenario: US21 - Scenario 1: Access to the detail
  Given the Student/Teacher views their list of reports
  When they tap a specific ticket's card
  Then the app navigates to the "Report Detail" screen
  And shows the attached photo
  And shows the location map
  And shows the full description

@US21
Scenario: US21 - Scenario 2: Immutability of the submitted report
  Given the Student/Teacher is viewing an already-submitted ticket
  When they interact with the detail screen
  Then the system shows no text editing options
  And does not allow changing the image
  And preserves the integrity of the report

@US21
Scenario: US21 - Scenario 3: Evidence load failure
  Given the image server is not responding
  When the Student/Teacher enters the ticket detail
  Then the system shows an error box instead of the photo
  And shows the message "The visual evidence could not load"


Rule: US22 - Display of ticket progress


# As a Reporting Student/Teacher
# I want to view the service progress of my ticket
# So that I know whether my report was received, is in progress, or has already been resolved.

@US22
Scenario: US22 - Scenario 1: Visual progress
  Given the user reviews the detail of an active ticket
  When they view the top of the screen
  Then a 3-point stepper is shown
  And the stepper shows "Received", "In Progress", and "Resolved"
  And the current status appears highlighted

@US22
Scenario: US22 - Scenario 2: Color semantics
  Given the system updates the ticket status
  When the status is "In Progress" or "Resolved"
  Then the "In Progress" status lights up amber
  And the "Resolved" status turns green

@US22
Scenario: US22 - Scenario 3: Rejection notification
  Given technical support rejects the ticket due to lack of evidence
  When the user enters the detail
  Then the stepper is shown in red
  And mandatorily displays the reason for rejection


Rule: US23 - Ticket update notifications


# As a Reporting Student/Teacher
# I want to receive notifications when my ticket's status changes
# So that I find out about progress promptly without manually checking the app.

@US23
Scenario: US23 - Scenario 1: Deep linking from a notification
  Given the user receives a notification that a ticket was resolved
  When they tap the notification on the lock screen
  Then the app opens automatically on the detail screen
  And shows the specific ticket associated with the notification

@US23
Scenario: US23 - Scenario 2: Respecting native permissions
  Given the user disabled notifications in the OS settings
  When a ticket update occurs
  Then the app does not emit a sound alert
  And the app does not emit a visual alert
  And only accumulates the notification in the internal inbox

@US23
Scenario: US23 - Scenario 3: Permission request
  Given it is the user's first report
  When the submission finishes
  Then the system checks whether Push permissions are inactive
  And requests activation via an explanatory modal


Rule: US24 - Internal notification inbox


# As a Reporting Student/Teacher
# I want to have an internal notification inbox
# So that I can check updates on my reports even if I missed the push alert.

@US24
Scenario: US24 - Scenario 1: Read badge
  Given the user has 2 unread updates
  When they open the app
  Then the bell icon shows a red circle
  And the red circle shows the number of pending alerts

@US24
Scenario: US24 - Scenario 2: Marking as read
  Given the user enters the inbox
  When they tap a highlighted alert
  Then the system marks the message as read
  And the badge counter decreases by one

@US24
Scenario: US24 - Scenario 3: Automatic cleanup
  Given there are notifications older than 30 days
  When the app starts
  Then the system automatically deletes those records
  And optimizes local storage

