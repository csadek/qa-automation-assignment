module.exports = {
  /**
   * enters selenium element name and value to insert it
   * @param {string} elementName
   * @param {string} text
   * @returns {Promise}
   */
  enterText(elementName, text) {
    // return a promise so the calling function knows the task has completed
    const uiElement = page.core.elementsloader.getUiElementByKey(elementName);
    driver.wait(until.elementsLocated(uiElement), 10000)
      .then(() => driver.findElement(uiElement).clear());
    return driver.findElement(uiElement).sendKeys(text);
  },
  /**
   * find list of selenium elements then get value of specific element by its index
   * @param {string} elementName
   * @param {string} index
   * @returns {Promise}
   */
  getTextByIndex(elementName, index) {
    // return a promise so the calling function knows the task has completed
    const uiElement = page.core.elementsloader.getUiElementByKey(elementName);
    return driver.wait(until.elementsLocated(uiElement), 10000)
      .then(() => driver.findElements(uiElement)).then(elements =>
        elements[index].getText())
      .then(text => text);
  },
  /**
   * enters selenium element name to click it
   * @param {string} elementName
   * @returns {Promise}
   */
  click(elementName) {
    // return a promise so the calling function knows the task has completed
    const uiElement = page.core.elementsloader.getUiElementByKey(elementName);
    return driver
      .wait(until.elementsLocated(uiElement), 10000)
      .then(() => driver.findElement(uiElement).click());
  },
  /**
   * find selenium elements and count their number
   * @param {string} elementName
   * @returns {Promise}
   */
  countNumber(elementName) {
    const uiElement = page.core.elementsloader.getUiElementByKey(elementName);
    return driver
      .wait(until.elementsLocated(uiElement), 10000)
      .then(() =>
        driver
          .findElements(uiElement)
          .then(elements => elements.length));
  },
};
