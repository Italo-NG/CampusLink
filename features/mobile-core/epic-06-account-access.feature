# language: en

@mobile-core @prototype @manual @E6
Feature: E6 - Account Settings and Access

This epic groups the stories related to institutional authentication, initial setup, profile, notifications, visual appearance, help, logout, and privacy policies.

Rule: US43 - Login with Institutional Credentials


# As a Member of the university community
# I want to log in with my institutional Microsoft 365 credentials
# So that I can access securely without needing to create or remember a new account.

@US43
Scenario: US43 - Scenario 1: Successful institutional login
  Given the Student/Teacher logs in with a valid institutional account
  When the system validates the credentials via Microsoft 365
  Then the user accesses CampusLink successfully
  And the system routes them to the Dashboard corresponding to their role

@US43
Scenario: US43 - Scenario 2: External domain restriction
  Given the user tries to log in with a personal email such as "@gmail.com"
  When the system validates the email format
  Then it blocks access
  And shows the message "Restricted access: Only UPC institutional emails are allowed"

@US43
Scenario: US43 - Scenario 3: Credential error
  Given the user enters incorrect data
  When the authentication service rejects the request
  Then the system highlights the fields
  And shows the message "Incorrect credentials. Try again or recover your password through the official channels"


Rule: US44 - Default Campus Selection and Persistence


# As a returning Student/Teacher
# I want to choose my main campus after the first login
# So that the app automatically personalizes my browsing and reporting experience.

@US44
Scenario: US44 - Scenario 1: Initial setup
  Given it is the Student/Teacher's first time entering the app
  When the welcome selector is displayed
  Then the Student/Teacher chooses their campus
  And the system saves this preference in the account profile

@US44
Scenario: US44 - Scenario 2: Automatic preference load
  Given the Student/Teacher already selected a campus in previous sessions
  When they open the app in the future
  Then the Dashboard loads that campus's information by default
  And does not require a new selection

@US44
Scenario: US44 - Scenario 3: Mandatory selection
  Given the Student/Teacher tries to skip the campus selection step
  When they tap outside the selection area or try to proceed
  Then the system prevents them from continuing
  And asks them to choose a valid option to set up their environment


Rule: US45 - Profile and Institutional Role Display


# As an authenticated Student/Teacher
# I want to check my personal data and the role assigned by the university
# So that I can verify that my identity and usage permissions are correct.

@US45
Scenario: US45 - Scenario 1: Profile lookup
  Given the Student/Teacher accesses the "My Profile" section
  When the information loads from the university database
  Then they see their full name
  And they see their student or employee code
  And they see a distinctive badge with their role

@US45
Scenario: US45 - Scenario 2: Role category protection
  Given the role is sensitive data assigned administratively
  When the Student/Teacher views their profile
  Then the "Role" field appears as read-only
  And any manual edit attempt is prevented for security

@US45
Scenario: US45 - Scenario 3: Data sync failure
  Given the profile server is not responding
  When the Student/Teacher tries to enter their profile
  Then the system shows loading states
  And shows a "Retry loading profile" button


Rule: US46 - Push Notification Settings


# As a focused Student/Teacher
# I want to customize the behavior of push notifications
# So that I can avoid sound distractions during critical academic activities.

@US46
Scenario: US46 - Scenario 1: Enabling or disabling notifications
  Given the Student/Teacher accesses the settings section
  When they change the push notification status
  Then the system saves the selected preference
  And applies the setting to future alerts

@US46
Scenario: US46 - Scenario 2: Muting notifications during academic activities
  Given the Student/Teacher needs to avoid distractions
  When they activate a mute or focus mode option
  Then the system reduces sound alerts
  And keeps notifications available within the internal inbox

@US46
Scenario: US46 - Scenario 3: System permissions disabled
  Given the Student/Teacher disabled notifications from the operating system
  When they try to enable notifications from CampusLink
  Then the app shows an explanatory notice
  And guides the user to enable the permissions from the device settings


Rule: US47 - Switching Between Light Theme and Dark Mode


# As a Student/Teacher with eye strain or in dark environments
# I want to switch between light theme and dark mode
# So that I can improve readability and reduce eye fatigue.

@US47
Scenario: US47 - Scenario 1: Manual theme change
  Given the Student/Teacher selects "Dark Mode" in the settings
  When they confirm the choice
  Then the interface immediately changes its color palette
  And uses dark backgrounds and high-contrast text

@US47
Scenario: US47 - Scenario 2: Automatic adaptation
  Given the Student/Teacher chooses the "Sync with system" option
  When the mobile device switches modes based on schedule or power saving
  Then CampusLink adjusts its visual theme automatically in real time

@US47
Scenario: US47 - Scenario 3: Contrast on media elements
  Given the app is in dark mode
  When a clear evidence photograph is displayed
  Then the system applies a subtle border or shading to the image
  And ensures it stands out from the dark background


Rule: US48 - Help Center and Technical Error Reporting


# As a Student/Teacher who detects a malfunction in the app
# I want to send technical feedback to the developers
# So that I can contribute to the tool's continuous improvement.

@US48
Scenario: US48 - Scenario 1: Successful feedback submission
  Given the Student/Teacher writes a suggestion in the "Help" module
  When they press "Send"
  Then the system processes the message
  And confirms receipt with a thank-you message

@US48
Scenario: US48 - Scenario 2: Diagnostic data collection
  Given an error report is sent
  When the Student/Teacher confirms the submission
  Then the app automatically attaches technical metadata
  And includes the app version and the device model

@US48
Scenario: US48 - Scenario 3: Content validation
  Given the Student/Teacher tries to send a blank comment
  When they press the send button
  Then the system blocks the action
  And asks for at least a short description of the issue


Rule: US49 - Secure Logout and Data Cleanup


# As a Student/Teacher using shared or public devices
# I want to permanently log out of my session
# So that I can protect my identity and my report history.

@US49
Scenario: US49 - Scenario 1: System sign-out
  Given the Student/Teacher presses "Log Out"
  And confirms in the dialog
  When the system processes the request
  Then the access token is invalidated
  And the user is redirected to the welcome screen

@US49
Scenario: US49 - Scenario 2: Cache protection
  Given the session has been closed successfully
  When a new user tries to open the app on the same device
  Then the system ensures the previous user's data has been erased
  And deletes history, temporary photos, and sensitive local data

@US49
Scenario: US49 - Scenario 3: Preventive confirmation
  Given the Student/Teacher accidentally taps the logout button
  When the interaction is detected
  Then the system shows a mandatory confirmation modal
  And prevents unwanted logouts


Rule: US50 - Legal Transparency and Privacy Policies


# As a Student/Teacher who cares about their privacy
# I want to access the app's terms and conditions
# So that I can understand the legal handling of my data and photographs within the campus.

@US50
Scenario: US50 - Scenario 1: Viewing the terms
  Given the Student/Teacher enters the "Legal Information" menu
  When they select "Privacy Policy"
  Then the system displays the updated official document
  And the document is shown in accordance with the Personal Data Protection Law

@US50
Scenario: US50 - Scenario 2: Version identification
  Given the Student/Teacher reviews the legal information or the profile footer
  When they view the details
  Then the system clearly shows the currently installed software version
  And an identifier such as "v1.0.0" may be displayed

@US50
Scenario: US50 - Scenario 3: Offline availability
  Given the Student/Teacher tries to read the terms without an internet connection
  When they access the section
  Then the app loads a locally stored summarized version
  And guarantees access to basic privacy information

