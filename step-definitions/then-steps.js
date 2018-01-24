module.exports = function () {
  this.Then(/^Item should be added$/, () => {
    // verify that one item is added to the table
    return page.pages.budget.verifyItemsAdded(1, this.numberOfBudgetItems);
  });
  this.Then(/^"([^"]*)" Items should be added$/, (count) => {
    // verify that multiple items are added to the table
    return page.pages.budget.verifyItemsAdded(count, this.numberOfBudgetItems);
  });
  this.Then(/^Working Balance calculation should be correct "([^"]*)" "([^"]*)"$/, (amount, category) => {
    // verify that Working Balance calculation is correct for one item
    return page.pages.budget.verifyCalculations(1, amount, this.workingBalance, category);
  });
  this.Then(/^Working Balance calculation should add all "([^"]*)" of "([^"]*)" "([^"]*)"$/, (count, amount, category) => {
    // verify that Working Balance calculation is correct for multiple items
    // the following check will fail as I added 1 to the count and
    // if you want to pass the scenario simple remove the (+1) at the below row
    return page.pages.budget.verifyCalculations(count + 1, amount, this.workingBalance, category);
  });
};
