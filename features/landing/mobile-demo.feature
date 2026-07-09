# language: en

@landing @US58
Feature: Visual exploration of the embedded mobile demo

As a Landing Page visitor
I want to explore a visual preview of the CampusLink mobile demo
So that I can understand what the product's main experience would look like in a mobile app.

@automated
Scenario: US58 - Scenario 1: Display of the App view section
Given the visitor accesses the "App view" section
When they view the mobile demo's visual content
Then the system shows a representation of the CampusLink mobile interface

@automated
Scenario: US58 - Scenario 2: Recognizing the product's mobile experience
Given the visitor is on the "App view" section
When they review the representative screen of the application
Then the system lets them identify a mobile experience related to accessing or using CampusLink

@automated
Scenario: US58 - Scenario 3: Relating the mobile demo to the main features
Given the visitor analyzes the "App view" section
When they interpret the demo's visual representation
Then the system communicates that CampusLink has a mobile experience focused on reporting, locating, evidencing, and tracking incidents
