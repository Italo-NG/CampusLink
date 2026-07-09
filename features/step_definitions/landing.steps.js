const { Given, When, Then } = require('@cucumber/cucumber');

// =====================================================
// US52 - Navigation through the Landing Page informational sections
// File: landing-navigation.feature
// =====================================================

// US52 - Scenario 1: Successful navigation between sections
Given('the visitor is on the CampusLink Landing Page', function () {
// Step prepared for basic Cucumber execution.
});

When('they select an option from the top menu', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system takes them to the corresponding section within the same page', function () {
// Step prepared for basic Cucumber execution.
});

// US52 - Scenario 2: Access to the contact section
Given('the visitor wants to request information about CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

When('they select the {string} option', function (option) {
// Reused step if another scenario selects a named navigation option.
this.selectedOption = option;
});

Then('the system scrolls the page to the contact form', function () {
// Step prepared for basic Cucumber execution.
});

// US52 - Scenario 3: Navigation on a mobile device
Given('the visitor accesses the Landing Page from a mobile device', function () {
// Step prepared for basic Cucumber execution.
});

When('they use the responsive menu', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system lets them navigate through the main sections without losing content', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US51 - Immediate display of CampusLink's value proposition
// File: landing-sections.feature
// =====================================================

// US51 - Scenario 1: Successful display of the value proposition
Given('the visitor enters the CampusLink Landing Page', function () {
// Step prepared for basic Cucumber execution.
});

When('the site\'s initial section loads', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system shows the main title, a description of CampusLink, and a representative image of the product', function () {
// Step prepared for basic Cucumber execution.
});

// US51 - Scenario 2: Quick understanding of the product's purpose
Given('the visitor views the Landing Page\'s main section', function () {
// Step prepared for basic Cucumber execution.
});

When('they read CampusLink\'s introductory message', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system communicates that CampusLink allows reporting, locating, and tracking campus incidents', function () {
// Step prepared for basic Cucumber execution.
});

// US51 - Scenario 3: Initial access to the Landing Page's main actions
Given('the visitor is on the Landing Page\'s initial section', function () {
// Step prepared for basic Cucumber execution.
});

When('they review the Hero\'s visible elements', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system shows entry points or calls to action related to learning about the product or starting to browse the page', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// Reused section-location steps
// These steps are used by several scenarios in US53, US54, US55, US56 and US57.
// They are defined only once to avoid duplicated step definition errors in Cucumber.
// =====================================================

Given('the visitor navigates to the {string} section', function (sectionName) {
this.sectionName = sectionName;
});

Given('the visitor is on the {string} section', function (sectionName) {
this.sectionName = sectionName;
});

Given('the visitor analyzes the {string} section', function (sectionName) {
this.sectionName = sectionName;
});

Given('the visitor accesses the {string} section', function (sectionName) {
this.sectionName = sectionName;
});

// =====================================================
// US53 - Understanding the current incident management problem
// File: landing-sections.feature
// =====================================================

// US53 - Scenario 1: Display of the current problem
When('they review the content presented about the current situation', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system shows the main problems that CampusLink seeks to solve', function () {
// Step prepared for basic Cucumber execution.
});

// US53 - Scenario 2: Identifying difficulties in incident management
When('they review the problem\'s informational cards', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system presents difficulties such as scattered reports, lack of follow-up, and incomplete information for support', function () {
// Step prepared for basic Cucumber execution.
});

// US53 - Scenario 3: Relating the problem to the campus's need
When('they compare the information presented with the experience of reporting incidents on a campus', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system helps them understand the need to centralize incident reporting', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US54 - Understanding CampusLink's proposed solution
// File: landing-sections.feature
// =====================================================

// US54 - Scenario 1: Display of the proposed solution
When('they review the content presented about CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system shows how CampusLink helps report, locate, and track incidents', function () {
// Step prepared for basic Cucumber execution.
});

// US54 - Scenario 2: Identifying the solution's main components
When('they review the solution\'s informational cards', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system presents components such as fast reporting, precise location, clear evidence, and visible tracking', function () {
// Step prepared for basic Cucumber execution.
});

// US54 - Scenario 3: Understanding CampusLink's differential value
When('they interpret the information presented', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system communicates that CampusLink centralizes the campus incident reporting and tracking process', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US55 - Explaining how incident reporting works
// File: landing-sections.feature
// =====================================================

// US55 - Scenario 1: Display of the how-it-works flow
When('they review the steps presented', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system shows a clear sequence of the incident reporting and tracking process', function () {
// Step prepared for basic Cucumber execution.
});

// US55 - Scenario 2: Understanding the reporting process
When('they review CampusLink\'s usage journey', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system explains that the user detects an incident, scans a QR code, records evidence, and sends the report to support', function () {
// Step prepared for basic Cucumber execution.
});

// US55 - Scenario 3: Relating the process steps to report tracking
When('they view the complete how-it-works sequence', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system communicates that the report can be received, handled, and tracked by the user', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US56 - Display of the main benefits of centralized reporting
// File: landing-sections.feature
// =====================================================

// US56 - Scenario 1: Successful display of benefits
When('they review the informational cards', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system shows the main benefits generated by CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

// US56 - Scenario 2: Identifying operational benefits
When('they review the benefits presented', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system highlights benefits such as fast reporting, precise location, clear evidence, transparent tracking, and operational prioritization', function () {
// Step prepared for basic Cucumber execution.
});

// US56 - Scenario 3: Understanding the impact of the benefits
When('they relate the benefits to campus incident management', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system helps them understand how CampusLink improves communication between users and support', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US57 - Identifying the product's target users
// File: landing-sections.feature
// =====================================================

// US57 - Scenario 1: Display of target users
When('they review the profile cards', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system shows students, teachers, and support or operations staff as target users', function () {
// Step prepared for basic Cucumber execution.
});

// US57 - Scenario 2: Understanding the value for students and teachers
When('they review the student and teacher profiles', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system communicates that both profiles can report incidents and track their requests', function () {
// Step prepared for basic Cucumber execution.
});

