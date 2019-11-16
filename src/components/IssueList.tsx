import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";

import { IssueListItem } from "./IssueListItem";

const GET_ISSUES = gql`
  query GetIssues(
    $cursor: String
    $count: Int = 10
    $states: [IssueState!] = [OPEN]
  ) {
    repository(owner: "apollographql", name: "apollo-client") {
      issues(after: $cursor, first: $count, states: $states) {
        edges {
          node {
            id
            title
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export function IssueList() {
  const { loading, data, fetchMore } = useQuery(GET_ISSUES);

  let content;
  if (loading) {
    content = <p>Loading ...</p>;
  } else {
    const edges = data && data.repository.issues.edges;
    if (!edges) {
      content = <p>No issues found.</p>;
    } else {
      content = (
        <Fragment>
          <ul>
            {edges.map(({ node: { id, title } }: any) => (
              <IssueListItem key={id} id={id} title={title} />
            ))}
          </ul>
          <button
            onClick={() => {
              fetchMore({
                variables: {
                  cursor: data.repository.issues.pageInfo.endCursor
                }
              });
            }}
          >
            Load more
          </button>
        </Fragment>
      );
    }
  }

  return <div className="issue-list">{content}</div>;
}
