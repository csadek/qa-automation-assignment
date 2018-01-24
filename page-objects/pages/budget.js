module.exports = {
  /**
   * Load the needed URL
   * @returns {Promise} a promise to load the URL
   */
  visitWebSite() {
    // return a promise so the calling function knows the task has completed
    return helpers.loadPage(shared.testData.budgetUrl);
  },
  /**
   * @param {string} category
   * @param {string} description
   * @param {number} amount
   */
  addItem(category, description, amount) {
    const categoryElement = `category${category}`;
    page.core.elementActions.click(categoryElement);
    page.core.elementActions.enterText('descriptionInputField', description);
    page.core.elementActions.enterText('valueInputField', amount);
    // return a promise so the calling function knows the task has completed
    return page.core.elementActions.click('addItemButton');
  },
  /**
   * @param {string} category
   * @param {string} description
   * @param {number} amount
   * @param {number} count
   */
  async addItems(count, category, description, amount) {
    const categoryElement = `category${category}`;
    for (let i = 0; i < count; i += 1) {
      await page.core.elementActions.click(categoryElement);
      await page.core.elementActions.enterText('descriptionInputField', description);
      await page.core.elementActions.enterText('valueInputField', amount);
      await page.core.elementActions.click('addItemButton');
    }
  },
  /**
   * @param {number} count
   * @param {number} numberOfBudgetItems
   */
  async verifyItemsAdded(count, numberOfBudgetItems) {
    const actualNumberOfBudgetItems = await page.pages.budget.countBudgetTableItems();
    const expected = parseInt(numberOfBudgetItems) + parseInt(count);
    // return a promise so the calling function knows the task has completed
    return assert.equal(actualNumberOfBudgetItems, expected);
  },
  /**
   * verify that working balance calculation after adding any item is correct
   * @param {number} amount
   * @param {number} count
   * @param {number} workingBalance
   * @param {number} category
   */
  async verifyCalculations(count, amount, workingBalance, category) {
    const actualWorkingBalance = await page.core.elementActions.getTextByIndex('workingBalanceField', 1);
    let actualWorkingBalanceNo = Number(actualWorkingBalance.replace(/[^0-9.-]+/g, ''));
    actualWorkingBalanceNo = parseFloat(Math.round(actualWorkingBalanceNo * 100) / 100).toFixed(2);
    let expectedWorkingBalance = Number(workingBalance.replace(/[^0-9.-]+/g, '')) - (amount * count);
    if (category === 'Income') {
      expectedWorkingBalance = Number(workingBalance.replace(/[^0-9.-]+/g, '')) + (amount * count);
    }
    expectedWorkingBalance = parseFloat(Math.round(expectedWorkingBalance * 100) / 100).toFixed(2);
    // return a promise so the calling function knows the task has completed
    return assert.equal(
      actualWorkingBalanceNo,
      expectedWorkingBalance,
    );
  },
  /**
   * count number of items at the budget table
   */
  async countBudgetTableItems() {
    const numberOfCells = await page.core.elementActions.countNumber('budgetTableCells');
    // return a promise so the calling function knows the task has completed
    return numberOfCells / 3;
  },
};
