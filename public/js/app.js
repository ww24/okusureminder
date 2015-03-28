/**
 * okusureminder
 * client side
 */

(function () {
  // Service Worker が使えない場合は終了
  if (! ("serviceWorker" in navigator)) {
    return console.error("Service Worker is unavailable.");
  }

  navigator.serviceWorker.register("/service_worker.js", {
    scope: "./"
  }).then(function (serviceWorkerRegistration) {
    // for debug
    window.st = serviceWorkerRegistration;

    if (! ("showNotification" in window.ServiceWorkerRegistration.prototype)) {
      return console.error("showNotification is unavailable");
    }

    if (window.Notification.permission === "denied") {
      return console.error("The user has blocked notification");
    }

    if (! ("PushManager" in window)) {
      return console.error("Push Manager is unavailable.");
    }

    return serviceWorkerRegistration.pushManager.getSubscription();
  }).then(function (subscription) {
    if (! subscription) {
      return console.error("Unsubscribed.");
    }

    console.log("subscriptions:", subscription.subscriptionId);
  }).catch(function (err) {
    console.error("serviceWorker.register:", err);
  });
})();

$(function () {
  $("#subscribe").click(function () {
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager.subscribe().then(function (subscription) {
        console.log("subscribe:", subscription.subscriptionId);
        alert("success!");
        $.ajax({
          method: "post",
          url: "/api/subscribe",
          data: JSON.stringify({
            id: subscription.subscriptionId,
            _csrf: _csrf
          }),
          contentType: "application/json",
          dataType: "json"
        }).then(function () {
          console.log("success");
        }, function (err) {
          console.error(err);
        });
      }).catch(function (err) {
        console.error("subscribe:", err);
      });
    });
  });

  $("#push").click(function () {
    $.ajax({
      method: "post",
      url: "/api/push",
      data: JSON.stringify({
        _csrf: _csrf
      }),
      contentType: "application/json",
      dataType: "json"
    }).then(function () {
      console.log("success");
    }, function (err) {
      console.error(err);
    });
  });
});
