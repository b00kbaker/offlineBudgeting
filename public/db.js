let db;

const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

// request.onerror = function (e) {
//   console.log("There was an error");
// };

request.onsuccess = function (event) {
  db = event.target.result;
  if (navigator.onLine) {
      searchDatabase();
  }
};

request.onerror = function (event){
    console.log("Error" + event.target.errorCode);
};
 
function searchDatabase(){
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");
    const getAll = store.getAll();

    getAll.onsuccess = function(){
        if (all.result.length > 0){
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(all.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(() => {
                transaction;
                store;
                store.clear();
            });
        }
    }
}

window.addEventListener("online", searchDatabase);
