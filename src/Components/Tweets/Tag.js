import React from "react";
import "./Tag.css";

const Tag = (props) => {
  const clickHandler = (event) => {
    event.preventDefault();
    props.onClick(props.tag);
  };

  return (
    <div className="tag-container">
      <span>{props.tag}</span>
      <button className="tag-close" onClick={clickHandler}>
        x
      </button>
    </div>
  );
};

export default Tag;
