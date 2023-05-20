function registerLog() {
  var logEl = document.querySelector(".log");
  function log(msg) {
    var p = document.createElement("p");
    p.textContent = msg;
    logEl.appendChild(p);
    console.log(msg);
  }
}

function randomNotification() {
  var randomItem = Math.floor(Math.random() * games.length);
  var notifTitle = games[randomItem].name;
  var notifBody = "Creado por " + games[randomItem].author + ".";
  var notifImg = "data/img/" + games[randomItem].slug + ".jpg";
  var options = {
    body: notifBody,
    icon: notifImg,
  };
  var notif = new Notification(notifTitle, options);
  setTimeout(randomNotification, 30000);
}

function activeNotificacionesPush() {
  // Comprobamos si el navegador soporta las notificaciones
  if (!("Notification" in window)) {
    console.log(
      "Este navegador no es compatible con las notificaciones de escritorio"
    );
  }

  // Comprobamos si los permisos han sido concedidos anteriormente
  else if (Notification.permission === "granted") {
    // Si es correcto, lanzamos una notificación
    // var notification = new Notification("Hola!");
    console.log("permisos para notificaciones concedido");
  }

  // Si no, pedimos permiso para la notificación
  else if (
    Notification.permission == "denied" ||
    Notification.permission === "default"
  ) {
    Notification.requestPermission(function (permission) {
      // Si el usuario nos lo concede, creamos la notificación
      if (permission === "granted") {
        // var notification = new Notification("Hola!");
        console.log("permisos para notificaciones concedido");
      }
    });
  }
}

async function enviarNotificacionPush() {
  let textElement = document.querySelector("#textNotificacion");
  let text = textElement.value || "";
  const title = "Poll";

  const options = {
    body: text,
    image: "/front/assets/192x192.png",
    icon: "/front/assets/72x72.png",
    badge: "/front/assets/72x72.png",
    actions: [
      {
        action: "yes",
        type: "button",
        title: "Aceptar",
        action: "aceptar-action",
      },
      {
        action: "no",
        type: "text",
        title: "Cancelar",
        action: "cancelar-action",
      },
    ],
  };
  const swRegister = await navigator.serviceWorker.getRegistration();
  if (swRegister.active) {
    swRegister.showNotification("Tienda App", options).then((subs) => {});
    const maxVisibleActions = window.Notification?.maxActions;
    const acciones= window.Notification
    if (maxVisibleActions) {
      options.body = `Up to ${maxVisibleActions} notification actions can be displayed.`;
    } else {
      options.body = "Notification actions are not supported.";
    }
  }
}

function estadoDeRed() {
  var online = navigator.onLine;
  styleStatusNetWork(online);
  // document.getElementById("statusNetwork").innerHTML = online ? 'Online' : 'Offline';
}

function initApp() {
  // registerWorker()
  estadoDeRed();
  verifyServiceWorker();
}
window.onload = () => {
  initApp();
};
