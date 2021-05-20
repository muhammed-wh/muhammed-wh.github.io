(function() {
    'use strict';
    function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function(obj) {
                return typeof obj
            }
        } else {
            _typeof = function(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }
        }
        return _typeof(obj)
    }
    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            })
        } else {
            obj[key] = value
        }
        return obj
    }
    function _unsupportedIterableToArray(o, minLen) {
        if (!o)
            return;
        if (typeof o === "string")
            return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor)
            n = o.constructor.name;
        if (n === "Map" || n === "Set")
            return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
            return _arrayLikeToArray(o, minLen)
    }
    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
            len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++)
            arr2[i] = arr[i];
        return arr2
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
        var it;
        if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
            if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                if (it)
                    o = it;
                var i = 0;
                var F = function() {};
                return {
                    s: F,
                    n: function() {
                        if (i >= o.length)
                            return {
                                done: true
                            };
                        return {
                            done: false,
                            value: o[i++]
                        }
                    },
                    e: function(e) {
                        throw e
                    },
                    f: F
                }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var normalCompletion = true, didErr = false, err;
        return {
            s: function() {
                it = o[Symbol.iterator]()
            },
            n: function() {
                var step = it.next();
                normalCompletion = step.done;
                return step
            },
            e: function(e) {
                didErr = true;
                err = e
            },
            f: function() {
                try {
                    if (!normalCompletion && it.return != null)
                        it.return()
                } finally {
                    if (didErr)
                        throw err
                }
            }
        }
    }
    function deepCopy(input) {
        return JSON.parse(JSON.stringify(input))
    }
    function objectAssign(target, varArgs) {
        if (target === null || target === undefined) {
            throw new TypeError('Cannot convert undefined or null to object')
        }
        var to = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];
            if (nextSource !== null && nextSource !== undefined) {
                for (var nextKey in nextSource) {
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey]
                    }
                }
            }
        }
        return to
    }
    function shadeHexColor(color, percent) {
        var f = parseInt(color.slice(1), 16)
          , t = percent < 0 ? 0 : 255
          , p = percent < 0 ? percent * -1 : percent
          , R = f >> 16
          , G = f >> 8 & 255
          , B = f & 255;
        return "#" + (16777216 + (Math.round((t - R) * p) + R) * 65536 + (Math.round((t - G) * p) + G) * 256 + (Math.round((t - B) * p) + B)).toString(16).slice(1)
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
            return '"Courier New", Courier, monospace'
        }
        return 'inherit'
    }
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (function(c) {
            var r = Math.random() * 16 | 0
              , v = c == 'x' ? r : r & 3 | 8;
            return v.toString(16).toLowerCase()
        }
        ))
    }
    var _log_level = '';
    function setLogLevel(level) {
        if (level == 'info' || level == 'error' || level == 'none') {
            localStorage.setItem('dengage_log_level', level);
            _log_level = level
        } else {
            console.log('dengage: wrong log level')
        }
    }
    function getLogLevel() {
        if (!_log_level) {
            _log_level = localStorage.getItem('dengage_log_level')
        }
        return _log_level
    }
    function logError() {
        if (getLogLevel() != 'none') {
            var _console;
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key]
            }
            (_console = console).error.apply(_console, ['dengage: '].concat(args))
        }
    }
    function logInfo() {
        if (getLogLevel() == 'info') {
            var _console2;
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2]
            }
            (_console2 = console).log.apply(_console2, ['dengage: '].concat(args))
        }
    }
    function errorLoggerResolved(errorText, resolveValue) {
        return function(input) {
            logError(errorText, input);
            return resolveValue
        }
    }
    function errorLoggerRejected(errorText, rejectValue) {
        return function(input) {
            logError(errorText, input);
            return Promise.reject(rejectValue)
        }
    }
    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i])
        }
        return window.btoa(binary)
    }
    function base64Normalize(input) {
        return input.replace(/\-/g, '+').replace(/\_/g, '/').replace(/^\=+|\=+$/g, '')
    }
    function getQueryStringParameter(name, url) {
        if (!url)
            url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
          , results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }
    function isIsoDate(str) {
        if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str))
            return false;
        var d = new Date(str);
        return d.toISOString() === str
    }
    function isBlinkBrowser() {
        var isOpera = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
        return (isChrome || isOpera) && !!window.CSS
    }
    function isFirefoxBrowser() {
        return typeof InstallTrigger !== 'undefined'
    }
    function toInt$1(input) {
        if (typeof input == 'number') {
            return input
        }
        if (typeof input == 'string') {
            return input === '' ? 0 : parseInt(input)
        }
        return 0
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
            cancelBtnText: s.cancelBtnText || "No Thanks",
            fixed: s.fixed || false
        };
        var details = {};
        if (s.advancedOptions) {
            details = fixMissingSlideDetails(s.details, mainColor)
        } else {
            details = getDefaultSlideDetails(mainColor)
        }
        return "\n<div class=\"dn-slide ".concat(slide.showIcon ? '' : 'dn-slide--noLogo', " ").concat(slide.title ? '' : 'dn-slide--noTitle', " ").concat(theme, "\">\n  <div class=\"dn-slide-logo\"><img src=\"").concat(appSettings.defaultIconUrl, "\"></div>\n  <div class=\"dn-slide-body\">\n      <h3 class=\"dn-slide-title\">").concat(slide.title, "</h3>\n      <p class=\"dn-slide-message\">").concat(slide.text, "</p>\n      <div class=\"dn-slide-buttons horizontal\">\n          <button class=\"dn-slide-deny-btn\">").concat(slide.cancelBtnText, "</button>\n          <button class=\"dn-slide-accept-btn\">").concat(slide.acceptBtnText, "</button>\n      </div>\n  </div>\n  <div class=\"dn-slide-buttons vertical\">\n      <button class=\"dn-slide-accept-btn\">").concat(slide.acceptBtnText, "</button>\n      <button class=\"dn-slide-deny-btn\">").concat(slide.cancelBtnText, "</button>\n  </div>\n</div>\n<style>\n\n  #dengage-push-perm-slide {\n    position: ").concat(slide.fixed ? 'fixed' : 'absolute', " !important;\n    width: 520px !important;\n    z-index: 100000000 !important;\n  }\n  #dengage-push-perm-slide.dn-top {\n    top: -260px !important;\n  }\n  #dengage-push-perm-slide.dn-bottom {\n    bottom: -260px !important;\n  }\n  #dengage-push-perm-slide.dn-top.dn-opened {\n    top: 0 !important;\n  }\n  #dengage-push-perm-slide.dn-bottom.dn-opened {\n    bottom: 0 !important;\n  }\n  #dengage-push-perm-slide.dn-center {\n    left: 50% !important;\n    margin-left: -260px !important;\n  }\n  #dengage-push-perm-slide.dn-right {\n    right: 0 !important;\n  }\n  #dengage-push-perm-slide.dn-left {\n    left: 0 !important;\n  }\n  .dn-slide {\n      box-shadow: ").concat(details.shadow ? '0 3px 10px 0 rgba(0, 0, 0, 0.43)' : 'none', " !important;\n      background: ").concat(details.backgroundColor, " !important;\n      border: ").concat(details.border, "px solid ").concat(details.borderColor, " !important;\n      border-radius: ").concat(details.borderRadius, "px !important;\n      display: flex !important;\n      overflow: auto !important;\n      width: 520px !important;\n      max-width: 520px !important;\n      height: auto !important;\n  }\n\n  .dn-slide-logo {\n      width: 30% !important;\n      padding: 15px !important;\n      box-sizing: border-box !important;\n      display: flex !important;\n      justify-content: center !important;\n      align-items: center !important;\n  }\n  .RIGHT_BTNS .dn-slide-logo {\n      width: 18% !important;\n      padding: 8px !important;\n  }\n  .dn-slide-logo img {\n      width: 100% !important;\n  }\n  .dn-slide--noLogo .dn-slide-logo {\n      display: none !important;\n  }\n\n  .dn-slide-body {\n      width: 70% !important;\n      padding: 15px !important;\n      box-sizing: border-box !important;\n      line-height: 1.4 !important;\n      vertical-align: middle !important;\n      display: flex !important;\n      flex-direction: column !important;\n  }\n  .RIGHT_BTNS .dn-slide-body {\n      width: 58% !important;\n      padding: 8px !important;\n  }\n  .dn-slide--noLogo .dn-slide-body {\n      width: 100% !important;\n  }\n\n  .dn-slide-title {\n      background: none !important;\n      color: ").concat(details.titleSyle.textColor, " !important;\n      font-family: ").concat(getFontFamily(details.fontFamily), " !important;\n      font-size: ").concat(details.titleSyle.fontSize, "px !important;\n      font-weight: ").concat(details.titleSyle.fontWeight, " !important;\n      margin: 0 !important;\n      padding: 0 !important;\n  }\n  .dn-slide--noTitle .dn-slide-title {\n      display: none !important;\n  }\n\n  .dn-slide-message {\n      background: none !important;\n      color: ").concat(details.textSyle.textColor, " !important;\n      font-family: ").concat(getFontFamily(details.fontFamily), " !important;\n      font-size: ").concat(details.textSyle.fontSize, "px !important;\n      font-weight: ").concat(details.textSyle.fontWeight, " !important;\n      padding: 0 !important;\n      margin: 12px 0 !important;\n      flex: 1 !important;\n  }\n  .dn-slide--noTitle .dn-slide-message {\n      margin: 5px 0 20px 10px !important;\n  }\n\n  .dn-slide-buttons {\n      display: flex !important;\n  }\n  .dn-slide-buttons.vertical {\n      flex-direction: column !important;\n      justify-content: center !important;\n      align-items: center !important;\n      width: 24% !important;\n      padding: 8px !important;\n  }\n  .dn-slide-buttons.horizontal {\n      justify-content: flex-end !important;\n      align-items: center !important;\n  }\n  .BOTTOM_BTNS .vertical {\n      display: none !important;\n  }\n  .RIGHT_BTNS .horizontal {\n      display: none !important;\n  }\n  .dn-slide-buttons button {\n      padding: 8px 15px !important;\n      margin: 0 !important;\n      text-align: center !important;\n      cursor: pointer !important;\n  }\n  .dn-slide-buttons.horizontal button {\n      margin-left: 15px !important;\n  }\n  .dn-slide-buttons.vertical button {\n      width: 100% !important;\n  }\n  .dn-slide-buttons.vertical button:first-child {\n      margin-bottom: 5px !important;\n  }\n\n  .dn-slide-buttons .dn-slide-accept-btn {\n      background-color: ").concat(details.acceptBtnStyle.backgroundColor, " !important;\n      color: ").concat(details.acceptBtnStyle.textColor, " !important;\n      font-family: ").concat(getFontFamily(details.fontFamily), " !important;\n      font-size: ").concat(details.acceptBtnStyle.fontSize, "px !important;\n      font-weight: ").concat(details.acceptBtnStyle.fontWeight, " !important;\n      border: ").concat(details.acceptBtnStyle.border, "px solid ").concat(details.acceptBtnStyle.borderColor, " !important;\n      border-radius: ").concat(details.acceptBtnStyle.borderRadius, "px !important;\n      box-shadow: ").concat(details.acceptBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4)' : 'none', " !important;\n  }\n  .dn-slide-buttons .dn-slide-accept-btn:hover {\n      background-color: ").concat(details.acceptBtnStyle.hoverBackgroundColor, " !important;\n      color: ").concat(details.acceptBtnStyle.hoverTextColor, " !important;\n  }\n\n  .dn-slide-buttons .dn-slide-deny-btn {\n      background-color: ").concat(details.cancelBtnStyle.backgroundColor, " !important;\n      color: ").concat(details.cancelBtnStyle.textColor, " !important;\n      font-family: ").concat(getFontFamily(details.fontFamily), " !important;\n      font-size: ").concat(details.cancelBtnStyle.fontSize, "px !important;\n      font-weight: ").concat(details.cancelBtnStyle.fontWeight, " !important;\n      border: ").concat(details.cancelBtnStyle.border, "px solid ").concat(details.cancelBtnStyle.borderColor, " !important;\n      border-radius: ").concat(details.cancelBtnStyle.borderRadius, "px !important;\n      box-shadow: ").concat(details.cancelBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4)' : 'none', " !important;\n  }\n  .dn-slide-buttons .dn-slide-deny-btn:hover {\n      background-color: ").concat(details.cancelBtnStyle.hoverBackgroundColor, " !important;\n      color: ").concat(details.cancelBtnStyle.hoverTextColor, " !important;\n  }\n\n  @media only screen and (max-width: 500px) {\n      #dengage-push-perm-slide {\n        width: 100% !important;\n        margin-left: 0 !important;\n        left:0 !important;\n      }\n      #dengage-push-perm-slide.dn-center {\n        left: 0 !important;\n        margin-left: 0 !important;\n      }\n      #dengage-push-perm-slide.dn-right {\n        left: 0 !important;\n        right: 0 !important;\n        margin-left: 0 !important;\n      }\n\n      .dn-slide {\n          width: 100% !important;\n          max-width: 100% !important;\n      }\n\n      /*.dn-slide-title {\n          font-size: 12px !important;\n      }\n\n      .dn-slide-message {\n          font-size: 11px !important;\n      }\n\n      .dn-slide-buttons button {\n          padding: 5px 10px !important;\n          margin-left: 15px !important;\n          font-size: 12px !important;\n      }*/\n  }\n</style>\n    ")
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
                hoverBackgroundColor: shadeHexColor(mainColor, -.2),
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
                hoverTextColor: shadeHexColor(mainColor, -.2),
                fontSize: "16",
                fontWeight: "normal",
                border: 0,
                borderColor: mainColor,
                borderRadius: 3,
                shadow: false
            }
        }
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
                hoverBackgroundColor: acceptBtnStyle.hoverBackgroundColor || shadeHexColor(mainColor, -.2),
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
                hoverTextColor: cancelBtnStyle.hoverTextColor || shadeHexColor(mainColor, -.2),
                fontSize: cancelBtnStyle.fontSize || "16",
                fontWeight: cancelBtnStyle.fontWeight || "normal",
                border: cancelBtnStyle.border || 0,
                borderColor: cancelBtnStyle.borderColor || mainColor,
                borderRadius: cancelBtnStyle.borderRadius || 3,
                shadow: cancelBtnStyle.shadow == null ? false : cancelBtnStyle.shadow
            }
        }
    }
    function showSlidePromt(appSettings, isPreview) {
        var container = document.createElement("div");
        var className = "dengage-push-perm-slide";
        container.id = "dengage-push-perm-slide";
        if (appSettings.slideSettings.location.indexOf('TOP') != -1) {
            className += " dn-top"
        }
        if (appSettings.slideSettings.location.indexOf('BOTTOM') != -1) {
            className += " dn-bottom"
        }
        if (appSettings.slideSettings.location.indexOf('CENTER') != -1) {
            className += " dn-center"
        }
        if (appSettings.slideSettings.location.indexOf('RIGHT') != -1) {
            className += " dn-right"
        }
        if (appSettings.slideSettings.location.indexOf('LEFT') != -1) {
            className += " dn-left"
        }
        container.className = className;
        if (!isPreview) {
            container.style.transition = "top 1s linear"
        }
        container.innerHTML = generateSlideHtml(appSettings);
        document.body.appendChild(container);
        setTimeout((function() {
            container.className += " dn-opened"
        }
        ), 50);
        return {
            onAccept: function onAccept(callback) {
                var btns = container.querySelectorAll('.dn-slide-accept-btn');
                for (var i = 0; i < btns.length; i++) {
                    btns[i].addEventListener("click", (function() {
                        container.classList.remove("dn-opened");
                        callback();
                        setTimeout((function() {
                            document.body.removeChild(container)
                        }
                        ), 1e3)
                    }
                    ))
                }
            },
            onDeny: function onDeny(callback) {
                var btns = container.querySelectorAll('.dn-slide-deny-btn');
                for (var i = 0; i < btns.length; i++) {
                    btns[i].addEventListener("click", (function() {
                        container.classList.remove("dn-opened");
                        callback();
                        setTimeout((function() {
                            document.body.removeChild(container)
                        }
                        ), 1e3)
                    }
                    ))
                }
            }
        }
    }
    function generateBannerHtml(appSettings) {
        var s = appSettings.bannerSettings;
        var mainColor = s.mainColor || "#333333";
        var banner = {
            location: s.location || "BOTTOM",
            showIcon: s.showIcon || false,
            text: s.text || "We'd like to show you notifications for the latest news and updates.",
            acceptBtnText: s.acceptBtnText || "Allow",
            fixed: s.fixed || false
        };
        var details = {};
        if (s.advancedOptions) {
            details = fixMissingBannerDetails(s.details, mainColor)
        } else {
            details = getDefaultBannerDetails(mainColor)
        }
        return "\n<div class=\"dn-banner ".concat(banner.showIcon ? '' : 'dn-banner--noLogo', "\">\n  <div class=\"dn-banner-logo\"><img src=\"").concat(appSettings.defaultIconUrl, "\"></div>\n  <div class=\"dn-banner-text\">\n    ").concat(banner.text, "\n  </div>\n  <div class=\"dn-banner-buttons\">\n      <button class=\"dn-banner-accept-btn\">").concat(banner.acceptBtnText, "</button>\n      <button class=\"dn-banner-deny-btn\">x</button>\n  </div>\n</div>\n<style>\n\n  #dengage-push-perm-banner {\n    position: ").concat(banner.fixed ? 'fixed' : 'absolute', " !important;\n    width: 100% !important;\n    z-index: 100000000 !important;\n    left: 0 !important;\n  }\n  #dengage-push-perm-banner.dn-top {\n    top: -200px !important;\n  }\n  #dengage-push-perm-banner.dn-bottom {\n    bottom: -200px !important;\n  }\n  #dengage-push-perm-banner.dn-top.dn-opened {\n    top: 0 !important;\n  }\n  #dengage-push-perm-banner.dn-bottom.dn-opened {\n    bottom: 0 !important;\n  }\n\n  .dn-banner {\n      box-shadow: ").concat(details.shadow ? '0 3px 10px 0 rgba(0, 0, 0, 0.43)' : 'none', " !important;\n      background: ").concat(details.backgroundColor, " !important;\n      border-").concat(banner.location == 'TOP' ? 'bottom' : 'top', ": ").concat(details.border, "px solid ").concat(details.borderColor, " !important;\n      display: flex !important;\n      overflow: auto !important;\n      width: 100% !important;\n      height: auto !important;\n  }\n\n  .dn-banner-logo {\n      padding: 15px !important;\n      box-sizing: border-box !important;\n      display: flex !important;\n      justify-content: center !important;\n      align-items: center !important;\n  }\n  .dn-banner-logo img {\n      width: 36px !important;\n  }\n  .dn-banner--noLogo .dn-banner-logo {\n      display: none !important;\n  }\n\n  .dn-banner-text {\n      flex: 1 !important;\n      padding: 15px !important;\n      box-sizing: border-box !important;\n      line-height: 1.4 !important;\n      display: flex !important;\n      align-items: center !important;\n      color: ").concat(details.textSyle.textColor, " !important;\n      font-family: ").concat(getFontFamily(details.fontFamily), " !important;\n      font-size: ").concat(details.textSyle.fontSize, "px !important;\n      font-weight: ").concat(details.textSyle.fontWeight, " !important;\n  }\n  .dn-banner--noLogo .dn-banner-body {\n      width: 100% !important;\n  }\n\n  .dn-banner-buttons {\n      display: flex !important;\n      padding-right: 10px !important;\n      align-items: center !important;\n  }\n  .dn-banner-buttons button {\n      padding: 8px 15px !important;\n      margin: 0 !important;\n      text-align: center !important;\n      cursor: pointer !important;\n  }\n\n  .dn-banner-buttons .dn-banner-accept-btn {\n      background-color: ").concat(details.acceptBtnStyle.backgroundColor, " !important;\n      color: ").concat(details.acceptBtnStyle.textColor, " !important;\n      font-family: ").concat(getFontFamily(details.fontFamily), " !important;\n      font-size: ").concat(details.acceptBtnStyle.fontSize, "px !important;\n      font-weight: ").concat(details.acceptBtnStyle.fontWeight, " !important;\n      border: ").concat(details.acceptBtnStyle.border, "px solid ").concat(details.acceptBtnStyle.borderColor, " !important;\n      border-radius: ").concat(details.acceptBtnStyle.borderRadius, "px !important;\n      box-shadow: ").concat(details.acceptBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4)' : 'none', " !important;\n  }\n  .dn-banner-buttons .dn-banner-accept-btn:hover {\n      background-color: ").concat(details.acceptBtnStyle.hoverBackgroundColor, " !important;\n      color: ").concat(details.acceptBtnStyle.hoverTextColor, " !important;\n  }\n\n  .dn-banner-buttons .dn-banner-deny-btn {\n      background-color: ").concat(details.cancelBtnStyle.backgroundColor, " !important;\n      color: ").concat(details.cancelBtnStyle.textColor, " !important;\n      font-family: ").concat(getFontFamily(details.fontFamily), " !important;\n      font-size: ").concat(details.cancelBtnStyle.fontSize, "px !important;\n      font-weight: ").concat(details.cancelBtnStyle.fontWeight, " !important;\n      border: ").concat(details.cancelBtnStyle.border, "px solid ").concat(details.cancelBtnStyle.borderColor, " !important;\n      border-radius: ").concat(details.cancelBtnStyle.borderRadius, "px !important;\n      box-shadow: ").concat(details.cancelBtnStyle.shadow ? '0 2px 5px 0 rgba(0, 0, 0, 0.4)' : 'none', " !important;\n  }\n  .dn-banner-buttons .dn-banner-deny-btn:hover {\n      background-color: ").concat(details.cancelBtnStyle.hoverBackgroundColor, " !important;\n      color: ").concat(details.cancelBtnStyle.hoverTextColor, " !important;\n  }\n\n  @media only screen and (max-width: 500px) {\n    .dn-banner-logo {\n      display: none !important;\n    }\n    .dn-banner-body {\n      width: 100% !important;\n    }\n    .dn-banner-text {\n      font-size: 14px !important;\n    }\n    .dn-banner-accept-btn {\n      font-size: 15px !important;\n    }\n    .dn-banner-deny-btn {\n      font-size: 15px !important;\n    }\n  }\n</style>\n    ")
    }
    function getDefaultBannerDetails(mainColor) {
        return {
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
                hoverBackgroundColor: shadeHexColor(mainColor, -.2),
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
                textColor: shadeHexColor(mainColor, .2),
                hoverTextColor: mainColor,
                fontSize: '16',
                fontWeight: 'bold',
                border: 0,
                borderColor: '',
                shadow: false
            }
        }
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
                hoverBackgroundColor: acceptBtnStyle.hoverBackgroundColor || shadeHexColor(mainColor, -.2),
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
                textColor: cancelBtnStyle.textColor || shadeHexColor(mainColor, .2),
                hoverTextColor: cancelBtnStyle.hoverTextColor || mainColor,
                fontSize: cancelBtnStyle.fontSize || "16",
                fontWeight: cancelBtnStyle.fontWeight || "normal",
                border: cancelBtnStyle.border || 0,
                borderColor: cancelBtnStyle.borderColor || "#eeeeee",
                shadow: cancelBtnStyle.shadow == null ? false : cancelBtnStyle.shadow
            }
        }
    }
    function showBannerPromt(appSettings, isPreview) {
        var container = document.createElement("div");
        var className = "dengage-push-perm-banner";
        container.id = "dengage-push-perm-banner";
        if (appSettings.bannerSettings.location.indexOf('TOP') != -1) {
            className += " dn-top"
        }
        if (appSettings.bannerSettings.location.indexOf('BOTTOM') != -1) {
            className += " dn-bottom"
        }
        container.className = className;
        if (!isPreview) {
            container.style.transition = "top 1s linear"
        }
        container.innerHTML = generateBannerHtml(appSettings);
        document.body.appendChild(container);
        setTimeout((function() {
            container.className += " dn-opened"
        }
        ), 50);
        return {
            onAccept: function onAccept(callback) {
                var btn = container.querySelector('.dn-banner-accept-btn');
                btn.addEventListener("click", (function() {
                    container.classList.remove("dn-opened");
                    callback();
                    setTimeout((function() {
                        document.body.removeChild(container)
                    }
                    ), 1e3)
                }
                ))
            },
            onDeny: function onDeny(callback) {
                var btn = container.querySelector('.dn-banner-deny-btn');
                btn.addEventListener("click", (function() {
                    container.classList.remove("dn-opened");
                    callback();
                    setTimeout((function() {
                        document.body.removeChild(container)
                    }
                    ), 1e3)
                }
                ))
            }
        }
    }
    function generateBlockedHtml(appSettings) {
        var s = appSettings.blockedPopup;
        var slide = {
            title: s.title,
            titleColor: s.titleColor,
            message: s.message,
            showButton: s.showButton,
            buttonText: s.buttonText,
            buttonColor: s.buttonColor || '#1165f1'
        };
        return "\n      <div id=\"dn-blocked-popup\">\n        <div class=\"dn-blocked-container\">\n            <i class=\"dn-blocked-container-close\">X</i>\n            <img class=\"desktop\" src=\"".concat(isBlinkBrowser() ? 'https://cdn.dengage.com/internal/chrome.png' : 'https://cdn.dengage.com/internal/firefox.png', "\" />\n            <img class=\"mobile\" src=\"https://cdn.dengage.com/internal/mobile.png\" />\n            <div class=\"dn-blocked-container-body\">\n                <p class=\"dn-blocked-container-body-title\">\n                  ").concat(slide.title, "\n                </p>\n                <div class=\"dn-blocked-container-body-content\">\n                  ").concat(slide.message, "\n                </div>\n                <div class=\"dn-blocked-container-body-content-button ").concat(slide.showButton ? '' : 'dn-blocked-container-body-content--noLogo', "\">\n                    <button>").concat(slide.buttonText, "</button>\n                </div>\n            </div>\n        </div>\n      </div>\n      <style>\n        #dn-blocked-popup {\n          background: rgba(0,0,0,.4) !important;\n          position: fixed !important;\n          top: 0 !important;\n          left: 0 !important;\n          right: 0 !important;\n          bottom: 0 !important;\n          width: 100% !important;\n          z-index: 100000000 !important;\n        }\n        #dn-blocked-popup .dn-blocked-container {\n          position: absolute !important;\n          left: 130px !important;\n          top: 10px !important;\n        }\n        #dn-blocked-popup .dn-blocked-container img {\n          display: block !important;\n          width: 100% !important;\n        }\n        #dn-blocked-popup .dn-blocked-container img.mobile {\n          display: none !important;\n        }\n        #dn-blocked-popup .dn-blocked-container-close {\n          position: absolute !important;\n          right: 5px !important;\n          cursor: pointer !important;\n          color: #000 !important;\n          font-family: Arial, Helvetica, sans-serif !important;\n          font-style: normal !important;\n          font-size: 12px !important;\n          font-weight: bold !important;\n          line-height: 17px !important;\n        }\n        #dn-blocked-popup .dn-blocked-container-body {\n          background: #fff !important;\n          padding: 15px !important;\n          width: 280px !important;\n        }\n        #dn-blocked-popup .dn-blocked-container-body-title {\n          font-family: Arial, Helvetica, sans-serif !important;\n          font-size: 15px !important;\n          font-weight: bold !important;\n          margin: 0 0 10px 0 !important;\n          color: ").concat(slide.titleColor, " !important;\n        }\n        #dn-blocked-popup .dn-blocked-container-body-content {\n          margin-bottom: 15px !important;\n        }\n        #dn-blocked-popup .dn-blocked-container-body-content--noLogo {\n          display: none !important;\n        }\n        #dn-blocked-popup .dn-blocked-container-body-content-button {\n          text-align: right !important;\n        }\n        #dn-blocked-popup .dn-blocked-container-body-content-button button {\n          background: ").concat(slide.buttonColor, " !important;\n          color: #fff !important;\n          padding: 8px 15px !important;\n          outline: none !important;\n          cursor: pointer !important;\n          border: none !important;\n          font-family: Arial, Helvetica, sans-serif !important;\n        }\n        @media (max-width:550px) {\n          #dn-blocked-popup .dn-blocked-container {\n            display: flex !important;\n            flex-direction: column !important;\n            justify-content: center !important;\n            align-items: center !important;\n            min-height: 100vh !important;\n            position: static !important;\n            left: auto !important;\n            top: auto !important;\n          }\n          #dn-blocked-popup .dn-blocked-container img {\n            width: 280px !important;\n          }\n          #dn-blocked-popup .dn-blocked-container img.mobile {\n            display: block !important;\n          }\n          #dn-blocked-popup .dn-blocked-container img.desktop {\n            display: none !important;\n          }\n          #dn-blocked-popup .dn-blocked-container-close{\n            display: none !important;\n          }\n        }\n      </style>\n  ")
    }
    function showBlockedPromt(appSettings) {
        var container = document.createElement("div");
        container.id = "dn-blocked-popup";
        container.innerHTML = generateBlockedHtml(appSettings);
        document.body.appendChild(container);
        return {
            onAccept: function onAccept(callback) {
                var btn = container.querySelector('.dn-blocked-container-body-content-button');
                btn.addEventListener("click", (function() {
                    callback();
                    setTimeout((function() {
                        document.body.removeChild(container)
                    }
                    ), 50)
                }
                ))
            },
            onClose: function onClose(callback) {
                var btn = container.querySelector('.dn-blocked-container-close');
                btn.addEventListener("click", (function() {
                    callback();
                    setTimeout((function() {
                        document.body.removeChild(container)
                    }
                    ), 50)
                }
                ))
            }
        }
    }
    function sha256(ascii) {
        function rightRotate(value, amount) {
            return value >>> amount | value << 32 - amount
        }
        var mathPow = Math.pow;
        var maxWord = mathPow(2, 32);
        var lengthProperty = 'length';
        var i, j;
        var result = '';
        var words = [];
        var asciiBitLength = ascii[lengthProperty] * 8;
        var hash = sha256.h = sha256.h || [];
        var k = sha256.k = sha256.k || [];
        var primeCounter = k[lengthProperty];
        var isComposite = {};
        for (var candidate = 2; primeCounter < 64; candidate++) {
            if (!isComposite[candidate]) {
                for (i = 0; i < 313; i += candidate) {
                    isComposite[i] = candidate
                }
                hash[primeCounter] = mathPow(candidate, .5) * maxWord | 0;
                k[primeCounter++] = mathPow(candidate, 1 / 3) * maxWord | 0
            }
        }
        ascii += '';
        while (ascii[lengthProperty] % 64 - 56) {
            ascii += '\0'
        }
        for (i = 0; i < ascii[lengthProperty]; i++) {
            j = ascii.charCodeAt(i);
            if (j >> 8)
                return;
            words[i >> 2] |= j << (3 - i) % 4 * 8
        }
        words[words[lengthProperty]] = asciiBitLength / maxWord | 0;
        words[words[lengthProperty]] = asciiBitLength;
        for (j = 0; j < words[lengthProperty]; ) {
            var w = words.slice(j, j += 16);
            var oldHash = hash;
            hash = hash.slice(0, 8);
            for (i = 0; i < 64; i++) {
                var w15 = w[i - 15]
                  , w2 = w[i - 2];
                var a = hash[0]
                  , e = hash[4];
                var temp1 = hash[7] + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + (e & hash[5] ^ ~e & hash[6]) + k[i] + (w[i] = i < 16 ? w[i] : w[i - 16] + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ w15 >>> 3) + w[i - 7] + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ w2 >>> 10) | 0);
                var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + (a & hash[1] ^ a & hash[2] ^ hash[1] & hash[2]);
                hash = [temp1 + temp2 | 0].concat(hash);
                hash[4] = hash[4] + temp1 | 0
            }
            for (i = 0; i < 8; i++) {
                hash[i] = hash[i] + oldHash[i] | 0
            }
        }
        for (i = 0; i < 8; i++) {
            for (j = 3; j + 1; j--) {
                var b = hash[i] >> j * 8 & 255;
                result += (b < 16 ? 0 : '') + b.toString(16)
            }
        }
        return result
    }
    var token = null;
    var webSubscription = null;
    var params = {
        swUrl: '/dengage-webpush-sw.js',
        swScope: '/',
        useSwQueryParams: true
    };
    function generateToken(subscription) {
        var subText = JSON.stringify(subscription);
        subText = subText.replace(/[^ -~]+/g, '');
        return 'dn_' + sha256(subText)
    }
    function subscribePush(registration) {
        var options = {
            userVisibleOnly: true,
            applicationServerKey: 'BCjtH2ukgmHUA1K1dQ7dNmf-S6px96jdo1IucYMIEm1uoTc-n83DLgbU1FN13nusF8OVelrXsW2Fk-HspFDJDFw'
        };
        return registration.pushManager.subscribe(options).then((function(newSubscription) {
            webSubscription = JSON.stringify(newSubscription);
            token = generateToken(newSubscription)
        }
        ), errorLoggerRejected('pushManager.subscribe failed'))
    }
    function refreshSubscription(registration) {
        return registration.pushManager.getSubscription().then((function(subscription) {
            if (subscription) {
                if (base64Normalize(arrayBufferToBase64(subscription.options.applicationServerKey)) == base64Normalize('BCjtH2ukgmHUA1K1dQ7dNmf-S6px96jdo1IucYMIEm1uoTc-n83DLgbU1FN13nusF8OVelrXsW2Fk-HspFDJDFw')) {
                    webSubscription = JSON.stringify(subscription);
                    token = generateToken(subscription)
                } else {
                    return subscription.unsubscribe().then((function() {
                        return subscribePush(registration)
                    }
                    )).catch((function() {
                        logError('subscription.unsubscribe() failed');
                        return subscribePush(registration)
                    }
                    ))
                }
            } else {
                return subscribePush(registration)
            }
        }
        ), errorLoggerRejected('getSubscription failed'))
    }
    var webPushApiClient = {
        detected: function detected() {
            return 'serviceWorker'in navigator && 'PushManager'in window
        },
        init: function init() {
            var currentPermission = Notification.permission;
            if (currentPermission === 'granted') {
                var serviceWorkerUrl = params.swUrl;
                if (params.useSwQueryParams) {
                    serviceWorkerUrl += '?account_id=10&app_guid=8aba4299-bf2a-de72-ca40-8fe25effa409'
                }
                return navigator.serviceWorker.register(serviceWorkerUrl, {
                    scope: params.swScope,
                    updateViaCache: 'none'
                }).then((function(registration) {
                    //return refreshSubscription(registration)
                    console.log(registration.scope, 'scope');
                    console.log(registration.active, 'active');
                    console.log(registration.installing, 'installing');
                    console.log(registration.waiting, 'waiting');
                    if (params.swScope == '/') {
                        return navigator.serviceWorker.ready.then((function(registration) {
                            return refreshSubscription(registration)
                        }
                        ), errorLoggerRejected('serviceWorker.ready failed'));
                    } else {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                console.log(registration.scope, 'scope');
                                console.log(registration.active, 'active');
                                console.log(registration.installing, 'installing');
                                console.log(registration.waiting, 'waiting');
                                resolve(refreshSubscription(registration));
                            }, 5000);
                        });
                    }
                }
                ), errorLoggerRejected('An error occurred while registering service worker'))
            } else {
                logError('init called when permission is not granted');
                return Promise.reject()
            }
        },
        getTokenInfo: function getTokenInfo() {
            var currentPermission = Notification.permission;
            if (currentPermission === 'granted') {
                if (token == null || webSubscription == null) {
                    return navigator.serviceWorker.ready.then((function(registration) {
                        return refreshSubscription(registration)
                    }
                    )).then((function() {
                        return {
                            token: token,
                            tokenType: 'W',
                            webSubscription: webSubscription
                        }
                    }
                    ), errorLoggerResolved('serviceWorker.ready failed', null))
                }
                return Promise.resolve({
                    token: token,
                    tokenType: 'W',
                    webSubscription: webSubscription
                })
            }
            return Promise.resolve(null)
        },
        requestPermission: function requestPermission() {
            return Notification.requestPermission()
        },
        getPermission: function getPermission() {
            return Notification.permission
        },
        setParams: function setParams(p) {
            objectAssign(params, p)
        }
    };
    var storage = {
        isAvailable: function isAvailable() {
            try {
                sessionStorage.getItem('dengage_subscription_sent');
                localStorage.setItem('dengage_device_id', localStorage.getItem('dengage_device_id'));
                return true
            } catch (e) {
                return false
            }
        },
        get: function get(key) {
            try {
                return localStorage.getItem(key)
            } catch (e) {
                return null
            }
        },
        set: function set(key, value) {
            try {
                localStorage.setItem(key, value)
            } catch (e) {}
        },
        getInt: function getInt(key) {
            try {
                return toInt$1(localStorage.getItem(key))
            } catch (e) {
                return 0
            }
        },
        sessionGet: function sessionGet(key) {
            try {
                return sessionStorage.getItem(key)
            } catch (e) {
                return null
            }
        },
        sessionSet: function sessionSet(key, value) {
            try {
                sessionStorage.setItem(key, value)
            } catch (e) {}
        }
    };
    var isSubscriptionSent = !!storage.sessionGet('dengage_subscription_sent');
    var isStarted = false;
    var triggerAfterStart = false;
    var aboutToSend = false;
    function triggerSend() {
        if (isStarted == false) {
            triggerAfterStart = true;
            return
        }
        if (aboutToSend == false) {
            aboutToSend = true;
            setTimeout((function() {
                aboutToSend = false;
                sendSubscription()
            }
            ), 2e3)
        }
    }
    function start$2() {
        isStarted = true;
        if (triggerAfterStart) {
            triggerSend()
        } else {
            setTimeout((function() {
                if (isSubscriptionSent == false) {
                    triggerSend()
                }
            }
            ), 2e3)
        }
    }
    function setDeviceId(value) {
        var deviceId = normalizeLong(value);
        if (deviceId && getDeviceId() != deviceId) {
            storage.set('dengage_device_id', deviceId);
            triggerSend()
        }
    }
    function getDeviceId() {
        var deviceId = normalizeLong(storage.get('dengage_device_id'));
        if (!deviceId) {
            deviceId = deviceId || generateUUID();
            triggerSend()
        }
        storage.set('dengage_device_id', deviceId);
        return deviceId
    }
    function getContactKey() {
        var val = storage.get('dengage_contact_key');
        return normalizeShort(val)
    }
    function setContactKey(value) {
        if (getContactKey() != normalizeShort(value)) {
            storage.set('dengage_contact_key', normalizeShort(value) || '');
            triggerSend()
        }
    }
    function getToken() {
        var val = storage.get('dengage_webpush_token');
        return normalizeLong(val)
    }
    function setToken(value) {
        if (getToken() != normalizeLong(value)) {
            storage.set('dengage_webpush_token', normalizeLong(value) || '');
            triggerSend()
        }
    }
    function getTokenType() {
        var val = storage.get('dengage_webpush_token_type');
        return normalizeShort(val)
    }
    function setTokenType(value) {
        if (getTokenType() != normalizeShort(value)) {
            storage.set('dengage_webpush_token_type', normalizeShort(value) || '');
            triggerSend()
        }
    }
    function getWebSubscription() {
        var val = storage.get('dengage_webpush_sub');
        return normalizeLong(val)
    }
    function setWebSubscription(value) {
        if (getWebSubscription() != normalizeLong(value)) {
            storage.set('dengage_webpush_sub', normalizeLong(value) || '');
            triggerSend()
        }
    }
    function sendSubscription() {
        isSubscriptionSent = true;
        storage.sessionSet('dengage_subscription_sent', 'true');
        var deviceId = getDeviceId();
        var data = {
            integrationKey: 'bQZbN_p_l_imuZny_p_l_H6bZi8C5TpiwvmxCku8YjEV8XZeN3620vd0V8HDucg1y3FvSNMkKfl3hSlKGdP_s_l_pYGIY0km5hG7hhGEHhqFvcLsYL3jUdh8xZvrfCMXUEjAzRvJDgBXQiKXy4jK2YYGSQV0LZq_p_l_GA_e_q__e_q_',
            token: getToken(),
            contactKey: getContactKey(),
            permission: true,
            udid: deviceId,
            advertisingId: '',
            carrierId: null,
            appVersion: null,
            sdkVersion: '1.0',
            trackingPermission: true,
            webSubscription: getWebSubscription(),
            tokenType: getTokenType()
        };
        fetch('https://pushdev.dengage.com/api/web/subscription', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'text/plain'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data)
        })
    }
    function normalizeShort(val) {
        if (!val || val === 'null') {
            return null
        }
        return val
    }
    function normalizeLong(val) {
        if (!val || typeof val == 'string' && val.length < 10) {
            return null
        }
        return val
    }
    var appSettings = JSON.parse('{  "name": "ShowCase - Web (SİLME)",  "siteUrl": "https://muhammed-wh.github.io",  "autoShow": true,  "bellSettings": {    "size": "MEDIUM",    "location": "RIGHT",    "mainColor": "#1165f1",    "leftOffset": 0,    "accentColor": "#333333",    "dialogTitle": "",    "rightOffset": 0,    "bottomOffset": 0,    "advancedOptions": false,    "unsubscribeText": "",    "hideIfSubscribed": false,    "subscribeBtnText": "",    "unblockGuideText": "",    "subscribedTooltip": "",    "unsubscribeBtnText": "",    "nonSubscriberTooltip": "",    "afterSubscriptionText": "",    "unblockNotificationText": "",    "blockedSubscriberTooltip": ""  },  "blockedPopup": {    "delay": 5,    "title": "Allow notifications to receive the latest offers:",    "enabled": true,    "message": "<div style=\\"text-align: left;\\"><em>1. Click the lock icon&nbsp;&nbsp;</em></div>\\n<div style=\\"text-align: left;\\"><em>2. Allow notifications</em></div>",    "buttonText": "OK",    "showButton": true,    "titleColor": "#1165F1",    "buttonColor": "#1165F1",    "maxShowCount": 15,    "repromptAfterXHours": 1  },  "slideSettings": {    "text": "We\'d like to show you notifications for the latest news and updates.",    "fixed": true,    "theme": "BOTTOM_BTNS",    "title": "Welcome",    "details": null,    "location": "TOP_CENTER",    "showIcon": true,    "mainColor": "#13AD5B",    "showTitle": true,    "acceptBtnText": "Allow",    "cancelBtnText": "No Thanks",    "advancedOptions": false  },  "bannerSettings": {    "text": "",    "fixed": true,    "theme": "DEFAULT",    "details": null,    "location": "BOTTOM",    "showIcon": true,    "mainColor": "#000000",    "acceptBtnText": "Enable",    "advancedOptions": false  },  "defaultIconUrl": "https://avatars2.githubusercontent.com/u/57666388?s=460&v=4",  "selectedPrompt": "BANNER",  "autoShowSettings": {    "delay": 0,    "denyWaitTime": 0,    "promptAfterXVisits": 0,    "repromptAfterXMinutes": 0  },  "welcomeNotification": {    "link": "",    "title": "",    "enabled": false,    "message": ""  }}');
    var permissionData = null;
    function getWebsitePushID() {
        var host = new URL(appSettings.siteUrl);
        var webSiteID = host.hostname.split('.').concat('web').reverse().join('.');
        return webSiteID
    }
    function refreshPermissionData() {
        permissionData = window.safari.pushNotification.permission(getWebsitePushID())
    }
    var safariClient = {
        detected: function detected() {
            var safariEnabled = false;
            try {
                safariEnabled = JSON.parse('false')
            } catch (e) {}
            return 'safari'in window && 'pushNotification'in window.safari && safariEnabled
        },
        init: function init() {
            if (permissionData == null) {
                refreshPermissionData()
            }
            if (permissionData.permission == 'granted') {
                return Promise.resolve()
            } else {
                logError('init called when permission is not granted');
                return Promise.reject()
            }
        },
        getTokenInfo: function getTokenInfo() {
            if (permissionData == null) {
                refreshPermissionData()
            }
            if (permissionData.permission === 'granted') {
                return Promise.resolve({
                    token: permissionData.deviceToken,
                    tokenType: 'S',
                    webSubscription: null
                })
            }
            return Promise.resolve(null)
        },
        requestPermission: function requestPermission() {
            return new Promise((function(resolve, reject) {
                if (permissionData == null) {
                    refreshPermissionData()
                }
                function safariPermissionCb(result) {
                    permissionData = result;
                    if (permissionData.permission === 'default') {
                        logError('User made default. it is impossible')
                    } else if (permissionData.permission === 'denied') {
                        logInfo('User said no')
                    } else if (permissionData.permission === 'granted') {
                        logInfo('user said yes');
                        logInfo('Token: ' + permissionData.deviceToken)
                    }
                    resolve(permissionData.permission)
                }
                if (permissionData.permission == 'default') {
                    var deviceId = getDeviceId();
                    var websitePushID = getWebsitePushID();
                    var url = 'https://pushdev.dengage.com/api/safari/90db7e2a-5839-53cd-605f-9d3ffc328e21';
                    var userInfo = {
                        device_id: deviceId
                    };
                    window.safari.pushNotification.requestPermission(url, websitePushID, userInfo, safariPermissionCb)
                } else {
                    logError('requestPermission called when permission is not default');
                    reject()
                }
            }
            ))
        },
        getPermission: function getPermission() {
            if (permissionData == null) {
                refreshPermissionData()
            }
            return permissionData.permission
        },
        setParams: function setParams() {}
    };
    var pushClient = {
        detected: function detected() {
            return false
        }
    };
    if (safariClient.detected()) {
        objectAssign(pushClient, safariClient)
    } else {
        objectAssign(pushClient, webPushApiClient)
    }
    function showNativePrompt$1(grantedCallback, deniedCallback) {
        pushClient.requestPermission().then((function(permission) {
            if (permission === 'granted') {
                setLocalStoragePromptResult('granted');
                if (grantedCallback) {
                    grantedCallback()
                }
            } else {
                setLocalStoragePromptResult('denied');
                if (deniedCallback) {
                    deniedCallback()
                }
            }
        }
        ))
    }
    function showCustomPrompt$1(grantedCallback, deniedCallback) {
        if (appSettings.selectedPrompt == 'SLIDE') {
            var slidePrompt = showSlidePromt(appSettings);
            slidePrompt.onAccept((function() {
                showNativePrompt$1(grantedCallback, deniedCallback)
            }
            ));
            slidePrompt.onDeny((function() {
                setLocalStoragePromptResult('denied');
                if (deniedCallback) {
                    deniedCallback()
                }
            }
            ))
        } else if (appSettings.selectedPrompt == 'BANNER') {
            var bannerPrompt = showBannerPromt(appSettings);
            bannerPrompt.onAccept((function() {
                showNativePrompt$1(grantedCallback, deniedCallback)
            }
            ));
            bannerPrompt.onDeny((function() {
                setLocalStoragePromptResult('denied');
                if (deniedCallback) {
                    deniedCallback()
                }
            }
            ))
        } else {
            showNativePrompt$1(grantedCallback, deniedCallback)
        }
        localStorage.setItem('dengage_webpush_last_a', 'ask');
        localStorage.setItem('dengage_webpush_last_d', (new Date).valueOf() + '')
    }
    function startAutoPrompt(grantedCallback, deniedCallback) {
        var autoShowSettings = appSettings.autoShowSettings;
        var sessionStartTime = getSessionStartTime();
        var now = new Date;
        var setPrompt = function setPrompt() {
            var delay = toInt(autoShowSettings.delay || 1) * 1e3;
            var passedTime = now.valueOf() - sessionStartTime.valueOf();
            var waitTime = delay - passedTime;
            waitTime = waitTime > 0 ? waitTime : 0;
            setTimeout((function() {
                showCustomPrompt$1(grantedCallback, deniedCallback)
            }
            ), waitTime)
        };
        var visitCount = toInt(localStorage.getItem('dengage_visit_count'));
        localStorage.setItem('dengage_visit_count', visitCount + 1);
        if (toInt(autoShowSettings.promptAfterXVisits) <= visitCount) {
            var lastPromptAction = localStorage.getItem('dengage_webpush_last_a') || '';
            var lastPromptDate = toInt(localStorage.getItem('dengage_webpush_last_d'));
            lastPromptDate = new Date(lastPromptDate);
            var denyWaitTime = toInt(autoShowSettings.denyWaitTime || 24) * 60 * 60 * 1e3;
            var denyWaitUntil = new Date(lastPromptDate.valueOf() + denyWaitTime);
            var repromptWaitTime = toInt(autoShowSettings.repromptAfterXMinutes) * 60 * 60 * 1e3;
            var repromptWaitUntil = new Date(lastPromptDate.valueOf() + repromptWaitTime);
            if (lastPromptAction == 'denied') {
                if (now >= denyWaitUntil) {
                    setPrompt()
                }
            } else {
                if (now >= repromptWaitUntil) {
                    setPrompt()
                }
            }
        }
    }
    function startBlockedPrompt() {
        var blockedSettings = appSettings.blockedPopup;
        var sessionStartTime = getSessionStartTime();
        var now = new Date;
        var setPrompt = function setPrompt() {
            var delay = toInt(blockedSettings.delay || 1) * 1e3;
            var passedTime = now.valueOf() - sessionStartTime.valueOf();
            var waitTime = delay - passedTime;
            waitTime = waitTime > 0 ? waitTime : 0;
            setTimeout((function() {
                localStorage.setItem('dengage_push_blocked_count', blockedPromptCount + 1);
                localStorage.setItem('dengage_push_blocked_last_d', now.valueOf());
                var blockedPrompt = showBlockedPromt(appSettings);
                blockedPrompt.onAccept((function() {}
                ));
                blockedPrompt.onClose((function() {}
                ))
            }
            ), waitTime)
        };
        var blockedPromptCount = toInt(localStorage.getItem('dengage_push_blocked_count'));
        if (toInt(blockedSettings.maxShowCount) > blockedPromptCount) {
            var lastPromptDate = toInt(localStorage.getItem('dengage_push_blocked_last_d'));
            lastPromptDate = new Date(lastPromptDate);
            var waitTime = toInt(blockedSettings.repromptAfterXHours || 48) * 60 * 60 * 1e3;
            var waitUntil = new Date(lastPromptDate.valueOf() + waitTime);
            if (now >= waitUntil) {
                setPrompt()
            }
        }
    }
    function getSessionStartTime() {
        var val = toInt(sessionStorage.getItem('dengage_session_start'));
        if (val) {
            val = new Date(val)
        } else {
            val = new Date;
            sessionStorage.setItem('dengage_session_start', val.valueOf() + '')
        }
        return val
    }
    function toInt(input) {
        if (typeof input == 'number') {
            return input
        }
        if (typeof input == 'string') {
            return input === '' ? 0 : parseInt(input)
        }
        return 0
    }
    function setLocalStoragePromptResult(result) {
        localStorage.setItem('dengage_webpush_last_a', result);
        localStorage.setItem('dengage_webpush_last_d', (new Date).valueOf() + '')
    }
    function showNotificationSimple(data) {
        var title = data.title;
        var iconUrl = data.iconUrl == 'default_icon' ? appSettings.defaultIconUrl : (data.iconUrl || '').trim();
        var options = {
            body: data.message,
            requireInteraction: true
        };
        if (data.mediaUrl) {
            options.image = data.mediaUrl
        }
        if (iconUrl) {
            options.icon = iconUrl
        }
        if (data.badgeUrl) {
            options.badge = data.badgeUrl
        }
        var notif = new Notification(title,options);
        if (data.targetUrl) {
            notif.onclick = function(event) {
                if (event.notification) {
                    event.notification.close()
                }
                window.open(data.targetUrl);
                if (data.messageId != null && data.messageDetails != null) {
                    sendOpen(data.messageId, data.messageDetails)
                }
            }
        }
    }
    function sendOpen(messageId, messageDetails, buttonId) {
        var data = {
            integrationKey: "bQZbN_p_l_imuZny_p_l_H6bZi8C5TpiwvmxCku8YjEV8XZeN3620vd0V8HDucg1y3FvSNMkKfl3hSlKGdP_s_l_pYGIY0km5hG7hhGEHhqFvcLsYL3jUdh8xZvrfCMXUEjAzRvJDgBXQiKXy4jK2YYGSQV0LZq_p_l_GA_e_q__e_q_",
            messageId: messageId,
            messageDetails: messageDetails,
            buttonId: buttonId || ''
        };
        return fetch('https://pushdev.dengage.com/api/web/open', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'text/plain'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data)
        })
    }
    function startPushClient(callback, isFirstTime) {
        pushClient.init().then((function() {
            pushClient.getTokenInfo().then((function(tokenInfo) {
                logInfo('Token: ' + tokenInfo.token);
                setToken(tokenInfo.token);
                setTokenType(tokenInfo.tokenType);
                setWebSubscription(tokenInfo.webSubscription || null);
                if (isFirstTime) {
                    showWellcomeNotification()
                }
                callback()
            }
            )).catch((function(err) {
                logError('pushClient.getTokenInfo() failed. ', err);
                callback()
            }
            ))
        }
        )).catch((function(err) {
            logError('pushClient.init() failed. ', err);
            callback()
        }
        ))
    }
    function start$1(callback) {
        callback = callback || function() {}
        ;
        var currentPermission = pushClient.getPermission();
        if (currentPermission == 'granted') {
            logInfo('Notification permission already granted.');
            startPushClient(callback)
        } else if (currentPermission == 'default') {
            setToken(null);
            setTokenType(null);
            setWebSubscription(null);
            if (appSettings.autoShow) {
                var onPermissionGranted = function onPermissionGranted() {
                    logInfo('Notification permission granted.');
                    startPushClient(callback, true)
                };
                var onPermissionDenied = function onPermissionDenied() {
                    logInfo('Notification permission denied.')
                };
                startAutoPrompt(onPermissionGranted, onPermissionDenied)
            }
            callback()
        } else {
            if (appSettings.blockedPopup && appSettings.blockedPopup.enabled && (isBlinkBrowser() || isFirefoxBrowser())) {
                startBlockedPrompt()
            }
            logInfo('Notification permission denied');
            setToken(null);
            setTokenType(null);
            setWebSubscription(null);
            callback()
        }
    }
    function showNativePrompt() {
        return new Promise((function(resolve, reject) {
            showNativePrompt$1((function() {
                startPushClient(callback, true);
                resolve('granted')
            }
            ), (function() {
                resolve('denied')
            }
            ))
        }
        ))
    }
    function showCustomPrompt() {
        return new Promise((function(resolve, reject) {
            showCustomPrompt$1((function() {
                startPushClient(callback, true);
                resolve('granted')
            }
            ), (function() {
                resolve('denied')
            }
            ))
        }
        ))
    }
    function showWellcomeNotification() {
        if (appSettings.welcomeNotification.enabled) {
            setTimeout((function() {
                var data = {
                    title: appSettings.welcomeNotification.title,
                    message: appSettings.welcomeNotification.message,
                    targetUrl: appSettings.welcomeNotification.link
                };
                showNotificationSimple(data)
            }
            ), 500)
        }
    }
    var sessionId = generateUUID();
    var currentSessionId = storage.sessionGet('dengage_session_id');
    var sessionId = currentSessionId || generateUUID();
    function startSession() {
        var queryString = {
            utm_source: getQueryStringParameter('utm_source') || null,
            utm_medium: getQueryStringParameter('utm_medium') || null,
            utm_campaign: getQueryStringParameter('utm_campaign') || null,
            utm_content: getQueryStringParameter('utm_content') || null,
            utm_term: getQueryStringParameter('utm_term') || null,
            channel: getQueryStringParameter('dn_channel') || null,
            send_id: getQueryStringParameter('dn_send_id') || null
        };
        if (!currentSessionId) {
            var session_info = objectAssign({}, {
                referer: document.referrer
            }, queryString);
            storage.sessionSet('dengage_session_query_string', window.location.search);
            storage.sessionSet('dengage_session_id', sessionId);
            sendDeviceEvent('session_info', session_info)
        } else {
            var currentSessionQueryString = storage.sessionGet('dengage_session_query_string');
            var url = 'http://aaa.com/' + currentSessionQueryString;
            var currentQueryString = {
                utm_source: getQueryStringParameter('utm_source', url) || queryString.utm_source,
                utm_medium: getQueryStringParameter('utm_medium', url) || queryString.utm_medium,
                utm_campaign: getQueryStringParameter('utm_campaign', url) || queryString.utm_campaign,
                utm_content: getQueryStringParameter('utm_content', url) || queryString.utm_content,
                utm_term: getQueryStringParameter('utm_term', url) || queryString.utm_term,
                channel: getQueryStringParameter('dn_channel', url) || queryString.channel,
                send_id: getQueryStringParameter('dn_send_id', url) || queryString.send_id
            };
            if (JSON.stringify(currentQueryString) != JSON.stringify(queryString)) {
                var session_info = objectAssign({}, {
                    referer: document.referrer
                }, queryString);
                storage.sessionSet('dengage_session_query_string', window.location.search);
                storage.sessionSet('dengage_session_id', sessionId);
                sendDeviceEvent('session_info', session_info)
            }
        }
    }
    function getSessionId() {
        return sessionId
    }
    function sendEvent(table, key, data) {
        if (getSessionId()) {
            var params = {
                accountId: '90db7e2a-5839-53cd-605f-9d3ffc328e21',
                key: key,
                eventTable: table,
                eventDetails: data
            };
            logInfo(params);
            return fetch('https://eventdev.dengage.com/api/web/event', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'omit',
                headers: {
                    'Content-Type': 'text/plain'
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: JSON.stringify(params)
            })
        }
    }
    function sendDeviceEvent(table, data) {
        var deviceId = getDeviceId();
        data.session_id = getSessionId();
        return sendEvent(table, deviceId, data)
    }
    function sendCustomEvent(table, key, data) {
        return sendEvent(table, key, data)
    }
    var list = [' Daum/', ' DeuSu/', ' MuckRack/', ' Sysomos/', ' um-LN/', '!Susie', '/www\\.answerbus\\.com', '/www\\.unchaos\\.com', '/www\\.wmtips\\.com', '008/', '192\\.comAgent', '8484 Boston Project', '<http://www\\.sygol\\.com/>', '\\(privoxy/', '^AHC/', '^Amazon CloudFront', '^axios/', '^Disqus/', '^Friendica', '^Hatena', '^http_get', '^Jetty/', '^MeltwaterNews', '^MixnodeCache/', '^newspaper/', '^NextCloud-News/', '^ng/', '^NING', '^Nuzzel', '^okhttp', '^sentry/', '^Thinklab', '^Tiny Tiny RSS/', '^Traackr.com', '^Upflow/', '^Zabbix', 'Abonti', 'Aboundex', 'aboutthedomain', 'ac{1,2}oon', 'Ad Muncher', 'adbeat\\.com', 'AddThis', 'ADmantX', 'agada.de', 'agadine/', 'aggregator', 'aiderss/', 'airmail\\.etn', 'airmail\\net', 'aladin/', 'alexa site audit', 'allrati/', 'AltaVista Intranet', 'alyze\\.info', 'amzn_assoc', 'analyza', 'analyzer', 'Anemone', 'Anturis Agent', 'AnyEvent-HTTP', 'Apache-HttpClient', 'APIs-Google', 'Aport', 'AppEngine-Google', 'appie', 'AppInsights', 'Arachmo', 'arachnode\\.net', 'Arachnoidea', 'Arachnophilia/', 'araneo/', 'archive', 'archiving', 'asafaweb\\.com', 'asahina-antenna/', 'ask[-\\s]?jeeves', 'ask\\.24x\\.info', 'aspseek/', 'AspTear', 'assort/', 'asterias/', 'atomic_email_hunter/', 'atomz/', 'augurfind', 'augurnfind', 'auto', 'Avirt Gateway Server', 'Azureus', 'B-l-i-t-z-B-O-T', 'B_l_i_t_z_B_O_T', 'BackStreet Browser', 'BCKLINKS 1\\.0', 'beammachine/', 'beebwaredirectory/v0\\.01', 'bibnum\\.bnf', 'Big Brother', 'Big Fish', 'BigBozz/', 'bigbrother/', 'biglotron', 'bilbo/', 'BilderSauger', 'BingPreview', 'binlar', 'Blackboard Safeassign', 'BlackWidow', 'blaiz-bee/', 'bloglines/', 'Blogpulse', 'blogzice/', 'BMLAUNCHER', 'bobby/', 'boitho\\.com-dc', 'bookdog/x\\.x', 'Bookmark Buddy', 'Bookmark Renewal', 'bookmarkbase\\(2/;http://bookmarkbase\\.com\\)', 'BorderManager', 'bot', 'BrandVerity/', 'BravoBrian', 'Browsershots', 'bsdseek/', 'btwebclient/', 'BUbiNG', 'BullsEye', 'bumblebee@relevare\\.com', 'BunnySlippers', 'Buscaplus', 'butterfly', 'BW-C-2', 'bwh3_user_agent', 'calif/', 'capture', 'carleson/', 'CC Metadata Scaper', 'ccubee/x\\.x', 'CE-Preload', 'Ceramic Tile Installation Guide', 'Cerberian Drtrs', 'CERN-HTTPD', 'cg-eye interactive', 'changedetection', 'Charlotte', 'charon/', 'Chat Catcher/', 'check', 'China Local Browse', 'Chitika ContentHit', 'Chrome-Lighthouse', 'CJB\\.NET Proxy', 'classify', 'Claymont\\.com', 'cloakdetect/', 'CloudFlare-AlwaysOnline', 'clown', 'cnet\\.com', 'COAST WebMaster Pro/', 'CoBITSProbe', 'coccoc', 'cocoal\\.icio\\.us/', 'ColdFusion', 'collage\\.cgi/', 'collect', 'combine/', 'Commons-HttpClient', 'ContentSmartz', 'contenttabreceiver', 'control', 'convera', 'copperegg/revealuptime/fremontca', 'coralwebprx/', 'cosmos', 'Covac UPPS Cathan', 'Covario-IDS', 'crawl', 'crowsnest/', 'csci_b659/', 'Custo x\\.x \\(www\\.netwu\\.com\\)', 'cuwhois/', 'CyberPatrol', 'DA \\d', 'DAP x', 'DareBoost', 'datacha0s/', 'datafountains/dmoz', 'Datanyze', 'dataprovider', 'DAUMOA-video', 'dbdig\\(http://www\\.prairielandconsulting\\.com\\)', 'DBrowse \\d', 'dc-sakura/x\\.xx', 'DDD', 'deep[-\\s]?link', 'deepak-usc/isi', 'delegate/', 'DepSpid', 'detector', 'developers\\.google\\.com\\/\\+\\/web\\/snippet\\/', 'diagem/', 'diamond/x\\.0', 'Digg', 'DigOut4U', 'DISCo Pump x\\.x', 'dlman', 'dlvr\\.it/', 'DnloadMage', 'docomo/', 'DomainAppender', 'Download Demon', 'Download Druid', 'Download Express', 'Download Master', 'Download Ninja', 'Download Wonder', 'download(?:s|er)', 'Download\\.exe', 'DownloadDirect', 'DreamPassport', 'drupact', 'Drupal', 'DSurf15', 'DTAAgent', 'DTS Agent', 'Dual Proxy', 'e-sense', 'EARTHCOM', 'easydl/', 'EBrowse \\d', 'ecairn\\.com/grabber', 'echo!/', 'efp@gmx\\.net', 'egothor/', 'ejupiter\\.com', 'EldoS TimelyWeb/', 'ElectricMonk', 'EmailWolf', 'Embedly', 'envolk', 'ESurf15', 'evaliant', 'eventax/', 'Evliya Celebi', 'exactseek\\.com', 'Exalead', 'Expired Domain Sleuth', 'Exploratodo/', 'extract', 'EyeCatcher', 'eyes', 'ezooms', 'facebookexternalhit', 'faedit/', 'FairAd Client', 'fantom', 'FastBug', 'Faveeo/', 'FavIconizer', 'FavOrg', 'FDM \\d', 'feed', 'feeltiptop\\.com', 'fetch', 'fileboost\\.net/', 'filtrbox/', 'FindAnISP\\.com', 'finder', 'findlink', 'findthatfile', 'firefly/', 'FlashGet', 'FLATARTS_FAVICO', 'flexum/', 'FlipboardProxy/', 'FlipboardRSS/', 'fluffy', 'flunky', 'focusedsampler/', 'FollowSite', 'forensiq\\.com', 'francis/', 'freshdownload/x\\.xx', 'FSurf', 'FuseBulb\\.Com', 'g00g1e\\.net', 'galaxy\\.com', 'gather', 'gazz/x\\.x', 'geek-tools\\.org', 'genieknows', 'Genieo', 'getright(pro)?/', 'getter', 'ghostroutehunter/', 'gigabaz/', 'GigablastOpenSource', 'go!zilla', 'go-ahead-got-it/', 'Go-http-client', 'GoBeez', 'goblin/', 'GoForIt\\.com', 'Goldfire Server', 'gonzo[1-2]', 'gooblog/', 'goofer/', 'Google Favicon', 'Google Page Speed Insights', 'Google Web Preview', 'Google Wireless Transcoder', 'Google-PhysicalWeb', 'Google-Site-Verification', 'Google-Structured-Data-Testing-Tool', 'google-xrawler', 'GoogleImageProxy', 'gopher', 'gossamer-threads\\.com', 'grapefx/', 'gromit/', 'GroupHigh/', 'grub-client', 'GTmetrix', 'gulliver/', 'H010818', 'hack', 'harvest', 'haste/', 'HeadlessChrome/', 'helix/', 'heritrix', 'HiDownload', 'hippias/', 'HitList', 'Holmes', 'hotmail.com', 'hound', 'htdig', 'html2', 'http-header-abfrage/', 'http://anonymouse\\.org/', 'http://ask\\.24x\\.info/', 'http://www\\.ip2location\\.com', 'http://www\\.monogol\\.de', 'http://www\\.sygol\\.com', 'http://www\\.timelyweb\\.com/', 'http::lite/', 'http_client', 'HTTPGet', 'HTTPResume', 'httpunit', 'httrack', 'HubSpot Marketing Grader', 'hyperestraier/', 'HyperixScoop', 'ichiro', 'ics \\d', 'IDA', 'ideare - SignSite', 'idwhois\\.info', 'IEFav172Free', 'iframely/', 'IlTrovatore-Setaccio', 'imageengine/', 'images', 'imagewalker/', 'InAGist', 'incywincy\\(http://www\\.look\\.com\\)', 'index', 'info@pubblisito\\.com', 'infofly/', 'infolink/', 'infomine/', 'InfoSeek Sidewinder/', 'InfoWizards Reciprocal Link System PRO', 'inkpeek\\.com', 'Insitornaut', 'inspectorwww/', 'InstallShield DigitalWizard', 'integrity/', 'integromedb', 'intelix/', 'intelliseek\\.com', 'Internet Ninja', 'internetlinkagent/', 'InterseekWeb', 'IODC', 'IOI', 'ips-agent', 'iqdb/', 'iria/', 'irvine/', 'isitup\\.org', 'isurf', 'ivia/', 'iwagent/', 'j-phone/', 'Jack', 'java/', 'JBH Agent 2\\.0', 'JemmaTheTourist', 'JetCar', 'jigsaw/', 'jorgee', 'Journster', 'kalooga/kalooga-4\\.0-dev-datahouse', 'Kapere', 'kasparek@naparek\\.cz', 'KDDI-SN22', 'ke_1\\.0/', 'Kevin', 'KimonoLabs', 'kit-fireball/', 'KnowItAll', 'knowledge\\.com/', 'Kontiki Client', 'kulturarw3/', 'kummhttp/', 'L\\.webis', 'labrador/', 'Lachesis', 'Larbin', 'leech', 'leia/', 'LibertyW', 'library', 'libweb/clshttp', 'lightningdownload/', 'Lincoln State Web Browser', 'Link Commander', 'Link Valet', 'linkalarm/', 'linkdex', 'LinkExaminer', 'Linkguard', 'linkman', 'LinkPimpin', 'LinkProver', 'Links2Go', 'linksonar/', 'LinkStash', 'LinkTiger', 'LinkWalker', 'Lipperhey Link Explorer', 'Lipperhey SEO Service', 'Lipperhey Site Explorer', 'Lipperhey-Kaus-Australis/', 'loader', 'loadimpactrload/', 'locate', 'locator', 'Look\\.com', 'Lovel', 'ltx71', 'lwp-', 'lwp::', 'mabontland', 'mack', 'magicwml/', 'mail\\.ru/', 'mammoth/', 'MantraAgent', 'MapoftheInternet\\.com', 'Marketwave Hit List', 'Martini', 'Marvin', 'masagool/', 'MasterSeek', 'Mastodon/', 'Mata Hari/', 'mediaget', 'Mediapartners-Google', 'MegaSheep', 'Megite', 'Mercator', 'metainspector/', 'metaspinner/', 'metatagsdir/', 'MetaURI', 'MicroBaz', 'Microsoft_Internet_Explorer_5', 'miixpc/', 'Mindjet MindManager', 'Miniflux/', 'miniflux\\.net', 'Missouri College Browse', 'Mister Pix', 'Mizzu Labs', 'Mo College', 'moget/x\\.x', 'mogimogi', 'moiNAG', 'monitor', 'monkeyagent', 'MonTools\\.com', 'Morning Paper', 'Mrcgiguy', 'MSIE or Firefox mutant', 'msnptc/', 'msproxy/', 'Mulder', 'multiBlocker browser', 'multitext/', 'MuscatFerret', 'MusicWalker2', 'MVAClient', 'naofavicon4ie/', 'naparek\\.cz', 'netants/', 'Netcraft Web Server Survey', 'NetcraftSurveyAgent/', 'netlookout/', 'netluchs/', 'NetMechanic', 'netpumper/x\\.xx', 'NetSprint', 'netwu\\.com', 'neutrinoapi/', 'NewsGator', 'newt', 'nico/', 'Nmap Scripting Engine', 'NORAD National Defence Network', 'Norton-Safeweb', 'Notifixious', 'noyona_0_1', 'nsauditor/', 'nutch', 'Nymesis', 'ocelli/', 'Octopus', 'Octora Beta', 'ODP links', 'oegp', 'OliverPerry', 'omgili', 'Onet\\.pl', 'Oracle Application', 'Orbiter', 'OSSProxy', 'outbrain', 'ow\\.ly', 'ownCloud News/', 'ozelot/', 'Page Valet/', 'page2rss', 'Pagebull', 'PagmIEDownload', 'Panopta v', 'panscient', 'parasite/', 'parse', 'pavuk/', 'PayPal IPN', 'PBrowse', 'Pcore-HTTP', 'pd02_1', 'Peew', 'perl', 'Perman Surfer', 'PEval', 'phantom', 'photon/', 'php/\\d', 'Pingdom', 'Pingoscope', 'pingspot/', 'pinterest\\.com', 'Pita', 'Pizilla', 'Ploetz \\+ Zeller', 'Plukkie', 'pockey-gethtml/', 'pockey/x\\.x\\.x', 'Pockey7', 'Pogodak', 'Poirot', 'Pompos', 'popdexter/', 'Port Huron Labs', 'PostFavorites', 'PostPost', 'postrank', 'Powermarks', 'PR-CY.RU', 'pricepi\\.com', 'prlog\\.ru', 'pro-sitemaps\\.com', 'program', 'Project XP5', 'protopage/', 'proximic', 'PSurf15a', 'psycheclone', 'puf/', 'PureSight', 'PuxaRapido', 'python', 'Qango\\.com Web Directory', 'QuepasaCreep', 'Qwantify', 'QXW03018', 'rabaz', 'Radian6', 'RankSonicSiteAuditor/', 'rating', 'readability/', 'reader', 'realdownload/', 'reaper', 'ReGet', 'responsecodetest/', 'retrieve', 'rico/', 'Riddler', 'Rival IQ', 'Rivva', 'RMA/1\\.0', 'RoboPal', 'Robosourcer', 'robozilla/', 'rotondo/', 'rpt-httpclient/', 'RSurf15a', 'samualt9', 'saucenao/', 'SBIder', 'scan', 'scooter', 'ScoutAbout', 'scoutant/', 'ScoutJet', 'scoutmaster', 'scrape', 'Scrapy', 'Scrubby', 'search', 'Seeker\\.lookseek\\.com', 'seer', 'semaforo\\.net', 'semager/', 'semanticdiscovery', 'seo-nastroj\\.cz', 'SEOCentro', 'SEOstats', 'Seznam screenshot-generator', 'Shagseeker', 'ShopWiki', 'Siigle Orumcex', 'SimplyFast\\.info', 'Simpy', 'siphon', 'Site Server', 'Site24x7', 'SiteBar', 'SiteCondor', 'siteexplorer\\.info', 'Siteimprove', 'SiteRecon', 'SiteSnagger', 'sitesucker/', 'SiteUptime\\.com', 'SiteXpert', 'sitexy\\.com', 'skampy/', 'skimpy/', 'SkypeUriPreview', 'skywalker/', 'slarp/', 'slider\\.com', 'slurp', 'smartdownload/', 'smartwit\\.com', 'Snacktory', 'Snappy', 'sniff', 'sogou', 'sohu agent', 'somewhere', 'speeddownload/', 'speedy', 'speng', 'Sphere Scout', 'Sphider', 'spider', 'spinne/', 'spy', 'squidclam', 'Squider', 'Sqworm', 'SSurf15a', 'StackRambler', 'stamina/', 'StatusCake', 'suchbaer\\.de', 'summify', 'SuperCleaner', 'SurferF3', 'SurfMaster', 'suzuran', 'sweep', 'synapse', 'syncit/x\\.x', 'szukacz/', 'T-H-U-N-D-E-R-S-T-O-N-E', 'tags2dir\\.com/', 'Tagword', 'Talkro Web-Shot', 'targetblaster\\.com/', 'TargetSeek', 'Teleport Pro', 'teoma', 'Teradex Mapper', 'Theophrastus', 'thumb', 'TinEye', 'tkensaku/x\\.x\\(http://www\\.tkensaku\\.com/q\\.html\\)', 'tracker', 'truwoGPS', 'TSurf15a', 'tuezilla', 'tumblr/', 'Twingly Recon', 'Twotrees Reactive Filter', 'TygoProwler', 'Ultraseek', 'Under the Rainbow', 'unknownght\\.com', 'UofTDB_experiment', 'updated', 'url', 'user-agent', 'utility', 'utorrent/', 'Vagabondo', 'vakes/', 'vb wininet', 'venus/fedoraplanet', 'verifier', 'verify', 'Version: xxxx Type:xx', 'versus', 'verzamelgids/', 'viking', 'vkshare', 'voltron', 'vonna', 'Vortex', 'voyager-hc/', 'VYU2', 'W3C-mobileOK/', 'w3c-webcon/', 'W3C_Unicorn/', 'w3dt\\.net', 'Wappalyzer', 'warez', 'Watchfire WebXM', 'wavefire/', 'Waypath Scout', 'wbsrch\\.com', 'Web Snooper', 'web-bekannt', 'webbandit/', 'webbug/', 'Webclipping\\.com', 'webcollage', 'WebCompass', 'webcookies', 'webcorp/', 'webcraft', 'WebDataStats/', 'Webglimpse', 'webgobbler/', 'webinator', 'weblight/', 'Weblog Attitude Diffusion', 'webmastercoffee/', 'webminer/x\\.x', 'webmon ', 'WebPix', 'Website Explorer', 'Websnapr/', 'Websquash\\.com', 'webstat/', 'Webster v0\\.', 'webstripper/', 'webtrafficexpress/x\\.0', 'webtrends/', 'WebVac', 'webval/', 'Webverzeichnis\\.de', 'wf84', 'WFARC', 'wget', 'whatsapp', 'whatsmyip\\.org', 'whatsup/x\\.x', 'whatuseek_winona/', 'Whizbang', 'whoami', 'whoiam', 'Wildsoft Surfer', 'WinGet', 'WinHTTP', 'wish-project', 'WomlpeFactory', 'WordPress\\.com mShots', 'WorldLight', 'worqmada/', 'worth', 'wotbox', 'WoW Lemmings Kathune', 'WSN Links', 'wusage/x\\.0@boutell\\.com', 'wwlib/linux', 'www-mechanize/', 'www\\.ackerm\\.com', 'www\\.alertra\\.com', 'www\\.arianna\\.it', 'www\\.ba\\.be', 'www\\.de\\.com', 'www\\.evri\\.com/evrinid', 'www\\.gozilla\\.com', 'www\\.idealobserver\\.com', 'www\\.iltrovatore\\.it', 'www\\.iskanie\\.com', 'www\\.kosmix\\.com', 'www\\.megaproxy\\.com', 'www\\.moreover\\.com', 'www\\.mowser\\.com', 'www\\.nearsoftware\\.com', 'www\\.ssllabs\\.com', 'wwwc/', 'wwwoffle/', 'wwwster/', 'wxDownload Fast', 'Xenu Link Sleuth', "Xenu's Link Sleuth", 'xirq/', 'XML Sitemaps Generator', 'xrl/', 'Xylix', 'Y!J-ASR', 'y!j-srd/', 'y!oasis/test', 'yacy', 'yahoo', 'YandeG', 'yandex', 'yanga', 'yarienavoir\\.net/', 'yeti', 'Yoleo', 'Yoono', 'youtube-dl', 'Zao', 'Zearchit', 'zedzo\\.digest/', 'zeus', 'zgrab', 'Zippy', 'ZnajdzFoto/Image', 'ZyBorg', 'googlebot', 'Googlebot-Mobile', 'Googlebot-Image', 'bingbot', 'java', 'curl', 'Python-urllib', 'libwww', 'phpcrawl', 'msnbot', 'jyxobot', 'FAST-WebCrawler', 'FAST Enterprise Crawler', 'seekbot', 'gigablast', 'exabot', 'ngbot', 'ia_archiver', 'GingerCrawler', 'webcrawler', 'grub.org', 'UsineNouvelleCrawler', 'antibot', 'netresearchserver', 'bibnum.bnf', 'msrbot', 'yacybot', 'AISearchBot', 'tagoobot', 'MJ12bot', 'dotbot', 'woriobot', 'buzzbot', 'mlbot', 'yandexbot', 'purebot', 'Linguee Bot', 'Voyager', 'voilabot', 'baiduspider', 'citeseerxbot', 'spbot', 'twengabot', 'turnitinbot', 'scribdbot', 'sitebot', 'Adidxbot', 'blekkobot', 'dotbot', 'Mail.RU_Bot', 'discobot', 'europarchive.org', 'NerdByNature.Bot', 'sistrix crawler', 'ahrefsbot', 'domaincrawler', 'wbsearchbot', 'ccbot', 'edisterbot', 'seznambot', 'ec2linkfinder', 'gslfbot', 'aihitbot', 'intelium_bot', 'RetrevoPageAnalyzer', 'lb-spider', 'lssbot', 'careerbot', 'wocbot', 'DuckDuckBot', 'lssrocketcrawler', 'webcompanycrawler', 'acoonbot', 'openindexspider', 'gnam gnam spider', 'web-archive-net.com.bot', 'backlinkcrawler', 'content crawler spider', 'toplistbot', 'seokicks-robot', 'it2media-domain-crawler', 'ip-web-crawler.com', 'siteexplorer.info', 'elisabot', 'blexbot', 'arabot', 'WeSEE:Search', 'niki-bot', 'CrystalSemanticsBot', 'rogerbot', '360Spider', 'psbot', 'InterfaxScanBot', 'g00g1e.net', 'GrapeshotCrawler', 'urlappendbot', 'brainobot', 'fr-crawler', 'SimpleCrawler', 'Livelapbot', 'Twitterbot', 'cXensebot', 'smtbot', 'bnf.fr_bot', 'A6-Indexer', 'Facebot', 'Twitterbot', 'OrangeBot', 'memorybot', 'AdvBot', 'MegaIndex', 'SemanticScholarBot', 'nerdybot', 'xovibot', 'archive.org_bot', 'Applebot', 'TweetmemeBot', 'crawler4j', 'findxbot', 'SemrushBot', 'yoozBot', 'lipperhey', 'Domain Re-Animator Bot'];
    try {
        new RegExp('(?<! cu)bot').test('dangerbot');
        list.splice(list.lastIndexOf('bot'), 1);
        list.push('(?<! cu)bot')
    } catch (error) {}
    var regex = new RegExp('(' + list.join('|') + ')','i');
    function isbot(userAgent) {
        return regex.test(userAgent)
    }
    function chrome76Detection() {
        if ('storage'in navigator && 'estimate'in navigator.storage) {
            return navigator.storage.estimate().then((function(_ref) {
                _ref.usage;
                var quota = _ref.quota;
                if (quota < 12e7)
                    return true;
                else
                    return false
            }
            ))
        } else {
            return Promise.resolve(false)
        }
    }
    function isNewChrome() {
        var pieces = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);
        if (pieces == null || pieces.length != 5) {
            return undefined
        }
        var major = pieces.map((function(piece) {
            return parseInt(piece, 10)
        }
        ))[1];
        if (major >= 76)
            return true;
        return false
    }
    var PrivateWindow = {
        then: function then() {}
    };
    if ('Promise'in window && 'fetch'in window) {
        PrivateWindow = new Promise((function(resolve, reject) {
            try {
                var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && navigator.userAgent.indexOf('CriOS') == -1 && navigator.userAgent.indexOf('FxiOS') == -1;
                if (isSafari) {
                    var e = false;
                    if (window.safariIncognito) {
                        e = true
                    } else {
                        try {
                            window.openDatabase(null, null, null, null);
                            window.localStorage.setItem('test', 1);
                            resolve(false)
                        } catch (t) {
                            e = true;
                            resolve(true)
                        }
                        void !e && (e = !1,
                        window.localStorage.removeItem('test'))
                    }
                } else if (navigator.userAgent.includes('Firefox')) {
                    var db = indexedDB.open('test');
                    db.onerror = function() {
                        resolve(true)
                    }
                    ;
                    db.onsuccess = function() {
                        resolve(false)
                    }
                } else if (navigator.userAgent.includes('Edge') || navigator.userAgent.includes('Trident') || navigator.userAgent.includes('msie')) {
                    if (!window.indexedDB && (window.PointerEvent || window.MSPointerEvent))
                        resolve(true);
                    resolve(false)
                } else {
                    if (isNewChrome())
                        resolve(chrome76Detection());
                    var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
                    if (!fs)
                        resolve(null);
                    else {
                        fs(window.TEMPORARY, 100, (function(fs) {
                            resolve(false)
                        }
                        ), (function(err) {
                            resolve(true)
                        }
                        ))
                    }
                }
            } catch (err) {
                resolve(null)
            }
        }
        ))
    }
    function isPrivateWindow() {
        return PrivateWindow
    }
    function pageView(inputParams) {
        var params = deepCopy(inputParams);
        params.page_url = window.location.href;
        params.page_title = document.title;
        sendDeviceEvent('page_view_events', params)
    }
    function sendCartEvents(inputParams, event_type) {
        var params = deepCopy(inputParams);
        delete params.cartItems;
        var event_id = generateUUID();
        params.event_type = event_type;
        params.event_id = event_id;
        sendDeviceEvent('shopping_cart_events', params);
        if (inputParams.cartItems) {
            var _iterator = _createForOfIteratorHelper(inputParams.cartItems), _step;
            try {
                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                    var product = _step.value;
                    product.event_id = event_id;
                    sendDeviceEvent('shopping_cart_events_detail', product)
                }
            } catch (err) {
                _iterator.e(err)
            } finally {
                _iterator.f()
            }
        }
    }
    function addToCart(inputParams) {
        sendCartEvents(inputParams, 'add_to_cart')
    }
    function removeFromCart(inputParams) {
        sendCartEvents(inputParams, 'remove_from_cart')
    }
    function viewCart(inputParams) {
        sendCartEvents(inputParams, 'view_cart')
    }
    function beginCheckout(inputParams) {
        sendCartEvents(inputParams, 'begin_checkout')
    }
    function order(inputParams) {
        var params = deepCopy(inputParams);
        delete params.cartItems;
        params.event_type = 'order';
        sendDeviceEvent('order_events', params);
        var cartEventParams = {
            event_type: 'order',
            event_id: generateUUID()
        };
        sendDeviceEvent('shopping_cart_events', cartEventParams);
        if (inputParams.cartItems) {
            var _iterator2 = _createForOfIteratorHelper(inputParams.cartItems), _step2;
            try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                    var product = _step2.value;
                    product.order_id = params.order_id;
                    sendDeviceEvent('order_events_detail', product)
                }
            } catch (err) {
                _iterator2.e(err)
            } finally {
                _iterator2.f()
            }
        }
    }
    function cancelOrder(inputParams) {
        var params = deepCopy(inputParams);
        delete params.cartItems;
        params.event_type = 'cancel';
        params.total_amount = -params.total_amount;
        sendDeviceEvent('order_events', params);
        if (inputParams.cartItems) {
            var _iterator3 = _createForOfIteratorHelper(inputParams.cartItems), _step3;
            try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                    var product = _step3.value;
                    product.order_id = params.order_id;
                    sendDeviceEvent('order_events_detail', product)
                }
            } catch (err) {
                _iterator3.e(err)
            } finally {
                _iterator3.f()
            }
        }
    }
    function search(inputParams) {
        var params = deepCopy(inputParams);
        sendDeviceEvent('search_events', params)
    }
    function sendWishlistEvents(inputParams, event_type) {
        var params = deepCopy(inputParams);
        delete params.items;
        var event_id = generateUUID();
        params.event_type = event_type;
        params.event_id = event_id;
        sendDeviceEvent('wishlist_events', params);
        if (inputParams.items) {
            var _iterator4 = _createForOfIteratorHelper(inputParams.items), _step4;
            try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
                    var product = _step4.value;
                    product.event_id = event_id;
                    sendDeviceEvent('wishlist_events_detail', product)
                }
            } catch (err) {
                _iterator4.e(err)
            } finally {
                _iterator4.f()
            }
        }
    }
    function addToWishlist(inputParams) {
        sendWishlistEvents(inputParams, 'add')
    }
    function removeFromWishlist(inputParams) {
        sendWishlistEvents(inputParams, 'remove')
    }
    var ecommFunctions = Object.freeze({
        __proto__: null,
        pageView: pageView,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        viewCart: viewCart,
        beginCheckout: beginCheckout,
        order: order,
        cancelOrder: cancelOrder,
        search: search,
        addToWishlist: addToWishlist,
        removeFromWishlist: removeFromWishlist
    });
    function setTagsFn(tagsArray) {
        if (!Array.isArray(tagsArray)) {
            logError("setTags method parameters is missing or incorrect.");
            return
        }
        var invalid = false;
        for (var i = 0; i < tagsArray.length; i++) {
            if (!tagsArray[i].hasOwnProperty("tag")) {
                invalid = true;
                break
            }
            if (tagsArray[i].hasOwnProperty("changeTime")) {
                if (!isNaN(Date.parse(tagsArray[i].changeTime)) && !isIsoDate(tagsArray[i].changeTime)) {
                    tagsArray[i].changeTime = new Date(tagsArray[i].changeTime).toISOString()
                }
            }
            if (tagsArray[i].hasOwnProperty("removeTime")) {
                if (!isNaN(Date.parse(tagsArray[i].removeTime)) && !isIsoDate(tagsArray[i].removeTime)) {
                    tagsArray[i].removeTime = new Date(tagsArray[i].removeTime).toISOString()
                }
            }
        }
        if (invalid) {
            logError("setTags method parameters is missing or incorrect.");
            return
        }
        var setTagsObj = {
            accountName: "dvl",
            key: getDeviceId(),
            tags: tagsArray
        };
        logInfo(setTagsObj);
        return fetch('https://pushdev.dengage.com/api/setTags', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'text/plain'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(setTagsObj)
        })
    }
    function generatePopupHtml(contentdetails) {
        var props = contentdetails.props;
        var mainColor = '#fff';
        var inlineCss = PreparePopupInlineStyle(props, mainColor);
        return "\n\n<div class=\"web-push-wrap\">\n    <div  class=\"dn-flex dn-items-center dn-justify-center onsite-popup-windows-preview\">\n        <div  class=\"onsite-popup-windows-content inapp-ios-preview\">\n            <div  placement=\"".concat(props.position1.toLowerCase(), "\" class=\"inapp-modal\">\n                <div  class=\" dn-btn-popup-close svg-icon  ").concat(props.close == false ? 'dn-noclosebtn' : '', "\"\n                    style=\"color: rgb(255, 255, 255); position: absolute; right: 12px;  top: 12px;\">\n                    <svg   width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22.0303 11.0296C22.3232 10.7367 22.3232 10.2618 22.0303 9.96894C21.7374 9.67604 21.2626 9.67604 20.9697 9.96894L16 14.9386L11.0303 9.96894C10.7374 9.67604 10.2626 9.67604 9.96967 9.96894C9.67678 10.2618 9.67678 10.7367 9.96967 11.0296L14.9393 15.9993L9.96967 20.9689C9.67678 21.2618 9.67678 21.7367 9.96967 22.0296C10.2626 22.3225 10.7374 22.3225 11.0303 22.0296L16 17.0599L20.9697 22.0296C21.2626 22.3225 21.7374 22.3225 22.0303 22.0296C22.3232 21.7367 22.3232 21.2618 22.0303 20.9689L17.0607 15.9993L22.0303 11.0296Z\" fill=\"#405672\" fill-opacity=\"0.7\"/>\n                    </svg>\n                    </div>\n                <div  class=\"img-section\">\n                    <div  class=\"inapp-modal-img\"\n                        style=\"background-image: url(").concat(props.imageUrl, ");\">\n                        \x3c!----\x3e\n                    </div>\n                </div>\n                <div  class=\"pa-6 content-section\">\n                    <div  class=\"text-center\">\n                        <div  class=\"on-site-title-preview ").concat(props.showTitle == false ? 'dn-notitle' : '', "\"> ").concat(props.title, "</div>\n                        <div  class=\"on-site-description-preview\"> ").concat(props.message, "</div>\n                    </div>\n                    <div  class=\"dn-flex mt-5 dn-popup-buttons\">\n                    <a  href=\"\" target=\"").concat(props.newWindow == true ? '_blank' : 'self', "\"\n                            class=\"anchor-primary-btn onsite-popup-btn flex-grow-1 \" style=\" ").concat(props.showPrimaryBtn == true && props.showSecondaryBtn == true ? 'display: inline-block !important' : props.showPrimaryBtn == false && props.showSecondaryBtn == true ? 'display:none !important' : props.showPrimaryBtn == true && props.showSecondaryBtn == false ? 'display:block !important' : '', "\">  ").concat(props.actionText, " </a>\n                            \n                    <a  href=\"\" target=\"").concat(props.newWindow == true ? '_blank' : 'self', "\"\n                    class=\"dn-popup-sec-btn onsite-popup-btn   flex-grow-1 \" style =\"").concat(props.showPrimaryBtn == true && props.showSecondaryBtn == true ? 'display: inline-block !important' : props.showPrimaryBtn == true && props.showSecondaryBtn == false ? 'display:none !important' : props.showPrimaryBtn == false && props.showSecondaryBtn == true ? 'display:block !important' : '', "\">  ").concat(props.secondaryText, " </a>\n\n                           \n\n                            \n                            </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<style>\n\n.dn-noclosebtn{\n    display:none !important;\n}\n.dn-notitle{\n    display:none !important;\n\n}\n#dengage-onsite-perm-popup {\n  position: fixed !important;\n  top: 0 !important;\n  bottom: 0 !important;\n  left: 0 !important;\n  right: 0 !important;\n  background: rgb(38 37 37 / 93%) !important;\n  transition: opacity 500ms !important;\n  z-index: 12 !important;\n  }\n  #dengage-onsite-perm-popup:target {\n  visibility: visible !important;\n  opacity: 1 !important;\n  }\n  \n  .onsite-popup-windows-preview {\n  margin: 70px auto !important;\n  padding: 20px !important;\n  \n  border-radius: 5px !important;\n  width: 23% !important;\n  position: relative !important;\n  transition: all 5s ease-in-out !important;\n  }\n  .onsite-popup-windows-content.inapp-ios-preview .inapp-modal[placement^=horizontal] {\n  display: flex !important;\n  height: 300px !important;\n  width: 500px !important;\n  }\n  .inapp-ios-preview .inapp-modal {\n  background: ").concat(inlineCss.backgroundColor, " !important;\n  width: 406px !important;\n  padding:").concat(inlineCss.paddingRight, " 0 !important;\n  box-shadow: 0 24px 56px rgb(0 2 38 / 4%) !important;\n  border-radius: 20px !important;\n  position: relative !important;\n  font-family: ").concat(inlineCss.fontFamily, " !important; \n  font-size: ").concat(inlineCss.size, " !important; \n\n  }\n  .onsite-popup-windows-content.inapp-ios-preview .inapp-modal[placement^=horizontal] .svg-icon {\n  color: #333!important !important;\n  }\n  .onsite-popup-windows-content.inapp-ios-preview .inapp-modal[placement^=horizontal] .img-section {\n  width: 200px !important;\n  }\n  .onsite-popup-windows-content.inapp-ios-preview .inapp-modal[placement^=horizontal] .inapp-modal-img {\n  height: 100%  !important;\n  }\n  .inapp-ios-preview .inapp-modal .inapp-modal-img {\n  background-color: rgba(28,44,72,.9) !important;\n  border-radius: 16px !important;\n  background-repeat: no-repeat !important;\n  background-position: 50% !important;\n  background-size: cover !important;\n  height: 190px !important;\n  -ms-flex-negative: 0 !important;\n  flex-shrink: 0 !important;\n  display: -webkit-box !important;\n  display: -ms-flexbox !important;\n  display: flex !important;\n  -webkit-box-align: center !important;\n  -ms-flex-align: center !important;\n  align-items: center !important;\n  -webkit-box-pack: center !important;\n  -ms-flex-pack: center !important;\n  justify-content: center !important;\n  }\n  .onsite-popup-windows-content.inapp-ios-preview .inapp-modal[placement^=horizontal] .content-section {\n  display: -webkit-box !important;\n  display: -ms-flexbox !important;\n  display: flex !important;\n  -webkit-box-orient: vertical !important;\n  -webkit-box-direction: normal !important;\n  -ms-flex-direction: column !important;\n  flex-direction: column !important;\n  -webkit-box-pack: center !important;\n  -ms-flex-pack: center !important;\n  justify-content: center !important;\n  }\n  .on-site-title-preview {\n  overflow: hidden !important;\n  text-overflow: ").concat(inlineCss.titleSyle.textOverflow, "  !important;\n  font-size:").concat(inlineCss.titleSyle.fontSize, "  !important;\n  line-height: ").concat(inlineCss.titleSyle.lineHeight, "  !important;\n  font-weight: ").concat(inlineCss.titleSyle.fontWeight, "  !important;\n  color: ").concat(inlineCss.titleSyle.textColor, "  !important;\n  padding-right: ").concat(inlineCss.titleSyle.paddingRight, "  !important;\n  text-align: ").concat(inlineCss.titleSyle.textalign, "  !important;\n\n  }\n  .on-site-description-preview {\n  overflow: hidden !important;\n  text-overflow: ").concat(inlineCss.textSyle.textOverflow, " !important;\n  font-weight: ").concat(inlineCss.textSyle.fontWeight, " !important;\n  font-size: ").concat(inlineCss.textSyle.fontSize, " !important;\n  line-height: ").concat(inlineCss.textSyle.lineHeight, " !important;\n  color: ").concat(inlineCss.textSyle.textColor, " !important;\n  text-align: ").concat(inlineCss.textSyle.textalign, "  !important;\n\n\n  }\n  .anchor-primary-btn {\n  background-color: ").concat(inlineCss.primaryBtn.backgroundColor, " !important;\n  border-radius: ").concat(inlineCss.primaryBtn.radius, " !important;\n  text-decoration: none !important;\n  text-align: ").concat(inlineCss.primaryBtn.align, "  !important;\n  color:  ").concat(inlineCss.primaryBtn.textcolor, "  !important;\n  font-family:").concat(inlineCss.primaryBtn.font, " !important;\n    font-size: ").concat(inlineCss.primaryBtn.size, "px !important;\n    font-weight: ").concat(inlineCss.primaryBtn.weight, " !important;\n\n  height: 40px !important;\n  -webkit-box-sizing: border-box !important;\n  box-sizing: border-box !important;\n  padding: 8px 16px !important;\n  display: inline-block !important;\n  min-width: 150px!important;\n  }\n    \n    .dn-popup-sec-btn{\n    background-color: ").concat(inlineCss.secondaryBtn.backgroundColor, " !important;\n    border-radius: ").concat(inlineCss.secondaryBtn.radius, " !important;\n    text-decoration: none !important;\n    text-align: ").concat(inlineCss.secondaryBtn.align, "  !important;\n    color:  ").concat(inlineCss.secondaryBtn.textcolor, "  !important;\n    font-family:").concat(inlineCss.secondaryBtn.font, " !important;\n    font-size: ").concat(inlineCss.secondaryBtn.size, "px !important;\n    font-weight: ").concat(inlineCss.secondaryBtn.weight, " !important;\n\n    height: 40px !important;\n    -webkit-box-sizing: border-box !important;\n    box-sizing: border-box !important;\n    padding: 8px 16px !important;\n    display: inline-block !important;\n    min-width: 150px!important;\n\n    }\n\n  \n  \n  .pa-6 {\n  padding: 24px !important;\n  }\n  .mt-5 {\n  margin-top: 20px !important;\n  }\n  .flex-grow-1 {\n  -webkit-box-flex: 1 !important;\n  -ms-flex-positive: 1 !important;\n  flex-grow: 1 !important;\n  display: block !important;\n  \n  }\n  .dn-btn-popup-close:hover {\n    cursor: pointer !important;\n  }\n  \n</style>\n    ")
    }
    function PreparePopupInlineStyle(settings, mainColor) {
        var _titleSyle;
        var textSyle = settings.msg || {};
        var titleSyle = settings.titleObj || {};
        var general = settings.general || {};
        var primaryButton = settings.primaryBtn || {};
        var secondaryButton = settings.secondaryBtn || {};
        return {
            backgroundColor: general.bg || mainColor,
            fontFamily: general.font || 'ARIAL',
            size: general.size || '16px',
            weight: general.weight || mainColor,
            align: general.align || 'left',
            radius: general.radius || 3,
            textSyle: {
                textColor: textSyle.bg || "rgba(64,86,114,.7) ",
                textOverflow: "ellipsis !important",
                fontSize: textSyle.size || "14px ",
                lineHeight: "40px ",
                fontWeight: textSyle.weight || "regular",
                textalign: titleSyle.align || "center",
                backgroundColor: titleSyle.bg || mainColor
            },
            titleSyle: (_titleSyle = {
                textColor: titleSyle.bg || "rgba(28,44,72,.9) ",
                fontWeight: titleSyle.fontWeight || "bold",
                textOverflow: "ellipsis ",
                fontSize: titleSyle.size || "24px ",
                lineHeight: "40px "
            },
            _defineProperty(_titleSyle, "fontWeight", titleSyle.weight || "regular"),
            _defineProperty(_titleSyle, "paddingRight", "10px "),
            _defineProperty(_titleSyle, "backgroundColor", titleSyle.bg || "#fff"),
            _defineProperty(_titleSyle, "textalign", titleSyle.align || "center"),
            _titleSyle),
            primaryBtn: {
                backgroundColor: primaryButton.bg || "#125CFA",
                font: primaryButton.font || "Helvetica, Arial, Tohama",
                size: primaryButton.size || "16px",
                weight: primaryButton.weight || "regular",
                align: primaryButton.align || "left",
                radius: primaryButton.radius || "3px",
                textcolor: primaryButton.text || "#FFFFFF"
            },
            secondaryBtn: {
                backgroundColor: secondaryButton.bg || "#125CFA",
                font: secondaryButton.font || "Helvetica, Arial, Tohama",
                size: secondaryButton.size || "16px",
                weight: secondaryButton.weight || "regular",
                align: secondaryButton.align || "left",
                radius: secondaryButton.radius || "3px",
                textcolor: secondaryButton.text || "#FFFFFF"
            }
        }
    }
    function generateOnSiteBannerHtml(bannerSettings) {
        var p = bannerSettings.props;
        var mainColor = '#fff';
        var inlineCssBanner = PrepareBannerInlineStyle(p, mainColor);
        return "\n   <div  placement=\"".concat(p.position.toLowerCase(), "\" class=\"web-push-windows-content\"style=\"\">\n        <div  class=\"dn-flex dn-flex-col\" style=\"padding: 5px 24px; ").concat(p.close == false ? 'display:none !important' : '', "\">\n            <div  class=\"svg-icon dn-btn-banner-close\"\n                style=\"color: rgb(255, 255, 255); position: absolute; right: 12px; height: 16px;\">\n                <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22.0303 11.0296C22.3232 10.7367 22.3232 10.2618 22.0303 9.96894C21.7374 9.67604 21.2626 9.67604 20.9697 9.96894L16 14.9386L11.0303 9.96894C10.7374 9.67604 10.2626 9.67604 9.96967 9.96894C9.67678 10.2618 9.67678 10.7367 9.96967 11.0296L14.9393 15.9993L9.96967 20.9689C9.67678 21.2618 9.67678 21.7367 9.96967 22.0296C10.2626 22.3225 10.7374 22.3225 11.0303 22.0296L16 17.0599L20.9697 22.0296C21.2626 22.3225 21.7374 22.3225 22.0303 22.0296C22.3232 21.7367 22.3232 21.2618 22.0303 20.9689L17.0607 15.9993L22.0303 11.0296Z\" fill=\"#405672\" fill-opacity=\"0.7\"/>\n                    </svg></div>\n            <div  class=\"dn-flex dn-items-center\">\n                <div  class=\"on-site-title-preview ").concat(p.showTitle ? 'dn-notitle' : '', "\"\n                    style=\"color: rgb(213, 119, 119); text-align: center; font-weight: bold; font-size: 14px;\"> ").concat(p.title, " </div>\n                <div  class=\"on-site-description-preview\"\n                    style=\"color: rgb(121, 109, 109); text-align: center; font-weight: bold; font-size: 14px;\">  ").concat(p.message, " </div>\n            </div>\n            <div  class=\"dn-flex dn-banner-button\"><a  href=\"").concat(p.targetUrl, "\" target=\"").concat(p.newWindow == true ? "blank" : "_self", "\"\n                    class=\"font-size-12 onsite-banner-btn\"\n                    style=\"font-family: Helvetica, Arial, Tohama; font-weight: bold; font-size: 14px; color: ").concat(p.primaryBtn.text, " ;\">\n                    ").concat(p.actionText, " </a></div>\n        </div>\n    </div>\n    \n    <style>\n    \n.web-push-main[placement^=bottom], .web-push-windows-content[placement^=bottom]{\n      bottom: 0px !important;\n      z-index:10000000000000000000 !important;\n      min-height: 58px;\n      }\n      .web-push-main[placement^=top], .web-push-windows-content[placement^=top] {\n      top: 0px !important;\n      z-index:10000000000000000000 !important;\n      min-height: 58px;\n      }\n\n    .web-push-windows-content {\n      background: ").concat(inlineCssBanner.backgroundColor, " !important;\n        width: 100%!important;\n        position:").concat(p.positionFixedEnabled == true || p.position.toLowerCase() == 'bottom' ? "fixed" : "static", "  !important;\n        z-index: 1000000000000;\n        box-shadow: ").concat(p.positionFixedEnabled == true || p.position.toLowerCase() == 'bottom' ? " 0 3px 10px 0 rgb(0 0 0 / 43%)" : " 0 0px 0px 0 rgb(0 0 0 / 0%)", "  !important;\nborder-bottom: ").concat(p.positionFixedEnabled == true || p.position.toLowerCase() == 'bottom' ? "2px solid #000000" : "0px solid #000000", "  !important;\n    }\n    .web-push-windows-content-fixed {\n      background: ").concat(inlineCssBanner.backgroundColor, " !important;\n        position: relative !important; \n        width: 50%!important;\n        margin:0 auto;\n    }\n\n    .dn-flex-col {\n        -webkit-box-orient: vertical !important;\n        -ms-flex-direction: column !important;\n        flex-direction: column!important; \n    }\n\n    .svg-icon {\n        fill: currentColor !important;\n        width: -webkit-fit-content !important;\n        width: -moz-fit-content!important;\n        width: fit-content !important;\n    }\n\n    .dn-items-center {\n        -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n        align-items: center !important;\n    }\n\n    .dn-flex,\n    .dn-flex-col,\n    .dn-flex-row {\n        display: -webkit-box !important;\n        display: -ms-flexbox !important;\n        display: flex !important;\n        -webkit-box-direction: normal!important; \n        -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important;\n        -webkit-box-align: stretch!important; \n        -ms-flex-align: stretch !important;\n        align-items: stretch !important;\n        -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n        justify-content: flex-start !important;\n    }\n\n    .web-push-main[placement^=top]\n    .web-push-windows-content[placement^=top] {\n        top: 88px !important;\n    }\n\n    .dn-flex-col {\n        flex-direction: column !important;\n    }\n\n    .on-site-title-preview {\n        overflow: hidden !important;\n        text-overflow: ").concat(inlineCssBanner.titleSyle.textOverflow, "  !important;\n  font-size:").concat(inlineCssBanner.titleSyle.fontSize, "  !important;\n  line-height: ").concat(inlineCssBanner.titleSyle.lineHeight, "  !important;\n  font-weight: ").concat(inlineCssBanner.titleSyle.fontWeight, "  !important;\n  color: ").concat(inlineCssBanner.titleSyle.textColor, "  !important;\n  padding-right: 10px  !important;\n    }\n\n    .on-site-description-preview {\n        overflow: hidden !important;\n        text-overflow: ").concat(inlineCssBanner.textSyle.textOverflow, "  !important;\n  font-weight: ").concat(inlineCssBanner.textSyle.fontWeight, "  !important;\n  font-size: ").concat(inlineCssBanner.textSyle.fontSize, "  !important;\n  line-height: ").concat(inlineCssBanner.textSyle.lineHeight, "  !important;\n  color: ").concat(inlineCssBanner.textSyle.textColor, "  !important;\n  margin-right:15px !important;\n    }\n\n    .font-size-12 {\n        font-size: 12px !important;\n    }\n    \n</style>\n    ")
    }
    function PrepareBannerInlineStyle(props, mainColor) {
        var _textSyle;
        var textSyle = props.textSyle || {};
        var titleSyle = props.titleObj || {};
        var general = props.general || {};
        return {
            backgroundColor: general.bg || mainColor,
            fontFamily: general.font || 'ARIAL',
            border: general.border || 0,
            borderColor: general.bg || mainColor,
            borderRadius: general.radius || 3,
            align: general.align || 'left',
            fontSize: general.size || '16px',
            fontWeight: textSyle.weight || "normal ",
            textSyle: (_textSyle = {
                textColor: textSyle.bg || "rgba(64,86,114,.7) ",
                fontWeight: textSyle.weight || "normal",
                textOverflow: textSyle.textOverflow || "ellipsis ",
                fontSize: textSyle.size || "12px ",
                lineHeight: textSyle.lineHeight || "20px "
            },
            _defineProperty(_textSyle, "fontWeight", textSyle.weight || "400 "),
            _defineProperty(_textSyle, "bg", textSyle.bg || "#FFFFFF "),
            _defineProperty(_textSyle, "textalign", textSyle.align || "left "),
            _textSyle),
            titleSyle: {
                textColor: titleSyle.bg || "rgba(28,44,72,.9) ",
                fontWeight: titleSyle.weight || "bold",
                textOverflow: titleSyle.textOverflow || "ellipsis ",
                fontSize: titleSyle.size || "16px ",
                lineHeight: titleSyle.lineHeight || "24px ",
                textalign: titleSyle.align || "left ",
                bg: titleSyle.bg || "#FFFFFF "
            }
        }
    }
    function AppendCustomHTMLToIframContainer(customHtmlObj, container, dnIframLoadCallBack) {
        var props = customHtmlObj.props;
        var iframe = document.createElement('iframe');
        iframe.id = 'dn-ifram';
        iframe.style.width = '100%';
        iframe.style.paddingLeft = '5px';
        iframe.style.paddingRight = '5px';
        iframe.style.paddingBottom = '5px';
        iframe.style.border = 'none';
        var doc = document.getElementById(container.id);
        iframe.onload = function() {
            iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
            dnIframLoadCallBack(true)
        }
        ;
        var containerInnerHtml = "<div class=\"dn-modal-content\" id=\"dn-ifram-container\" > \n  <div  class=\"svg-icon dn-btn-popup-close\" style=\"".concat(props.closeBtnEnabled == false ? 'display:none !important' : '', "\">\n        <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22.0303 11.0296C22.3232 10.7367 22.3232 10.2618 22.0303 9.96894C21.7374 9.67604 21.2626 9.67604 20.9697 9.96894L16 14.9386L11.0303 9.96894C10.7374 9.67604 10.2626 9.67604 9.96967 9.96894C9.67678 10.2618 9.67678 10.7367 9.96967 11.0296L14.9393 15.9993L9.96967 20.9689C9.67678 21.2618 9.67678 21.7367 9.96967 22.0296C10.2626 22.3225 10.7374 22.3225 11.0303 22.0296L16 17.0599L20.9697 22.0296C21.2626 22.3225 21.7374 22.3225 22.0303 22.0296C22.3232 21.7367 22.3232 21.2618 22.0303 20.9689L17.0607 15.9993L22.0303 11.0296Z\" fill=\"#405672\" fill-opacity=\"0.7\"/>\n                    </svg>\n        </div>\n\n     </div> \n \n<style>\n\n\n.dengage-onsite-perm-customhtml {\n  display: block !important;\n  position: absolute !important;\n  z-index: 122 !important;\n  padding-top: 50px !important;\n  left: 0 !important;\n  top: 0 !important;\n  width: 100% !important;\n  height: 100% !important;\n  overflow: auto !important;\n  \n  background-color: rgba(0,0,0,0.4) !important;\n\n}\n\n.dn-modal-content {\n      background-color: #fefefe !important;\n    margin: auto !important;\n    padding-left: -13px !important;\n    border: 1px solid #888 !important;\n    width: ").concat(props.maxWidth + 'px' || '60%', " !important;\n    border-radius: 10px;\n \n}\n\n.dn-btn-popup-close {\n  position: relative;\n  color: #aaaaaa !important;\n  float: right !important;\n  height: 26px;\n}\n\n.dn-btn-popup-close:hover,\n.dn-btn-popup-close:focus {\n  color: #000 !important;\n  text-decoration: none !important;\n  cursor: pointer !important;\n}\n.dn-btn-popup-close:hover {\n  cursor: pointer !important;\n}\n</style>\n    ");
        doc.innerHTML = containerInnerHtml;
        var iframContainer = document.getElementById("dn-ifram-container");
        iframContainer.appendChild(iframe);
        var iDoc = document.getElementById(iframe.id);
        iDoc = iDoc.contentWindow.document;
        iDoc.open('text/html', 'replace');
        iDoc.write(props.html);
        iDoc.close()
    }
    var dnIframContainer;
    var dnIframMessagedetails;
    function showPopupPromt(messagedetails) {
        var container = document.createElement("div");
        var className = "dengage-onsite-perm-popup";
        container.id = "dengage-onsite-perm-popup";
        container.className = className;
        container.innerHTML = generatePopupHtml(messagedetails.message_json.content);
        document.body.appendChild(container);
        setTimeout((function() {
            container.className += " dn-opened"
        }
        ), 50);
        return {
            onDismissPopup: function onDismissPopup(callback) {
                document.querySelector(".dengage-onsite-perm-popup").addEventListener("click", (function(event) {
                    if (event.target.closest(".dn-btn-popup-close") || !event.target.closest(".onsite-popup-windows-preview")) {
                        container.classList.remove("dn-opened");
                        callback(messagedetails);
                        setTimeout((function() {
                            document.body.removeChild(container)
                        }
                        ), 1e3)
                    }
                }
                ), false)
            },
            clickInAppMessage: function clickInAppMessage(callback) {
                var btnList = container.querySelectorAll(".onsite-popup-btn");
                for (var index = 0; index < btnList.length; index++) {
                    var element = btnList[index];
                    element.addEventListener("click", (function() {
                        container.classList.remove("dn-opened");
                        callback(messagedetails);
                        setTimeout((function() {
                            document.body.removeChild(container)
                        }
                        ), 1e3)
                    }
                    ))
                }
            }
        }
    }
    function showOnSiteBannerPromt(messagedetails) {
        var container = document.createElement("div");
        var className = "dengage-onsite-perm-banner";
        container.id = "dengage-onsite-perm-banner";
        container.className = className;
        container.innerHTML = generateOnSiteBannerHtml(messagedetails.message_json.content);
        document.body.insertBefore(container, document.body.firstChild);
        setTimeout((function() {
            container.className += " dn-opened"
        }
        ), 50);
        return {
            onDismissPopup: function onDismissPopup(callback) {
                document.querySelector(".dn-btn-banner-close").addEventListener("click", (function() {
                    container.classList.remove("dn-opened");
                    callback(messagedetails);
                    setTimeout((function() {
                        document.body.removeChild(container)
                    }
                    ), 1e3)
                }
                ))
            },
            clickInAppMessage: function clickInAppMessage(callback) {
                container.querySelector(".onsite-banner-btn").addEventListener("click", (function() {
                    container.classList.remove("dn-opened");
                    callback(messagedetails);
                    setTimeout((function() {
                        document.body.removeChild(container)
                    }
                    ), 1e3)
                }
                ))
            }
        }
    }
    function showOnSiteCustomHtmlPromt(messagedetails, callback) {
        dnIframMessagedetails = messagedetails;
        dnIframContainer = document.createElement("div");
        var className = "dengage-onsite-perm-customhtml";
        dnIframContainer.id = "dengage-onsite-perm-customhtml";
        dnIframContainer.className = className;
        document.body.appendChild(dnIframContainer);
        AppendCustomHTMLToIframContainer(dnIframMessagedetails.message_json.content, dnIframContainer, (function() {
            callback(dnIframContainer, dnIframMessagedetails)
        }
        ));
        setTimeout((function() {
            dnIframContainer.className += " dn-opened"
        }
        ), 50);
        return {
            onDismissPopup: function onDismissPopup(callback) {
                document.querySelector(".dengage-onsite-perm-customhtml, .dn-btn-popup-close").addEventListener("click", (function() {
                    dnIframContainer.classList.remove("dn-opened");
                    callback(dnIframMessagedetails);
                    setTimeout((function() {
                        document.body.removeChild(dnIframContainer)
                    }
                    ), 1e3)
                }
                ))
            }
        }
    }
    function onDismissPopupEvent(messageObject, callback) {
        var message_json = messageObject.message_json;
        var deviceId = getDeviceId();
        var contactKey = getContactKey();
        var url = new URL('https://pushdev.dengage.com/api/onsite/setAsDismissed');
        var data = {
            acc: "dvl",
            cdkey: contactKey != undefined && contactKey != '' ? contactKey : deviceId,
            type: contactKey != undefined && contactKey != '' ? 'c' : 'd',
            did: deviceId,
            message_details: message_json.messageDetails
        };
        url.search = new URLSearchParams(data).toString();
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'text/plain'
            },
            redirect: 'follow',
            referrer: 'no-referrer'
        });
        callback()
    }
    function SendPopupDisplayEvent(messageObject) {
        var message_json = messageObject.message_json;
        var deviceId = getDeviceId();
        var contactKey = getContactKey();
        var url = new URL('https://pushdev.dengage.com/api/onsite/setAsDisplayed');
        var data = {
            acc: "dvl",
            cdkey: contactKey != undefined && contactKey != '' ? contactKey : deviceId,
            type: contactKey != undefined && contactKey != '' ? 'c' : 'd',
            did: deviceId,
            message_details: message_json.messageDetails
        };
        url.search = new URLSearchParams(data).toString();
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'text/plain'
            },
            redirect: 'follow',
            referrer: 'no-referrer'
        })
    }
    function onClickPopupEvent(messageObject, callback) {
        var message_json = messageObject.message_json;
        var deviceId = getDeviceId();
        var contactKey = getContactKey();
        var url = new URL('https://pushdev.dengage.com/api/onsite/setAsClicked');
        var data = {
            acc: "dvl",
            cdkey: contactKey != undefined && contactKey != '' ? contactKey : deviceId,
            type: contactKey != undefined && contactKey != '' ? 'c' : 'd',
            did: deviceId,
            message_details: message_json.messageDetails,
            button_id: -1
        };
        url.search = new URLSearchParams(data).toString();
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'text/plain'
            },
            redirect: 'follow',
            referrer: 'no-referrer'
        });
        callback(messageObject)
    }
    function GetOnsiteMessageInterval() {
        var minutes = '1';
        return parseInt(minutes)
    }
    function GetNextMessageDisplayTimeInterval() {
        var dt = localStorage.getItem("next_onsite_message_display_time");
        if (dt == undefined || dt == null) {
            dt = new Date('0001-01-01');
            return dt.getTime()
        }
        return parseInt(dt)
    }
    function GetMessageDisplayTime(msgobj) {
        var dt = msgobj.next_display_time;
        if (dt == undefined || dt == null) {
            dt = new Date('0001-01-01');
            var updatedMessages = [];
            var _iterator = _createForOfIteratorHelper(GetOnSiteMessagesFromLocalStorage()), _step;
            try {
                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                    var messageObject = _step.value;
                    if (msgobj.smsg_id == messageObject.smsg_id) {
                        messageObject.next_display_time = dt.getTime()
                    }
                    updatedMessages.push(messageObject)
                }
            } catch (err) {
                _iterator.e(err)
            } finally {
                _iterator.f()
            }
            SortMessagesAndSaveInLocalStorage(updatedMessages, false);
            return dt.getTime()
        }
        return parseInt(dt)
    }
    function UpdateMessageDisplayTime(msgobj, updatedtime) {
        var updatedMessages = [];
        var _iterator2 = _createForOfIteratorHelper(GetOnSiteMessagesFromLocalStorage()), _step2;
        try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                var messageObject = _step2.value;
                if (msgobj.smsg_id == messageObject.smsg_id) {
                    messageObject.next_display_time = updatedtime.getTime()
                }
                updatedMessages.push(messageObject)
            }
        } catch (err) {
            _iterator2.e(err)
        } finally {
            _iterator2.f()
        }
        SortMessagesAndSaveInLocalStorage(updatedMessages, false)
    }
    function SetNextMessageDisplayTimeInterval(nextDisplayTime) {
        localStorage.setItem("next_onsite_message_display_time", nextDisplayTime)
    }
    function GetOnSiteMinSecBetweenMessages() {
        var minutes = '10';
        return parseInt(minutes)
    }
    function GetOnSiteMessagesFromLocalStorage() {
        var messages = localStorage.getItem("dengage_onsite_messages") == null ? "[]" : localStorage.getItem("dengage_onsite_messages");
        return JSON.parse(messages)
    }
    function CheckGetMessageIntervalReached() {
        var messageGetTimeStamp = localStorage.getItem('dengage_onsite_get_message_timestamp');
        if (messageGetTimeStamp == undefined || messageGetTimeStamp == null || messageGetTimeStamp == '') {
            return true
        }
        var currentdate = new Date;
        var messageIntervalTimeStamp = new Date(parseInt(messageGetTimeStamp));
        var diffMs = currentdate.getTime() - messageIntervalTimeStamp.getTime();
        var diffMins = Math.round(diffMs % 864e5 % 36e5 / 6e4);
        if (diffMins >= GetOnsiteMessageInterval()) {
            return true
        }
        return false
    }
    function GetOnSiteMessages(callback) {
        localStorage.setItem('dengage_onsite_get_message_timestamp', (new Date).getTime());
        var deviceId = getDeviceId();
        var contactKey = getContactKey();
        var url = new URL('https://pushdev.dengage.com/api/onsite/getMessages');
        var data = {
            acc: "dvl",
            cdkey: contactKey != undefined && contactKey != '' ? contactKey : deviceId,
            type: contactKey != undefined && contactKey != '' ? 'c' : 'd',
            did: deviceId
        };
        url.search = new URLSearchParams(data).toString();
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'text/plain'
            },
            redirect: 'follow',
            referrer: 'no-referrer'
        }).then((function(response) {
            return response.json().then((function(data) {
                return {
                    data: data,
                    status: response.status
                }
            }
            )).then((function(res) {
                console.log("Request response" + JSON.stringify(data));
                callback(res.data)
            }
            )).catch((function(e) {
                console.log(e)
            }
            ))
        }
        ))
    }
    function start() {
        if (CheckGetMessageIntervalReached()) {
            var responseCallBack = function responseCallBack(data) {
                SortMessagesAndSaveInLocalStorage(data)
            };
            GetOnSiteMessages(responseCallBack)
        }
    }
    function onDismissCallback(messageObject) {
        onDismissPopupEvent(messageObject, (function() {
            var message_json = messageObject.message_json;
            if (message_json.displayTiming.showEveryXMinutes == 0) {
                DeleteMessageFromLocalStorage(messageObject)
            } else {
                var nextDisplayTime = new Date;
                nextDisplayTime.setMinutes(nextDisplayTime.getMinutes() + parseInt(message_json.displayTiming.showEveryXMinutes));
                UpdateMessageDisplayTime(messageObject, nextDisplayTime)
            }
        }
        ))
    }
    function onClickCallback(messageObject) {
        onClickPopupEvent(messageObject, (function() {
            DeleteMessageFromLocalStorage(messageObject)
        }
        ))
    }
    function RegisterClickEventOfInsideIframElementCallback(dnIframContainer, dnIframMessagedetails) {
        var dnIfram = document.getElementById('dn-ifram');
        var oDoc = dnIfram.contentWindow || dnIfram.contentDocument;
        if (oDoc.document) {
            var iElement = oDoc.document.querySelectorAll("input[type=button],button ,a");
            for (var index = 0; index < iElement.length; index++) {
                iElement[index].addEventListener("click", (function() {
                    dnIframContainer.classList.remove("dn-opened");
                    onClickCallback(dnIframMessagedetails);
                    setTimeout((function() {
                        document.body.removeChild(dnIframContainer)
                    }
                    ), 1e3)
                }
                ))
            }
        }
    }
    function setNavigation(params) {
        var screenName = '';
        if (Object.keys(params).length > 0) {
            screenName = params.name
        }
        if (GetNextMessageDisplayTimeInterval() >= (new Date).getTime())
            return;
        var pageUrl = document.location.href;
        var _iterator3 = _createForOfIteratorHelper(GetOnSiteMessagesFromLocalStorage()), _step3;
        try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                var messageObject = _step3.value;
                if (messageObject.message_json.displayTiming.triggerBy != 'NAVIGATION') {
                    continue
                }
                if (Date.parse(messageObject.message_json.expireDate) <= Date.parse((new Date).toISOString())) {
                    DeleteMessageFromLocalStorage(messageObject);
                    continue
                }
                if (GetMessageDisplayTime(messageObject) < (new Date).getTime()) {
                    var IsShowPopups = false;
                    if (messageObject.message_json.displayCondition.whenToDisplay == 'HOME_PAGE') {
                        var _url = new URL(pageUrl);
                        if (_url.pathname == '/' && (_url.hash == '' || _url.hash == '#/')) {
                            IsShowPopups = true
                        }
                    } else if (ValidateScreenName(messageObject.message_json.displayCondition.screenNameFilters, screenName) && ValidatePageURL(messageObject.message_json.displayCondition.pageUrlFilters, pageUrl)) {
                        IsShowPopups = true
                    }
                    if (IsShowPopups) {
                        var promt = null;
                        if (messageObject.message_json.content.type.toLowerCase() == 'popup') {
                            promt = showPopupPromt(messageObject)
                        } else if (messageObject.message_json.content.type.toLowerCase() == 'banner' && document.getElementsByClassName("dengage-onsite-perm-banner").length == 0) {
                            promt = showOnSiteBannerPromt(messageObject)
                        } else if (messageObject.message_json.content.type.toLowerCase() == 'html') {
                            promt = showOnSiteCustomHtmlPromt(messageObject, RegisterClickEventOfInsideIframElementCallback)
                        }
                        if (promt != null) {
                            promt.onDismissPopup(onDismissCallback);
                            try {
                                promt.clickInAppMessage(onClickCallback)
                            } catch (_unused) {}
                            SendPopupDisplayEvent(messageObject);
                            var nextDisplayTime = new Date;
                            if (GetOnSiteMinSecBetweenMessages() > 0) {
                                nextDisplayTime.setMinutes(nextDisplayTime.getMinutes() + GetOnSiteMinSecBetweenMessages());
                                SetNextMessageDisplayTimeInterval(nextDisplayTime.getTime())
                            }
                        }
                        break
                    }
                }
            }
        } catch (err) {
            _iterator3.e(err)
        } finally {
            _iterator3.f()
        }
    }
    function ValidateScreenName(screenNameFilters, currentScreenName) {
        if (screenNameFilters.length > 0) {
            var IsValidScreenName = false;
            for (var index = 0; index < screenNameFilters.length; index++) {
                IsValidScreenName = false;
                switch (screenNameFilters[index].operator) {
                case "EQUALS":
                    {
                        if (screenNameFilters[index].value.indexOf(currentScreenName) > -1)
                            IsValidScreenName = true
                    }
                    break;
                case "NOT_EQUALS":
                    {
                        if (screenNameFilters[index].value.indexOf(currentScreenName) < 0)
                            IsValidScreenName = true
                    }
                    break;
                case "LIKE":
                    {
                        if (screenNameFilters[index].value.includes(currentScreenName))
                            IsValidScreenName = true
                    }
                    break;
                case "NOT_LIKE":
                    {
                        if (!screenNameFilters[index].value.includes(currentScreenName))
                            IsValidScreenName = true
                    }
                    break;
                case "STARTS_WITH":
                    {
                        if (screenNameFilters[index].value.findIndex((function(name) {
                            return name.value.startsWith(currentScreenName)
                        }
                        ), currentScreenName) > -1)
                            IsValidScreenName = true
                    }
                    break;
                case "NOT_STARTS_WITH":
                    {
                        if (screenNameFilters[index].value.findIndex((function(name) {
                            return !name.value.startsWith(currentScreenName)
                        }
                        ), currentScreenName) > -1)
                            IsValidScreenName = true
                    }
                    break;
                case "ENDS_WITH":
                    {
                        if (screenNameFilters[index].value.findIndex((function(name) {
                            return name.value.endsWith(currentScreenName)
                        }
                        ), currentScreenName) > -1)
                            IsValidScreenName = true
                    }
                    break;
                case "NOT_ENDS_WITH":
                    {
                        if (screenNameFilters[index].value.findIndex((function(name) {
                            return !name.value.endsWith(currentScreenName)
                        }
                        ), currentScreenName) > -1)
                            IsValidScreenName = true
                    }
                    break;
                case "IN":
                    {
                        if (screenNameFilters[index].value.includes(currentScreenName))
                            IsValidScreenName = true
                    }
                    break;
                case "NOT_IN":
                    {
                        if (!screenNameFilters[index].value.includes(currentScreenName))
                            IsValidScreenName = true
                    }
                    break
                }
                if (IsValidScreenName) {
                    break
                }
            }
            return IsValidScreenName
        } else {
            return true
        }
    }
    function ValidatePageURL(pageURLFilters, currentPageURL) {
        if (pageURLFilters.length > 0) {
            var IsValidPageURL = false;
            for (var index = 0; index < pageURLFilters.length; index++) {
                IsValidPageURL = false;
                switch (pageURLFilters[index].operator) {
                case "EQUALS":
                    {
                        if (pageURLFilters[index].value.indexOf(currentPageURL) > -1)
                            IsValidPageURL = true
                    }
                    break;
                case "NOT_EQUALS":
                    {
                        if (pageURLFilters[index].value.indexOf(currentPageURL) < 0)
                            IsValidPageURL = true
                    }
                    break;
                case "LIKE":
                    {
                        if (pageURLFilters[index].value.includes(currentPageURL))
                            IsValidPageURL = true
                    }
                    break;
                case "NOT_LIKE":
                    {
                        if (!pageURLFilters[index].value.includes(currentPageURL))
                            IsValidPageURL = true
                    }
                    break;
                case "STARTS_WITH":
                    {
                        if (pageURLFilters[index].value.findIndex((function(name) {
                            return name.value.startsWith(currentPageURL)
                        }
                        ), currentPageURL) > -1)
                            IsValidPageURL = true
                    }
                    break;
                case "NOT_STARTS_WITH":
                    {
                        if (pageURLFilters[index].value.findIndex((function(name) {
                            return !name.value.startsWith(currentPageURL)
                        }
                        ), currentPageURL) > -1)
                            IsValidPageURL = true
                    }
                    break;
                case "ENDS_WITH":
                    {
                        if (pageURLFilters[index].value.findIndex((function(name) {
                            return name.value.endsWith(currentPageURL)
                        }
                        ), currentPageURL) > -1)
                            IsValidPageURL = true
                    }
                    break;
                case "NOT_ENDS_WITH":
                    {
                        if (pageURLFilters[index].value.findIndex((function(name) {
                            return !name.value.endsWith(currentPageURL)
                        }
                        ), currentPageURL) > -1)
                            IsValidPageURL = true
                    }
                    break;
                case "IN":
                    {
                        if (pageURLFilters[index].value.includes(currentPageURL))
                            IsValidPageURL = true
                    }
                    break;
                case "NOT_IN":
                    {
                        if (!pageURLFilters[index].value.includes(currentPageURL))
                            IsValidPageURL = true
                    }
                    break
                }
                if (IsValidPageURL) {
                    break
                }
            }
            return IsValidPageURL
        } else {
            return true
        }
    }
    function SortMessagesAndSaveInLocalStorage(messages, needtocheckexistingmessages) {
        if (needtocheckexistingmessages == undefined) {
            needtocheckexistingmessages = true
        }
        if (needtocheckexistingmessages) {
            var existingMessages = JSON.parse(localStorage.getItem("dengage_onsite_messages") == undefined || localStorage.getItem("dengage_onsite_messages") == null ? "[]" : localStorage.getItem("dengage_onsite_messages"));
            var _iterator4 = _createForOfIteratorHelper(existingMessages), _step4;
            try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
                    var m = _step4.value;
                    messages.push(m)
                }
            } catch (err) {
                _iterator4.e(err)
            } finally {
                _iterator4.f()
            }
        }
        var sortedMessages = messages.sort((function(a, b) {
            var sortValue = 1;
            if (a.message_json.priority < b.message_json.priority || a.message_json.expireDate < b.message_json.expireDate || a.message_json.displayCondition.screenNameFilters.length < b.message_json.displayCondition.screenNameFilters.length) {
                sortValue = -1
            }
            return sortValue
        }
        ));
        localStorage.setItem("dengage_onsite_messages", JSON.stringify(sortedMessages))
    }
    function DeleteMessageFromLocalStorage(m_obj) {
        var localMessage = GetOnSiteMessagesFromLocalStorage();
        var _iterator5 = _createForOfIteratorHelper(localMessage), _step5;
        try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
                var m = _step5.value;
                if (m.smsg_id == m_obj.smsg_id) {
                    var index = localMessage.findIndex((function(i) {
                        return i.smsg_id === m_obj.smsg_id
                    }
                    ));
                    if (index > -1) {
                        localMessage.splice(index, 1)
                    }
                }
            }
        } catch (err) {
            _iterator5.e(err)
        } finally {
            _iterator5.f()
        }
        SortMessagesAndSaveInLocalStorage(localMessage, false)
    }
    function checkPush(showError) {
        var pushEnabled = false;
        try {
            pushEnabled = JSON.parse('true')
        } catch (e) {}
        if (pushEnabled == false && showError === true) {
            logError('Web push is not enabled for this site on dengage platform');
            return false
        }
        return pushEnabled
    }
    function checkOnSite(showError) {
        var onsiteEnabled = false;
        try {
            onsiteEnabled = JSON.parse('true')
        } catch (e) {}
        if (onsiteEnabled == false && showError === true) {
            logError('onsite popups are not enabled for this site on dengage platform');
            return false
        }
        return onsiteEnabled
    }
    var publicMethods = {
        initialize: function initialize(params, callback) {
            var cb = function cb() {
                start$2();
                if (callback) {
                    callback()
                }
            };
            if (pushClient.detected() && checkPush(false)) {
                if (_typeof(params) == 'object') {
                    pushClient.setParams(params)
                }
                if (document.readyState == 'complete') {
                    start$1(cb)
                } else {
                    window.addEventListener('load', (function() {
                        start$1(cb)
                    }
                    ))
                }
            } else {
                cb()
            }
            if (checkOnSite(false)) {
                if (document.readyState == 'complete') {
                    start()
                } else {
                    window.addEventListener('load', (function() {
                        start()
                    }
                    ))
                }
            }
        },
        setLogLevel: function setLogLevel$1(val, callback) {
            setLogLevel(val);
            if (callback) {
                callback()
            }
        },
        showNativePrompt: function showNativePrompt$1(callback) {
            if (!checkPush(true)) {
                return
            }
            showNativePrompt().then((function(result) {
                if (callback) {
                    callback(result)
                }
            }
            ))
        },
        showCustomPrompt: function showCustomPrompt$1(callback) {
            if (!checkPush(true)) {
                return
            }
            showCustomPrompt().then((function(result) {
                if (callback) {
                    callback(result)
                }
            }
            ))
        },
        getNotificationPermission: function getNotificationPermission(callback) {
            if (!checkPush(true)) {
                return
            }
            if (callback) {
                callback(pushClient.getPermission())
            }
        },
        getToken: function getToken$1(callback) {
            if (!checkPush(true)) {
                return
            }
            if (callback) {
                callback(getToken())
            }
        },
        isPushNotificationsSupported: function isPushNotificationsSupported(callback) {
            if (!checkPush(true)) {
                return
            }
            if (callback) {
                callback(pushClient.detected())
            }
        },
        getDeviceId: function getDeviceId$1(callback) {
            if (callback) {
                callback(getDeviceId())
            }
        },
        setDeviceId: function setDeviceId$1(val, callback) {
            setDeviceId(val);
            if (callback) {
                callback()
            }
        },
        provideUserConsent: function provideUserConsent() {},
        sendDeviceEvent: function sendDeviceEvent$1(table, data, callback) {
            sendDeviceEvent(table, data).then((function() {
                if (callback) {
                    callback()
                }
            }
            ))
        },
        sendCustomEvent: function sendCustomEvent$1(table, key, data, callback) {
            sendCustomEvent(table, key, data).then((function() {
                if (callback) {
                    callback()
                }
            }
            ))
        },
        setContactKey: function setContactKey$1(val, callback) {
            setContactKey(val);
            if (callback) {
                callback()
            }
        },
        getContactKey: function getContactKey$1(callback) {
            if (callback) {
                callback(getContactKey())
            }
        },
        setTags: function setTags(params, callback) {
            setTagsFn(params).then((function() {
                if (callback) {
                    callback()
                }
            }
            ))
        },
        setNavigation: function setNavigation$1(params) {
            if (!checkOnSite(true)) {
                return
            }
            if (params == undefined) {
                params = {}
            }
            setNavigation(params)
        }
    };
    if ('Promise'in window && 'fetch'in window) {
        if (storage.isAvailable()) {
            isBotOrPrivateWindow().then((function(botOrPrivate) {
                if (botOrPrivate !== true) {
                    var q = window.dengage.q || [];
                    startSession();
                    window.dengage = function() {
                        if (typeof arguments[0] != 'string') {
                            logError('dengage function requires function name as string');
                            return
                        }
                        if (arguments[0].indexOf('ec:') == 0) {
                            ecommFunctions[arguments[0].replace('ec:', '')].apply(this, Array.prototype.slice.call(arguments, 1))
                        } else {
                            publicMethods[arguments[0]].apply(this, Array.prototype.slice.call(arguments, 1))
                        }
                    }
                    ;
                    q.forEach((function(command) {
                        window.dengage.apply(this, command)
                    }
                    ))
                }
            }
            ))
        }
    }
    function isBotOrPrivateWindow() {
        if (isbot(navigator.userAgent)) {
            return Promise.resolve(true)
        } else {
            return isPrivateWindow()
        }
    }
}
)();

