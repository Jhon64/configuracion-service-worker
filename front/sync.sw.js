
function openBgSyncDB() {
  return new Promise((resolve, reject) => {
    var open_request = indexedDB.open("BgSyncDemoDB", 1);
    open_request.onerror = function(event) {
       reject(new Error("Error opening database."));
    };
    open_request.onsuccess = function(event) {
        resolve(event.target.result);
    };
    open_request.onupgradeneeded = function(event) {
      var db = event.target.result;
      db.createObjectStore("syncs", { keyPath: "type" });
    };
  })
}

function updateSyncTime(db, syncType, syncTime) {
  return new Promise((resolve, reject) => {
    var store = db.transaction(["syncs"], "readwrite").objectStore("syncs");
    var get_request = store.get(syncType);

    get_request.onerror = function(event) {
      reject(new Error("Error getting value from database."));
    }

    get_request.onsuccess = function(event) {
      var data = get_request.result || { type: syncType };
      data.time = syncTime;
      data.syncCount = (data.syncCount || 0) + 1;
      var put_request = store.put(data);

      put_request.onerror = function(event) {
        reject(new Error("Error saving value to database."));
      }

      put_request.onsuccess = function(event) {
        resolve(data.syncCount);
      };
    };
  });
}

function postErrorToClients(err) {
  clients.matchAll({includeUncontrolled: true})
  .then(clientList => {
     clientList.forEach(client => client.postMessage(err.message));
  });
}