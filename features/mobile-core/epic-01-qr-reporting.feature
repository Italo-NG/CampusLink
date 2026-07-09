# language: en

@mobile-core @prototype @manual @E1
Feature: E1 - Fast Reporting with QR Code

This epic groups the stories related to fast incident reporting via QR code, automatic or manual location, evidence, category, description, audio, report submission, and flow exit control.

Rule: US00 - Direct-Access Main Dashboard


# As a CampusLink Student/Teacher
# I want a home screen with clear, visible buttons
# So that I can access critical functions (QR Report and SOS Button) without navigating complex menus.

@US00
Scenario: US00 - Scenario 1: Home display
  Given the Student/Teacher opens the app and is authenticated
  When the main screen loads
  Then the system shows two high-priority buttons: "Report Issue (QR)" and "Emergency (SOS)"

@US00
Scenario: US00 - Scenario 2: Visual prioritization
  Given the Student/Teacher is on the Dashboard
  When they view the main buttons
  Then the "SOS" button must have a distinctive alert color
  And the "Report Issue (QR)" button must be prominent for quick access to the report flow

@US00
Scenario: US00 - Scenario 3: Initial load failure
  Given the Student/Teacher opens the app without an internet connection
  When the system cannot load the initial services
  Then it shows a "Connection error" message
  And shows a "Retry" button to refresh the Dashboard


Rule: US01 - Infrastructure QR scanner interface


# As a Reporting Student/Teacher
# I want to see an active scanning frame using my device's camera
# So that I can quickly focus on and read the QR code posted in the affected space.

@US01
Scenario: US01 - Scenario 1: Successful QR scanner activation
  Given the Student/Teacher presses the "Report Issue" button
  When the app has camera permissions granted
  Then the full-screen camera is shown with a scanning viewfinder
  And the system activates automatic lens focus

@US01
Scenario: US01 - Scenario 2: QR format validation and feedback
  Given the Student/Teacher is scanning a code
  When the camera recognizes a QR code
  Then the system must verify that the code belongs to CampusLink's encrypted domain
  And if valid, the device must emit a short vibration
  And the system must redirect to the report form

@US01
Scenario: US01 - Scenario 3: Unrecognized QR code
  Given the Student/Teacher is scanning a code
  When the scanned QR does not belong to the CampusLink domain
  Then the system shows a floating message "QR code not valid for reporting"
  And keeps the scanner active for another attempt

@US01
Scenario: US01 - Scenario 4: Camera permissions denied
  Given the Student/Teacher has not granted camera permissions
  When they try to open the scanner
  Then the system shows a modal with the message "Camera access is required for this feature"
  And presents a "Go to Settings" button so the Student/Teacher can enable it manually


Rule: US02 - Post-scan form autofill


# As a Reporting Student/Teacher
# I want the system to automatically load the location data after scanning the QR code
# So that I don't have to type the campus, building, and room name.

@US02
Scenario: US02 - Scenario 1: Location autofill
  Given the Student/Teacher scanned a valid campus QR code
  When they enter the "New Report" screen
  Then the "Campus", "Building", and "Room" fields appear automatically filled with the database information

@US02
Scenario: US02 - Scenario 2: Immutability of autofilled data
  Given the system autofilled the location via QR
  When the Student/Teacher views the form
  Then the system keeps the fields in a "Locked/Read-only" state to prevent manual changes
  And shows a visual indicator confirming the lock

@US02
Scenario: US02 - Scenario 3: Valid QR code but not registered
  Given the Student/Teacher scans a valid QR code that is not registered in the database
  When the system tries to make the "match"
  Then it shows a "Location not found" alert
  And redirects to the manual entry flow, unlocking the fields for selection


Rule: US03 - Manual location entry


# As a Reporting Student/Teacher
# I want to be able to enter my location manually via dropdown lists
# So that I can report the issue even if the physical QR code is torn off or unreadable.

@US03
Scenario: US03 - Scenario 1: Cascading manual selection
  Given the Student/Teacher chooses manual entry
  When they select a "Campus"
  Then the system enables the next dropdown, filtering only the buildings of that campus
  And when choosing a building, the corresponding rooms are automatically filtered

@US03
Scenario: US03 - Scenario 2: Mandatory location hierarchy
  Given the Student/Teacher is on the manual form
  When they try to interact with the "Room" dropdown without having chosen a "Campus" and "Building" first
  Then the "Room" dropdown must remain inactive
  And the system must show visual guidance indicating that the hierarchical order must be followed

@US03
Scenario: US03 - Scenario 3: Database connection failure
  Given the Student/Teacher opens the manual form
  When there is an internet outage and the lists cannot load from the server
  Then the system shows the message "Connection error. Tap to retry loading locations"
  And keeps a loading state until the connection is restored


Rule: US04 - Photo evidence upload component


# As a Reporting Student/Teacher
# I want to attach a photo of the problem from my gallery or camera
# So that I can provide exact visual evidence to the maintenance team.

@US04
Scenario: US04 - Scenario 1: Successful photo evidence upload
  Given the Student/Teacher selects a photo from their gallery or captures one with the camera
  When the image is processed successfully
  Then the system shows a thumbnail of the photo in the form
  And enables a "Delete" button in case the Student/Teacher wants to change the image

@US04
Scenario: US04 - Scenario 2: Image size and format limit
  Given the Student/Teacher tries to attach a file
  When the system validates the selected file
  Then it must only allow JPG or PNG extensions
  And must only allow a maximum size of 5MB
  And if the requirements are met, a progress bar is shown during the upload

