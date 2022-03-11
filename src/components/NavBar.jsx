import React from "react";
import "../css/NavBar.css";
import BackIcon from "../assets/back-icon.png";
import BackIconWhite from "../assets/back-icon-white.png";

function NavBar(props) {
  return (
    <div className={props.dark ? "app-navbar-dark" : "app-navbar-light"}>
      <div className="app-navbar-container">
        <div className="app-navbar-inner-container">
          <button
            className="navbar-back-button"
            onClick={props.onBackButtonClick}
          >
            <img
              src={props.dark ? BackIconWhite : BackIcon}
              className="navbar-back-icon"
            ></img>
            <span
              className={`${
                props.dark
                  ? "navbar-back-button-title-light"
                  : "navbar-back-button-title-blue"
              } navbar-back-button-title`}
            >
              Back
            </span>
          </button>
          <span
            className={`${props.dark ? "navbar-title-light " : ""}navbar-title`}
          >
            {props.title}
          </span>
          <div className="navbar-trailing-filler"></div>
        </div>
        <div className="app-navbar-bottom-separator"></div>
      </div>
    </div>
  );
}

export default NavBar;
