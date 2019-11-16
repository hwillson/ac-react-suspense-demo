import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_COMMENTS = gql`
  query GetComments($issueNumber: Int!, $cursor: String, $count: Int = 10) {
    repository(owner: "apollographql", name: "apollo-client") {
      issue(number: $issueNumber) {
        comments(after: $cursor, first: $count) {
          edges {
            node {
              id
              author {
                login
                avatarUrl
              }
              body
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;

export function IssueDetailComments({ issueNumber }: { issueNumber: number }) {
  const { loading, data, fetchMore } = useQuery(GET_COMMENTS, {
    variables: {
      issueNumber
    }
  });

  let content;
  if (loading) {
    content = <p>Loading ...</p>;
  } else {
    const edges = data && data.repository.issue.comments.edges;
    if (!edges) {
      content = <p>No comments found.</p>;
    } else {
      const { pageInfo } = data.repository.issue.comments;
      content = (
        <Fragment>
          {edges.map(({ node: comment }: any) => (
            <div className="issue-comment" key={`issue-comment-${comment.id}`}>
              <div className="issue-comment-author-name">
                {comment.author.login}
              </div>
              <div className="issue-comment-body">{comment.body}</div>
            </div>
          ))}
          {pageInfo.hasNextPage ? (
            <button
              onClick={() => {
                fetchMore({
                  variables: {
                    cursor: pageInfo.endCursor
                  }
                });
              }}
            >
              Load more
            </button>
          ) : null}
        </Fragment>
      );
    }
  }

  return <div className="comments">{content}</div>;
}
