# language: en

@landing @US59
Feature: Request for institutional information about CampusLink

As a representative of an educational institution
I want to fill out a contact form on the Landing Page
So that I can request information about CampusLink and evaluate a possible implementation on my campus.

@automated
Scenario: US59 - Scenario 1: Display of the contact form
Given the visitor accesses the "Contact" section
When they view the institutional request form
Then the system shows fields to record contact details, institution information, and interest in CampusLink

@automated
Scenario: US59 - Scenario 2: Recording institutional data
Given the visitor is on the contact form
When they fill in the required institutional fields
| institutionType | University |
| institution     | UPC         |
| contact         | Diego       |
| role            | Student  |
| email           | [contacto@upc.edu.pe](mailto:contacto@upc.edu.pe) |
| phone           | 999999999   |
| students        | 10000       |
| interest        | Learn about CampusLink |
| needs           | Improve incident reporting and tracking |
Then the system retains the entered information to prepare the request

@automated
Scenario: US59 - Scenario 3: Submitting the information request
Given the visitor has completed the contact form
When they select the "Send request" button
Then the system displays or prepares the information request about CampusLink
