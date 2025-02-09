/** Class for utility functions */
export default class Util {
  /**
   * Extend an array just like JQuery's extend.
   *
   * @returns {object} Merged objects.
   */
  static extend() {
    for (let i = 1; i < arguments.length; i++) {
      for (let key in arguments[i]) {
        if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
          if (
            typeof arguments[0][key] === 'object' &&
            typeof arguments[i][key] === 'object'
          ) {
            this.extend(arguments[0][key], arguments[i][key]);
          }
          else {
            arguments[0][key] = arguments[i][key];
          }
        }
      }
    }
    return arguments[0];
  }

  /**
   * Retrieves value and unit of a CSS length string.
   * Will interpret a number without a unit as px.
   *
   * @param {string} [cssLength=''] Length string.
   * @returns {null|object} Null if string cannot be parsed or value + unit.
   */
  static parseCSSLengthProperty(cssLength = '') {
    if (typeof cssLength !== 'string') {
      return null;
    }

    // Cmp. https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units
    const regex = /((?:\d*\.)*\d+)(?:\s)*(cm|mm|Q|in|pc|pt|px|em|ex|ch|rem|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh)?/;
    const match = cssLength.match(regex);

    if (!match) {
      return null;
    }

    return {
      value: parseFloat(match[1]),
      unit: match[2] || 'px'
    };
  }

  /**
   * Get root field.
   *
   * @param {object} field H5P editor field.
   * @returns {null|object} H5P editor field.
   */
  static getRootField(field) {
    if (typeof field !== 'object') {
      return null;
    }

    let root = field;
    while (root.parent) {
      root = root.parent;
    }

    return root;
  }

  /**
   * Double click handler.
   *
   * @param {Event} event Regular click event.
   * @param {function} callback Function to execute on doubleClick.
   */
  static doubleClick(event, callback) {
    if (!event || typeof callback !== 'function') {
      return;
    }

    if (isNaN(event.target.count)) {
      event.target.count = 1;
    }
    else {
      event.target.count++;
    }

    setTimeout(() => {
      if (event.target.count === 2) {
        callback();
      }
      event.target.count = 0;
    }, Util.DOUBLE_CLICK_TIME);
  }
}

/** @constant {number} DOUBLE_CLICK_TIME Double click time in ms. */
Util.DOUBLE_CLICK_TIME = 300;
