import { deleteDB, openDB, unwrap, wrap } from "idb";

// use third party
export class IndexedDB {
  static openDB = openDB;
  static deleteDB = deleteDB
  static unwrap = unwrap
  static wrap = wrap
}

// self wrote
// export class IndexedDB {
//   /**@type {IDBOpenDBRequest} */
//   request;

//   /**@type {IDBDatabase} */
//   db;

//   static async create(databaseName, objectNames = [], version = 1) {
//     const request = window.indexedDB.open(databaseName, version);
//     /**@type {IDBDatabase} */
//     const db = await new Promise((res, rej) => {
//       request.addEventListener("success", () => {
//         const db = request.result;
//         res(db);
//       });
//       request.addEventListener("error", rej);
//       request.addEventListener("upgradeneeded", () => {
//         objectNames.forEach((objName) => {
//           request.result.createObjectStore(objName, { autoIncrement: true, keyPath: "id" });
//         });
//       });
//     });
//     const indexedDB = new IndexedDB();
//     indexedDB.request = request;
//     indexedDB.db = db;
//     return indexedDB;
//   }

//   readwrite(objectName) {
//     return this.db.transaction(objectName, "readwrite").objectStore(objectName);
//   }
// }
