import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { Layout } from "./components/Layout";

function merge(existing: any, incoming: any) {
  const existingEdges = existing && existing.edges;
  if (!existingEdges) return incoming;
  return {
    ...incoming,
    edges: existingEdges.concat(incoming.edges)
  };
}

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`,
    "Content-Type": "application/json"
  },
  cache: new InMemoryCache({
    typePolicies: {
      Repository: {
        fields: {
          issues: {
            merge
          }
        }
      },
      Issue: {
        fields: {
          comments: {
            merge
          }
        }
      }
    }
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Layout />
  </ApolloProvider>,
  document.getElementById("root")
);
