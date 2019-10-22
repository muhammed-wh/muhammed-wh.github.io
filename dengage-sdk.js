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

})();