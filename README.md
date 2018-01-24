# QA-automation-assignment :: Automation testing project to test react budgeting App

### What is this repository for? ###

This Test Project is intended to build a solid framework to test the react budgeting tool.
The framework should be maintainable. I has three scenarios automated with all its dependencies.

### features:
* **Automation tool** : Selenium webdriver.
* **Scripting language** : Javascript.
* **Scripting IDE** : VSCode.
* **Testing Framework** : ucumber / Gherkin to apply BDD.
* **Reporting** : Cucumber html reporter.
* **Source Control**: git with github.
* **Linting**: ESlint.
* **Supported Browsers** : default chrome but other browsers are also supported by changing the browser name from 'selenium-cucumber-js.json' file.
* **Environment** : Local Host.
* **Package manager**  : `npm`

### How do I get set up? ###

First you should get the App under test and run it. Then you should get the tests
* Preconditions:
	- Visual Studio code is installed (or any development IDE)
	- Nodejs is installed
	- git is installed
* Database configuration
	- No DB required
* How to run App
	- git clone https://github.com/ModusCreateOrg/budgeting-sample-App-webpack2 - get the App
	- npm install - install dependencies
	- npm start - run development server
	- npm run prod - run production server
	- npm run build - build App for deployment
	- npm run serve - serve previously built App using pushstate server
	- npm run lint - lint check
	- npm run lint:fix - lint check + autofixes + prettify code with prettier
	- npm run test - run test suite
	- npm run test:fix - run test suite watching files for changes
	- npm run flow - run flow type checking
	- npm run update-types - update flow library definitions
* How to run tests
	-  git clone https://github.com/csadek/qa-automation-assignment.git - get the tests
	- npm run lint - lint check
	- npm run fix - lint check + autofixes + prettify code with prettier
	- npm run test - run test suite

### Main Concepts ###

