export class NotificationFactory {
  requestPermission() {
    Notification.requestPermission();
  }

  registerServiceWorker() {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch(function (error) {
        console.error("Unable to register the service worker: " + error);
      });

    return navigator.serviceWorker.ready.then(function (serviceWorker) {
      return serviceWorker;
    });
  }

  display() {
    const title = "Notification Title",
      options = { body: "Notification Body" };

    const promise = this.displayNotification(title, options);

    return promise;
  }

  displayNotification(title, options) {
    return navigator.serviceWorker.ready
      .then(function (serviceWorker) {
        return serviceWorker.showNotification(title, options);
      })
      .catch(function (exception) {
        alert(exception);
      });
  }
}
