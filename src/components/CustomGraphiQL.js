import React, {
  Component,
  PropTypes
} from 'react';
import {
  buildClientSchema,
  parse,
  print,
  introspectionQuery,
  GraphQLSchema
} from 'graphql';
import GraphiQL from 'graphiql';
import styles from './styles.js';
import '../css/cgraphiql.css';
import TopBar from './TopBar';
import { autobind } from 'core-decorators';

export default class CustomGraphiQL extends Component {
  static propTypes = {
    fetcher: PropTypes.func,
    schema: PropTypes.instanceOf(GraphQLSchema),
    query: PropTypes.string,
    variables: PropTypes.string,
    operationName: PropTypes.string,
    response: PropTypes.string,
    storage: PropTypes.shape({
      getItem: PropTypes.func,
      setItem: PropTypes.func
    }),
    defaultQuery: PropTypes.string,
    onEditQuery: PropTypes.func,
    onEditVariables: PropTypes.func,
    onEditOperationName: PropTypes.func,
    onToggleDocs: PropTypes.func,
    getDefaultFieldNames: PropTypes.func
  };

  constructor(props) {
    super(props);

    // Cache the storage instance
    this.storage = props.storage || window.localStorage;

    const currentURL = this.storageGet('currentURL');

    // Determine the initial query to display.
    const query = props.query || this.storageGet(`${currentURL}:query`) || undefined;

    // Determine the initial variables to display.
    const variables = props.variables || this.storageGet(`${currentURL}:variables`);

    // Initialize state
    this.state = {
      schema: props.schema || null,
      query,
      variables,
      response: props.response,
      graphQLEndpoint: currentURL,
      schemaFetchError: ''
    };
  }

  componentDidMount() {
    const currentURL = this.state.graphQLEndpoint;
    if (!currentURL) {
      return;
    }
    this.fetchGraphQLSchema(currentURL);
  }

  storageGet(name) {
    return this.storage && this.storage.getItem('cgraphiql:' + name);
  }

  storageSet(name, value) {
    this.storage && this.storage.setItem('cgraphiql:' + name, value);
  }

  @autobind
  async fetchGraphQLSchema(url) {
    try {
      const graphQLParams = { query: introspectionQuery };
      const response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphQLParams)
      });

      // GET method
      // const response = await fetch(`${url}?query=${encodeURIComponent(graphQLParams.query)}}&variables=${encodeURIComponent('{}')}`, { method: 'get' });
      
      const result = await response.json();
      if (result.errors) {
        throw new Error(JSON.stringify(result.errors));
      }
      const schema = buildClientSchema(result.data);
      this.storageSet('currentURL', url);
      this.setState({
        schema,
        graphQLEndpoint: url,
        schemaFetchError: '',
        response: 'Schema fetched',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in fetching GraphQL schema', error);
      this.setState({
        schemaFetchError: error.toString(),
        response: error.toString(),
      });
    }
  }

  async graphQLFetcher(graphQLParams) {
    const graphQLEndpoint = this.state.graphQLEndpoint;
    const response = await fetch(graphQLEndpoint, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphQLParams),
      credentials: 'include',
    });
    const result = await response.json();
    return result;
  }

  render() {
    return (
      <div style={styles.container}>
        <TopBar
          schemaFetchError={this.state.schemaFetchError}
          fetchGraphQLSchema={this.fetchGraphQLSchema}
          graphQLEndpoint={this.state.graphQLEndpoint}
        />
        <GraphiQL
          fetcher={this.props.fetcher || this.graphQLFetcher}
          schema={this.state.schema}
          query={this.state.query}
          variables={this.state.variables}
          operationName={this.props.operationName}
          response={this.state.response}
          onEditQuery={this.onEditQuery}
          onEditVariables={this.onEditVariables}
          onEditOperationName={this.props.onEditOperationName}
          onToggleDocs={this.props.onToggleDocs}
          getDefaultFieldNames={this.props.getDefaultFieldNames}
        >
        </GraphiQL>
      </div>
    );
  }
}
