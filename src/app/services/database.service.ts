import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: IDBDatabase | undefined;
  constructor() {
    this.connectToDb();
  }
  private connectToDb() {
    if (typeof window === 'undefined') {
      console.error('window is not defined');
      return;
    }
    let request = window.indexedDB.open("FormDatabase", 1);
    request.onerror = function(event) {
      console.log("Error al abrir la base de datos", event);
    };
    request.onsuccess = (event) => {
      this.db = request.result;
      console.log("Éxito al abrir la base de datos");
    };
    request.onupgradeneeded = function(event) {
      let db = (event.target as IDBRequest).result;
      let objectStore = db.createObjectStore("formStore", { autoIncrement: true });
    };
  }
  public saveFormData(formData: any) {
    if (!this.db) {
      console.log("Error: la base de datos no está abierta");
      return;
    }

    let transaction = this.db.transaction(["formStore"], "readwrite");
    let objectStore = transaction.objectStore("formStore");
    let request = objectStore.add(formData);

    request.onsuccess = function(event) {
      console.log("Los datos del formulario se han guardado correctamente");
    };

    request.onerror = function(event) {
      console.log("Error al guardar los datos del formulario", event);
    };
  }
}
