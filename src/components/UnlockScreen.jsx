import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../css/UnlockScreen.css";
import AppIcon from "./AppIcon";
import YoutubeIcon from "../assets/icon_youtube.png";
import SafariLogo from "../assets/icon_safari.png";
import InstagramLogo from "../assets/icon_instagram.png";
import WeatherLogo from "../assets/icon_weather.png";
import PhoneLogo from "../assets/icon_phone.png";
import MapsLogo from "../assets/icon_maps.png";
import CameraLogo from "../assets/icon_camera.png";
import AppstoreLogo from "../assets/icon_appstore.png";
import MailLogo from "../assets/icon_mail.png";
import PhotosLogo from "../assets/icon_photos.png";
import NotesLogo from "../assets/icon_notes.png";
import SoundCloudLogo from "../assets/icon_soundcloud.png";
import AppIconDataModel from "../models/AppIconDataModel";
import $ from "jquery";
import Contacts from "./Contacts";
import Photos from "./Photos";
import Notes from "./Notes";

const AppRouteType = Object.freeze({
  WEB: Symbol("web"),
  DEEPLINK: Symbol("deeplink"),
});

const SpringboardApp = Object.freeze({
  CONTACTS: Symbol("contacts"),
  PHOTOS: Symbol("photos"),
  NOTES: Symbol("notes"),
});

function UnlockScreen(props) {
  useEffect(() => {
    if (!props.hidden) {
      $("#springboard-container").addClass("unlock-screen-container");
    }
  }, [props.hidden]);

  const [appSections, setAppSections] = useState([
    {
      row: 0,
      items: [
        new AppIconDataModel(
          0,
          "YouTube",
          AppRouteType.WEB,
          "https://youtube.com",
          null,
          YoutubeIcon
        ),
        new AppIconDataModel(
          1,
          "Instagram",
          AppRouteType.WEB,
          "https://www.instagram.com/2k13boyz/",
          null,
          InstagramLogo
        ),
        new AppIconDataModel(
          2,
          "App Store",
          AppRouteType.WEB,
          "https://www.apple.com/in/app-store/",
          null,
          AppstoreLogo
        ),
        new AppIconDataModel(
          3,
          "SoundCloud",
          AppRouteType.WEB,
          "https://soundcloud.com/",
          null,
          SoundCloudLogo
        ),
      ],
    },
    {
      row: 1,
      items: [
        new AppIconDataModel(
          4,
          "Photos",
          AppRouteType.DEEPLINK,
          null,
          SpringboardApp.PHOTOS,
          PhotosLogo
        ),
        new AppIconDataModel(
          5,
          "Notes",
          AppRouteType.DEEPLINK,
          null,
          SpringboardApp.NOTES,
          NotesLogo
        ),
        new AppIconDataModel(
          6,
          "Contacts",
          AppRouteType.DEEPLINK,
          null,
          SpringboardApp.CONTACTS,
          MailLogo
        ),
        new AppIconDataModel(
          7,
          "Safari",
          AppRouteType.WEB,
          "",
          null,
          SafariLogo
        ),
      ],
    },
  ]);

  const [springboardBarSection, setSpringboardBarSection] = useState([
    new AppIconDataModel(0, "", AppRouteType.WEB, "", null, PhoneLogo),
    new AppIconDataModel(1, "", AppRouteType.WEB, "", null, CameraLogo),
    new AppIconDataModel(
      2,
      "",
      AppRouteType.WEB,
      "https://apps.apple.com/us/app/weather/id1069513131",
      null,
      WeatherLogo
    ),
    new AppIconDataModel(
      3,
      "",
      AppRouteType.WEB,
      "https://www.apple.com/in/maps/",
      null,
      MapsLogo
    ),
  ]);

  const [didLaunchApp, setDidLaunchApp] = useState(false);

  const onWebAppOpen = (url) => {
    window.open(url, "_blank");
  };

  const onDeepLinkAppOpen = (type) => {
    let component;
    if (type === SpringboardApp.CONTACTS) {
      component = (
        <Contacts onBackButtonClick={onSpringboardAppBackButtonClick} />
      );
    } else if (type === SpringboardApp.PHOTOS) {
      component = (
        <Photos onBackButtonClick={onSpringboardAppBackButtonClick} />
      );
    } else if (type === SpringboardApp.NOTES) {
      component = <Notes onBackButtonClick={onSpringboardAppBackButtonClick} />;
    }
    ReactDOM.render(
      component,
      document.getElementById("springboard-app-holder")
    );
    setDidLaunchApp(true);
  };

  const onSpringboardAppBackButtonClick = () => {
    setDidLaunchApp(false);
    ReactDOM.unmountComponentAtNode(
      document.getElementById("springboard-app-holder")
    );
  };

  const horizontalFlexContainerClassName = "horizontal-flex-container";

  return (
    <div
      hidden={props.hidden}
      className="iphone-screen-container"
      id="springboard-container"
    >
      <div className="vertical-flex-container springboard-items">
        {appSections.map((appSection) => (
          <div
            key={appSection.row}
            className={`horizontal-flex-space-between ${horizontalFlexContainerClassName}`}
          >
            {appSection.items.map((app) => (
              <AppIcon
                key={app.id}
                image={app.image}
                name={app.name}
                url={app.url}
                onAppOpen={() => {
                  if (app.appRouteType === AppRouteType.WEB) {
                    onWebAppOpen(app.url);
                  } else if (app.appRouteType === AppRouteType.DEEPLINK) {
                    onDeepLinkAppOpen(app.springboardApp);
                  }
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="springboard-bar">
        <div className="horizontal-flex-container horizontal-flex-space-between springboard-bar-container">
          {springboardBarSection.map((app) => (
            <AppIcon
              key={app.id}
              image={app.image}
              name={app.name}
              url={app.url}
              onAppOpen={() => {
                onWebAppOpen(app.url);
              }}
            />
          ))}
        </div>
      </div>
      <div id="springboard-app-holder" hidden={!didLaunchApp}></div>
    </div>
  );
}

export default UnlockScreen;
