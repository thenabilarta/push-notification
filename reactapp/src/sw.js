/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
function firstWindowClient() {
  return clients.matchAll({ type: "window" }).then(function (windowClients) {
    console.log(windowClients);

    return windowClients.length
      ? windowClients[0]
      : Promise.reject("No clients");
  });
}

self.addEventListener("install", function (event) {
  event.waitUntil(skipWaiting());
});

self.addEventListener("activate", function (event) {
  event.waitUntil(clients.claim());
});

// Marks the website as being installable in Chrome.
self.addEventListener("fetch", function (event) {});

self.addEventListener("notificationclick", function (event) {
  var promise = Promise.resolve();

  event.waitUntil(promise);
});

self.addEventListener("notificationclose", function (event) {
  firstWindowClient();
});