*	I Follow the [Git model](http://nvie.com/posts/a-successful-git-branching-model/) and [good practices](https://sethrobertson.github.io/GitBestPractices/), like **feature branches**, commit early and often, useful commit messages, clean history via rebase, **squash** etc.
*  [Write Once, Test Everywhere](http://electronicdesign.com/embedded/java-write-once-test-everywhere) means the [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) tests here should be [SSOT](https://en.wikipedia.org/wiki/Single_source_of_truth) for all platforms we support (Web). It is important that tests should be platform agnostic, but the execution engine stays aware in the same time. Key feature here is the Automation [DSL](http://martinfowler.com/books/dsl.html) and a [Strategy pattern](https://gist.github.com/atsuya046/8534620). This can be achieved via Application driver layer. The DSL will encapsulate commonly used functions (e.g. login, navigation) and [web-element action wrappers]() (e.g. safe `wait_and_click`)
*	Abstractions live longer than details, so when creating test logic, I invest in the abstractions, not the concrete implementation.
*	A screen shot is added per fail.
*   Favor Declarative (**WHAT**) -over- Imperative (**HOW**) BDD. It is almost always better to develop atomic steps and reuse them in more generic ones via [Calling steps from step definitions](https://github.com/cucumber/cucumber/wiki/Calling-Steps-from-Step-Definitions). Find out more on [Pushing how down](http://www.marcusoft.net/2013/04/PushTheHowDown.html).
*	Favoring a ObjectMap over a PageObject ObjectMap (to avoid learning an entire PageObj complex abstraction layer and taxonomy) can be found in ---Selenium Testing Tools Cookbook, 2nd Edition--- book and seleniumeasy. Think of it as composition-over-inheritance, favoring a more flexible and powerful approach and avoiding design complex taxonomies. This also supports a data-driven approach as selectors are NOT hard coded in your code == no configuration possible. PageObj ties your code with complex abstractions, so in order to reuse it you always need this particular page in your web sites. Configuration files have their place, but when they are packaged with the code and not intended to be updated by the user, it takes just as many steps to update the value in the configuration file as it does to update it in the code, so there's really no encapsulation taking place. 

Here are some considerations before jumping into POMs (like holmium.core and page-objects) right away

*	Automatically built Page Objects are hard to maintain and use. There is little to no grouping of elements into headers and footers, or identified widgets. There would just be a big list and we question whether the automatically generated names read well enough to explain what they were for.
*	It might limit your design, e.g. starting to ignore better abstractions.
*	Not enough flexibility, especially for refactoring (both structure and implementation).

Find more here at dzone.

### Code architecture ###
Framework's layers should be close to the following diagram:
```
				===========================
				| Gherkin (feature files) |
				===========================
					|
			=====================================
			| Step definitions (step_functions) |
			=====================================
					|
				===============================
				|            DSL(pages)       |
				| (domain_models, strategies) |
				===============================
					|
			=========================================
			|            Selenium Wrappers(core)    |
			| (facade, decorators, adapters, proxy) |
			=========================================
					|
				==================    ===============
				|| Automation code  || webdriver_api |
				==================    ================
```
_________________________________________________________________
SELENIUM ARCHITECTURE HERE

### Test Scope

The scope of testing here is having a full coverage for the manual scenarios written below for both happy and negative scenarios. However, automation is only covering 3 scnearios. The first scneario is intended to fail. browser supported is :

- Google Chrome

<details>
<summary>View test plan:</summary>
## Test Plan

TestID | Test Case | Expected Result | Actual Result | Result | Related Comment
------------ | ------------- | -------------- | -------------- | ----- | ------
1 | Check that user can add income budget item successfully | Item should be added with budget category, description and value | Item is added successfully with all its details |  :white_check_mark:  |
2 | Check that user can add expenses budget item successfully | Item should be added with budget category, description and value | Item is added successfully with all its details |  :white_check_mark:  |
3 | Check budget item display on the gird view | Amount should be displayed as currency with $ sign and 2 decimal points.Expenses should be displayed with minus sign and red text however income should be displayed with plus sign and green text |  Amount is displayed as currency with $ sign and 2 decimal points.Expenses are displayed with minus sign and red text however income is displayed with plus sign and green text | :white_check_mark:  |
4 | Check that user can edit budget item successfully | Item should be updated with budget category, description and value. | Not implemented feature |  :construction:  |
5 | Check that user can delete budget item successfully | Item should be deleted. | Not implemented feature |  :construction:  |
6 | Check budget categories list | Categories list should be filled with all categories | Categories list is populated correctly |  :white_check_mark:  |
7 | Check budget categories default value | Default value should be displayed | When adding an item default category is displayed |  :white_check_mark:  |
8 | Check adding item with no description. | User can add item with no description | Item is added successfully and description column is empty |  :white_check_mark:  |
9 | Check description field maximum length | Description field should have max length based on business owner ex:250 character | No Max length is applied |  :red_circle:  |
10 | Check when adding item with zero value.| Item should not be added as amount is zero and will not reflect the calculations | Item added with zero amount |  :red_circle:  | That issue can be as expected
11 | Check adding item with negative value | Sign should not be allowed as it is displayed based on the item category | Sign is allowed but will not be considered at display or calculations |  :red_circle:  |
12 | Check value field maximum length | Amount should have maximum length accepted length ex: 43 | Length is accepted up to 309 digit which corrupt the layout of the app |  :red_circle:  |
13 | Check max number of budget items to add. | No max limit should be allowed |  User can add any number of items | :white_check_mark:  |
14 | Add expenses with value greater than income | Working balance should be negative value | Working balance is positive value |  :red_circle:  |
15 | Add expenses with value less than income | Working balance should be positive | Working balance is positive value |  :white_check_mark:  |
16 | Check work balance calculation when adding any value | Work balance should be equal income minus expenses | Work balance is calculated correctly |  :white_check_mark:  |
17 | Check inflow vs outflow reports | Report should be automatically updated and display 2 bars one for inflow and the other with outflow items.Only categories with the added items should be displayed | Reports are displayed correctly |  :white_check_mark:  |
18 | Check spending by category reports | Report should display all the expenses by category as dough nut chart. | Reports are displayed correctly |  :white_check_mark:  |
</details>