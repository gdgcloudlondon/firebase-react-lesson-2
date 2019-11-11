// Import base firebase code
import firebase from 'firebase/app';
// Import database functions, because we plan on using them
import 'firebase/database';

// Set the configuration for your app
const firebaseConfig = {
    apiKey: "AIzaSyCtqjDIWYbMkTzoVMvSYTznfzealEtnQOo",
    authDomain: "fir-course-180ac.firebaseapp.com",
    databaseURL: "https://fir-course-180ac.firebaseio.com",
    projectId: "fir-course-180ac",
    storageBucket: "fir-course-180ac.appspot.com",
    messagingSenderId: "107133395777",
    appId: "1:107133395777:web:d21b1a03eded76533db7c0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

/**
 * Listens to a path in Firebase and then will call the passed function with the data as a parameter
 *
 * @param {string} dataToListenTo E.g. "messages"
 * @param {function} callbackFunction
 * @returns {Object} Firebase reference
 */
function listenTo(dataToListenTo = '', callbackFunction = () => {}) {
    const databaseRef = database.ref(dataToListenTo);

    databaseRef.on('value', (snapshot) => {
        callbackFunction(snapshot);
    });

    return databaseRef;
}

/**
 * Adds a piece of information to the passed collection.
 * If the collection does not exist, it is created
 * @param {string} dataToWriteTo E.g. "messages"
 * @param {Object|string} value E.g. { data: "value" }
 */
function writeTo(dataToWriteTo = '', value) {
    const databaseRef = database.ref(dataToWriteTo);

    databaseRef.push(value)
}

/**
 * Updates a path with the passed value
 * @param {string} keyToUpdate E.g. "messages/{messageId}"
 * @param {*} value { data: "value" }
 */
function update(keyToUpdate = '', value) {
    const databaseRef = database.ref(keyToUpdate);

    databaseRef.update(value)
}

/**
 * Removes a particular entry in Firebase
 * @param {string} keyToUpdate E.g. "messages/{messageId}"
 */
function remove(keyToUpdate = '') {
    const databaseRef = database.ref(keyToUpdate);

    databaseRef.remove();
}

export default {
    writeTo,
    listenTo,
    update,
    remove
}