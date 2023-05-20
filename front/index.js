
const styleStatusService=(registered)=>{
  const labelElement = document.querySelector("#statusServiceWorker");
  const btn=document.querySelector("#btnRegistrarSW")
  const btnDeleteSW=document.querySelector("#btnEliminarSW")
  labelElement.innerHTML = "registrar service Worker";
  let labelStatusServiceWorker='p-1 text-white rounded'
  if(registered)labelStatusServiceWorker+=' bg-green-500 '
  else labelStatusServiceWorker+=' bg-red-500 '
  if (registered) {
    btnDeleteSW.removeAttribute('hidden')
    btn.setAttribute('hidden',true)
    btnDeleteSW.className='bg-red-500 rounded px-2 text-white'
    labelElement.innerHTML = "service worker registrado ...";
  } else {
    btn.className='bg-blue-500 rounded px-2 text-white'
    btn.removeAttribute('hidden')
    btnDeleteSW.setAttribute('hidden',true)
    labelElement.innerHTML = "registrar service worker ...";
  }
  labelElement.className=labelStatusServiceWorker
}

const styleStatusNetWork=(online)=>{
  const labelElement = document.querySelector("#statusNetwork");
  labelElement.innerHTML = "Estado de Red";
  let labelStatusServiceWorker='p-1 text-white rounded'
  if(online)labelStatusServiceWorker+=' bg-green-500 '
  else labelStatusServiceWorker+=' bg-red-500 '
  
  if (online) {
    labelElement.innerHTML = "Online";
  } else {
    labelElement.innerHTML = "Offline";
  }

  labelElement.className=labelStatusServiceWorker
}

const eliminarServiceWorker=()=>{
  const labelElement = document.querySelector("#statusServiceWorker");
  labelElement.innerHTML = "eliminando service Worker ...";
  let labelStyle='p-1 text-white rounded bg-blue-500'
  labelElement.className=labelStyle
  if(window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations()
    .then(function(registrations) {
      for(let registration of registrations) {
        registration.unregister();
      }
      labelElement.innerHTML = "service Worker eliminados...";
      labelStyle='p-1 text-white rounded bg-red-500'
      labelElement.className=labelStyle
    });
  }
  location.reload()
}

const verifyServiceWorker = async () => {
  //*para verificar si ya tenemos el service worker habilitado
  const swRegister = await navigator.serviceWorker.getRegistration();
  styleStatusService(swRegister?.active)
};

const registerWorker = async () => {
  const labelElement = document.querySelector("#statusServiceWorker");
  labelElement.innerHTML = "Registrando service worker ...";
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js", {
        scope: "./",
      });
      console.log("Service worker registration succeeded:", registration);
      registerLog("Success : Service worker registration succeeded");
      labelElement.innerHTML = "service worker registrado ...";
      return registration;
    } catch (error) {
      console.error(`Registration failed with ${error}`);
      labelElement.innerHTML = "erro al registrar ... " + error;
      registerLog("Error :" + error);
    }
    location.reload()
  }
};

function displayErrorFromWorker(message) {
  console.log("Error: ", message);
}

// window.addEventListener('message', displayErrorFromWorker);

// document.querySelector('.register').addEventListener('click', function(event) {
//   event.preventDefault();
//   new Promise(function(resolve, reject) {
//     Notification.requestPermission(function(result) {
//       if (result !== 'granted') return reject(Error("Denied notification permission"));
//       resolve();
//     })
//   }).then(function() {
//     return navigator.serviceWorker.ready;
//   }).then(function(reg) {
//     return reg.sync.register('syncTest');
//   }).then(function() {
//     log('Sync registered');
//   }).catch(function(err) {
//     log('It broke');
//     log(err.message);
//   });
// });

// const checkNotificacionPush = async () => {
//   if (!('serviceWorker' in navigator)) {
//     throw new Error('No Service Worker support!')
//   }
//   if (!('PushManager' in window)) {
//     throw new Error('No Push API Support!')
//   }

//   const status = await navigator.permissions.query({
//     name: 'periodic-background-sync',
//   });
//   if (status.state === 'granted') {
//     console.log('permiso de sync periodica::',status.state)
//     // Periodic background sync can be used.
//   } else {
//     // Periodic background sync cannot be used.
//     console.log('permiso denegado de sync periodica::',status.state)

//   }
// }

// const requestNotificationPermission = async () => {
//   const permission = await window.Notification.requestPermission();
//   // value of permission can be 'granted', 'default', 'denied'
//   // granted: user has accepted the request
//   // default: user has dismissed the notification permission popup by clicking on x
//   // denied: user has denied the request.
//   if(permission !== 'granted'){
//       throw new Error('Permission not granted for Notification');
//   }
// }

//*configuracion para notificacion
/**
 * const options = {
  "//": "Visual Options",
  "body": "<String>",
  "icon": "<URL String>",
  "image": "<URL String>",
  "badge": "<URL String>",
  "vibrate": "<Array of Integers>",
  "sound": "<URL String>",
  "dir": "<String of 'auto' | 'ltr' | 'rtl'>",
  "//": "Behavioural Options",
  "tag": "<String>",
  "data": "<Anything>",
  "requireInteraction": "<boolean>",
  "renotify": "<Boolean>",
  "silent": "<Boolean>",
  "//": "Both Visual & Behavioural Options",
  "actions": "<Array of Strings>",
  "//": "Information Option. No visual affect.",
  "timestamp": "<Long>"
}
 */

// const showLocalNotification = (title, body, swRegistration) => {
//   const options = {
//       body,
//       // here you can add more properties like icon, image, vibrate, etc.
//   };
//   swRegistration.showNotification(title, options);
// }

const main = async () => {
  // checkNotificacionPush()
  // requestNotificationPermission()
  // showLocalNotification('This is title', 'this is the message', swRegistration);
};

// main()
