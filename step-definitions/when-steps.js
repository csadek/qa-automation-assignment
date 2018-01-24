module.exports = function () {
  this.When(/^I Add budget item with "([^"]*)" and "([^"]*)" and "([^"]*)"$/, async (category, desc, amount) => {
    // count number of items and working balance then add budget item
    this.numberOfBudgetItems = await page.pages.budget.countBudgetTableItems();
    this.workingBalance = await page.core.elementActions.getTextByIndex('workingBalanceField', 1);
    return page.pages.budget.addItem(category, desc, amount);
  });
  this.When(/^I Add multiple "([^"]*)" budget items with "([^"]*)" and "([^"]*)" and "([^"]*)"$/, async (count, category, desc, amount) => {
    // count number of items and working balance then add multiple budget items
    this.numberOfBudgetItems = await page.pages.budget.countBudgetTableItems();
    this.workingBalance = await page.core.elementActions.getTextByIndex('workingBalanceField', 1);
    return page.pages.budget.addItems(count, category, desc, amount);
  });
  this.When(/^I Add budget item with category income and "([^"]*)" and "([^"]*)"$/, async (desc, amount) => {
    // count number of items and working balance then add budget item of type income
    this.numberOfBudgetItems = await page.pages.budget.countBudgetTableItems();
    this.workingBalance = await page.core.elementActions.getTextByIndex('workingBalanceField', 1);
    return page.pages.budget.addItem('Income', desc, amount);
  });
};
