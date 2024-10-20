import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const clearButtonEl = document.getElementById("clear-button");
const outputContainerEl = document.querySelector(".output");
const storageItemsListEl = document.getElementById("storage-items-list");

const appSettings = {
  databaseURL: "https://playground-c8cad-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const storageInDB = ref(database, "storage");

addButtonEl.addEventListener("click", function () {
  const inputFieldElValue = inputFieldEl.value;

  push(storageInDB, inputFieldElValue);

  clearInputFieldEl();
});

clearButtonEl.addEventListener("click", function () {
  const removeAllItemsFromDBLocation = ref(database, `storage`);
  remove(removeAllItemsFromDBLocation);
});

onValue(storageInDB, function (snapshot) {
  if (snapshot.exists()) {
    const data = snapshot.val();
    const dataArray = Object.entries(data);

    clearStorageItemsListEl();

    for (let i = 0; i < dataArray.length; i++) {
      const item = dataArray[i];
      const id = item[0];
      const content = item[1];
      appendStorageItem(id, content);
    }
  } else {
    outputContainerEl.innerHTML = "Storage empty..... for now";
  }
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function clearStorageItemsListEl() {
  storageItemsListEl.innerHTML = "";
}

function appendStorageItem(id, content) {
  const storageItemEl = document.createElement("li");
  storageItemEl.innerText = content;
  storageItemsListEl.appendChild(storageItemEl);

  storageItemEl.addEventListener("click", function () {
    const removeItemFromDBLocation = ref(database, `storage/${id}`);
    remove(removeItemFromDBLocation);
  });
}
