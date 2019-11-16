import React from "react";
import { Link } from "react-router-dom";

interface IssueListItem {
  id: string;
  title: string;
}

export function IssueListItem({ id, title }: IssueListItem) {
  return (
    <li className="issue">
      <Link to={`/issue/${id}`}>{title}</Link>
    </li>
  );
}
