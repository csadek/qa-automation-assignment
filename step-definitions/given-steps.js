module.exports = function () {
  /**
  * @returns {Promise} a promise to enter the search values
  */
  this.Given(/^I am on budget page$/, () => {
    // load budget URL
    return page.pages.budget.visitWebSite();
  });
};
