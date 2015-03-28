/**
 * service worker script
 *
 */
/* globals self */

const icon_path = "/public/img/html5-badge.png";

self.addEventListener("install", function () {
  console.log("installed.");
});

self.addEventListener("activate", function () {
  console.log("activated.");
});

self.addEventListener("message", function (event) {
  console.log("message:", event.data);
});

self.addEventListener("push", function (event) {
  console.log("push event");
  var notification = self.registration.showNotification("YO!", {
    body: "Hello Service Worker Push!",
    icon: icon_path,
    tag: "okusureminder"
  });
  event.waitUntil(notification);
});