// US57 - Scenario 3: Understanding the value for support and operations
When('they review the support or operations staff profile', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system communicates that this profile can receive clearer information to handle incidents', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US60 - Responsive access to the Landing Page
// File: landing-sections.feature
// =====================================================

// US60 - Scenario 1: Responsive display of the Landing Page
Given('the visitor opens the Landing Page from a mobile screen', function () {
// Step prepared for basic Cucumber execution.
});

When('they navigate through the site\'s main sections', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system adapts text, images, cards, and navigation to the screen size', function () {
// Step prepared for basic Cucumber execution.
});

// US60 - Scenario 2: Reading content on mobile devices
Given('the visitor reviews the Landing Page from a mobile device', function () {
// Step prepared for basic Cucumber execution.
});

When('they view the informational sections', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system keeps the content readable and organized without causing unnecessary horizontal scrolling', function () {
// Step prepared for basic Cucumber execution.
});

// US60 - Scenario 3: Responsive access to main sections
Given('the visitor uses the mobile version of the Landing Page', function () {
// Step prepared for basic Cucumber execution.
});

When('they interact with the site\'s navigation and sections', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system allows access to the main content without losing information', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US62 - Brand recognition and institutional closing of the Landing Page
// File: landing-sections.feature
// =====================================================

// US62 - Scenario 1: Display of the footer
Given('the visitor reaches the end of the Landing Page', function () {
// Step prepared for basic Cucumber execution.
});

When('they view the final section', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system shows the CampusLink logo or name and a closing message', function () {
// Step prepared for basic Cucumber execution.
});

// US62 - Scenario 2: Recognizing the responsible team
Given('the visitor is on the Landing Page\'s footer', function () {
// Step prepared for basic Cucumber execution.
});

When('they review the final institutional information', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system shows the reference to the Montimin team as the product\'s owner', function () {
// Step prepared for basic Cucumber execution.
});

// US62 - Scenario 3: Institutional closing of the Landing Page
Given('the visitor analyzes the Landing Page\'s closing', function () {
// Step prepared for basic Cucumber execution.
});

When('they read the site\'s final message', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system reinforces that CampusLink brings together campus incident reporting, location, evidence, and tracking in one place', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US59 - Request for institutional information about CampusLink
// File: contact-form.feature
// =====================================================

// US59 - Scenario 1: Display of the contact form
// Reuses: Given('the visitor accesses the {string} section', ...)

When('they view the institutional request form', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system shows fields to record contact details, institution information, and interest in CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

// US59 - Scenario 2: Recording institutional data
Given('the visitor is on the contact form', function () {
// Step prepared for basic Cucumber execution.
});

When('they fill in the required institutional fields', function (dataTable) {
// The form data is stored for traceability during basic Cucumber execution.
this.formData = dataTable.rowsHash();
});

Then('the system retains the entered information to prepare the request', function () {
// Step prepared for basic Cucumber execution.
});

// US59 - Scenario 3: Submitting the information request
Given('the visitor has completed the contact form', function () {
// Step prepared for basic Cucumber execution.
});

When('they select the {string} button', function (buttonName) {
// Reused action pattern for buttons or calls to action.
this.selectedButton = buttonName;
});

Then('the system displays or prepares the information request about CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US61 - Access to login from the Landing Page
// File: login-access.feature
// =====================================================

// US61 - Scenario 1: Display of the login access
// Reuses: Given('the visitor is on the CampusLink Landing Page', ...)

When('they view the top navigation bar', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system shows a visible option to log in', function () {
// Step prepared for basic Cucumber execution.
});

// US61 - Scenario 2: Selecting the login button
Given('the visitor identifies the {string} option', function (optionName) {
// Step prepared for basic Cucumber execution.
this.optionName = optionName;
});

// Reuses: When('they select the {string} button', ...)

Then('the system prepares access to the CampusLink login experience', function () {
// Step prepared for basic Cucumber execution.
});

// US61 - Scenario 3: Accessing login from a mobile device
// Reuses: Given('the visitor accesses the Landing Page from a mobile device', ...)

When('they use the responsive navigation to locate the login access', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system keeps the login option available without losing visibility', function () {
// Step prepared for basic Cucumber execution.
});

// =====================================================
// US58 - Visual exploration of the embedded mobile demo
// File: mobile-demo.feature
// =====================================================

// US58 - Scenario 1: Display of the App view section
// Reuses: Given('the visitor accesses the {string} section', ...)

When('they view the mobile demo\'s visual content', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system shows a representation of the CampusLink mobile interface', function () {
// Step prepared for basic Cucumber execution.
});

// US58 - Scenario 2: Recognizing the product's mobile experience
// Reuses: Given('the visitor is on the {string} section', ...)

When('they review the representative screen of the application', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system lets them identify a mobile experience related to accessing or using CampusLink', function () {
// Step prepared for basic Cucumber execution.
});

// US58 - Scenario 3: Relating the mobile demo to the main features
// Reuses: Given('the visitor analyzes the {string} section', ...)

When('they interpret the demo\'s visual representation', function () {
// Step prepared for basic Cucumber execution.
});

Then('the system communicates that CampusLink has a mobile experience focused on reporting, locating, evidencing, and tracking incidents', function () {
// Step prepared for basic Cucumber execution.
});
