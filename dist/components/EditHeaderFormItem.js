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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditHeaderFormItem = function (_Component) {
  (0, _inherits3.default)(EditHeaderFormItem, _Component);

  function EditHeaderFormItem() {
    (0, _classCallCheck3.default)(this, EditHeaderFormItem);
    return (0, _possibleConstructorReturn3.default)(this, (EditHeaderFormItem.__proto__ || Object.getPrototypeOf(EditHeaderFormItem)).apply(this, arguments));
  }

  (0, _createClass3.default)(EditHeaderFormItem, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var isLast = this.props.index === this.props.totalItems - 1;
      return _react2.default.createElement(
        'div',
        { style: _styles2.default.editModalFormItem },
        _react2.default.createElement(
          'div',
          {
            className: 'editModalInputWrapper',
            style: Object.assign({}, _styles2.default.editModalInputWrapper, this.props.isValid ? null : { backgroundColor: '#F8EDED' })
          },
          _react2.default.createElement('input', {
            className: 'editModalInput',
            style: Object.assign({}, _styles2.default.editModalInput, _styles2.default.editModelKeyInput),
            placeholder: 'key',
            value: this.props.headerKey,
            onFocus: function onFocus() {
              return _this2.props.onInputFocus(_this2.props.index);
            },
            onChange: function onChange(event) {
              return _this2.props.updateKey(event.target.value, _this2.props.index);
            }
          }),
          _react2.default.createElement('input', {
            className: 'editModalInput',
            style: Object.assign({}, _styles2.default.editModalInput, _styles2.default.editModelValueInput),
            placeholder: 'value',
            value: this.props.headerValue,
            onFocus: function onFocus() {
              return _this2.props.onInputFocus(_this2.props.index);
            },
            onChange: function onChange(event) {
              return _this2.props.updateValue(event.target.value, _this2.props.index);
            }
          })
        ),
        function () {
          if (isLast) {
            return _react2.default.createElement('div', { style: Object.assign({}, _styles2.default.editModalFormItemDelete, _styles2.default.editModalFormItemDeleteStub) });
          }

          return _react2.default.createElement(
            'div',
            {
              className: 'editModalFormItemDelete',
              style: _styles2.default.editModalFormItemDelete,
              onClick: function onClick() {
                return _this2.props.deleteHeader(_this2.props.index);
              }
            },
            _react2.default.createElement(
              'svg',
              {
                height: '16',
                role: 'img',
                version: '1.1',
                viewBox: '0 0 12 16',
                width: '12'
              },
              _react2.default.createElement('path', { fillRule: 'evenodd', d: 'M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z' })
            )
          );
        }()
      );
    }
  }]);
  return EditHeaderFormItem;
}(_react.Component);

exports.default = EditHeaderFormItem;