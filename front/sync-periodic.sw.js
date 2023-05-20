
//* configuraciones para syncronizacion automatica

async function registrarPeriodycSync(){
  navigator.serviceWorker.ready.then(async registration => {
    try {
    await registration.periodicSync.register('get-cats', 
    { minInterval: 24 * 60 * 60 * 1000 });
      console.log('Periodic background sync registered.');
    } catch (err) {
      console.error(err.name, err.message);
    }
  });
  const registration = await navigator.serviceWorker.ready;
  if ('periodicSync' in registration) {
    console.log('registration periodic sync',registration)
    const tags = await registration.periodicSync.getTags();
    console.log('tags get',getTags)
    // Only update content if sync isn't set up.
    if (!tags.includes('content-sync')) {
      updateContentOnPageLoad();
    }
  } else {
    // If periodic background sync isn't supported, always update.
    updateContentOnPageLoad();
  }
}