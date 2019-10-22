(function() {

  if (!("serviceWorker" in navigator)) {
    throw new Error("No Service Worker support!");
  }
  if (!("PushManager" in window)) {
    throw new Error("No Push API Support!");
  }
  
  var firebaseConfig = {
    messagingSenderId: "992812112924",
  };
  
  var fb = firebase.initializeApp(firebaseConfig);
  
  const messaging = fb.messaging();
  
  navigator.serviceWorker
      .register('/dengage-webpush-sw.js')
      .then((registration) => {
        messaging.useServiceWorker(registration);
      });
  
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      messaging.getToken().then((currentToken) => {
        if (currentToken) {
          console.log('Token: ' + currentToken);
          sendSubscription(currentToken);
        } else {
          console.log('empty token');
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
    } else {
      console.log('Unable to get permission to notify.');
    }
  });

  function sendSubscription(token) {
    var data = {
      "appAlias": "muhammed-wh.github.io/",
      "token": token,
      "contactKey": "",
      "permission": true,
      "udid": "123456789123456789123456789123456789",
      "carrierId": "",
      "appVersion": "",
      "sdkVersion": "0.1"
    };
    var requens = fetch('https://pushdev.dengage.com/api/mobile/subscription', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  }

})();