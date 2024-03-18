const fs = require("fs");
const common = require("@ava/common");
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

(async () => {
  const script = `self.addEventListener("notificationclick", function (event) {
  console.log(event.notification);
  const path = event.notification.data.url;
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        // Check if there is already a window/tab open with the target URL
        for (let i = 0; i < windowClients.length; i++) {
          let client = windowClients[i];
          let url = new URL(client.url);
          // If so, just focus it.
          if (url.pathname === path && "focused" in client) {
            return client.focus();
          }
        }
        // If not, then open the target URL in a new window/tab.
        if (clients.openWindow) {
          return clients.openWindow(baseUrl + path);
        }
      })
  );
});

const showNotification = (payload) => {
  if (payload.data.type === "chat") {
    const notificationTitle = \`New message in \${payload.data.group_name}\`;
    const notificationOptions = {
      body: \`\${payload.data.sender_name} has sent a message.\`,
      icon: "/assets/images/icons/favicon.ico",
      data: {
        url: \`/consultation/consultation/\${payload.data.group_type_id}/message\`,
        payload: payload,
      },
      tag: \`\${payload.data.id}\`,
      renotify: true
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  }
};

messaging.setBackgroundMessageHandler((payload) => {
  self.clients.matchAll({ includeUncontrolled: true }).then(function (clients) {
    //you can see your main window client in this list.
    clients.forEach(function (client) {
      client.postMessage(payload);
    });
  });
  showNotification(payload);
  if (payload.data.type === "chat") {
    localforage.getItem("lastGroupId").then((val) => {
      if (val == payload.data.group_id) {
        localforage.setItem("latestMessageId", payload.data.id).then(() => {
          console.log('storage updated. with ', payload.data.id);
        })
      }
    });
  }
});
`;

  const serviceWorker = `
importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js"
);
importScripts("localforage.min.js");

firebase.initializeApp(${JSON.stringify(common.FIREBASE_CONFIG)});
const baseUrl = "${baseURL}";
const messaging = firebase.messaging();
${script}
`;

  console.log("Writing Firebase Service Worker");
  fs.writeFileSync("public/firebase-messaging-sw.js", serviceWorker);
})();
