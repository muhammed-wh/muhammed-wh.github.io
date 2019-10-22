(function() {

  if (!("serviceWorker" in navigator)) {
    throw new Error("No Service Worker support!");
  }
  if (!("PushManager" in window)) {
    throw new Error("No Push API Support!");
  }
  
  var firebaseConfig = {
    apiKey: "AIzaSyDbzYdx1P-_2QBUZbt8d9Zexb6Fk8fugZ8",
    //authDomain: "webpush-deneme.firebaseapp.com",
    //databaseURL: "https://webpush-deneme.firebaseio.com",
    projectId: "webpush-deneme",
    //storageBucket: "webpush-deneme.appspot.com",
    messagingSenderId: "992812112924",
    appId: "1:992812112924:web:4cc16aaa4afdefb94c13d9"
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