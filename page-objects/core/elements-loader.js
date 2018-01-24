module.exports = {
  /**
   * enters element name to get selenium element from its locator and selector
   * @param {string} elementName
   * @returns {Promise}
   */
  getUiElementByKey(elementName) {
    const uiElement = shared.elements[elementName];
    const uiElementLocator = uiElement.locator;
    const uiElementSelector = uiElement.selector;
    let seleniumElement;
    switch (uiElementLocator) {
      case 'name':
        seleniumElement = by.name(uiElementSelector);
        break;
      case 'id':
        seleniumElement = by.id(uiElementSelector);
        break;
      case 'css':
        seleniumElement = by.css(uiElementSelector);
        break;
      case 'xpath':
        seleniumElement = by.xpath(uiElementSelector);
        break;
      case 'className':
        seleniumElement = by.className(uiElementSelector);
        break;
      case 'linkText':
        seleniumElement = by.linkText(uiElementSelector);
        break;
      default:
        throw new Error('Element Locator is not correct');
    }
    return seleniumElement;
  },
};
