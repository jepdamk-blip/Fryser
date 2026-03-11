// idb-photos.js

/**
 * IndexedDB Photo Storage
 * This code provides functions to store, retrieve, and delete photos in an IndexedDB.
 */

let db;

// Open database
function openDatabase() {
    const request = indexedDB.open('photoDb', 1);

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        db.createObjectStore('photos', { keyPath: 'id' });
    };

    request.onsuccess = function(event) {
        db = event.target.result;
    };

    request.onerror = function(event) {
        console.error('Database error: ', event.target.error);
    };
}

// Add photo
function addPhoto(photo) {
    const transaction = db.transaction(['photos'], 'readwrite');
    const store = transaction.objectStore('photos');
    store.add(photo);
}

// Get photo by id
function getPhoto(id) {
    const transaction = db.transaction(['photos'], 'readonly');
    const store = transaction.objectStore('photos');
    const request = store.get(id);

    request.onsuccess = function(event) {
        console.log('Photo retrieved: ', event.target.result);
    };

    request.onerror = function(event) {
        console.error('Error retrieving photo: ', event.target.error);
    };
}

// Delete photo by id
function deletePhoto(id) {
    const transaction = db.transaction(['photos'], 'readwrite');
    const store = transaction.objectStore('photos');
    store.delete(id);
}