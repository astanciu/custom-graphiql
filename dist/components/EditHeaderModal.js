'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _desc, _value, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _EditHeaderFormItem = require('./EditHeaderFormItem');

var _EditHeaderFormItem2 = _interopRequireDefault(_EditHeaderFormItem);

var _coreDecorators = require('core-decorators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var EditHeaderModal = (_class = function (_Component) {
  (0, _inherits3.default)(EditHeaderModal, _Component);

  function EditHeaderModal(props) {
    (0, _classCallCheck3.default)(this, EditHeaderModal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EditHeaderModal.__proto__ || Object.getPrototypeOf(EditHeaderModal)).call(this, props));

    var headerKeys = Object.keys(_this.props.headers);
    var headerValues = Object.values(_this.props.headers);
    headerKeys.push('');
    headerValues.push('');
    var validHeaders = headerKeys.map(function () {
      return true;
    });

    _this.state = {
      headerKeys: headerKeys,
      headerValues: headerValues,
      validHeaders: validHeaders
    };
    return _this;
  }

  (0, _createClass3.default)(EditHeaderModal, [{
    key: 'saveButtonPressed',
    value: function saveButtonPressed() {
      var _this2 = this;

      var headerKeysCopy = this.state.headerKeys.slice(0, this.state.headerKeys.length - 1);
      var validHeaders = headerKeysCopy.map(function (headerKey) {
        return headerKey.length !== 0 && !headerKey.includes(' ');
      });
      validHeaders.push(true);
      this.setState({
        validHeaders: validHeaders
      });
      var allHeadersValid = validHeaders.reduce(function (p, c) {
        return p && c;
      }, true);
      if (allHeadersValid) {
        (function () {
          var headerValuesCopy = _this2.state.headerValues.slice(0, _this2.state.headerValues.length - 1);
          var newHeaders = {};
          headerKeysCopy.forEach(function (headerKey, index) {
            return newHeaders[headerKey] = headerValuesCopy[index];
          });
          _this2.props.updateHeaders && _this2.props.updateHeaders(newHeaders);
        })();
      }
    }
  }, {
    key: 'updateKey',
    value: function updateKey(key, index) {
      this.state.headerKeys[index] = key;
      this.setState({});
    }
  }, {
    key: 'updateValue',
    value: function updateValue(value, index) {
      this.state.headerValues[index] = value;
      this.setState({});
    }
  }, {
    key: 'deleteHeader',
    value: function deleteHeader(index) {
      if (this.state.headerKeys.length === 1) {
        return;
      }
      this.state.headerKeys.splice(index, 1);
      this.state.headerValues.splice(index, 1);
      this.state.validHeaders.splice(index, 1);
      this.setState({});
    }
  }, {
    key: 'onInputFocus',
    value: function onInputFocus(index) {
      var isLast = index === this.state.headerKeys.length - 1;
      this.state.validHeaders[index] = true;
      isLast && this.pushNewHeader();
      this.setState({});
    }
  }, {
    key: 'pushNewHeader',
    value: function pushNewHeader() {
      this.state.headerKeys.push('');
      this.state.headerValues.push('');
      this.state.validHeaders.push(true);
    }
  }, {
    key: 'renderFormItems',
    value: function renderFormItems() {
      var _this3 = this;

      var headerKeys = this.state.headerKeys;
      var headerValues = this.state.headerValues;
      var validHeaders = this.state.validHeaders;
      return headerKeys.map(function (headerItem, index) {
        return _react2.default.createElement(_EditHeaderFormItem2.default, {
          key: index,
          index: index,
          totalItems: headerKeys.length,
          headerKey: headerKeys[index],
          headerValue: headerValues[index],
          isValid: validHeaders[index],
          onInputFocus: _this3.onInputFocus,
          deleteHeader: _this3.deleteHeader,
          updateKey: _this3.updateKey,
          updateValue: _this3.updateValue
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: _styles2.default.editHeaderModalContainer },
        _react2.default.createElement(
          'div',
          { style: _styles2.default.editHeaderModal },
          _react2.default.createElement(
            'div',
            { style: _styles2.default.editHeaderModelTitle },
            'Edit HTTP headers'
          ),
          this.renderFormItems(),
          _react2.default.createElement(
            'div',
            { style: _styles2.default.editModalButtonsWrapper },
            _react2.default.createElement(
              'div',
              {
                className: 'shadowButton',
                style: _styles2.default.shadowButton,
                onClick: this.props.hideEditHeaderModal
              },
              'Cancel'
            ),
            _react2.default.createElement(
              'div',
              {
                className: 'shadowButton',
                style: Object.assign({}, _styles2.default.shadowButton, _styles2.default.editHeaderModalSaveButton),
                onClick: this.saveButtonPressed
              },
              'Save'
            )
          )
        )
      );
    }
  }]);
  return EditHeaderModal;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, 'saveButtonPressed', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'saveButtonPressed'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateKey', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'updateKey'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateValue', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'updateValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'deleteHeader', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'deleteHeader'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onInputFocus', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'onInputFocus'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'pushNewHeader', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'pushNewHeader'), _class.prototype)), _class);
exports.default = EditHeaderModal;