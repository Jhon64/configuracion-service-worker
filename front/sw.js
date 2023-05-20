//*service worker

if ("undefined" === typeof window) {
  importScripts(["./settings.sw.js"]);
  importScripts(["./sync.sw.js"]);
  importScripts(["./sync-periodic.sw.js"]);
}

self.addEventListener("install", (event) => {
  console.log(`${versionCache} installing...`);
  if (navigator.onLine) {
    console.info("Modo online");
    event.waitUntil(
      caches
        .keys()
        .then(function (keyList) {
          console.log("eliminando de cache.", keyList);
          return Promise.all(
            keyList.map(function (key) {
              return caches.delete(key).then(
                function (response) {
                  console.log("Cache-Key " + key + " será eliminado");
                  return response;
                },
                function (reject) {
                  console.log("error al eliminar " + key);
                  return reject;
                }
              );
            })
          );
        })
        .then(function () {
          caches.open(versionCache).then(function (cache) {
            console.log("index.html and all the others will be added to cache");
            return cache
              .addAll([
                "./",
                "./index.html",
                "./index.css",
                "./index.js",
                "./tailwindcss.js",
                "./sw.js",
                "./tailwindcss-material.css",
              ])
              .then(function (response) {
                console.log("Agregado exitosamente al cache");
              });
          });
        })
    );
  }
  // event.waitUntil(
  //   addResourcesToCache([
  //     "/",
  //     "/index.html",
  //     "/index.css",
  //     "/index.js",
  //     "/tailwindcss.js",
  //     "/sw.js",
  //     "/tailwindcss-material.css",
  //   ])
  // );
});

//*activando service worker
self.addEventListener("activate", async (event) => {
  console.log("activando service worker::", event);
  try {
    const applicationServerKey = urlB64ToUint8Array(
      "BJ5IxJBWdeqFDJTvrZ4wNRu7UY2XigDXjgiUBYEYVXDudxhEs0ReOJRBcBHsPYgZ5dyV8Vjyqzb QKS8V7bUAglk"
    );
    const opciones = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(
      opciones
    );
    // const response = await saveSubscription(subscription)
    console.log(JSON.stringify(subscribe));
  } catch (err) {
    console.log("Error", err);
  }
});

//*NOTIFICACION PUSH
self.addEventListener("push", function (event) {
  console.log("activando notifiacion push", event);
  if (event.data) {
    const message = event.data.text();
    console.log("Push event!! ", message);
    // event.showNotification('This is title', message)
    showLocalNotification("This is title", message, self.registration);
  } else {
    console.log("Push event but no data");
  }
});

//*escuchando acciones en la notificacion
self.addEventListener('notificationclick', (event) => {
  if (!event.action) {
    // Was a normal notification click
    console.log('Notification Click.');
    return;
  }

  switch (event.action) {
    case 'aceptar-action':
      console.log("User ❤️️'s coffee.");
      break;
    case 'cancelar-action':
      console.log("User ❤️️'s doughnuts.");
      break;
    default:
      console.log(`Unknown action clicked: '${event.action}'`);
      break;
  }
});

self.addEventListener("fetch", (event) => {
  // event.respondWith(cacheFirst(event.request));
  const agregarEnCache = async (request) => {
    const responseFromCache = await caches.match(request);

    if (responseFromCache) {
      return responseFromCache;
    }

    const responseFromNetwork = await fetch(request);
    const cache = await caches.open(versionCache);

    if (request.method !== "GET") {
      console.log("Cannot cache non-GET requests");
      return;
    }

    await cache.put(request, responseFromNetwork.clone());
    return responseFromNetwork;
  };

  const obtenerInformacionCache = async (request) => {
    const cache = await caches.open(versionCache);
    debugger;
    return caches.match(request);
  };

  //*metodologia network first
  event.respondWith(
    fetch(event.request).then(
      function (resolve) {
        console.log("Fetched " + event.request.url + " via red.");
        agregarEnCache(event.request);
        return resolve;
      },
      function (reject) {
        console.log(
          "Try to fetch " + event.request.url + " via service worker"
        );
        return obtenerInformacionCache(event.request);
      }
    )
  );
});

//* escucahndo synccronizacion
self.addEventListener("sync", function (sync_event) {
  console.log("sync service worker::", sync_event);
  var responseData;
  fetch(new Request("/sample.json", { cache: "no-store" }))
    .then((response) => {
      if (response.status == 200) {
        return response.text();
      } else {
        throw new Error("" + response.status + " " + response.statusText);
      }
    })
    .then((responseText) => {
      responseData = JSON.parse(responseText);
      return openBgSyncDB();
    })
    .then((db) => updateSyncTime(db, "one-shot", +new Date()))
    .then((syncCount) => {
      self.registration.showNotification(
        "Sync fired! (" +
          syncCount +
          ") Fetched list v" +
          responseData.list_version
      );
    })
    .catch((err) => {
      self.registration.showNotification("Sync fired! There was an error.");
      self.registration.showNotification(err.message);
      postErrorToClients(err);
    });
});

//*activando syncronizacion periodica
self.addEventListener("periodicsync", (event) => {
  console.log("sw periodic sync", event);
  if (event.tag === "content-sync") {
    event.waitUntil(syncContent());
  }
});
