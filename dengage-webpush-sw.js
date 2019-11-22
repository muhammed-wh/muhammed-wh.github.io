(function () {
  'use strict';

  /*messaging.setBackgroundMessageHandler(function(payload) {
    console.log("[dengage-webpush-sw.js] Received message ", payload);

    const data = payload.data;
    const title = data.title;
    const options = {
      body: data.message,
      image: data.mediaUrl,
      requireInteraction: true,
      data: {
        targetUrl: data.targetUrl,
        messageId: data.messageId,
        messageDetails: data.messageDetails,
      },
    };

    return self.registration.showNotification(title, options);
  });*/
  self.addEventListener('push', function (event) {
    var data = event.data.text();
    console.log("[dengage-webpush-sw.js] Received message ", data);
    self.registration.showNotification('Burası yapılacak', {
      body: data
    });
  });
  self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.targetUrl));
    sendOpen(event.notification.data.messageId, event.notification.data.messageDetails);
  });

  function sendOpen(messageId, messageDetails) {
    var data = {
      "integrationKey": "GylYPy9XfZj0xir63kYLbpqqUTYZ2DfY629Tc_p_l_XlF3M6DJDzaE_s_l_pvwU8UKkKe4RN1lcUzkPnjB_p_l_IRnHz3MsWiQmEFbBu0sHLmKY96jwadN3CAAEJjRU7RlYaaZb0GBLT",
      "messageId": messageId,
      "messageDetails": messageDetails
    };
    var request = fetch('https://pushdev.dengage.com/api/web/open', {
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
  }

}());
