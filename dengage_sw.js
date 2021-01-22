(function () {
  "use strict";
  var appSettings = JSON.parse(
    '{  "name": "ShowCase - Web (SİLME)",  "siteUrl": "https://muhammed-wh.github.io/",  "autoShow": true,  "bellSettings": {    "size": "MEDIUM",    "location": "RIGHT",    "mainColor": "#1165f1",    "leftOffset": 0,    "accentColor": "#333333",    "dialogTitle": "",    "rightOffset": 0,    "bottomOffset": 0,    "advancedOptions": false,    "unsubscribeText": "",    "hideIfSubscribed": false,    "subscribeBtnText": "",    "unblockGuideText": "",    "subscribedTooltip": "",    "unsubscribeBtnText": "",    "nonSubscriberTooltip": "",    "afterSubscriptionText": "",    "unblockNotificationText": "",    "blockedSubscriberTooltip": ""  },  "slideSettings": {    "text": "We\'d like to show you notifications for the latest news and updates.",    "fixed": true,    "theme": "BOTTOM_BTNS",    "title": "Welcome",    "details": null,    "location": "TOP_CENTER",    "showIcon": true,    "mainColor": "#13AD5B",    "showTitle": true,    "acceptBtnText": "Allow",    "cancelBtnText": "No Thanks",    "advancedOptions": false  },  "bannerSettings": {    "text": "",    "fixed": true,    "theme": "DEFAULT",    "details": null,    "location": "TOP",    "showIcon": true,    "mainColor": "#000000",    "acceptBtnText": "Enable",    "advancedOptions": false  },  "defaultIconUrl": "https://avatars2.githubusercontent.com/u/57666388?s=460&v=4",  "selectedPrompt": "SLIDE",  "autoShowSettings": {    "delay": 0,    "denyWaitTime": 0,    "promptAfterXVisits": 0,    "repromptAfterXMinutes": 0  },  "welcomeNotification": {    "link": "",    "title": "",    "enabled": false,    "message": ""  }}'
  );
  function parseIfString(input) {
    if (typeof input == "string" && input) {
      return JSON.parse(input);
    } else {
      return input;
    }
  }
  function showNotificationWithSw(data, registration) {
    var title = data.title;
    var iconUrl =
      data.iconUrl == "default_icon"
        ? appSettings.defaultIconUrl
        : (data.iconUrl || "").trim();
    var options = {
      body: data.message,
      requireInteraction: true,
      data: {
        targetUrl: data.targetUrl,
        messageId: data.messageId,
        messageDetails: data.messageDetails,
        dengageSendId: data.dengageSendId,
      },
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
    if (data.actionButtons && data.actionButtons.length) {
      options.actions = [];
      var actions = parseIfString(data.actionButtons) || [];
      for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
        options.actions[actionIndex] = {
          action: actions[actionIndex].id,
          title: actions[actionIndex].text,
        };
        if (actions[actionIndex].icon) {
          options.actions[actionIndex].icon = actions[actionIndex].icon;
        }
      }
      options.data.actionButtons = actions;
    }
    return registration.showNotification(title, options);
  }
  function handleNotificationClick(event) {
    event.notification.close();
    var windowOpenPromise = Promise.resolve();
    var sendOpenPromise = Promise.resolve();
    var action = (event.notification.data.actionButtons || []).find(function (
      b
    ) {
      return b.id == event.action;
    });
    if (event.action && action) {
      if (action.targetUrl) {
        var url = addDengageParamsToUrl(
          action.targetUrl,
          event.notification.data.dengageSendId
        );
        windowOpenPromise = clients.openWindow(url);
      }
      if (event.notification.data.messageId != null) {
        sendOpenPromise = sendOpen(
          event.notification.data.messageId,
          event.notification.data.messageDetails,
          action.id
        );
      }
    } else if (event.notification.data.targetUrl) {
      var _url = addDengageParamsToUrl(
        event.notification.data.targetUrl,
        event.notification.data.dengageSendId
      );
      windowOpenPromise = clients.openWindow(_url);
      if (event.notification.data.messageId != null) {
        sendOpenPromise = sendOpen(
          event.notification.data.messageId,
          event.notification.data.messageDetails
        );
      }
    }
    event.waitUntil(Promise.all([windowOpenPromise, sendOpenPromise]));
  }
  function addDengageParamsToUrl(url, sendId) {
    var u = new URL(url);
    u.searchParams.set("dn_send_id", sendId);
    u.searchParams.set("dn_channel", "web_push");
    return u.toString();
  }
  function sendOpen(messageId, messageDetails, buttonId) {
    var data = {
      integrationKey:
        "JzrRo6cKDwZqx_p_l_UbcAUKr3NPzaLmE5ojUYbfWgW1AgsD8k4OdLCh4xU7FoP2osnO0l75e_s_l_rYGtnb3ujRBVtePUNw1G5dVN0IaqcgycxSUH147fqkOY8n42RMs_s_l_1cld31W8C5XikpvduI9tHYs4KDjg_e_q__e_q_",
      messageId: messageId,
      messageDetails: messageDetails,
      buttonId: buttonId || "",
    };
    return fetch("https://pushdev.dengage.com/api/web/open", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: { "Content-Type": "text/plain" },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data),
    });
  }
  self.addEventListener("install", function (event) {
      console.log('dengage install');
    event.waitUntil(self.skipWaiting());
  });
  self.addEventListener("activate", function (event) {
    console.log('dengage activate');
    event.waitUntil(self.clients.claim());
  });
  self.addEventListener("push", function (event) {
    var data = event.data.json();
    console.log(
      "[dengage-webpush-sw.js] Received message ",
      JSON.stringify(data)
    );
    event.waitUntil(showNotificationWithSw(data, self.registration));
  });
  self.addEventListener("notificationclick", function (event) {
    handleNotificationClick(event);
  });
})();
