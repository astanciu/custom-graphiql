'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _desc, _value, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _graphql = require('graphql');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _graphiql = require('graphiql');

var _graphiql2 = _interopRequireDefault(_graphiql);

var _coreDecorators = require('core-decorators');

var _styles = require('./styles.js');

var _styles2 = _interopRequireDefault(_styles);

var _getParameters = require('../helpers/getParameters');

var _TopBar = require('./TopBar');

var _TopBar2 = _interopRequireDefault(_TopBar);

var _GenerateMutation = require('./GenerateMutation');

var _GenerateMutation2 = _interopRequireDefault(_GenerateMutation);

var _GetSetQuery = require('./GetSetQuery');

var _GetSetQuery2 = _interopRequireDefault(_GetSetQuery);

var _SaveLoadQuery = require('./SaveLoadQuery');

var _SaveLoadQuery2 = _interopRequireDefault(_SaveLoadQuery);

var _EditHeaderModal = require('./EditHeaderModal');

var _EditHeaderModal2 = _interopRequireDefault(_EditHeaderModal);

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

var CustomGraphiQL = (_class = (_temp = _class2 = function (_Component) {
  (0, _inherits3.default)(CustomGraphiQL, _Component);

  function CustomGraphiQL(props) {
    (0, _classCallCheck3.default)(this, CustomGraphiQL);

    // Cache the storage instance
    var _this = (0, _possibleConstructorReturn3.default)(this, (CustomGraphiQL.__proto__ || Object.getPrototypeOf(CustomGraphiQL)).call(this, props));

    _this.storage = props.storage || window.localStorage;

    var currentURL = _this.storageGet('currentURL');

    // Determine the initial query to display.
    var query = props.query || _this.storageGet(currentURL + ':query') || undefined;

    // Determine the initial variables to display.
    var variables = props.variables || _this.storageGet(currentURL + ':variables');

    var headers = _this.storageGet('headers') ? JSON.parse(_this.storageGet('headers')) : {};

    // Initialize state
    _this.state = {
      schema: props.schema || null,
      query: query,
      variables: variables,
      response: props.response,
      graphQLEndpoint: currentURL,
      schemaFetchError: '',
      headers: headers
    };
    return _this;
  }

  (0, _createClass3.default)(CustomGraphiQL, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var currentURL = this.state.graphQLEndpoint;
      if (!currentURL) {
        return;
      }
      this.data = this.props.transport;
      this.fetchGraphQLSchema(currentURL);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.data = nextProps.transport;
    }
  }, {
    key: 'storageGet',
    value: function storageGet(name) {
      return this.storage && this.storage.getItem('cgraphiql:' + name);
    }
  }, {
    key: 'storageSet',
    value: function storageSet(name, value) {
      this.storage && this.storage.setItem('cgraphiql:' + name, value);
    }
  }, {
    key: 'getCurrentResponse',
    value: function getCurrentResponse() {
      return this.state.response;
    }
  }, {
    key: 'setSavedQueries',
    value: function setSavedQueries(savedQueriesString) {
      var currentURL = this.state.graphQLEndpoint;
      this.storageSet(currentURL + ':queries', savedQueriesString);
    }
  }, {
    key: 'getSavedQueries',
    value: function getSavedQueries() {
      var currentURL = this.state.graphQLEndpoint;
      var currentURLQueriesString = this.storageGet(currentURL + ':queries') || '{}';
      return JSON.parse(currentURLQueriesString);
    }
  }, {
    key: 'setQueryFromString',
    value: function setQueryFromString(queryStringInput) {
      if (!queryStringInput) {
        this.updateQueryVariablesResponse('', '');
        return;
      }

      var queryString = (0, _getParameters.getParameterByName)('query', queryStringInput) || '{}';
      var variablesString = (0, _getParameters.getParameterByName)('variables', queryStringInput) || 'null';
      var responseString = (0, _getParameters.getParameterByName)('response', queryStringInput) || this.state.response;
      var url = new URL(queryStringInput);
      var graphQLEndpoint = url.origin + url.pathname;
      if (graphQLEndpoint !== this.state.graphQLEndpoint) {
        this.fetchGraphQLSchema(graphQLEndpoint);
        this.state.graphQLEndpoint = graphQLEndpoint;
      }

      this.updateQueryVariablesResponse(queryString, variablesString, responseString);
    }
  }, {
    key: 'updateQueryVariablesResponse',
    value: function updateQueryVariablesResponse(queryString, variablesString, responseString) {
      var currentURL = this.state.graphQLEndpoint;
      this.storageSet(currentURL + ':query', queryString);
      this.storageSet(currentURL + ':variables', variablesString);
      this.setState({
        query: queryString,
        variables: variablesString,
        response: responseString || this.state.response
      });
    }
  }, {
    key: 'fetchGraphQLSchema',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(url) {
        var http, headers, graphQLParams, result, schema;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                http = this.data.httpClient;
                _context.prev = 1;
                headers = this.state.headers;
                graphQLParams = { query: _graphql.introspectionQuery };
                // const response = await fetch(url, {
                //   method: 'post',
                //   headers: {
                //     'Content-Type': 'application/json',
                //     ...headers
                //   },
                //   body: JSON.stringify(graphQLParams)
                // });
                // const result = await response.json();

                _context.next = 6;
                return http.post(url, graphQLParams);

              case 6:
                result = _context.sent;

                if (!result.errors) {
                  _context.next = 9;
                  break;
                }

                throw new Error(JSON.stringify(result.errors));

              case 9:
                schema = (0, _graphql.buildClientSchema)(result.data.data);

                this.storageSet('currentURL', url);
                this.setState({
                  schema: schema,
                  graphQLEndpoint: url,
                  schemaFetchError: '',
                  response: 'Schema fetched'
                });
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](1);

                // eslint-disable-next-line no-console
                console.error('Error in fetching GraphQL schema', _context.t0);
                this.setState({
                  schemaFetchError: _context.t0.toString(),
                  response: _context.t0.toString()
                });

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 14]]);
      }));

      function fetchGraphQLSchema(_x) {
        return _ref.apply(this, arguments);
      }

      return fetchGraphQLSchema;
    }()
  }, {
    key: 'graphQLFetcher',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(graphQLParams) {
        var http, headers, graphQLEndpoint, result, _result;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                http = this.data.httpClient;
                _context2.prev = 1;
                headers = this.state.headers;
                graphQLEndpoint = this.state.graphQLEndpoint;

                if (graphQLEndpoint) {
                  _context2.next = 7;
                  break;
                }

                console.warn('Please set a GraphQL endpoint');
                return _context2.abrupt('return', null);

              case 7:
                _context2.next = 9;
                return http.post(graphQLEndpoint, graphQLParams);

              case 9:
                result = _context2.sent;


                this.state.response = JSON.stringify(result.data, null, 2);
                return _context2.abrupt('return', result.data);

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2['catch'](1);

                console.dir(_context2.t0);
                _context2.t0.response.data;
                _result = (_context2.t0.response || {}).data || 'n/a';

                this.state.response = JSON.stringify(_result, null, 2);
                return _context2.abrupt('return', _result);

              case 21:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 14]]);
      }));

      function graphQLFetcher(_x2) {
        return _ref2.apply(this, arguments);
      }

      return graphQLFetcher;
    }()
  }, {
    key: 'updateHeaders',
    value: function updateHeaders(newHeaders) {
      this.storageSet('headers', JSON.stringify(newHeaders));
      this.setState({
        headers: newHeaders,
        editHeaderModalVisible: false
      });
    }
  }, {
    key: 'hideEditHeaderModal',
    value: function hideEditHeaderModal() {
      this.setState({
        editHeaderModalVisible: false
      });
    }
  }, {
    key: 'showEditHeaderModal',
    value: function showEditHeaderModal() {
      this.setState({
        editHeaderModalVisible: true
      });
    }
  }, {
    key: 'onEditQuery',
    value: function onEditQuery(queryString) {
      this.setState({
        query: queryString
      });
      this.props.onEditQuery && this.onEditQuery(queryString);
      var currentURL = this.state.graphQLEndpoint;
      if (!currentURL) {
        return;
      }

      this.storageSet(currentURL + ':query', queryString);
    }
  }, {
    key: 'onEditVariables',
    value: function onEditVariables(variablesString) {
      this.setState({
        variables: variablesString
      });
      this.props.onEditVariables && this.onEditVariables(queryString);
      var currentURL = this.state.graphQLEndpoint;
      if (!currentURL) {
        return;
      }

      this.storageSet(currentURL + ':variables', variablesString);
    }
  }, {
    key: 'onFetchButtonPressed',
    value: function onFetchButtonPressed() {
      var url = this.state.graphQLEndpoint;
      this.fetchGraphQLSchema && this.fetchGraphQLSchema(url);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var children = _react2.default.Children.toArray(this.props.children);

      var logo = children.find(function (child) {
        return child.type === _graphiql2.default.Logo;
      });

      var toolbar = children.find(function (child) {
        return child.type === _graphiql2.default.Toolbar;
      });

      var footer = children.find(function (child) {
        return child.type === _graphiql2.default.Footer;
      });

      return _react2.default.createElement(
        'div',
        { style: _styles2.default.container },
        _react2.default.createElement(
          _graphiql2.default,
          {
            fetcher: this.graphQLFetcher,
            schema: this.state.schema,
            query: this.state.query,
            variables: this.state.variables,
            operationName: this.props.operationName,
            response: this.state.response,
            onEditQuery: this.onEditQuery,
            onEditVariables: this.onEditVariables,
            onEditOperationName: this.props.onEditOperationName,
            onToggleDocs: this.props.onToggleDocs,
            getDefaultFieldNames: this.props.getDefaultFieldNames
          },
          _react2.default.createElement(
            _graphiql2.default.Logo,
            null,
            'Phenix GraphQL API'
          ),
          _react2.default.createElement(
            _graphiql2.default.Toolbar,
            null,
            _react2.default.createElement(
              'div',
              { style: _styles2.default.toolBarButtons },
              _react2.default.createElement(_GenerateMutation2.default, {
                schema: this.state.schema,
                updateQueryVariablesResponse: this.updateQueryVariablesResponse
              }),
              _react2.default.createElement(_GetSetQuery2.default, {
                query: this.state.query,
                variables: this.state.variables,
                graphQLEndpoint: this.state.graphQLEndpoint,
                setQueryFromString: this.setQueryFromString
              }),
              _react2.default.createElement(_SaveLoadQuery2.default, {
                query: this.state.query,
                variables: this.state.variables,
                graphQLEndpoint: this.state.graphQLEndpoint,
                getSavedQueries: this.getSavedQueries,
                setSavedQueries: this.setSavedQueries,
                setQueryFromString: this.setQueryFromString,
                getCurrentResponse: this.getCurrentResponse
              }),
              _react2.default.createElement(
                'div',
                { style: { position: 'relative' }, onClick: this.onFetchButtonPressed },
                _react2.default.createElement(
                  'a',
                  { className: 'toolbar-button' },
                  'Reload Schema'
                )
              ),
              toolbar
            )
          ),
          logo,
          footer
        ),
        function () {
          if (!_this2.state.editHeaderModalVisible) {
            return null;
          }

          return _react2.default.createElement(_EditHeaderModal2.default, {
            headers: _this2.state.headers,
            updateHeaders: _this2.updateHeaders,
            hideEditHeaderModal: _this2.hideEditHeaderModal
          });
        }()
      );
    }
  }]);
  return CustomGraphiQL;
}(_react.Component), _class2.propTypes = {
  fetcher: _react.PropTypes.func,
  schema: _react.PropTypes.instanceOf(_graphql.GraphQLSchema),
  query: _react.PropTypes.string,
  variables: _react.PropTypes.string,
  operationName: _react.PropTypes.string,
  response: _react.PropTypes.string,
  storage: _react.PropTypes.shape({
    getItem: _react.PropTypes.func,
    setItem: _react.PropTypes.func
  }),
  defaultQuery: _react.PropTypes.string,
  onEditQuery: _react.PropTypes.func,
  onEditVariables: _react.PropTypes.func,
  onEditOperationName: _react.PropTypes.func,
  onToggleDocs: _react.PropTypes.func,
  getDefaultFieldNames: _react.PropTypes.func
}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'storageGet', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'storageGet'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'storageSet', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'storageSet'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getCurrentResponse', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'getCurrentResponse'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setSavedQueries', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'setSavedQueries'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getSavedQueries', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'getSavedQueries'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setQueryFromString', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'setQueryFromString'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateQueryVariablesResponse', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'updateQueryVariablesResponse'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fetchGraphQLSchema', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'fetchGraphQLSchema'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'graphQLFetcher', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'graphQLFetcher'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateHeaders', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'updateHeaders'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hideEditHeaderModal', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'hideEditHeaderModal'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showEditHeaderModal', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'showEditHeaderModal'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onEditQuery', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'onEditQuery'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onEditVariables', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'onEditVariables'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onFetchButtonPressed', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'onFetchButtonPressed'), _class.prototype)), _class);
exports.default = CustomGraphiQL;