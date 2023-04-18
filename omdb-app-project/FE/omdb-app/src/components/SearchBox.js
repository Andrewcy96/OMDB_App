import React from "react";
import "../App.css";

function SearchBox(props) {
  return (
    <div className="Search">
      <input
        className="TextBox"
        value={props.value}
        onChange={props.onChange}
        placeholder="Type to Search"
      ></input>
    </div>
  );
}
export default SearchBox;
