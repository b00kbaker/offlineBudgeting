let db;

const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onerror = function (e) {
  console.log("There was an error");
};

request.onsuccess = function (event) {
  db = event.target.result;
  if (navigator.onLine) {
      searchDatabase();
  }
};

request.onerror = function (event){
    console.log("Error" + event.target.errorCode);
};
 
