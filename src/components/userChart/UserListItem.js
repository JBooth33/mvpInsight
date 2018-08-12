import React from "react";
import "./Userlist.css";

export const ListItem = props => (
  <li className="list-group-item">
    {props.children}
  </li>
);
