importScripts("https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.2.1/firebase-messaging.js");

var fb = firebase.initializeApp({
  messagingSenderId: "992812112924"
});

const messaging = fb.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.message,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
