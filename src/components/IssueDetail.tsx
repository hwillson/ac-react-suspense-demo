import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { IssueDetailComments } from "./IssueDetailComments";

const GET_ISSUE = gql`
  query GetIssue($id: ID!) {
    node(id: $id) {
      ... on Issue {
        title
        number
        author {
          login
          avatarUrl
        }
        body
        closed
        url
      }
    }
  }
`;

export function IssueDetail() {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_ISSUE, {
    variables: {
      id
    }
  });

  let content;
  if (loading) {
    content = <p>Loading ...</p>;
  } else {
    const { node: issue } = data;
    if (!issue) {
      content = <p>Issue not found.</p>;
    } else {
      content = (
        <Fragment>
          <div className="issue-title">
            #{issue.number} - {issue.title} - {issue.closed ? "Closed" : "Open"}
            <a
              className="issue-title-github-link"
              href={issue.url}
              title="Issue on GitHub"
            >
              View on GitHub
            </a>
          </div>
          <div className="issue-comment">
            <div className="issue-comment-author-name">
              {issue.author.login}
            </div>
          </div>
          <IssueDetailComments issueNumber={issue.number} />
        </Fragment>
      );
    }
  }

  return <div className="issue">{content}</div>;
}
