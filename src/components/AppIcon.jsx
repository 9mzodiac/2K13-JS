import React from "react";
import "../css/AppIcon.css";

function AppIcon(props) {
  const { image, name, url } = props;
  return (
    <button onClick={props.onAppOpen} className="app-icon-button">
      <div className="app-icon-container">
        <img className="icon" src={image}></img>
        {name.length > 0 && <p className="icon-name">{name}</p>}
      </div>
    </button>
  );
}

export default AppIcon;
