import React from "react";
import { NavLink } from "react-router-dom";

export const Crumb = ({link1, link2, name1, name2}) => {
  return (
    <>
      <div className="crumb">
        <NavLink to={link1}>{name1}</NavLink> /{" "}
        <NavLink to={link2}>{name2}</NavLink>
      </div>
    </>
  );
};
