/*!
 * ZenginCode
 * Copyright(c) 2015 Sho Kusano <@rosylilly>
 * MIT Licensed
 */
(function() {
  'use strict';

  var zenginCode = require('./zengin-data');

  if (typeof define === 'function' && define.amd) {
    define(function() { return zenginCode; });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = zenginCode;
  } else {
    window.zenginCode = zenginCode;
  }
})();
