(function (firebase) {
  'use strict';

  firebase = firebase && firebase.hasOwnProperty('default') ? firebase['default'] : firebase;

  function generateSlideHtml(appSettings) {
    var s = appSettings.slideSettings;
    var mainColor = s.mainColor || "#1165f1";
    var theme = s.theme || "BOTTOM_BTNS";
    var slide = {
      location: s.location || "TOP_CENTER",
      showIcon: s.showIcon || false,
      mainColor: mainColor,
      title: s.showTitle ? s.title || '' : '',
      text: s.text || "We'd like to show you notifications for the latest news and updates.",
      acceptBtnText: s.acceptBtnText || "Allow",
      cancelBtnText: s.cancelBtnText || "No Thanks"
    };
    var details = {};

    if (s.advancedOptions) {
      details = fixMissingSlideDetails(s.details, mainColor);
    } else {
      details = getDefaultSlideDetails(mainColor);
    }

    return "\n<div class=\"dn-slide ".concat(slide.showIcon ? '' : 'dn-slide--noLogo', " ").concat(slide.title ? '' : 'dn-slide--noTitle', " ").concat(theme, "\">\n  <div class=\"dn-slide-logo\"><img src=\"").concat(appSettings.defaultIconUrl, "\"></div>\n  <div class=\"dn-slide-body\">\n      <h3 class=\"dn-slide-title\">").concat(slide.title, "</h3>\n      <p class=\"dn-slide-message\">").concat(slide.text, "</p>\n      <div class=\"dn-slide-buttons horizontal\">\n          <button class=\"dn-slide-deny-btn\">").concat(slide.cancelBtnText, "</button>\n          <button class=\"dn-slide-accept-btn\">").concat(slide.acceptBtnText, "</button>\n      </div>\n  </div>\n  <div class=\"dn-slide-buttons vertical\">\n      <button class=\"dn-slide-accept-btn\">").concat(slide.acceptBtnText, "</button>\n      <button class=\"dn-slide-deny-btn\">").concat(slide.cancelBtnText, "</button>\n  </div>\n</div>\n<style>\n  .dn-slide {\n      box-shadow: ").concat(details.shadow ? '0 3px 10px 0 rgba(0, 0, 0, 0.43) !important' : 'none', " ;\n      background: ").concat(details.backgroundColor, ";\n      border: ").concat(details.border, "px solid ").concat(details.borderColor, ";\n      border-radius: ").concat(details.borderRadius, "px;\n      display: flex;\n      overflow:auto;\n      width:520px;\n      max-width: 520px;\n      height:auto;\n  }\n\n  .dn-slide-logo {\n      width: 30%;\n      padding: 15px;\n      box-sizing: border-box;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n  }\n  .RIGHT_BTNS .dn-slide-logo {\n      width: 18%;\n      padding: 8px;\n  }\n  .dn-slide-logo img {\n      width: 100%;\n  }\n  .dn-slide--noLogo .dn-slide-logo {\n      display: none;\n  }\n\n  .dn-slide-body {\n      width: 70%;\n      padding: 15px;\n      box-sizing: border-box;\n      line-height: 1.4;\n      vertical-align: middle;\n      display: flex;\n      flex-direction: column;\n  }\n  .RIGHT_BTNS .dn-slide-body {\n      width: 58%;\n      padding: 8px;\n  }\n  .dn-slide--noLogo .dn-slide-body {\n      width: 100%;\n  }\n\n  .dn-slide-title {\n      background: none;\n      color: ").concat(details.titleSyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.titleSyle.fontSize, "px;\n      font-weight: ").concat(details.titleSyle.fontWeight, ";\n      margin: 0;\n      padding: 0;\n  }\n  .dn-slide--noTitle .dn-slide-title {\n      display: none;\n  }\n\n  .dn-slide-message {\n      background: none;\n      color: ").concat(details.textSyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.textSyle.fontSize, "px;\n      font-weight: ").concat(details.textSyle.fontWeight, ";\n      padding: 0;\n      margin: 12px 0;\n      flex: 1;\n  }\n  .dn-slide--noTitle .dn-slide-message {\n      margin: 5px 0 20px 10px;\n  }\n\n  .dn-slide-buttons {\n      display: flex;\n  }\n  .dn-slide-buttons.vertical {\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      width: 24%;\n      padding: 8px;\n  }\n  .dn-slide-buttons.horizontal {\n      justify-content: flex-end;\n      align-items: center;\n  }\n  .BOTTOM_BTNS .vertical {\n      display: none;\n  }\n  .RIGHT_BTNS .horizontal {\n      display: none;\n  }\n  .dn-slide-buttons button {\n      padding: 8px 15px;\n      margin: 0;\n      text-align: center;\n      cursor: pointer;\n  }\n  .dn-slide-buttons.horizontal button {\n      margin-left: 15px;\n  }\n  .dn-slide-buttons.vertical button {\n      width: 100%;\n  }\n  .dn-slide-buttons.vertical button:first-child {\n      margin-bottom: 5px;\n  }\n\n  .dn-slide-buttons .dn-slide-accept-btn {\n      background-color: ").concat(details.acceptBtnStyle.backgroundColor, ";\n      color: ").concat(details.acceptBtnStyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.acceptBtnStyle.fontSize, "px;\n      font-weight: ").concat(details.acceptBtnStyle.fontWeight, ";\n      border: ").concat(details.acceptBtnStyle.border, "px solid ").concat(details.acceptBtnStyle.borderColor, ";\n      border-radius: ").concat(details.acceptBtnStyle.borderRadius, "px;\n      box-shadow: ").concat(details.acceptBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4) !important' : 'none', " ;\n  }\n  .dn-slide-buttons .dn-slide-accept-btn:hover {\n      background-color: ").concat(details.acceptBtnStyle.hoverBackgroundColor, ";\n      color: ").concat(details.acceptBtnStyle.hoverTextColor, ";\n  }\n\n  .dn-slide-buttons .dn-slide-deny-btn {\n      background-color: ").concat(details.cancelBtnStyle.backgroundColor, ";\n      color: ").concat(details.cancelBtnStyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.cancelBtnStyle.fontSize, "px;\n      font-weight: ").concat(details.cancelBtnStyle.fontWeight, ";\n      border: ").concat(details.cancelBtnStyle.border, "px solid ").concat(details.cancelBtnStyle.borderColor, ";\n      border-radius: ").concat(details.cancelBtnStyle.borderRadius, "px;\n      box-shadow: ").concat(details.cancelBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4) !important' : 'none', " ;\n  }\n  .dn-slide-buttons .dn-slide-deny-btn:hover {\n      background-color: ").concat(details.cancelBtnStyle.hoverBackgroundColor, ";\n      color: ").concat(details.cancelBtnStyle.hoverTextColor, ";\n  }\n\n  .dn-hide {\n      display: none;\n  }\n\n  @media only screen and (max-width: 767px) {\n      #visilabs_web_push_perm_box {\n          width: 94% !important;\n          margin-left: -47% !important;\n      }\n\n      .dn-slide {\n          width: 100% !important;\n          max-width: 100%;\n      }\n\n      /*.dn-slide-title {\n          font-size: 12px;\n      }\n\n      .dn-slide-message {\n          font-size: 11px;\n      }\n\n      .dn-slide-buttons button {\n          padding: 5px 10px;\n          margin-left: 15px;\n          font-size: 12px;\n      }*/\n  }\n</style>\n    ");
  }

  function getDefaultSlideDetails(mainColor) {
    return {
      backgroundColor: "#ffffff",
      fontFamily: 'ARIAL',
      border: 0,
      borderColor: mainColor,
      borderRadius: 3,
      shadow: true,
      textSyle: {
        textColor: "#555555",
        fontSize: "15",
        fontWeight: "normal"
      },
      titleSyle: {
        textColor: "#555555",
        fontSize: "16",
        fontWeight: "bold"
      },
      acceptBtnStyle: {
        backgroundColor: mainColor,
        hoverBackgroundColor: mainColor,
        textColor: "#ffffff",
        hoverTextColor: "#ffffff",
        fontSize: "16",
        fontWeight: "normal",
        border: 0,
        borderColor: mainColor,
        borderRadius: 3,
        shadow: false
      },
      cancelBtnStyle: {
        backgroundColor: "#ffffff",
        hoverBackgroundColor: "#ffffff",
        textColor: mainColor,
        hoverTextColor: mainColor,
        fontSize: "16",
        fontWeight: "normal",
        border: 0,
        borderColor: mainColor,
        borderRadius: 3,
        shadow: false
      }
    };
  }

  function fixMissingSlideDetails(details, mainColor) {
    var textSyle = details.textSyle || {};
    var titleSyle = details.titleSyle || {};
    var acceptBtnStyle = details.acceptBtnStyle || {};
    var cancelBtnStyle = details.cancelBtnStyle || {};
    return {
      backgroundColor: details.backgroundColor || "#ffffff",
      fontFamily: details.fontFamily || 'ARIAL',
      border: details.border || 0,
      borderColor: details.borderColor || mainColor,
      borderRadius: details.borderRadius || 3,
      shadow: details.shadow == null ? true : details.shadow,
      textSyle: {
        textColor: textSyle.textColor || "#555555",
        fontSize: textSyle.fontSize || "15",
        fontWeight: textSyle.fontWeight || "normal"
      },
      titleSyle: {
        textColor: titleSyle.textColor || "#555555",
        fontSize: titleSyle.fontSize || "16",
        fontWeight: titleSyle.fontWeight || "bold"
      },
      acceptBtnStyle: {
        backgroundColor: acceptBtnStyle.backgroundColor || mainColor,
        hoverBackgroundColor: acceptBtnStyle.backgroundColor || mainColor,
        textColor: acceptBtnStyle.textColor || "#ffffff",
        hoverTextColor: acceptBtnStyle.hoverTextColor || "#ffffff",
        fontSize: acceptBtnStyle.fontSize || "16",
        fontWeight: acceptBtnStyle.fontWeight || "normal",
        border: acceptBtnStyle.border || 0,
        borderColor: acceptBtnStyle.borderColor || mainColor,
        borderRadius: acceptBtnStyle.borderRadius || 3,
        shadow: acceptBtnStyle.shadow == null ? false : acceptBtnStyle.shadow
      },
      cancelBtnStyle: {
        backgroundColor: cancelBtnStyle.backgroundColor || "#ffffff",
        hoverBackgroundColor: cancelBtnStyle.backgroundColor || "#ffffff",
        textColor: cancelBtnStyle.textColor || mainColor,
        hoverTextColor: cancelBtnStyle.hoverTextColor || mainColor,
        fontSize: cancelBtnStyle.fontSize || "16",
        fontWeight: cancelBtnStyle.fontWeight || "normal",
        border: cancelBtnStyle.border || 0,
        borderColor: cancelBtnStyle.borderColor || mainColor,
        borderRadius: cancelBtnStyle.borderRadius || 3,
        shadow: cancelBtnStyle.shadow == null ? false : cancelBtnStyle.shadow
      }
    };
  }

  function getFontFamily(font) {
    switch (font) {
      case 'ARIAL':
        return 'Helvetica, Arial, sans-serif';

      case 'TAHOMA':
        return 'Tahoma, sans-serif';

      case 'VERDANA':
        return 'Verdana, sans-serif';

      case 'GEORGIA':
        return 'Georgia, Times, serif';

      case 'TIMES':
        return '"Times New Roman", Times, serif';

      case 'COURIER':
        return '"Courier New", Courier, monospace';
    }

    return 'inherit';
  }

  //import { deepCopy, mergeRecursive } from "../../utils";
  function showSlidePromt(appSettings, isPreview) {
    var container = document.createElement("div");
    container.className = "dengage-push-perm-slide";
    container.id = "dengage-push-perm-slide";
    container.style.position = "absolute";
    container.style.height = "250px";
    container.style.width = "520px";
    container.style.top = "-260px";
    container.style.left = "50%";
    container.style.marginLeft = "-260px";
    container.style.zIndex = "100000";

    if (!isPreview) {
      container.style.transition = "top 1s linear";
    }

    container.innerHTML = generateSlideHtml(appSettings);
    document.body.appendChild(container);
    setTimeout(function () {
      container.style.top = "0px";
    }, 1);
    return {
      onAccept: function onAccept(callback) {
        var btns = container.querySelectorAll('.dn-slide-accept-btn');

        for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function () {
            container.style.top = "-260px";
            callback();
            setTimeout(function () {
              document.body.removeChild(container);
            }, 1000);
          });
        }
      },
      onDeny: function onDeny(callback) {
        var btns = container.querySelectorAll('.dn-slide-deny-btn');

        for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function () {
            container.style.top = "-260px";
            callback();
            setTimeout(function () {
              document.body.removeChild(container);
            }, 1000);
          });
        }
      }
    };
  }

  function generateSlideHtml$1(appSettings) {
    var s = appSettings.slideSettings;
    var mainColor = s.mainColor || "#1165f1";
    var theme = s.theme || "BOTTOM_BTNS";
    var slide = {
      location: s.location || "TOP_CENTER",
      showIcon: s.showIcon || false,
      mainColor: mainColor,
      title: s.showTitle ? s.title || '' : '',
      text: s.text || "We'd like to show you notifications for the latest news and updates.",
      acceptBtnText: s.acceptBtnText || "Allow",
      cancelBtnText: s.cancelBtnText || "No Thanks"
    };
    var details = {};

    if (s.advancedOptions) {
      details = fixMissingSlideDetails$1(s.details, mainColor);
    } else {
      details = getDefaultSlideDetails$1(mainColor);
    }

    return "\n<div class=\"dn-slide ".concat(slide.showIcon ? '' : 'dn-slide--noLogo', " ").concat(slide.title ? '' : 'dn-slide--noTitle', " ").concat(theme, "\">\n  <div class=\"dn-slide-logo\"><img src=\"").concat(appSettings.defaultIconUrl, "\"></div>\n  <div class=\"dn-slide-body\">\n      <h3 class=\"dn-slide-title\">").concat(slide.title, "</h3>\n      <p class=\"dn-slide-message\">").concat(slide.text, "</p>\n      <div class=\"dn-slide-buttons horizontal\">\n          <button class=\"dn-slide-deny-btn\">").concat(slide.cancelBtnText, "</button>\n          <button class=\"dn-slide-accept-btn\">").concat(slide.acceptBtnText, "</button>\n      </div>\n  </div>\n  <div class=\"dn-slide-buttons vertical\">\n      <button class=\"dn-slide-accept-btn\">").concat(slide.acceptBtnText, "</button>\n      <button class=\"dn-slide-deny-btn\">").concat(slide.cancelBtnText, "</button>\n  </div>\n</div>\n<style>\n  .dn-slide {\n      box-shadow: ").concat(details.shadow ? '0 3px 10px 0 rgba(0, 0, 0, 0.43) !important' : 'none', " ;\n      background: ").concat(details.backgroundColor, ";\n      border: ").concat(details.border, "px solid ").concat(details.borderColor, ";\n      border-radius: ").concat(details.borderRadius, "px;\n      display: flex;\n      overflow:auto;\n      width:520px;\n      max-width: 520px;\n      height:auto;\n  }\n\n  .dn-slide-logo {\n      width: 30%;\n      padding: 15px;\n      box-sizing: border-box;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n  }\n  .RIGHT_BTNS .dn-slide-logo {\n      width: 18%;\n      padding: 8px;\n  }\n  .dn-slide-logo img {\n      width: 100%;\n  }\n  .dn-slide--noLogo .dn-slide-logo {\n      display: none;\n  }\n\n  .dn-slide-body {\n      width: 70%;\n      padding: 15px;\n      box-sizing: border-box;\n      line-height: 1.4;\n      vertical-align: middle;\n      display: flex;\n      flex-direction: column;\n  }\n  .RIGHT_BTNS .dn-slide-body {\n      width: 58%;\n      padding: 8px;\n  }\n  .dn-slide--noLogo .dn-slide-body {\n      width: 100%;\n  }\n\n  .dn-slide-title {\n      background: none;\n      color: ").concat(details.titleSyle.textColor, ";\n      font-family: ").concat(getFontFamily$1(details.fontFamily), ";\n      font-size: ").concat(details.titleSyle.fontSize, "px;\n      font-weight: ").concat(details.titleSyle.fontWeight, ";\n      margin: 0;\n      padding: 0;\n  }\n  .dn-slide--noTitle .dn-slide-title {\n      display: none;\n  }\n\n  .dn-slide-message {\n      background: none;\n      color: ").concat(details.textSyle.textColor, ";\n      font-family: ").concat(getFontFamily$1(details.fontFamily), ";\n      font-size: ").concat(details.textSyle.fontSize, "px;\n      font-weight: ").concat(details.textSyle.fontWeight, ";\n      padding: 0;\n      margin: 12px 0;\n      flex: 1;\n  }\n  .dn-slide--noTitle .dn-slide-message {\n      margin: 5px 0 20px 10px;\n  }\n\n  .dn-slide-buttons {\n      display: flex;\n  }\n  .dn-slide-buttons.vertical {\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      width: 24%;\n      padding: 8px;\n  }\n  .dn-slide-buttons.horizontal {\n      justify-content: flex-end;\n      align-items: center;\n  }\n  .BOTTOM_BTNS .vertical {\n      display: none;\n  }\n  .RIGHT_BTNS .horizontal {\n      display: none;\n  }\n  .dn-slide-buttons button {\n      padding: 8px 15px;\n      margin: 0;\n      text-align: center;\n      cursor: pointer;\n  }\n  .dn-slide-buttons.horizontal button {\n      margin-left: 15px;\n  }\n  .dn-slide-buttons.vertical button {\n      width: 100%;\n  }\n  .dn-slide-buttons.vertical button:first-child {\n      margin-bottom: 5px;\n  }\n\n  .dn-slide-buttons .dn-slide-accept-btn {\n      background-color: ").concat(details.acceptBtnStyle.backgroundColor, ";\n      color: ").concat(details.acceptBtnStyle.textColor, ";\n      font-family: ").concat(getFontFamily$1(details.fontFamily), ";\n      font-size: ").concat(details.acceptBtnStyle.fontSize, "px;\n      font-weight: ").concat(details.acceptBtnStyle.fontWeight, ";\n      border: ").concat(details.acceptBtnStyle.border, "px solid ").concat(details.acceptBtnStyle.borderColor, ";\n      border-radius: ").concat(details.acceptBtnStyle.borderRadius, "px;\n      box-shadow: ").concat(details.acceptBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4) !important' : 'none', " ;\n  }\n  .dn-slide-buttons .dn-slide-accept-btn:hover {\n      background-color: ").concat(details.acceptBtnStyle.hoverBackgroundColor, ";\n      color: ").concat(details.acceptBtnStyle.hoverTextColor, ";\n  }\n\n  .dn-slide-buttons .dn-slide-deny-btn {\n      background-color: ").concat(details.cancelBtnStyle.backgroundColor, ";\n      color: ").concat(details.cancelBtnStyle.textColor, ";\n      font-family: ").concat(getFontFamily$1(details.fontFamily), ";\n      font-size: ").concat(details.cancelBtnStyle.fontSize, "px;\n      font-weight: ").concat(details.cancelBtnStyle.fontWeight, ";\n      border: ").concat(details.cancelBtnStyle.border, "px solid ").concat(details.cancelBtnStyle.borderColor, ";\n      border-radius: ").concat(details.cancelBtnStyle.borderRadius, "px;\n      box-shadow: ").concat(details.cancelBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4) !important' : 'none', " ;\n  }\n  .dn-slide-buttons .dn-slide-deny-btn:hover {\n      background-color: ").concat(details.cancelBtnStyle.hoverBackgroundColor, ";\n      color: ").concat(details.cancelBtnStyle.hoverTextColor, ";\n  }\n\n  .dn-hide {\n      display: none;\n  }\n\n  @media only screen and (max-width: 767px) {\n      #visilabs_web_push_perm_box {\n          width: 94% !important;\n          margin-left: -47% !important;\n      }\n\n      .dn-slide {\n          width: 100% !important;\n          max-width: 100%;\n      }\n\n      /*.dn-slide-title {\n          font-size: 12px;\n      }\n\n      .dn-slide-message {\n          font-size: 11px;\n      }\n\n      .dn-slide-buttons button {\n          padding: 5px 10px;\n          margin-left: 15px;\n          font-size: 12px;\n      }*/\n  }\n</style>\n    ");
  }

  function getDefaultSlideDetails$1(mainColor) {
    return {
      backgroundColor: "#ffffff",
      fontFamily: 'ARIAL',
      border: 0,
      borderColor: mainColor,
      borderRadius: 3,
      shadow: true,
      textSyle: {
        textColor: "#555555",
        fontSize: "15",
        fontWeight: "normal"
      },
      titleSyle: {
        textColor: "#555555",
        fontSize: "16",
        fontWeight: "bold"
      },
      acceptBtnStyle: {
        backgroundColor: mainColor,
        hoverBackgroundColor: mainColor,
        textColor: "#ffffff",
        hoverTextColor: "#ffffff",
        fontSize: "16",
        fontWeight: "normal",
        border: 0,
        borderColor: mainColor,
        borderRadius: 3,
        shadow: false
      },
      cancelBtnStyle: {
        backgroundColor: "#ffffff",
        hoverBackgroundColor: "#ffffff",
        textColor: mainColor,
        hoverTextColor: mainColor,
        fontSize: "16",
        fontWeight: "normal",
        border: 0,
        borderColor: mainColor,
        borderRadius: 3,
        shadow: false
      }
    };
  }

  function fixMissingSlideDetails$1(details, mainColor) {
    var textSyle = details.textSyle || {};
    var titleSyle = details.titleSyle || {};
    var acceptBtnStyle = details.acceptBtnStyle || {};
    var cancelBtnStyle = details.cancelBtnStyle || {};
    return {
      backgroundColor: details.backgroundColor || "#ffffff",
      fontFamily: details.fontFamily || 'ARIAL',
      border: details.border || 0,
      borderColor: details.borderColor || mainColor,
      borderRadius: details.borderRadius || 3,
      shadow: details.shadow == null ? true : details.shadow,
      textSyle: {
        textColor: textSyle.textColor || "#555555",
        fontSize: textSyle.fontSize || "15",
        fontWeight: textSyle.fontWeight || "normal"
      },
      titleSyle: {
        textColor: titleSyle.textColor || "#555555",
        fontSize: titleSyle.fontSize || "16",
        fontWeight: titleSyle.fontWeight || "bold"
      },
      acceptBtnStyle: {
        backgroundColor: acceptBtnStyle.backgroundColor || mainColor,
        hoverBackgroundColor: acceptBtnStyle.backgroundColor || mainColor,
        textColor: acceptBtnStyle.textColor || "#ffffff",
        hoverTextColor: acceptBtnStyle.hoverTextColor || "#ffffff",
        fontSize: acceptBtnStyle.fontSize || "16",
        fontWeight: acceptBtnStyle.fontWeight || "normal",
        border: acceptBtnStyle.border || 0,
        borderColor: acceptBtnStyle.borderColor || mainColor,
        borderRadius: acceptBtnStyle.borderRadius || 3,
        shadow: acceptBtnStyle.shadow == null ? false : acceptBtnStyle.shadow
      },
      cancelBtnStyle: {
        backgroundColor: cancelBtnStyle.backgroundColor || "#ffffff",
        hoverBackgroundColor: cancelBtnStyle.backgroundColor || "#ffffff",
        textColor: cancelBtnStyle.textColor || mainColor,
        hoverTextColor: cancelBtnStyle.hoverTextColor || mainColor,
        fontSize: cancelBtnStyle.fontSize || "16",
        fontWeight: cancelBtnStyle.fontWeight || "normal",
        border: cancelBtnStyle.border || 0,
        borderColor: cancelBtnStyle.borderColor || mainColor,
        borderRadius: cancelBtnStyle.borderRadius || 3,
        shadow: cancelBtnStyle.shadow == null ? false : cancelBtnStyle.shadow
      }
    };
  }

  function getFontFamily$1(font) {
    switch (font) {
      case 'ARIAL':
        return 'Helvetica, Arial, sans-serif';

      case 'TAHOMA':
        return 'Tahoma, sans-serif';

      case 'VERDANA':
        return 'Verdana, sans-serif';

      case 'GEORGIA':
        return 'Georgia, Times, serif';

      case 'TIMES':
        return '"Times New Roman", Times, serif';

      case 'COURIER':
        return '"Courier New", Courier, monospace';
    }

    return 'inherit';
  }

  //import { deepCopy, mergeRecursive } from "../../utils";
  function showBannerPromt(appSettings) {
    var container = document.createElement("div");
    container.className = "dengage-push-perm-banner";
    container.id = "dengage-push-perm-banner";
    container.style.position = "absolute";
    container.style.height = "100px";
    container.style.width = "100%";
    container.style.top = "0px";
    container.style.left = "0px";
    container.style.zIndex = "100000";
    container.innerHTML = getBannerHtml();
    document.body.appendChild(container);

    if (appSettings.slideSettings.showAnimation) {
      container.style.transition = "top 1s linear";
    }

    container.innerHTML = generateSlideHtml$1(appSettings);
    document.body.appendChild(container);
    setTimeout(function () {
      container.style.top = "0px";
    }, 1);
    return {
      onAccept: function onAccept(callback) {
        var btns = container.querySelectorAll('.dn-slide-accept-btn');

        for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function () {
            container.style.top = "-260px";
            callback();
            setTimeout(function () {
              document.body.removeChild(container);
            }, 1000);
          });
        }
      },
      onDeny: function onDeny(callback) {
        var btns = container.querySelectorAll('.dn-slide-deny-btn');

        for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function () {
            container.style.top = "-260px";
            callback();
            setTimeout(function () {
              document.body.removeChild(container);
            }, 1000);
          });
        }
      }
    };
  }

  function showNativePrompt(grantedCallback) {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        if (grantedCallback) {
          grantedCallback();
        }
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  }

  function showPrompt(appSettings, grantedCallback) {
    if (appSettings.selectedPrompt == 'SLIDE') {
      var slidePrompt = showSlidePromt(appSettings);
      slidePrompt.onAccept(function () {
        showNativePrompt(grantedCallback);
      });
      slidePrompt.onDeny(function () {//
      });
    } else if (appSettings.selectedPrompt == 'BANNER') {
      var bannerPrompt = showBannerPromt(appSettings);
      bannerPrompt.onAccept(function () {
        showNativePrompt(grantedCallback);
      });
      bannerPrompt.onDeny(function () {//
      });
    } else {
      showNativePrompt(grantedCallback);
    }
  }

  function start(appSettings, grantedCallback) {
    showPrompt(appSettings, grantedCallback);
  }

  var firebaseConfig = {
    apiKey: "AIzaSyDbzYdx1P-_2QBUZbt8d9Zexb6Fk8fugZ8",
    projectId: "webpush-deneme",
    messagingSenderId: "992812112924",
    appId: "1:992812112924:web:4cc16aaa4afdefb94c13d9"
  };

  function sendSubscription(token) {
    var data = {
      "appAlias": "muhammed-wh.github.io",
      "token": token,
      "contactKey": "",
      "permission": true,
      "udid": "b2b28f40-4e78-4ce3-b905-06261701b616",
      "carrierId": "",
      "appVersion": "",
      "sdkVersion": "0.1"
    };
    var request = fetch('https://pushdev.dengage.com/api/mobile/subscription', {
      method: 'POST',
      // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      // no-cors, *cors, same-origin
      cache: 'no-cache',
      // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit',
      // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      // manual, *follow, error
      referrer: 'no-referrer',
      // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header

    });
  }

  function isBrowserSupported() {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      return true;
    }

    return false;
  }
  function start$1(appSettings) {
    var fb = firebase.initializeApp(firebaseConfig);
    var messaging = fb.messaging();

    if (Notification.permission == 'granted') {
      console.log('Notification permission granted.');
      navigator.serviceWorker.register('/dengage-webpush-sw.js').then(function (registration) {
        messaging.useServiceWorker(registration);
      });
      messaging.getToken().then(function (currentToken) {
        if (currentToken) {
          console.log('Token: ' + currentToken);
          sendSubscription(currentToken);
        } else {
          console.log('empty token');
        }
      }).catch(function (err) {
        console.log('An error occurred while retrieving token. ', err);
      });
    } else {
      var promptManager = start();
      promptManager.onPermissionGranted(function () {
        console.log('Notification permission granted.');
        navigator.serviceWorker.register('/dengage-webpush-sw.js').then(function (registration) {
          messaging.useServiceWorker(registration);
        });
        messaging.getToken().then(function (currentToken) {
          if (currentToken) {
            console.log('Token: ' + currentToken);
            sendSubscription(currentToken);
          } else {
            console.log('empty token');
          }
        }).catch(function (err) {
          console.log('An error occurred while retrieving token. ', err);
        });
      });
    }
  }

  var appSettings = JSON.parse('{"name":"muhammed-wh.github.io","siteUrl":"https://muhammed-wh.github.io","defaultIconUrl":"https://www.materialui.co/materialIcons/action/check_circle_grey_192x192.png","selectedPrompt":"SLIDE","autoShow":false,"autoShowSettings":{"delay":0,"promptAfterXVisits":0,"repromptAfterXMinutes":0,"denyWaitTime":0},"slideSettings":{"location":"TOP_CENTER","theme":"BOTTOM_BTNS","fixed":false,"showIcon":true,"mainColor":"#1165f1","showTitle":false,"title":"","text":"We\'d like to show you notifications for the latest news and updates.","acceptBtnText":"Allow","cancelBtnText":"No Thanks","advancedOptions":false,"details":null},"bannerSettings":{"location":"BOTTOM","theme":"DEFAULT","fixed":true,"showIcon":true,"mainColor":"#333333","text":"","acceptBtnText":"Enable","advancedOptions":false,"details":{"backgroundColor":"","fontFamily":"","border":0,"borderColor":"","shadow":false,"textSyle":{"textColor":"#333333","fontSize":"","fontWeight":""},"acceptBtnStyle":{"backgroundColor":"","hoverBackgroundColor":"","textColor":"#333333","fontSize":"","fontWeight":"","border":0,"borderColor":"","borderRadius":0,"shadow":false},"cancelBtnStyle":{"backgroundColor":"","hoverBackgroundColor":"","textColor":"#333333","hoverTextColor":"","fontSize":"","fontWeight":"","border":0,"borderColor":"","shadow":false}}},"bellSettings":{"size":"MEDIUM","location":"RIGHT","mainColor":"#1165f1","accentColor":"#333333","hideIfSubscribed":false,"nonSubscriberTooltip":"","blockedSubscriberTooltip":"","subscribedTooltip":"","afterSubscriptionText":"","unsubscribeText":"","dialogTitle":"","subscribeBtnText":"","unsubscribeBtnText":"","unblockNotificationText":"","unblockGuideText":"","bottomOffset":0,"leftOffset":0,"rightOffset":0,"advancedOptions":false},"welcomeNotification":{"enabled":false,"title":"","message":"","link":""}}');

  if (isBrowserSupported()) {
    start$1();
  }

}(firebase));
//# sourceMappingURL=dengage-js-sdk.js.map
