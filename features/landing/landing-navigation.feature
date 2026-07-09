# language: en

@landing @US52
Feature: Navigation through the Landing Page informational sections

  As a Landing Page visitor
  I want to navigate between the site's main sections
  So that I can easily access information about the problem, the solution, how it works, the benefits, the target users, the app view, and contact.

  @automated
  Scenario: Successful navigation between sections
    Given the visitor is on the CampusLink Landing Page
    When they select an option from the top menu
    Then the system takes them to the corresponding section within the same page

  @automated
  Scenario: Access to the contact section
    Given the visitor wants to request information about CampusLink
    When they select the "Contact" option
    Then the system scrolls the page to the contact form

  @automated
  Scenario: Navigation on a mobile device
    Given the visitor accesses the Landing Page from a mobile device
    When they use the responsive menu
    Then the system lets them navigate through the main sections without losing content
