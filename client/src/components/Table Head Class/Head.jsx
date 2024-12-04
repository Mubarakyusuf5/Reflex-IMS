import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Head = ({Click, Title, btnName, Input, val }) => {
  return (
    <>
      <div className="head">
        <h3>{Title}</h3>

        <div className="func">
          <button onClick={Click}>{` + Add ${btnName}`}</button>
          <div className="search">
            <input type="text" placeholder="Search here" onChange={Input} value={val} />
            <FontAwesomeIcon icon={faSearch} className="sIcon" />
          </div>
        </div>
      </div>
    </>
  );
};
