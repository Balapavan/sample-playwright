Feature: Verify Envet booking functionality
  @smoke
  Scenario Outline: Booking Events
    Given a user logins to application with "<UserName>" and "<Password>"
    When navigate to events page
    Then Click on booking button for "<Event_Name>"
    And fill user details "<UserName>" "<Phone_number>"

    Examples:
      | UserName                 | Password | Event_Name        | Phone_number |
      | store.data2026@gmail.com | Abc@1234 | Dilli Diwali Mela |   6789035689 |
