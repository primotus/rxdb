"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decrypt = decrypt;
exports["default"] = void 0;
exports.encrypt = encrypt;
exports.rxdb = exports.prototypes = exports.overwritable = void 0;

var _aes = _interopRequireDefault(require("crypto-js/aes"));

var cryptoEnc = _interopRequireWildcard(require("crypto-js/enc-utf8"));

var _rxError = require("../rx-error");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * this plugin adds the encryption-capabilities to rxdb
 * It's using crypto-js/aes for password-encryption
 * @link https://github.com/brix/crypto-js
 */
var minPassLength = 8;

function encrypt(value, password) {
  var encrypted = _aes["default"].encrypt(value, password);

  return encrypted.toString();
}

function decrypt(cipherText, password) {
  var decrypted = _aes["default"].decrypt(cipherText, password);

  return decrypted.toString(cryptoEnc);
}

var _encryptValue = function _encryptValue(value) {
  return encrypt(JSON.stringify(value), this.password);
};

var _decryptValue = function _decryptValue(encryptedValue) {
  var decrypted = decrypt(encryptedValue, this.password);
  return JSON.parse(decrypted);
};

var rxdb = true;
exports.rxdb = rxdb;
var prototypes = {
  /**
   * set crypto-functions for the Crypter.prototype
   */
  Crypter: function Crypter(proto) {
    proto._encryptValue = _encryptValue;
    proto._decryptValue = _decryptValue;
  }
};
exports.prototypes = prototypes;
var overwritable = {
  validatePassword: function validatePassword(password) {
    if (password && typeof password !== 'string') {
      throw (0, _rxError.newRxTypeError)('EN1', {
        password: password
      });
    }

    if (password && password.length < minPassLength) {
      throw (0, _rxError.newRxError)('EN2', {
        minPassLength: minPassLength,
        password: password
      });
    }
  }
};
exports.overwritable = overwritable;
var _default = {
  rxdb: rxdb,
  prototypes: prototypes,
  overwritable: overwritable
};
exports["default"] = _default;

//# sourceMappingURL=encryption.js.map