'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _styles = require('./styles.js');

var _styles2 = _interopRequireDefault(_styles);

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

var TopBar = (_class = function (_Component) {
  (0, _inherits3.default)(TopBar, _Component);

  function TopBar(props) {
    (0, _classCallCheck3.default)(this, TopBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TopBar.__proto__ || Object.getPrototypeOf(TopBar)).call(this, props));

    _this.state = {
      inputFocused: false,
      schemaFetchError: props.schemaFetchError,
      inputValue: props.graphQLEndpoint
    };
    return _this;
  }

  (0, _createClass3.default)(TopBar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.schemaFetchError !== nextProps.schemaFetchError) {
        this.state.schemaFetchError = nextProps.schemaFetchError;
      }
    }
  }, {
    key: 'onInputKeyPress',
    value: function onInputKeyPress(event) {
      if (event.which === 13) {
        this.urlInputRef && this.urlInputRef.blur();
        this.onFetchButtonPressed();
        event.preventDefault();
        return false;
      }

      return true;
    }
  }, {
    key: 'onFetchButtonPressed',
    value: function onFetchButtonPressed() {
      var url = this.state.inputValue;
      this.props.fetchGraphQLSchema && this.props.fetchGraphQLSchema(url);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var inputWrapperStyle = this.state.inputFocused ? _styles2.default.urlInputWrapperFocused : this.state.schemaFetchError ? _styles2.default.urlInputWrapperError : null;
      return _react2.default.createElement(
        'div',
        { style: _styles2.default.topBar },
        _react2.default.createElement(
          'form',
          null,
          _react2.default.createElement(
            'div',
            {
              style: (0, _extends3.default)({}, _styles2.default.urlInputWrapper, inputWrapperStyle),
              tabIndex: -1
            },
            _react2.default.createElement(
              'div',
              { style: _styles2.default.urlInputLabel },
              'GraphQL Endpoint'
            ),
            _react2.default.createElement('input', {
              ref: function ref(component) {
                return component && (_this2.urlInputRef = component);
              },
              style: _styles2.default.urlInput,
              type: 'text',
              value: this.state.inputValue || '',
              onChange: function onChange(event) {
                return _this2.setState({ inputValue: event.target.value });
              },
              placeholder: 'http://localhost:8080/graphql',
              onFocus: function onFocus() {
                return _this2.setState({ inputFocused: true, schemaFetchError: '' });
              },
              onBlur: function onBlur() {
                return _this2.setState({ inputFocused: false });
              },
              onKeyPress: this.onInputKeyPress
            })
          )
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'shadowButton',
            style: (0, _extends3.default)({}, _styles2.default.shadowButton, _styles2.default.fetchButton),
            onClick: this.onFetchButtonPressed
          },
          'Fetch'
        )
      );
    }
  }]);
  return TopBar;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, 'onInputKeyPress', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'onInputKeyPress'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onFetchButtonPressed', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'onFetchButtonPressed'), _class.prototype)), _class);
exports.default = TopBar;