@US04
Scenario: US04 - Scenario 3: Excessive size or invalid format
  Given the Student/Teacher chooses an 8MB file or a disallowed format
  When they try to upload it to the form
  Then the upload stops automatically
  And the system shows an error message "File not allowed. Make sure it's a JPG/PNG image of up to 5MB"


Rule: US05 - Visual issue category selection


# As a Reporting Student/Teacher
# I want to choose the type of problem by tapping a visual button
# So that I can classify the problem quickly without typing.

@US05
Scenario: US05 - Scenario 1: Category chip selection
  Given the Student/Teacher views the list of categories
  When they tap the "Furniture" category
  Then the chip changes its visual style to indicate it is selected
  And the "Send Report" button is enabled if the rest of the required fields are ready

@US05
Scenario: US05 - Scenario 2: Mutual exclusivity of category
  Given the Student/Teacher already has the "Furniture" category selected
  When they tap the "Electrical" category
  Then the system marks "Electrical" as the only active option
  And automatically unmarks the previous selection
  And ensures only one category is sent per report

@US05
Scenario: US05 - Scenario 3: Category selection omitted
  Given the Student/Teacher tries to press the send button
  When they have not selected any category chip
  Then the system prevents the form from being submitted
  And the category section shows a visual alert or a "Selection required" message


Rule: US06 - Short text description entry


# As a Reporting Student/Teacher
# I want to have a text box available on the form
# So that I can add specific details that the photo cannot show.

@US06
Scenario: US06 - Scenario 1: Text entry in description
  Given the Student/Teacher selects the "Description" field
  When they type the specific details of the detected issue
  Then the system displays the text in real time
  And updates a character counter showing the available space

@US06
Scenario: US06 - Scenario 2: Character limit in description
  Given the Student/Teacher is writing the description
  When they reach the maximum limit of 250 characters
  Then the field blocks any additional text input
  And the character counter highlights to warn about the limit

@US06
Scenario: US06 - Scenario 3: Input sanitization
  Given the Student/Teacher tries to paste code fragments or scripts
  When the field processes the text input
  Then the system automatically strips disallowed special characters
  And shows a warning message "Characters not allowed for security reasons have been removed"


Rule: US07 - Voice note recording as description


# As a Reporting Student/Teacher on the move
# I want to hold down a microphone button to record the description
# So that I can submit the report quickly if I can't stop to type.

@US07
Scenario: US07 - Scenario 1: Successful voice note recording
  Given the Student/Teacher holds down the microphone button
  When they speak and release the button after finishing their message
  Then the system generates a compressed audio file
  And attaches it to the form, showing a player with "Play" and "Delete" buttons

@US07
Scenario: US07 - Scenario 2: Recording time limit
  Given the Student/Teacher is recording a voice note
  When the recording reaches 30 seconds in duration
  Then the system stops the capture automatically
  And saves the recorded fragment
  And notifies the Student/Teacher that the time limit was reached

@US07
Scenario: US07 - Scenario 3: Recording too short
  Given the Student/Teacher accidentally presses the microphone button
  When the recording lasts less than 2 seconds before being released
  Then the system discards the file automatically
  And shows a floating message "Recording too short. Hold to record"


Rule: US08 - Success status screen and ticket generation


# As a Reporting Student/Teacher
# I want to see a confirmation screen after submission
# So that I have visual assurance that my report was received and get my tracking code.

@US08
Scenario: US08 - Scenario 1: Report submission confirmation
  Given the Student/Teacher completed the form with valid data
  When they press the "Send Report" button
  Then the system shows a success screen with an illustration or green check
  And prominently displays the generated ticket ID
  And shows a "Back to Home" button

@US08
Scenario: US08 - Scenario 2: Ticket naming convention
  Given the system processes the new report successfully
  When it generates the unique tracking identifier
  Then it must strictly follow the "TCK-YYYYMMDD-XXXX" structure
  And the ID must be selectable so the Student/Teacher can copy it to the clipboard

@US08
Scenario: US08 - Scenario 3: Server failure when sending report
  Given the Student/Teacher presses the send button
  When the server does not respond due to timeout or lack of connection
  Then the app shows an error screen with the message "Servers temporarily busy"
  And offers the option to save the report in the "Pending Drafts" section
  And allows retrying the submission later


Rule: US09 - Flow control and emergency exit


# As a Reporting Student/Teacher
# I want to have a "Cancel" or "Back" button always available during the report
# So that I can abandon the process if I made a mistake or decided not to send the information.

@US09
Scenario: US09 - Scenario 1: Abandoning a form with data
  Given the Student/Teacher has entered information in the form
  When they press the "Cancel" button or the back arrow
  Then the system shows a confirmation message "Do you want to discard the current report? The data will be lost"

@US09
Scenario: US09 - Scenario 2: Exiting an empty form
  Given the Student/Teacher entered the form but has not entered any data or attachment
  When they press the "Back" or "Cancel" button
  Then the system redirects them to the Dashboard immediately
  And shows no confirmation messages

@US09
Scenario: US09 - Scenario 3: Confirming report discard
  Given the Student/Teacher sees the confirmation message after trying to cancel
  When they select the "Yes, discard" option
  Then the system deletes all temporary data
  And deletes all attached files
  And returns to the home screen

