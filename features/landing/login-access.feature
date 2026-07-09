# language: en

@landing @US61
Feature: Access to login from the Landing Page

As a Landing Page visitor
I want to access the login or entry point to the CampusLink experience
So that I can explore the product through a clear entry point into the app or demo.

@automated
Scenario: US61 - Scenario 1: Display of the login access
Given the visitor is on the CampusLink Landing Page
When they view the top navigation bar
Then the system shows a visible option to log in

@automated
Scenario: US61 - Scenario 2: Selecting the login button
Given the visitor identifies the "Log in" option
When they select the "Log in" button
Then the system prepares access to the CampusLink login experience

@automated
Scenario: US61 - Scenario 3: Accessing login from a mobile device
Given the visitor accesses the Landing Page from a mobile device
When they use the responsive navigation to locate the login access
Then the system keeps the login option available without losing visibility
