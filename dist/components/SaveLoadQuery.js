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

var _graphiql = require('graphiql');

var _graphiql2 = _interopRequireDefault(_graphiql);

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

var SaveLoadQuery = (_class = function (_Component) {
  (0, _inherits3.default)(SaveLoadQuery, _Component);

  function SaveLoadQuery(props) {
    (0, _classCallCheck3.default)(this, SaveLoadQuery);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SaveLoadQuery.__proto__ || Object.getPrototypeOf(SaveLoadQuery)).call(this, props));

    _this.state = {
      showSavedQueriesPopup: false,
      savedQueriesSearchInputFocused: false,
      savedQueriesSearchText: ''
    };
    return _this;
  }

  (0, _createClass3.default)(SaveLoadQuery, [{
    key: 'removeQueryPressed',
    value: function removeQueryPressed(event, queryName) {
      event.stopPropagation();
      var currentURL = this.props.graphQLEndpoint;
      var savedQueries = this.props.getSavedQueries ? this.props.getSavedQueries() : {};
      delete savedQueries[queryName];
      var savedQueriesString = JSON.stringify(savedQueries);
      this.props.setSavedQueries && this.props.setSavedQueries(savedQueriesString);
      this.setState({});
    }
  }, {
    key: 'saveQueryPressed',
    value: function saveQueryPressed(queryName) {
      var currentURL = this.props.graphQLEndpoint;
      var savedQueries = this.props.getSavedQueries ? this.props.getSavedQueries() : {};
      var encodedQuery = encodeURIComponent(this.props.query);
      var encodedVariables = encodeURIComponent(this.props.variables);
      var currentResponse = this.props.getCurrentResponse ? this.props.getCurrentResponse() : '';
      var encodedResponse = encodeURIComponent(currentResponse);
      savedQueries[queryName.replace(' ', '-')] = currentURL + '?query=' + encodedQuery + '&variables=' + encodedVariables + '&response=' + encodedResponse;
      var savedQueriesString = JSON.stringify(savedQueries);
      this.props.setSavedQueries && this.props.setSavedQueries(savedQueriesString);
      this.setState({
        showSavedQueriesPopup: false,
        savedQueriesSearchText: ''
      });
    }
  }, {
    key: 'loadSavedQueryPressed',
    value: function loadSavedQueryPressed(queryString) {
      this.props.setQueryFromString && this.props.setQueryFromString(queryString);
      this.setState({
        showSavedQueriesPopup: false
      });
    }
  }, {
    key: 'saveLoadQueryPressed',
    value: function saveLoadQueryPressed() {
      this.setState({
        showSavedQueriesPopup: !this.state.showSavedQueriesPopup
      });
    }
  }, {
    key: 'renderSavedQueriesPopup',
    value: function renderSavedQueriesPopup() {
      var _this2 = this;

      if (!this.state.showSavedQueriesPopup) {
        return null;
      }

      var savedQueries = this.props.getSavedQueries ? this.props.getSavedQueries() : {};

      var querySearchText = this.state.savedQueriesSearchText;
      var searchInputStyle = this.state.savedQueriesSearchInputFocused ? _styles2.default.searchInputFocused : null;
      return _react2.default.createElement(
        'div',
        { style: _styles2.default.popup },
        _react2.default.createElement('input', {
          onChange: function onChange(event) {
            return _this2.setState({ savedQueriesSearchText: event.target.value });
          },
          style: Object.assign({}, _styles2.default.searchInput, searchInputStyle),
          type: 'text',
          placeholder: 'Find or save query...',
          onFocus: function onFocus() {
            return _this2.setState({ savedQueriesSearchInputFocused: true });
          },
          onBlur: function onBlur() {
            return _this2.setState({ savedQueriesSearchInputFocused: false });
          },
          autoFocus: true
        }),
        Object.keys(savedQueries).sort().filter(function (value) {
          return value.toLowerCase().includes(querySearchText);
        }).map(function (queryName) {
          return _react2.default.createElement(
            'div',
            {
              key: queryName,
              className: 'menuListButton',
              style: _styles2.default.menuListButton,
              onClick: function onClick() {
                return _this2.loadSavedQueryPressed(savedQueries[queryName]);
              }
            },
            queryName,
            _react2.default.createElement(
              'div',
              {
                style: _styles2.default.crossButton,
                className: 'crossButton',
                onClick: function onClick(event) {
                  return _this2.removeQueryPressed(event, queryName);
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
            )
          );
        }),
        function () {
          var hasSavedQuery = Object.keys(savedQueries).find(function (item) {
            return querySearchText.toLowerCase() === item.toLowerCase();
          });
          if (querySearchText.length > 0 && !hasSavedQuery) {
            return _react2.default.createElement(
              'div',
              {
                className: 'saveQueryButton',
                style: _styles2.default.saveQueryButton,
                onClick: function onClick() {
                  return _this2.saveQueryPressed(querySearchText);
                }
              },
              'Save current query as ',
              _react2.default.createElement(
                'span',
                { style: _styles2.default.saveQueryButtonLabel },
                querySearchText
              )
            );
          }

          return null;
        }()
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: _styles2.default.toolBarButtonWrapper },
        this.renderSavedQueriesPopup(),
        _react2.default.createElement(_graphiql2.default.ToolbarButton, {
          title: 'Save or Load query',
          label: 'Save / Load',
          onClick: this.saveLoadQueryPressed
        })
      );
    }
  }]);
  return SaveLoadQuery;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, 'removeQueryPressed', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'removeQueryPressed'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'saveQueryPressed', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'saveQueryPressed'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadSavedQueryPressed', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'loadSavedQueryPressed'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'saveLoadQueryPressed', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'saveLoadQueryPressed'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'renderSavedQueriesPopup', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'renderSavedQueriesPopup'), _class.prototype)), _class);
exports.default = SaveLoadQuery;