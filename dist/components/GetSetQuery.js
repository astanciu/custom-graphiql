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

var _graphiql = require('graphiql');

var _graphiql2 = _interopRequireDefault(_graphiql);

var _coreDecorators = require('core-decorators');

var _reactCopyToClipboard = require('react-copy-to-clipboard');

var _reactCopyToClipboard2 = _interopRequireDefault(_reactCopyToClipboard);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

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

var GetSetQuery = (_class = function (_Component) {
  (0, _inherits3.default)(GetSetQuery, _Component);

  function GetSetQuery(props) {
    (0, _classCallCheck3.default)(this, GetSetQuery);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GetSetQuery.__proto__ || Object.getPrototypeOf(GetSetQuery)).call(this, props));

    _this.state = {
      showQueryStringPopup: false,
      queryStringInputFocused: false,
      showCopied: false
    };
    return _this;
  }

  (0, _createClass3.default)(GetSetQuery, [{
    key: 'onQueryStringInputKeyPress',
    value: function onQueryStringInputKeyPress(event) {
      if (event.which === 13) {
        this.queryStringInputRef && this.queryStringInputRef.blur();
        this.onSetButtonPressed();
        event.preventDefault();
        return false;
      }

      return true;
    }
  }, {
    key: 'onSetButtonPressed',
    value: function onSetButtonPressed() {
      var queryStringInput = this.queryStringInputRef.value;
      this.props.setQueryFromString && this.props.setQueryFromString(queryStringInput);
      this.setState({
        showQueryStringPopup: false
      });
    }
  }, {
    key: 'handleClipBoardCopied',
    value: function handleClipBoardCopied() {
      var _this2 = this;

      this.setState({
        showCopied: true
      });
      this.copyTimeout = setTimeout(function () {
        _this2.setState({
          showCopied: false
        });
      }, 2000);
    }
  }, {
    key: 'getSetQueryPressed',
    value: function getSetQueryPressed() {
      this.setState({
        showQueryStringPopup: !this.state.showQueryStringPopup
      });
    }
  }, {
    key: 'renderQueryStringInput',
    value: function renderQueryStringInput() {
      var _this3 = this;

      if (!this.state.showQueryStringPopup) {
        return null;
      }

      var currentURL = this.props.graphQLEndpoint;
      var queryString = '';
      if (currentURL) {
        var encodedQuery = encodeURIComponent(this.props.query || '{}');
        var encodedVariables = encodeURIComponent(this.props.variables || '{}');
        queryString = currentURL + '?query=' + encodedQuery + '&variables=' + encodedVariables;
      }

      var queryStringInputStyle = this.state.queryStringInputFocused ? _styles2.default.queryStringInputFocused : null;
      var copiedButtonStyle = this.state.showCopied ? _styles2.default.copiedButton : null;

      return _react2.default.createElement(
        'div',
        { style: _styles2.default.popup },
        _react2.default.createElement('input', {
          ref: function ref(component) {
            return component && (_this3.queryStringInputRef = component);
          },
          style: Object.assign({}, _styles2.default.queryStringInput, queryStringInputStyle),
          type: 'text',
          placeholder: 'http://localhost:8080/graphql?query={}&variables={}',
          defaultValue: queryString,
          onFocus: function onFocus() {
            return _this3.setState({ queryStringInputFocused: true });
          },
          onBlur: function onBlur() {
            return _this3.setState({ queryStringInputFocused: false });
          },
          onKeyPress: this.onQueryStringInputKeyPress
        }),
        _react2.default.createElement(
          'div',
          { style: _styles2.default.queryStringInputButtons },
          _react2.default.createElement(
            _reactCopyToClipboard2.default,
            {
              text: queryString,
              onCopy: this.handleClipBoardCopied
            },
            _react2.default.createElement(
              'div',
              {
                className: 'shadowButton',
                style: Object.assign({}, _styles2.default.shadowButton, copiedButtonStyle)
              },
              this.state.showCopied ? 'Copied' : 'Copy'
            )
          ),
          _react2.default.createElement(
            'div',
            {
              className: 'shadowButton',
              style: Object.assign({}, _styles2.default.shadowButton, _styles2.default.setButton),
              onClick: this.onSetButtonPressed
            },
            'Set'
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: _styles2.default.toolBarButtonWrapper },
        this.renderQueryStringInput(),
        _react2.default.createElement(_graphiql2.default.ToolbarButton, {
          title: 'URL with query and variables as query-params',
          label: 'Get or Set query',
          onClick: this.getSetQueryPressed
        })
      );
    }
  }]);
  return GetSetQuery;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, 'onQueryStringInputKeyPress', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'onQueryStringInputKeyPress'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onSetButtonPressed', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'onSetButtonPressed'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleClipBoardCopied', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleClipBoardCopied'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getSetQueryPressed', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'getSetQueryPressed'), _class.prototype)), _class);
exports.default = GetSetQuery;