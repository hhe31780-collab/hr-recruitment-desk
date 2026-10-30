// Replace this repository interface with a cloud implementation in a future version.
let db;
export const repository={
 async open(){db=await new Promise((resolve,reject)=>{const r=indexedDB.open('recruiting-desk-v1',1);r.onupgradeneeded=()=>{r.result.createObjectStore('state');r.result.createObjectStore('files',{keyPath:'id'});};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});return this;},
 async load(){return new Promise((resolve,reject)=>{const r=db.transaction('state').objectStore('state').get('main');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});},
 async save(state){return new Promise((resolve,reject)=>{const t=db.transaction('state','readwrite');t.objectStore('state').put(state,'main');t.oncomplete=resolve;t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error);});},
 async putFile(file){return new Promise((resolve,reject)=>{const t=db.transaction('files','readwrite');t.objectStore('files').put(file);t.oncomplete=resolve;t.onerror=()=>reject(t.error);});},
 async getFile(id){return new Promise((resolve,reject)=>{const r=db.transaction('files').objectStore('files').get(id);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});},
 async deleteFile(id){return new Promise((resolve,reject)=>{const t=db.transaction('files','readwrite');t.objectStore('files').delete(id);t.oncomplete=resolve;t.onerror=()=>reject(t.error);});}
};
