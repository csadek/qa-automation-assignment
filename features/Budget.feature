@web @Budget
# As a <type of user> I want <some goal> so that <some reason>
Feature: Budget
As a User I want to Add budget items
So that I can view my budget

  Background: Visit Budget App link
    Given I am on budget page

  @AddItem
  Scenario Outline: Add Item
    When I Add budget item with "<category>" and "<description>" and "<amount>"
    Then Item should be added
    And Working Balance calculation should be correct "<amount>" "<category>"
    Examples:
      | category  | description | amount |
      | Groceries | Tomato      | 20     |
      | Travel    | China       | 1500   |

  @AddItem
  Scenario Outline: Add multiple items
    When I Add multiple "<count>" budget items with "<category>" and "<description>" and "<amount>"
    Then "<count>" Items should be added
    # the following check will fail as I added 1 to the count 
    And Working Balance calculation should add all "<count>" of "<amount>" "<category>"
    Examples:
      | category      | description | amount | count |
      | Entertainment | cinema      | 100    | 3     |

  @AddItem
  Scenario Outline: Items with category income
    When I Add budget item with category income and "<description>" and "<amount>"
    Then Item should be added
    And Working Balance calculation should be correct "<amount>" "Income"
    Examples:
      | description | amount |
      | cinema      | 1000   |