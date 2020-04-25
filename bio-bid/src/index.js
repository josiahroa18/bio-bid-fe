import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

// http://biobidbe-env.eba-ercbzmhq.us-east-1.elasticbeanstalk.com/
// https://ec2-34-195-186-223.compute-1.amazonaws.com/
const client = new ApolloClient({uri: 'http://biobidbe-env.eba-ercbzmhq.us-east-1.elasticbeanstalk.com/'})

ReactDOM.render(
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
