const versionCache = 'app-v1';

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(version);
  await cache.addAll(resources);
};


// urlB64ToUint8Array es una función mágica que codificará la clave pública base64 
// en el búfer de matriz que necesita la opción de suscripción 
const urlB64ToUint8Array = base64String => { 
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4) 
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
   const rawData = atob(base64) 
   const outputArray =  new Uint8Array(rawData.length) 
  for (let i = 0; i < rawData.length; ++i) { 
    outputArray[i] = rawData.charCodeAt(i) 
  } 
  return outputArray 
}
// saveSubscription saves the subscription to the backend
const saveSubscription = async subscription => {
  const SERVER_URL = 'http://localhost:4000/save-subscription'
  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  })
  return response.json()
}


//*configuraciones para notificaicones push


const showLocalNotification = (title, body, swRegistration) => {
  const options = {
      body,
      // here you can add more properties like icon, image, vibrate, etc.
  };
  swRegistration.showNotification(title, options);
}



//*configuraciones para almacenamiento en cache fetchs


//*los fetchs
//*servimos la informacion que tenemos en cache primero
const putInCache = async (request, response) => {
  const cache = await caches.open(version);

  if (request.method !== 'GET') {
    console.log('Cannot cache non-GET requests');
    return;
  }

  await cache.put(request, response);
};
const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);

  if (responseFromCache) {
    return responseFromCache;
  }

  const responseFromNetwork = await fetch(request);

  // we need to clone the response because the response stream can only be read once
  putInCache(request, responseFromNetwork.clone());

  return responseFromNetwork;
};




