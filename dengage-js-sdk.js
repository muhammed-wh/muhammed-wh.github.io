(function () {
  'use strict';

  function shadeHexColor(color, percent) {
    var f = parseInt(color.slice(1), 16),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = f >> 16,
        G = f >> 8 & 0x00FF,
        B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
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
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16).toLowerCase();
    });
  }
  function logError(errorText, error) {
    console.error(errorText);
  }
  function logInfo(errorText, error) {
    console.log(errorText);
  }
  function errorLoggerResolved(errorText, resolveValue) {
    return function (input) {
      if (input) {
        console.error(errorText, input);
      } else {
        console.error(errorText);
      }

      return resolveValue;
    };
  }
  function errorLoggerRejected(errorText, rejectValue) {
    return function (input) {
      if (input) {
        console.error(errorText, input);
      } else {
        console.error(errorText);
      }

      return Promise.reject(rejectValue);
    };
  }
  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;

    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return window.btoa(binary);
  }

  function generateSlideHtml(appSettings) {
    var s = appSettings.slideSettings;
    var mainColor = s.mainColor || "#1165f1";
    var theme = s.theme || "BOTTOM_BTNS";
    var slide = {
      location: s.location || "TOP_CENTER",
      showIcon: s.showIcon || false,
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

    return "\n<div class=\"dn-slide ".concat(slide.showIcon ? '' : 'dn-slide--noLogo', " ").concat(slide.title ? '' : 'dn-slide--noTitle', " ").concat(theme, "\">\n  <div class=\"dn-slide-logo\"><img src=\"").concat(appSettings.defaultIconUrl, "\"></div>\n  <div class=\"dn-slide-body\">\n      <h3 class=\"dn-slide-title\">").concat(slide.title, "</h3>\n      <p class=\"dn-slide-message\">").concat(slide.text, "</p>\n      <div class=\"dn-slide-buttons horizontal\">\n          <button class=\"dn-slide-deny-btn\">").concat(slide.cancelBtnText, "</button>\n          <button class=\"dn-slide-accept-btn\">").concat(slide.acceptBtnText, "</button>\n      </div>\n  </div>\n  <div class=\"dn-slide-buttons vertical\">\n      <button class=\"dn-slide-accept-btn\">").concat(slide.acceptBtnText, "</button>\n      <button class=\"dn-slide-deny-btn\">").concat(slide.cancelBtnText, "</button>\n  </div>\n</div>\n<style>\n  .dn-slide {\n      box-shadow: ").concat(details.shadow ? '0 3px 10px 0 rgba(0, 0, 0, 0.43) !important' : 'none', " ;\n      background: ").concat(details.backgroundColor, ";\n      border: ").concat(details.border, "px solid ").concat(details.borderColor, ";\n      border-radius: ").concat(details.borderRadius, "px;\n      display: flex;\n      overflow:auto;\n      width:520px;\n      max-width: 520px;\n      height:auto;\n  }\n\n  .dn-slide-logo {\n      width: 30%;\n      padding: 15px;\n      box-sizing: border-box;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n  }\n  .RIGHT_BTNS .dn-slide-logo {\n      width: 18%;\n      padding: 8px;\n  }\n  .dn-slide-logo img {\n      width: 100%;\n  }\n  .dn-slide--noLogo .dn-slide-logo {\n      display: none;\n  }\n\n  .dn-slide-body {\n      width: 70%;\n      padding: 15px;\n      box-sizing: border-box;\n      line-height: 1.4;\n      vertical-align: middle;\n      display: flex;\n      flex-direction: column;\n  }\n  .RIGHT_BTNS .dn-slide-body {\n      width: 58%;\n      padding: 8px;\n  }\n  .dn-slide--noLogo .dn-slide-body {\n      width: 100%;\n  }\n\n  .dn-slide-title {\n      background: none;\n      color: ").concat(details.titleSyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.titleSyle.fontSize, "px;\n      font-weight: ").concat(details.titleSyle.fontWeight, ";\n      margin: 0;\n      padding: 0;\n  }\n  .dn-slide--noTitle .dn-slide-title {\n      display: none;\n  }\n\n  .dn-slide-message {\n      background: none;\n      color: ").concat(details.textSyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.textSyle.fontSize, "px;\n      font-weight: ").concat(details.textSyle.fontWeight, ";\n      padding: 0;\n      margin: 12px 0;\n      flex: 1;\n  }\n  .dn-slide--noTitle .dn-slide-message {\n      margin: 5px 0 20px 10px;\n  }\n\n  .dn-slide-buttons {\n      display: flex;\n  }\n  .dn-slide-buttons.vertical {\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      width: 24%;\n      padding: 8px;\n  }\n  .dn-slide-buttons.horizontal {\n      justify-content: flex-end;\n      align-items: center;\n  }\n  .BOTTOM_BTNS .vertical {\n      display: none;\n  }\n  .RIGHT_BTNS .horizontal {\n      display: none;\n  }\n  .dn-slide-buttons button {\n      padding: 8px 15px;\n      margin: 0;\n      text-align: center;\n      cursor: pointer;\n  }\n  .dn-slide-buttons.horizontal button {\n      margin-left: 15px;\n  }\n  .dn-slide-buttons.vertical button {\n      width: 100%;\n  }\n  .dn-slide-buttons.vertical button:first-child {\n      margin-bottom: 5px;\n  }\n\n  .dn-slide-buttons .dn-slide-accept-btn {\n      background-color: ").concat(details.acceptBtnStyle.backgroundColor, ";\n      color: ").concat(details.acceptBtnStyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.acceptBtnStyle.fontSize, "px;\n      font-weight: ").concat(details.acceptBtnStyle.fontWeight, ";\n      border: ").concat(details.acceptBtnStyle.border, "px solid ").concat(details.acceptBtnStyle.borderColor, ";\n      border-radius: ").concat(details.acceptBtnStyle.borderRadius, "px;\n      box-shadow: ").concat(details.acceptBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4) !important' : 'none', " ;\n  }\n  .dn-slide-buttons .dn-slide-accept-btn:hover {\n      background-color: ").concat(details.acceptBtnStyle.hoverBackgroundColor, ";\n      color: ").concat(details.acceptBtnStyle.hoverTextColor, ";\n  }\n\n  .dn-slide-buttons .dn-slide-deny-btn {\n      background-color: ").concat(details.cancelBtnStyle.backgroundColor, ";\n      color: ").concat(details.cancelBtnStyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.cancelBtnStyle.fontSize, "px;\n      font-weight: ").concat(details.cancelBtnStyle.fontWeight, ";\n      border: ").concat(details.cancelBtnStyle.border, "px solid ").concat(details.cancelBtnStyle.borderColor, ";\n      border-radius: ").concat(details.cancelBtnStyle.borderRadius, "px;\n      box-shadow: ").concat(details.cancelBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4) !important' : 'none', " ;\n  }\n  .dn-slide-buttons .dn-slide-deny-btn:hover {\n      background-color: ").concat(details.cancelBtnStyle.hoverBackgroundColor, ";\n      color: ").concat(details.cancelBtnStyle.hoverTextColor, ";\n  }\n\n  @media only screen and (max-width: 767px) {\n      #dengage-push-perm-slide {\n          width: 94% !important;\n          margin-left: -47% !important;\n      }\n\n      .dn-slide {\n          width: 100% !important;\n          max-width: 100%;\n      }\n\n      /*.dn-slide-title {\n          font-size: 12px;\n      }\n\n      .dn-slide-message {\n          font-size: 11px;\n      }\n\n      .dn-slide-buttons button {\n          padding: 5px 10px;\n          margin-left: 15px;\n          font-size: 12px;\n      }*/\n  }\n</style>\n    ");
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
        hoverBackgroundColor: shadeHexColor(mainColor, -0.2),
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
        hoverTextColor: shadeHexColor(mainColor, -0.2),
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
        hoverBackgroundColor: acceptBtnStyle.hoverBackgroundColor || shadeHexColor(mainColor, -0.2),
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
        hoverBackgroundColor: cancelBtnStyle.hoverBackgroundColor || "#ffffff",
        textColor: cancelBtnStyle.textColor || mainColor,
        hoverTextColor: cancelBtnStyle.hoverTextColor || shadeHexColor(mainColor, -0.2),
        fontSize: cancelBtnStyle.fontSize || "16",
        fontWeight: cancelBtnStyle.fontWeight || "normal",
        border: cancelBtnStyle.border || 0,
        borderColor: cancelBtnStyle.borderColor || mainColor,
        borderRadius: cancelBtnStyle.borderRadius || 3,
        shadow: cancelBtnStyle.shadow == null ? false : cancelBtnStyle.shadow
      }
    };
  }

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

  function generateBannerHtml(appSettings) {
    var s = appSettings.bannerSettings;
    var mainColor = s.mainColor || "#333333";
    var banner = {
      location: s.location || "TOP",
      showIcon: s.showIcon || false,
      text: s.text || "We'd like to show you notifications for the latest news and updates.",
      acceptBtnText: s.acceptBtnText || "Allow"
    };
    var details = {};

    if (s.advancedOptions) {
      details = fixMissingBannerDetails(s.details, mainColor);
    } else {
      details = getDefaultBannerDetails(mainColor);
    }

    return "\n<div class=\"dn-banner ".concat(banner.showIcon ? '' : 'dn-banner--noLogo', "\">\n  <div class=\"dn-banner-logo\"><img src=\"").concat(appSettings.defaultIconUrl, "\"></div>\n  <div class=\"dn-banner-text\">\n    ").concat(banner.text, "\n  </div>\n  <div class=\"dn-banner-buttons\">\n      <button class=\"dn-banner-accept-btn\">").concat(banner.acceptBtnText, "</button>\n      <button class=\"dn-banner-deny-btn\">x</button>\n  </div>\n</div>\n<style>\n  .dn-banner {\n      box-shadow: ").concat(details.shadow ? '0 3px 10px 0 rgba(0, 0, 0, 0.43) !important' : 'none', " ;\n      background: ").concat(details.backgroundColor, ";\n      border-bottom: ").concat(details.border, "px solid ").concat(details.borderColor, ";\n      display: flex;\n      overflow:auto;\n      width: 100%;\n      height:auto;\n  }\n\n  .dn-banner-logo {\n      padding: 15px;\n      box-sizing: border-box;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n  }\n  .dn-banner-logo img {\n      width: 36px;\n  }\n  .dn-banner--noLogo .dn-banner-logo {\n      display: none;\n  }\n\n  .dn-banner-text {\n      flex: 1;\n      padding: 15px;\n      box-sizing: border-box;\n      line-height: 1.4;\n      display: flex;\n      align-items: center;\n      color: ").concat(details.textSyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.textSyle.fontSize, "px;\n      font-weight: ").concat(details.textSyle.fontWeight, ";\n  }\n  .dn-banner--noLogo .dn-banner-body {\n      width: 100%;\n  }\n\n  .dn-banner-buttons {\n      display: flex;\n      padding-right: 10px;\n      align-items: center;\n  }\n  .dn-banner-buttons button {\n      padding: 8px 15px;\n      margin: 0;\n      text-align: center;\n      cursor: pointer;\n  }\n\n  .dn-banner-buttons .dn-banner-accept-btn {\n      background-color: ").concat(details.acceptBtnStyle.backgroundColor, ";\n      color: ").concat(details.acceptBtnStyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.acceptBtnStyle.fontSize, "px;\n      font-weight: ").concat(details.acceptBtnStyle.fontWeight, ";\n      border: ").concat(details.acceptBtnStyle.border, "px solid ").concat(details.acceptBtnStyle.borderColor, ";\n      border-radius: ").concat(details.acceptBtnStyle.borderRadius, "px;\n      box-shadow: ").concat(details.acceptBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4) !important' : 'none', " ;\n  }\n  .dn-banner-buttons .dn-banner-accept-btn:hover {\n      background-color: ").concat(details.acceptBtnStyle.hoverBackgroundColor, ";\n      color: ").concat(details.acceptBtnStyle.hoverTextColor, ";\n  }\n\n  .dn-banner-buttons .dn-banner-deny-btn {\n      background-color: ").concat(details.cancelBtnStyle.backgroundColor, ";\n      color: ").concat(details.cancelBtnStyle.textColor, ";\n      font-family: ").concat(getFontFamily(details.fontFamily), ";\n      font-size: ").concat(details.cancelBtnStyle.fontSize, "px;\n      font-weight: ").concat(details.cancelBtnStyle.fontWeight, ";\n      border: ").concat(details.cancelBtnStyle.border, "px solid ").concat(details.cancelBtnStyle.borderColor, ";\n      border-radius: ").concat(details.cancelBtnStyle.borderRadius, "px;\n      box-shadow: ").concat(details.cancelBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4) !important' : 'none', " ;\n  }\n  .dn-banner-buttons .dn-banner-deny-btn:hover {\n      background-color: ").concat(details.cancelBtnStyle.hoverBackgroundColor, ";\n      color: ").concat(details.cancelBtnStyle.hoverTextColor, ";\n  }\n\n  @media only screen and (max-width: 767px) {\n\n  }\n</style>\n    ");
  }

  function getDefaultBannerDetails(mainColor) {
    return {
      //advanced options
      backgroundColor: '#ffffff',
      fontFamily: 'ARIAL',
      border: 2,
      borderColor: mainColor,
      shadow: true,
      textSyle: {
        textColor: mainColor,
        fontSize: '15',
        fontWeight: 'normal'
      },
      acceptBtnStyle: {
        backgroundColor: mainColor,
        hoverBackgroundColor: shadeHexColor(mainColor, -0.2),
        textColor: '#ffffff',
        hoverTextColor: '#ffffff',
        fontSize: '16',
        fontWeight: 'normal',
        border: 0,
        borderColor: '',
        borderRadius: 0,
        shadow: false
      },
      cancelBtnStyle: {
        backgroundColor: '#eeeeee',
        hoverBackgroundColor: '#cccccc',
        textColor: shadeHexColor(mainColor, 0.2),
        hoverTextColor: mainColor,
        fontSize: '16',
        fontWeight: 'bold',
        border: 0,
        borderColor: '',
        shadow: false
      }
    };
  }

  function fixMissingBannerDetails(details, mainColor) {
    var textSyle = details.textSyle || {};
    var acceptBtnStyle = details.acceptBtnStyle || {};
    var cancelBtnStyle = details.cancelBtnStyle || {};
    return {
      backgroundColor: details.backgroundColor || "#ffffff",
      fontFamily: details.fontFamily || 'ARIAL',
      border: details.border || 2,
      borderColor: details.borderColor || mainColor,
      borderRadius: details.borderRadius || 0,
      shadow: details.shadow == null ? true : details.shadow,
      textSyle: {
        textColor: textSyle.textColor || "#333333",
        fontSize: textSyle.fontSize || "15",
        fontWeight: textSyle.fontWeight || "normal"
      },
      acceptBtnStyle: {
        backgroundColor: acceptBtnStyle.backgroundColor || mainColor,
        hoverBackgroundColor: acceptBtnStyle.hoverBackgroundColor || shadeHexColor(mainColor, -0.2),
        textColor: acceptBtnStyle.textColor || "#ffffff",
        hoverTextColor: acceptBtnStyle.hoverTextColor || "#ffffff",
        fontSize: acceptBtnStyle.fontSize || "16",
        fontWeight: acceptBtnStyle.fontWeight || "normal",
        border: acceptBtnStyle.border || 0,
        borderColor: acceptBtnStyle.borderColor || mainColor,
        borderRadius: acceptBtnStyle.borderRadius || 0,
        shadow: acceptBtnStyle.shadow == null ? false : acceptBtnStyle.shadow
      },
      cancelBtnStyle: {
        backgroundColor: cancelBtnStyle.backgroundColor || "#eeeeee",
        hoverBackgroundColor: cancelBtnStyle.hoverBackgroundColor || "#cccccc",
        textColor: cancelBtnStyle.textColor || shadeHexColor(mainColor, 0.2),
        hoverTextColor: cancelBtnStyle.hoverTextColor || mainColor,
        fontSize: cancelBtnStyle.fontSize || "16",
        fontWeight: cancelBtnStyle.fontWeight || "normal",
        border: cancelBtnStyle.border || 0,
        borderColor: cancelBtnStyle.borderColor || "#eeeeee",
        shadow: cancelBtnStyle.shadow == null ? false : cancelBtnStyle.shadow
      }
    };
  }

  function showBannerPromt(appSettings, isPreview) {
    var container = document.createElement("div");
    container.className = "dengage-push-perm-banner";
    container.id = "dengage-push-perm-banner";
    container.style.position = "absolute";
    container.style.height = "100px";
    container.style.width = "100%";
    container.style.top = "0px";
    container.style.left = "0px";
    container.style.zIndex = "100000";
    document.body.appendChild(container);

    if (!isPreview) {
      container.style.transition = "top 1s linear";
    }

    container.innerHTML = generateBannerHtml(appSettings);
    document.body.appendChild(container);
    setTimeout(function () {
      container.style.top = "0px";
    }, 1);
    return {
      onAccept: function onAccept(callback) {
        var btn = container.querySelector('.dn-banner-accept-btn');
        btn.addEventListener("click", function () {
          container.style.top = "-260px";
          callback();
          setTimeout(function () {
            document.body.removeChild(container);
          }, 1000);
        });
      },
      onDeny: function onDeny(callback) {
        var btn = container.querySelector('.dn-banner-deny-btn');
        btn.addEventListener("click", function () {
          container.style.top = "-260px";
          callback();
          setTimeout(function () {
            document.body.removeChild(container);
          }, 1000);
        });
      }
    };
  }

  // for clearing non-printable ascii chars    string.replace(/[^ -~]+/g, "");
  function sha256(ascii) {
    function rightRotate(value, amount) {
      return value >>> amount | value << 32 - amount;
    }
    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length';
    var i, j; // Used as a counter across the whole file

    var result = '';
    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8; //* caching results is optional - remove/add slash from front of this line to toggle
    // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
    // (we actually calculate the first 64, but extra values are just ignored)

    var hash = sha256.h = sha256.h || []; // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes

    var k = sha256.k = sha256.k || [];
    var primeCounter = k[lengthProperty];
    /*/
    var hash = [], k = [];
    var primeCounter = 0;
    //*/

    var isComposite = {};

    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) {
          isComposite[i] = candidate;
        }

        hash[primeCounter] = mathPow(candidate, .5) * maxWord | 0;
        k[primeCounter++] = mathPow(candidate, 1 / 3) * maxWord | 0;
      }
    }

    ascii += '\x80'; // Append '1' bit (plus zero padding)

    while (ascii[lengthProperty] % 64 - 56) {
      ascii += '\x00';
    } // More zero padding


    for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) return; // ASCII check: only accept characters in range 0-255

      words[i >> 2] |= j << (3 - i) % 4 * 8;
    }

    words[words[lengthProperty]] = asciiBitLength / maxWord | 0;
    words[words[lengthProperty]] = asciiBitLength; // process each chunk

    for (j = 0; j < words[lengthProperty];) {
      var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration

      var oldHash = hash; // This is now the "working hash", often labelled as variables a...g
      // (we have to truncate as well, otherwise extra entries at the end accumulate

      hash = hash.slice(0, 8);

      for (i = 0; i < 64; i++) {
        // Used below if 

        var w15 = w[i - 15],
            w2 = w[i - 2]; // Iterate

        var a = hash[0],
            e = hash[4];
        var temp1 = hash[7] + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
        + (e & hash[5] ^ ~e & hash[6]) // ch
        + k[i] // Expand the message schedule if needed
        + (w[i] = i < 16 ? w[i] : w[i - 16] + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ w15 >>> 3) // s0
        + w[i - 7] + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ w2 >>> 10) // s1
        | 0); // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble

        var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + ( // S0
        a & hash[1] ^ a & hash[2] ^ hash[1] & hash[2]); // maj

        hash = [temp1 + temp2 | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()

        hash[4] = hash[4] + temp1 | 0;
      }

      for (i = 0; i < 8; i++) {
        hash[i] = hash[i] + oldHash[i] | 0;
      }
    }

    for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
        var b = hash[i] >> j * 8 & 255;
        result += (b < 16 ? 0 : '') + b.toString(16);
      }
    }

    return result;
  }

  var token = null;
  var webSubscription = null;

  function generateToken(subscription) {
    var subText = JSON.stringify(subscription);
    subText = subText.replace(/[^ -~]+/g, '');
    return 'dn_' + sha256(subText);
  }

  function subscribePush() {
    var options = {
      userVisibleOnly: true,
      applicationServerKey: 'BJnJ_PO2DHLkWmn6ha4K4Ahwt4G7PolU7TA-w52UPT9A0eeWh4EEcT3dD9tSxwMciJDuDEc2ZbBDxBjawExj4KM'
    };
    return registration.pushManager.subscribe(options).then(function (newSubscription) {
      webSubscription = JSON.stringify(newSubscription);
      token = generateToken(newSubscription);
    }, errorLoggerRejected('pushManager.subscribe failed'));
  }

  function refreshSubscription(registration) {
    return registration.pushManager.getSubscription().then(function (subscription) {
      if (subscription) {
        if (arrayBufferToBase64(subscription.options.applicationServerKey) == 'BJnJ_PO2DHLkWmn6ha4K4Ahwt4G7PolU7TA-w52UPT9A0eeWh4EEcT3dD9tSxwMciJDuDEc2ZbBDxBjawExj4KM') {
          webSubscription = JSON.stringify(subscription);
          token = generateToken(subscription);
        } else {
          return subscription.unsubscribe().then(subscribePush);
        }
      } else {
        return subscribePush();
      }
    }, errorLoggerRejected('getSubscription failed'));
  }

  var webPushApiClient = {
    detected: function detected() {
      return 'serviceWorker' in navigator && 'PushManager' in window;
    },
    init: function init() {
      var currentPermission = Notification.permission;

      if (currentPermission === 'granted') {
        return navigator.serviceWorker.register('/dengage-webpush-sw.js', {
          updateViaCache: 'none'
        }).then(function () {
          // chrome register yapınca hemen ready olmuyor
          return navigator.serviceWorker.ready.then(function (registration) {
            return refreshSubscription(registration);
          }).catch(errorLoggerRejected('serviceWorker.ready failed')); //TODO: on refresh token
        }, errorLoggerRejected('An error occurred while registering service worker'));
      } else {
        logError('init called when permission is not granted');
        return Promise.reject();
      }
    },
    getTokenInfo: function getTokenInfo() {
      var currentPermission = Notification.permission;

      if (currentPermission === 'granted') {
        if (token == null || webSubscription == null) {
          return navigator.serviceWorker.ready.then(function (registration) {
            return refreshSubscription(registration);
          }).then(function () {
            return {
              token: token,
              tokenType: 'W',
              webSubscription: webSubscription
            };
          }, errorLoggerResolved('serviceWorker.ready failed', null));
        }

        return Promise.resolve({
          token: token,
          tokenType: 'W',
          webSubscription: webSubscription
        });
      }

      return Promise.resolve(null);
    },
    requestPermission: function requestPermission() {
      return Notification.requestPermission();
    },
    getPermission: function getPermission() {
      return Notification.permission;
    }
  };

  var isSubscriptionSent = !!sessionStorage.getItem('dengage_subscription_sent');
  var aboutToSend = false;

  function triggerSend() {
    if (aboutToSend == false) {
      aboutToSend = true;
      setTimeout(function () {
        aboutToSend = false;
        sendSubscription();
      }, 1000);
    }
  }

  setTimeout(function () {
    if (isSubscriptionSent == false) {
      triggerSend();
    }
  }, 2000);
  function getDeviceId() {
    var deviceId = normalizeLong(localStorage.getItem('dengage_device_id'));

    if (!deviceId) {
      deviceId = deviceId || generateUUID();
      triggerSend();
    }

    localStorage.setItem('dengage_device_id', deviceId);
    return Promise.resolve(deviceId);
  }
  function getContactKey() {
    var val = localStorage.getItem('dengage_contact_key');
    return normalizeShort(val);
  }
  function setContactKey(value) {
    if (getContactKey() != normalizeShort(value)) {
      localStorage.setItem('dengage_contact_key', normalizeShort(value) || '');
      triggerSend();
    }
  }
  function getToken() {
    var val = localStorage.getItem('dengage_webpush_token');
    return normalizeLong(val);
  }
  function setToken(value) {
    if (getToken() != normalizeLong(value)) {
      localStorage.setItem('dengage_webpush_token', normalizeLong(value) || '');
      triggerSend();
    }
  }
  function getTokenType() {
    var val = localStorage.getItem('dengage_webpush_token_type');
    return normalizeShort(val);
  }
  function setTokenType(value) {
    if (getTokenType() != normalizeShort(value)) {
      localStorage.setItem('dengage_webpush_token_type', normalizeShort(value) || '');
      triggerSend();
    }
  }
  function getWebSubscription() {
    var val = localStorage.getItem('dengage_webpush_sub');
    return normalizeLong(val);
  }
  function setWebSubscription(value) {
    if (getWebSubscription() != normalizeLong(value)) {
      localStorage.setItem('dengage_webpush_sub', normalizeLong(value) || '');
      triggerSend();
    }
  }

  function sendSubscription() {
    isSubscriptionSent = true;
    sessionStorage.setItem('dengage_subscription_sent', 'true');
    getDeviceId().then(function (deviceId) {
      var data = {
        integrationKey: 'BkziFc7ghQKPjZ5x9TovmjY_p_l_JwPewW2_p_l_mn_p_l_xHL3eUnBmZ4HMW28r0lc3T9gT6ueB4WBsIKmRRrSj_p_l_kHNGCexHkReFgqJwy8D8jHmzo_p_l_ivpVzLE0UuNFGT2Bq9QdroCwY',
        token: getToken(),
        contactKey: getContactKey(),
        permission: true,
        udid: deviceId,
        advertisingId: '',
        //TODO: burası yapılacak
        carrierId: null,
        appVersion: null,
        sdkVersion: '1.0',
        trackingPermission: true,
        webSubscription: getWebSubscription(),
        tokenType: getTokenType() //TODO: buraya token status eklenebilir

      };
      var request = fetch('https://pushdev.dengage.com/api/web/subscription', {
        method: 'POST',
        // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        // no-cors, *cors, same-origin
        cache: 'no-cache',
        // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit',
        // include, *same-origin, omit
        headers: {
          'Content-Type': 'text/plain'
        },
        redirect: 'follow',
        // manual, *follow, error
        referrer: 'no-referrer',
        // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header

      });
    });
  }

  function normalizeShort(val) {
    /*if (val === 'null') {
      try {
        throw new Error('null value for localStorage');
      } catch(e) {
        logError();
      }
    }*/
    if (!val || val === 'null') {
      return null;
    }

    return val;
  }

  function normalizeLong(val) {
    if (!val || typeof val == 'string' && val.length < 10) {
      return null;
    }

    return val;
  }

  var permissionData = null;

  function getWebsitePushID() {
    var hostname = window.location.hostname;
    return hostname.split('.').concat('web').reverse().join('.');
  }

  function refreshPermissionData() {
    permissionData = window.safari.pushNotification.permission(getWebsitePushID());
  }

  var safariClient = {
    detected: function detected() {
      //TODO: safari_enabled a bakılacak
      return 'safari' in window && 'pushNotification' in window.safari && 'true' == 'true';
    },
    init: function init() {
      if (permissionData == null) {
        refreshPermissionData();
      }

      if (permissionData.permission == 'granted') {
        return Promise.resolve();
      } else {
        logError('init called when permission is not granted');
        return Promise.reject();
      }
    },
    getTokenInfo: function getTokenInfo() {
      if (permissionData == null) {
        refreshPermissionData();
      }

      if (permissionData.permission === 'granted') {
        return Promise.resolve({
          token: permissionData.deviceToken,
          tokenType: 'S',
          webSubscription: null
        });
      }

      return Promise.resolve(null);
    },
    requestPermission: function requestPermission() {
      return new Promise(function (resolve, reject) {
        if (permissionData == null) {
          refreshPermissionData();
        }

        function safariPermissionCb(result) {
          permissionData = result;
          /*if (permissionData.permission === 'default') {
              console.log('user made default. it is impossible');
          }
          else if (permissionData.permission === 'denied') {
              console.log('user said no');
          }
          else if (permissionData.permission === 'granted') {
              console.log('user said yes');
              console.log('Token: ' + permissionData.deviceToken);
          }*/

          resolve(permissionData.permission);
        }

        if (permissionData.permission == 'default') {
          getDeviceId().then(function (deviceId) {
            var websitePushID = getWebsitePushID();
            var url = 'https://pushdev.dengage.com/api/safari/90db7e2a-5839-53cd-605f-9d3ffc328e21';
            var userInfo = {
              device_id: deviceId
            };
            window.safari.pushNotification.requestPermission(url, websitePushID, userInfo, safariPermissionCb);
          });
        } else {
          logError('requestPermission called when permission is not default');
          reject();
        }
      });
    },
    getPermission: function getPermission() {
      if (permissionData == null) {
        refreshPermissionData();
      }

      return permissionData.permission;
    }
  };

  var pushClient = {
    detected: function detected() {
      return false;
    }
  };

  if (safariClient.detected()) {
    Object.assign(pushClient, safariClient);
  } else {
    Object.assign(pushClient, webPushApiClient);
  }

  var appSettings = JSON.parse('{"name":"muhammed-wh.github.io","siteUrl":"https://muhammed-wh.github.io","autoShow":true,"bellSettings":{"size":"MEDIUM","location":"RIGHT","mainColor":"#1165f1","leftOffset":0,"accentColor":"#333333","dialogTitle":"","rightOffset":0,"bottomOffset":0,"advancedOptions":false,"unsubscribeText":"","hideIfSubscribed":false,"subscribeBtnText":"","unblockGuideText":"","subscribedTooltip":"","unsubscribeBtnText":"","nonSubscriberTooltip":"","afterSubscriptionText":"","unblockNotificationText":"","blockedSubscriberTooltip":""},"slideSettings":{"text":"We\'d like to show you notifications for the latest news and updates.","fixed":false,"theme":"BOTTOM_BTNS","title":"","details":null,"location":"TOP_CENTER","showIcon":true,"mainColor":"#1165f1","showTitle":false,"acceptBtnText":"Allow","cancelBtnText":"No Thanks","advancedOptions":false},"bannerSettings":{"text":"","fixed":true,"theme":"DEFAULT","details":null,"location":"BOTTOM","showIcon":true,"mainColor":"#333333","acceptBtnText":"Enable","advancedOptions":false},"defaultIconUrl":"https://s3.eu-central-1.amazonaws.com/prod-d5a29e72-54b5-5137-a534-3fd991dbb8ad/201911/blutv-logo.png","selectedPrompt":"SLIDE","autoShowSettings":{"delay":5,"denyWaitTime":0,"promptAfterXVisits":0,"repromptAfterXMinutes":2},"welcomeNotification":{"link":"","title":"DVL hesabına Hoş geldiniz","enabled":true,"message":"Ne iyi ettiniz de geldiniz"}}');

  function showNativePrompt(grantedCallback, deniedCallback) {
    pushClient.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        setLocalStoragePromptResult('granted');

        if (grantedCallback) {
          grantedCallback();
        }
      } else {
        setLocalStoragePromptResult('denied');

        if (deniedCallback) {
          deniedCallback();
        }
      }
    });
  }
  function showCustomPrompt(grantedCallback, deniedCallback) {
    if (appSettings.selectedPrompt == 'SLIDE') {
      var slidePrompt = showSlidePromt(appSettings);
      slidePrompt.onAccept(function () {
        showNativePrompt(grantedCallback, deniedCallback);
      });
      slidePrompt.onDeny(function () {
        setLocalStoragePromptResult('denied');

        if (deniedCallback) {
          deniedCallback();
        }
      });
    } else if (appSettings.selectedPrompt == 'BANNER') {
      var bannerPrompt = showBannerPromt(appSettings);
      bannerPrompt.onAccept(function () {
        showNativePrompt(grantedCallback, deniedCallback);
      });
      bannerPrompt.onDeny(function () {
        setLocalStoragePromptResult('denied');

        if (deniedCallback) {
          deniedCallback();
        }
      });
    } else {
      showNativePrompt(grantedCallback, deniedCallback);
    }

    localStorage.setItem('dengage_webpush_last_a', 'ask');
    localStorage.setItem('dengage_webpush_last_d', new Date().valueOf() + '');
  }
  /*autoShowSettings: {
      delay: 0, //second (session bazlı)
      promptAfterXVisits: 0,
      repromptAfterXMinutes: 0, //minutes
      denyWaitTime: 0, //minutes
  }*/

  function startAutoPrompt(grantedCallback, deniedCallback) {
    var autoShowSettings = appSettings.autoShowSettings;
    var sessionStartTime = toInt(sessionStorage.getItem('dengage_session_start'));

    if (sessionStartTime) {
      sessionStartTime = new Date(sessionStartTime);
    } else {
      sessionStartTime = new Date();
      sessionStorage.setItem('dengage_session_start', sessionStartTime.valueOf() + '');
    }

    var now = new Date();

    var setPrompt = function setPrompt() {
      var delay = toInt(autoShowSettings.delay) * 1000;
      var passedTime = now.valueOf() - sessionStartTime.valueOf();
      var waitTime = delay - passedTime;
      waitTime = waitTime > 0 ? waitTime : 0;
      setTimeout(function () {
        showCustomPrompt(grantedCallback, deniedCallback);
      }, waitTime);
    };

    var visitCount = toInt(localStorage.getItem('dengage_visit_count'));
    localStorage.setItem('dengage_visit_count', visitCount + 1);

    if (toInt(autoShowSettings.promptAfterXVisits) <= visitCount) {
      var lastPromptAction = localStorage.getItem('dengage_webpush_last_a') || '';
      var lastPromptDate = toInt(localStorage.getItem('dengage_webpush_last_d'));
      lastPromptDate = new Date(lastPromptDate);
      var denyWaitTime = toInt(autoShowSettings.denyWaitTime) * 60 * 1000;
      var denyWaitUntil = new Date(lastPromptDate.valueOf() + denyWaitTime);
      var repromptWaitTime = toInt(autoShowSettings.repromptAfterXMinutes);
      var repromptWaitUntil = new Date(lastPromptDate.valueOf() + repromptWaitTime);

      if (lastPromptAction == 'denied') {
        if (now >= denyWaitUntil) {
          setPrompt();
        }
      } else {
        if (now >= repromptWaitUntil) {
          setPrompt();
        }
      }
    }
  }

  function toInt(input) {
    if (typeof input == 'number') {
      return input;
    }

    if (typeof input == 'string') {
      return input === '' ? 0 : parseInt(input);
    }

    return 0;
  }

  function setLocalStoragePromptResult(result) {
    localStorage.setItem('dengage_webpush_last_a', result);
    localStorage.setItem('dengage_webpush_last_d', new Date().valueOf() + '');
  }

  /**
   * Direk basit bir notifikasyon gösterir
   * 
   * @param {object} data 
   * Gösterilecek notifikasyon ile ilgili bilgileri içerir
   * { title, iconUrl, message, mediaUrl, badgeUrl, targetUrl }
   */

  function showNotificationSimple(data, registration) {
    var title = data.title;
    var iconUrl = data.iconUrl == 'default_icon' ? appSettings.defaultIconUrl : (data.iconUrl || '').trim();
    var options = {
      body: data.message,
      requireInteraction: true
    };

    if (data.mediaUrl) {
      options.image = data.mediaUrl;
    }

    if (iconUrl) {
      options.icon = iconUrl;
    }

    if (data.badgeUrl) {
      options.badge = data.badgeUrl;
    }

    var notif = new Notification(title, options);

    if (data.targetUrl) {
      notif.onclick = function (event) {
        event.notification.close();
        window.open(data.targetUrl);
      };
    }
  }

  function startPushClient(callback, isFirstTime) {
    pushClient.init().then(function () {
      pushClient.getTokenInfo().then(function (tokenInfo) {
        logInfo('Token: ' + tokenInfo.token);
        setToken(tokenInfo.token);
        setTokenType(tokenInfo.tokenType);
        setWebSubscription(tokenInfo.webSubscription || null);

        if (isFirstTime) {
          showWellcomeNotification();
        }

        callback();
      }).catch(function (err) {
        logError('pushClient.getTokenInfo() failed. ');
        callback();
      });
    }).catch(function (err) {
      logError('pushClient.init() failed. ');
      callback();
    });
  }

  function start(callback) {
    callback = callback || function () {};

    var currentPermission = pushClient.getPermission();

    if (currentPermission == 'granted') {
      logInfo('Notification permission already granted.');
      startPushClient(callback);
    } else if (currentPermission == 'default') {
      setToken(null);
      setTokenType(null);
      setWebSubscription(null);

      if (appSettings.autoShow) {
        var onPermissionGranted = function onPermissionGranted() {
          logInfo('Notification permission granted.');
          startPushClient(callback, true); //TODO: manual prompt yapılan yerlerde startPushClient çağrılmalı
        };

        var onPermissionDenied = function onPermissionDenied() {
          logInfo('Notification permission denied.');
        };

        startAutoPrompt(onPermissionGranted, onPermissionDenied);
      }

      callback();
    } else {
      logInfo('Notification permission denied');
      setToken(null);
      setTokenType(null);
      setWebSubscription(null);
      callback();
    } //TODO: pushClient.onTokenRefresh
    //TODO: onMessage

  }
  function showNativePrompt$1() {
    return new Promise(function (resolve, reject) {
      showNativePrompt(function () {
        startPushClient(callback, true);
        resolve('granted');
      }, function () {
        resolve('denied');
      });
    });
  }
  function showCustomPrompt$1() {
    return new Promise(function (resolve, reject) {
      showCustomPrompt(function () {
        startPushClient(callback, true);
        resolve('granted');
      }, function () {
        resolve('denied');
      });
    });
  }

  function showWellcomeNotification() {
    if (appSettings.welcomeNotification.enabled) {
      setTimeout(function () {
        var data = {
          title: appSettings.welcomeNotification.title,
          message: appSettings.welcomeNotification.message,
          targetUrl: appSettings.welcomeNotification.link
        };
        showNotificationSimple(data);
      }, 500);
    }
  }

  function sendEvent(table, key, data) {
    var params = {
      "accountId": "90db7e2a-5839-53cd-605f-9d3ffc328e21",
      "key": key,
      "eventTable": table,
      "eventDetails": data
    };
    logInfo(params);
    var request = fetch('https://eventdev.dengage.com/api/web/event', {
      method: 'POST',
      // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      // no-cors, *cors, same-origin
      cache: 'no-cache',
      // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit',
      // include, *same-origin, omit
      headers: {
        'Content-Type': 'text/plain'
      },
      redirect: 'follow',
      // manual, *follow, error
      referrer: 'no-referrer',
      // no-referrer, *client
      body: JSON.stringify(params) // body data type must match "Content-Type" header

    });
  }

  var list = [' Daum/', ' DeuSu/', ' MuckRack/', ' Sysomos/', ' um-LN/', '!Susie', '/www\\.answerbus\\.com', '/www\\.unchaos\\.com', '/www\\.wmtips\\.com', '008/', '192\\.comAgent', '8484 Boston Project', '<http://www\\.sygol\\.com/>', '\\(privoxy/', '^AHC/', '^Amazon CloudFront', '^axios/', '^Disqus/', '^Friendica', '^Hatena', '^http_get', '^Jetty/', '^MeltwaterNews', '^MixnodeCache/', '^newspaper/', '^NextCloud-News/', '^ng/', '^NING', '^Nuzzel', '^okhttp', '^sentry/', '^Thinklab', '^Tiny Tiny RSS/', '^Traackr.com', '^Upflow/', '^Zabbix', 'Abonti', 'Aboundex', 'aboutthedomain', 'ac{1,2}oon', 'Ad Muncher', 'adbeat\\.com', 'AddThis', 'ADmantX', 'agada.de', 'agadine/', 'aggregator', 'aiderss/', 'airmail\\.etn', 'airmail\\net', 'aladin/', 'alexa site audit', 'allrati/', 'AltaVista Intranet', 'alyze\\.info', 'amzn_assoc', 'analyza', 'analyzer', 'Anemone', 'Anturis Agent', 'AnyEvent-HTTP', 'Apache-HttpClient', 'APIs-Google', 'Aport', 'AppEngine-Google', 'appie', 'AppInsights', 'Arachmo', 'arachnode\\.net', 'Arachnoidea', 'Arachnophilia/', 'araneo/', 'archive', 'archiving', 'asafaweb\\.com', 'asahina-antenna/', 'ask[-\\s]?jeeves', 'ask\\.24x\\.info', 'aspseek/', 'AspTear', 'assort/', 'asterias/', 'atomic_email_hunter/', 'atomz/', 'augurfind', 'augurnfind', 'auto', 'Avirt Gateway Server', 'Azureus', 'B-l-i-t-z-B-O-T', 'B_l_i_t_z_B_O_T', 'BackStreet Browser', 'BCKLINKS 1\\.0', 'beammachine/', 'beebwaredirectory/v0\\.01', 'bibnum\\.bnf', 'Big Brother', 'Big Fish', 'BigBozz/', 'bigbrother/', 'biglotron', 'bilbo/', 'BilderSauger', 'BingPreview', 'binlar', 'Blackboard Safeassign', 'BlackWidow', 'blaiz-bee/', 'bloglines/', 'Blogpulse', 'blogzice/', 'BMLAUNCHER', 'bobby/', 'boitho\\.com-dc', 'bookdog/x\\.x', 'Bookmark Buddy', 'Bookmark Renewal', 'bookmarkbase\\(2/;http://bookmarkbase\\.com\\)', 'BorderManager', 'bot', 'BrandVerity/', 'BravoBrian', 'Browsershots', 'bsdseek/', 'btwebclient/', 'BUbiNG', 'BullsEye', 'bumblebee@relevare\\.com', 'BunnySlippers', 'Buscaplus', 'butterfly', 'BW-C-2', 'bwh3_user_agent', 'calif/', 'capture', 'carleson/', 'CC Metadata Scaper', 'ccubee/x\\.x', 'CE-Preload', 'Ceramic Tile Installation Guide', 'Cerberian Drtrs', 'CERN-HTTPD', 'cg-eye interactive', 'changedetection', 'Charlotte', 'charon/', 'Chat Catcher/', 'check', 'China Local Browse', 'Chitika ContentHit', 'Chrome-Lighthouse', 'CJB\\.NET Proxy', 'classify', 'Claymont\\.com', 'cloakdetect/', 'CloudFlare-AlwaysOnline', 'clown', 'cnet\\.com', 'COAST WebMaster Pro/', 'CoBITSProbe', 'coccoc', 'cocoal\\.icio\\.us/', 'ColdFusion', 'collage\\.cgi/', 'collect', 'combine/', 'Commons-HttpClient', 'ContentSmartz', 'contenttabreceiver', 'control', 'convera', 'copperegg/revealuptime/fremontca', 'coralwebprx/', 'cosmos', 'Covac UPPS Cathan', 'Covario-IDS', 'crawl', 'crowsnest/', 'csci_b659/', 'Custo x\\.x \\(www\\.netwu\\.com\\)', 'cuwhois/', 'CyberPatrol', 'DA \\d', 'DAP x', 'DareBoost', 'datacha0s/', 'datafountains/dmoz', 'Datanyze', 'dataprovider', 'DAUMOA-video', 'dbdig\\(http://www\\.prairielandconsulting\\.com\\)', 'DBrowse \\d', 'dc-sakura/x\\.xx', 'DDD', 'deep[-\\s]?link', 'deepak-usc/isi', 'delegate/', 'DepSpid', 'detector', 'developers\\.google\\.com\\/\\+\\/web\\/snippet\\/', 'diagem/', 'diamond/x\\.0', 'Digg', 'DigOut4U', 'DISCo Pump x\\.x', 'dlman', 'dlvr\\.it/', 'DnloadMage', 'docomo/', 'DomainAppender', 'Download Demon', 'Download Druid', 'Download Express', 'Download Master', 'Download Ninja', 'Download Wonder', 'download(?:s|er)', 'Download\\.exe', 'DownloadDirect', 'DreamPassport', 'drupact', 'Drupal', 'DSurf15', 'DTAAgent', 'DTS Agent', 'Dual Proxy', 'e-sense', 'EARTHCOM', 'easydl/', 'EBrowse \\d', 'ecairn\\.com/grabber', 'echo!/', 'efp@gmx\\.net', 'egothor/', 'ejupiter\\.com', 'EldoS TimelyWeb/', 'ElectricMonk', 'EmailWolf', 'Embedly', 'envolk', 'ESurf15', 'evaliant', 'eventax/', 'Evliya Celebi', 'exactseek\\.com', 'Exalead', 'Expired Domain Sleuth', 'Exploratodo/', 'extract', 'EyeCatcher', 'eyes', 'ezooms', 'facebookexternalhit', 'faedit/', 'FairAd Client', 'fantom', 'FastBug', 'Faveeo/', 'FavIconizer', 'FavOrg', 'FDM \\d', 'feed', 'feeltiptop\\.com', 'fetch', 'fileboost\\.net/', 'filtrbox/', 'FindAnISP\\.com', 'finder', 'findlink', 'findthatfile', 'firefly/', 'FlashGet', 'FLATARTS_FAVICO', 'flexum/', 'FlipboardProxy/', 'FlipboardRSS/', 'fluffy', 'flunky', 'focusedsampler/', 'FollowSite', 'forensiq\\.com', 'francis/', 'freshdownload/x\\.xx', 'FSurf', 'FuseBulb\\.Com', 'g00g1e\\.net', 'galaxy\\.com', 'gather', 'gazz/x\\.x', 'geek-tools\\.org', 'genieknows', 'Genieo', 'getright(pro)?/', 'getter', 'ghostroutehunter/', 'gigabaz/', 'GigablastOpenSource', 'go!zilla', 'go-ahead-got-it/', 'Go-http-client', 'GoBeez', 'goblin/', 'GoForIt\\.com', 'Goldfire Server', 'gonzo[1-2]', 'gooblog/', 'goofer/', 'Google Favicon', 'Google Page Speed Insights', 'Google Web Preview', 'Google Wireless Transcoder', 'Google-PhysicalWeb', 'Google-Site-Verification', 'Google-Structured-Data-Testing-Tool', 'google-xrawler', 'GoogleImageProxy', 'gopher', 'gossamer-threads\\.com', 'grapefx/', 'gromit/', 'GroupHigh/', 'grub-client', 'GTmetrix', 'gulliver/', 'H010818', 'hack', 'harvest', 'haste/', 'HeadlessChrome/', 'helix/', 'heritrix', 'HiDownload', 'hippias/', 'HitList', 'Holmes', 'hotmail.com', 'hound', 'htdig', 'html2', 'http-header-abfrage/', 'http://anonymouse\\.org/', 'http://ask\\.24x\\.info/', 'http://www\\.ip2location\\.com', 'http://www\\.monogol\\.de', 'http://www\\.sygol\\.com', 'http://www\\.timelyweb\\.com/', 'http::lite/', 'http_client', 'HTTPGet', 'HTTPResume', 'httpunit', 'httrack', 'HubSpot Marketing Grader', 'hyperestraier/', 'HyperixScoop', 'ichiro', 'ics \\d', 'IDA', 'ideare - SignSite', 'idwhois\\.info', 'IEFav172Free', 'iframely/', 'IlTrovatore-Setaccio', 'imageengine/', 'images', 'imagewalker/', 'InAGist', 'incywincy\\(http://www\\.look\\.com\\)', 'index', 'info@pubblisito\\.com', 'infofly/', 'infolink/', 'infomine/', 'InfoSeek Sidewinder/', 'InfoWizards Reciprocal Link System PRO', 'inkpeek\\.com', 'Insitornaut', 'inspectorwww/', 'InstallShield DigitalWizard', 'integrity/', 'integromedb', 'intelix/', 'intelliseek\\.com', 'Internet Ninja', 'internetlinkagent/', 'InterseekWeb', 'IODC', 'IOI', 'ips-agent', 'iqdb/', 'iria/', 'irvine/', 'isitup\\.org', 'isurf', 'ivia/', 'iwagent/', 'j-phone/', 'Jack', 'java/', 'JBH Agent 2\\.0', 'JemmaTheTourist', 'JetCar', 'jigsaw/', 'jorgee', 'Journster', 'kalooga/kalooga-4\\.0-dev-datahouse', 'Kapere', 'kasparek@naparek\\.cz', 'KDDI-SN22', 'ke_1\\.0/', 'Kevin', 'KimonoLabs', 'kit-fireball/', 'KnowItAll', 'knowledge\\.com/', 'Kontiki Client', 'kulturarw3/', 'kummhttp/', 'L\\.webis', 'labrador/', 'Lachesis', 'Larbin', 'leech', 'leia/', 'LibertyW', 'library', 'libweb/clshttp', 'lightningdownload/', 'Lincoln State Web Browser', 'Link Commander', 'Link Valet', 'linkalarm/', 'linkdex', 'LinkExaminer', 'Linkguard', 'linkman', 'LinkPimpin', 'LinkProver', 'Links2Go', 'linksonar/', 'LinkStash', 'LinkTiger', 'LinkWalker', 'Lipperhey Link Explorer', 'Lipperhey SEO Service', 'Lipperhey Site Explorer', 'Lipperhey-Kaus-Australis/', 'loader', 'loadimpactrload/', 'locate', 'locator', 'Look\\.com', 'Lovel', 'ltx71', 'lwp-', 'lwp::', 'mabontland', 'mack', 'magicwml/', 'mail\\.ru/', 'mammoth/', 'MantraAgent', 'MapoftheInternet\\.com', 'Marketwave Hit List', 'Martini', 'Marvin', 'masagool/', 'MasterSeek', 'Mastodon/', 'Mata Hari/', 'mediaget', 'Mediapartners-Google', 'MegaSheep', 'Megite', 'Mercator', 'metainspector/', 'metaspinner/', 'metatagsdir/', 'MetaURI', 'MicroBaz', 'Microsoft_Internet_Explorer_5', 'miixpc/', 'Mindjet MindManager', 'Miniflux/', 'miniflux\\.net', 'Missouri College Browse', 'Mister Pix', 'Mizzu Labs', 'Mo College', 'moget/x\\.x', 'mogimogi', 'moiNAG', 'monitor', 'monkeyagent', 'MonTools\\.com', 'Morning Paper', 'Mrcgiguy', 'MSIE or Firefox mutant', 'msnptc/', 'msproxy/', 'Mulder', 'multiBlocker browser', 'multitext/', 'MuscatFerret', 'MusicWalker2', 'MVAClient', 'naofavicon4ie/', 'naparek\\.cz', 'netants/', 'Netcraft Web Server Survey', 'NetcraftSurveyAgent/', 'netlookout/', 'netluchs/', 'NetMechanic', 'netpumper/x\\.xx', 'NetSprint', 'netwu\\.com', 'neutrinoapi/', 'NewsGator', 'newt', 'nico/', 'Nmap Scripting Engine', 'NORAD National Defence Network', 'Norton-Safeweb', 'Notifixious', 'noyona_0_1', 'nsauditor/', 'nutch', 'Nymesis', 'ocelli/', 'Octopus', 'Octora Beta', 'ODP links', 'oegp', 'OliverPerry', 'omgili', 'Onet\\.pl', 'Oracle Application', 'Orbiter', 'OSSProxy', 'outbrain', 'ow\\.ly', 'ownCloud News/', 'ozelot/', 'Page Valet/', 'page2rss', 'Pagebull', 'PagmIEDownload', 'Panopta v', 'panscient', 'parasite/', 'parse', 'pavuk/', 'PayPal IPN', 'PBrowse', 'Pcore-HTTP', 'pd02_1', 'Peew', 'perl', 'Perman Surfer', 'PEval', 'phantom', 'photon/', 'php/\\d', 'Pingdom', 'Pingoscope', 'pingspot/', 'pinterest\\.com', 'Pita', 'Pizilla', 'Ploetz \\+ Zeller', 'Plukkie', 'pockey-gethtml/', 'pockey/x\\.x\\.x', 'Pockey7', 'Pogodak', 'Poirot', 'Pompos', 'popdexter/', 'Port Huron Labs', 'PostFavorites', 'PostPost', 'postrank', 'Powermarks', 'PR-CY.RU', 'pricepi\\.com', 'prlog\\.ru', 'pro-sitemaps\\.com', 'program', 'Project XP5', 'protopage/', 'proximic', 'PSurf15a', 'psycheclone', 'puf/', 'PureSight', 'PuxaRapido', 'python', 'Qango\\.com Web Directory', 'QuepasaCreep', 'Qwantify', 'QXW03018', 'rabaz', 'Radian6', 'RankSonicSiteAuditor/', 'rating', 'readability/', 'reader', 'realdownload/', 'reaper', 'ReGet', 'responsecodetest/', 'retrieve', 'rico/', 'Riddler', 'Rival IQ', 'Rivva', 'RMA/1\\.0', 'RoboPal', 'Robosourcer', 'robozilla/', 'rotondo/', 'rpt-httpclient/', 'RSurf15a', 'samualt9', 'saucenao/', 'SBIder', 'scan', 'scooter', 'ScoutAbout', 'scoutant/', 'ScoutJet', 'scoutmaster', 'scrape', 'Scrapy', 'Scrubby', 'search', 'Seeker\\.lookseek\\.com', 'seer', 'semaforo\\.net', 'semager/', 'semanticdiscovery', 'seo-nastroj\\.cz', 'SEOCentro', 'SEOstats', 'Seznam screenshot-generator', 'Shagseeker', 'ShopWiki', 'Siigle Orumcex', 'SimplyFast\\.info', 'Simpy', 'siphon', 'Site Server', 'Site24x7', 'SiteBar', 'SiteCondor', 'siteexplorer\\.info', 'Siteimprove', 'SiteRecon', 'SiteSnagger', 'sitesucker/', 'SiteUptime\\.com', 'SiteXpert', 'sitexy\\.com', 'skampy/', 'skimpy/', 'SkypeUriPreview', 'skywalker/', 'slarp/', 'slider\\.com', 'slurp', 'smartdownload/', 'smartwit\\.com', 'Snacktory', 'Snappy', 'sniff', 'sogou', 'sohu agent', 'somewhere', 'speeddownload/', 'speedy', 'speng', 'Sphere Scout', 'Sphider', 'spider', 'spinne/', 'spy', 'squidclam', 'Squider', 'Sqworm', 'SSurf15a', 'StackRambler', 'stamina/', 'StatusCake', 'suchbaer\\.de', 'summify', 'SuperCleaner', 'SurferF3', 'SurfMaster', 'suzuran', 'sweep', 'synapse', 'syncit/x\\.x', 'szukacz/', 'T-H-U-N-D-E-R-S-T-O-N-E', 'tags2dir\\.com/', 'Tagword', 'Talkro Web-Shot', 'targetblaster\\.com/', 'TargetSeek', 'Teleport Pro', 'teoma', 'Teradex Mapper', 'Theophrastus', 'thumb', 'TinEye', 'tkensaku/x\\.x\\(http://www\\.tkensaku\\.com/q\\.html\\)', 'tracker', 'truwoGPS', 'TSurf15a', 'tuezilla', 'tumblr/', 'Twingly Recon', 'Twotrees Reactive Filter', 'TygoProwler', 'Ultraseek', 'Under the Rainbow', 'unknownght\\.com', 'UofTDB_experiment', 'updated', 'url', 'user-agent', 'utility', 'utorrent/', 'Vagabondo', 'vakes/', 'vb wininet', 'venus/fedoraplanet', 'verifier', 'verify', 'Version: xxxx Type:xx', 'versus', 'verzamelgids/', 'viking', 'vkshare', 'voltron', 'vonna', 'Vortex', 'voyager-hc/', 'VYU2', 'W3C-mobileOK/', 'w3c-webcon/', 'W3C_Unicorn/', 'w3dt\\.net', 'Wappalyzer', 'warez', 'Watchfire WebXM', 'wavefire/', 'Waypath Scout', 'wbsrch\\.com', 'Web Snooper', 'web-bekannt', 'webbandit/', 'webbug/', 'Webclipping\\.com', 'webcollage', 'WebCompass', 'webcookies', 'webcorp/', 'webcraft', 'WebDataStats/', 'Webglimpse', 'webgobbler/', 'webinator', 'weblight/', 'Weblog Attitude Diffusion', 'webmastercoffee/', 'webminer/x\\.x', 'webmon ', 'WebPix', 'Website Explorer', 'Websnapr/', 'Websquash\\.com', 'webstat/', 'Webster v0\\.', 'webstripper/', 'webtrafficexpress/x\\.0', 'webtrends/', 'WebVac', 'webval/', 'Webverzeichnis\\.de', 'wf84', 'WFARC', 'wget', 'whatsapp', 'whatsmyip\\.org', 'whatsup/x\\.x', 'whatuseek_winona/', 'Whizbang', 'whoami', 'whoiam', 'Wildsoft Surfer', 'WinGet', 'WinHTTP', 'wish-project', 'WomlpeFactory', 'WordPress\\.com mShots', 'WorldLight', 'worqmada/', 'worth', 'wotbox', 'WoW Lemmings Kathune', 'WSN Links', 'wusage/x\\.0@boutell\\.com', 'wwlib/linux', 'www-mechanize/', 'www\\.ackerm\\.com', 'www\\.alertra\\.com', 'www\\.arianna\\.it', 'www\\.ba\\.be', 'www\\.de\\.com', 'www\\.evri\\.com/evrinid', 'www\\.gozilla\\.com', 'www\\.idealobserver\\.com', 'www\\.iltrovatore\\.it', 'www\\.iskanie\\.com', 'www\\.kosmix\\.com', 'www\\.megaproxy\\.com', 'www\\.moreover\\.com', 'www\\.mowser\\.com', 'www\\.nearsoftware\\.com', 'www\\.ssllabs\\.com', 'wwwc/', 'wwwoffle/', 'wwwster/', 'wxDownload Fast', 'Xenu Link Sleuth', "Xenu's Link Sleuth", 'xirq/', 'XML Sitemaps Generator', 'xrl/', 'Xylix', 'Y!J-ASR', 'y!j-srd/', 'y!oasis/test', 'yacy', 'yahoo', 'YandeG', 'yandex', 'yanga', 'yarienavoir\\.net/', 'yeti', 'Yoleo', 'Yoono', 'youtube-dl', 'Zao', 'Zearchit', 'zedzo\\.digest/', 'zeus', 'zgrab', 'Zippy', 'ZnajdzFoto/Image', 'ZyBorg', 'googlebot', 'Googlebot-Mobile', 'Googlebot-Image', 'bingbot', 'java', 'curl', 'Python-urllib', 'libwww', 'phpcrawl', 'msnbot', 'jyxobot', 'FAST-WebCrawler', 'FAST Enterprise Crawler', 'seekbot', 'gigablast', 'exabot', 'ngbot', 'ia_archiver', 'GingerCrawler', 'webcrawler', 'grub.org', 'UsineNouvelleCrawler', 'antibot', 'netresearchserver', 'bibnum.bnf', 'msrbot', 'yacybot', 'AISearchBot', 'tagoobot', 'MJ12bot', 'dotbot', 'woriobot', 'buzzbot', 'mlbot', 'yandexbot', 'purebot', 'Linguee Bot', 'Voyager', 'voilabot', 'baiduspider', 'citeseerxbot', 'spbot', 'twengabot', 'turnitinbot', 'scribdbot', 'sitebot', 'Adidxbot', 'blekkobot', 'dotbot', 'Mail.RU_Bot', 'discobot', 'europarchive.org', 'NerdByNature.Bot', 'sistrix crawler', 'ahrefsbot', 'domaincrawler', 'wbsearchbot', 'ccbot', 'edisterbot', 'seznambot', 'ec2linkfinder', 'gslfbot', 'aihitbot', 'intelium_bot', 'RetrevoPageAnalyzer', 'lb-spider', 'lssbot', 'careerbot', 'wocbot', 'DuckDuckBot', 'lssrocketcrawler', 'webcompanycrawler', 'acoonbot', 'openindexspider', 'gnam gnam spider', 'web-archive-net.com.bot', 'backlinkcrawler', 'content crawler spider', 'toplistbot', 'seokicks-robot', 'it2media-domain-crawler', 'ip-web-crawler.com', 'siteexplorer.info', 'elisabot', 'blexbot', 'arabot', 'WeSEE:Search', 'niki-bot', 'CrystalSemanticsBot', 'rogerbot', '360Spider', 'psbot', 'InterfaxScanBot', 'g00g1e.net', 'GrapeshotCrawler', 'urlappendbot', 'brainobot', 'fr-crawler', 'SimpleCrawler', 'Livelapbot', 'Twitterbot', 'cXensebot', 'smtbot', 'bnf.fr_bot', 'A6-Indexer', 'Facebot', 'Twitterbot', 'OrangeBot', 'memorybot', 'AdvBot', 'MegaIndex', 'SemanticScholarBot', 'nerdybot', 'xovibot', 'archive.org_bot', 'Applebot', 'TweetmemeBot', 'crawler4j', 'findxbot', 'SemrushBot', 'yoozBot', 'lipperhey', 'Domain Re-Animator Bot'];

  try {
    // Address: Cubot browser
    // Risk: Uses lookbehind assertion
    new RegExp('(?<! cu)bot').test('dangerbot');
    list.splice(list.lastIndexOf('bot'), 1);
    list.push('(?<! cu)bot');
  } catch (error) {// ignore errors
  }

  var regex = new RegExp('(' + list.join('|') + ')', 'i');
  /**
   * Check if string matches known crawler patterns
   * @param  {string} userAgent
   * @return {boolean}
   */

  function isbot (userAgent) {
    return regex.test(userAgent);
  }

  /**
   * https://github.com/jLynx/PrivateWindowCheck
   */
  function chrome76Detection() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      return navigator.storage.estimate().then(function (_ref) {
        var usage = _ref.usage,
            quota = _ref.quota;
        if (quota < 120000000) return true;else return false;
      });
    } else {
      return Promise.resolve(false);
    }
  }

  function isNewChrome() {
    var pieces = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);

    if (pieces == null || pieces.length != 5) {
      return undefined;
    }

    var major = pieces.map(function (piece) {
      return parseInt(piece, 10);
    })[1];
    if (major >= 76) return true;
    return false;
  }

  var PrivateWindow = new Promise(function (resolve, reject) {
    try {
      var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && navigator.userAgent.indexOf('CriOS') == -1 && navigator.userAgent.indexOf('FxiOS') == -1;

      if (isSafari) {
        //Safari
        var e = false;

        if (window.safariIncognito) {
          e = true;
        } else {
          try {
            window.openDatabase(null, null, null, null);
            window.localStorage.setItem('test', 1);
            resolve(false);
          } catch (t) {
            e = true;
            resolve(true);
          }

          void !e && (e = !1, window.localStorage.removeItem('test'));
        }
      } else if (navigator.userAgent.includes('Firefox')) {
        //Firefox
        var db = indexedDB.open('test');

        db.onerror = function () {
          resolve(true);
        };

        db.onsuccess = function () {
          resolve(false);
        };
      } else if (navigator.userAgent.includes('Edge') || navigator.userAgent.includes('Trident') || navigator.userAgent.includes('msie')) {
        //Edge or IE
        if (!window.indexedDB && (window.PointerEvent || window.MSPointerEvent)) resolve(true);
        resolve(false);
      } else {
        //Normally ORP or Chrome
        //Other
        if (isNewChrome()) resolve(chrome76Detection());
        var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
        if (!fs) resolve(null);else {
          fs(window.TEMPORARY, 100, function (fs) {
            resolve(false);
          }, function (err) {
            resolve(true);
          });
        }
      }
    } catch (err) {
      //TODO: error loglama yapılacak
      console.log(err);
      resolve(null);
    }
  });
  function isPrivateWindow () {
    return PrivateWindow;
  }

  var publicMethods = {
    initialize: function initialize(callback) {
      if (pushClient.detected() && 'true' == 'true') {
        window.addEventListener('load', function () {
          start(callback);
        });
      } else {
        if (callback) {
          callback();
        }
      }
    },

    /**************** Web Push ********************/
    showNativePrompt: function showNativePrompt(callback) {
      showNativePrompt$1().then(function (result) {
        if (callback) {
          callback(result);
        }
      });
    },
    showCustomPrompt: function showCustomPrompt(callback) {
      showCustomPrompt$1().then(function (result) {
        if (callback) {
          callback(result);
        }
      });
    },
    getNotificationPermission: function getNotificationPermission(callback) {

      if (callback) {
        callback(pushClient.getPermission());
      }
    },
    getToken: function getToken$1(callback) {

      if (callback) {
        callback(getToken());
      }
    },
    isPushNotificationsSupported: function isPushNotificationsSupported(callback) {

      if (callback) {
        callback(pushClient.detected());
      }
    },

    /**************** Event Collection ********************/
    getDeviceId: function getDeviceId$1(callback) {
      getDeviceId().then(function (deviceId) {
        if (callback) {
          callback(deviceId);
        }
      });
    },
    provideUserConsent: function provideUserConsent() {//TODO
    },
    sendDeviceEvent: function sendDeviceEvent(table, data, callback) {
      getDeviceId().then(function (deviceId) {
        sendEvent(table, deviceId, data);

        if (callback) {
          //TODO: burası request döndükten sonra yapılabilir
          callback();
        }
      });
    },
    sendCustomEvent: function sendCustomEvent(table, key, data, callback) {
      sendEvent(table, key, data);

      if (callback) {
        //TODO: burası request döndükten sonra yapılabilir
        callback();
      }
    },
    setContactKey: function setContactKey$1(val, callback) {
      setContactKey(val);

      if (callback) {
        callback();
      }
    },
    getContactKey: function getContactKey$1(callback) {
      if (callback) {
        callback(getContactKey());
      }
    }
  }; //TODO: event handler'lar yapılacak

  if ('Promise' in window && 'fetch' in window) {
    isBotOrPrivateWindow().then(function (botOrPrivate) {
      if (botOrPrivate !== true) {
        var q = window.dengage.q || [];

        window.dengage = function () {
          publicMethods[arguments[0]].apply(this, Array.prototype.slice.call(arguments, 1));
        };

        q.forEach(function (command) {
          //TODO asenkron olarak bekleyerek çalışmalı
          window.dengage.apply(this, command);
        });
      }
    });
  }

  function isBotOrPrivateWindow() {
    if (isbot(navigator.userAgent)) {
      return Promise.resolve(true);
    } else {
      return isPrivateWindow();
    }
  }
  /*
  (function(p, u, s, h, x) {
    p.dengage =
      p.dengage ||
      function() {
        (p.dengage.q = p.dengage.q || []).push(arguments);
      };
    h = u.getElementsByTagName("head")[0];
    x = u.createElement("script");
    x.async = 1;
    x.src = s;
    h.appendChild(x);
  })(window, document, "");
  */

}());
