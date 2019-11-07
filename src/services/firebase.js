import firebase from 'firebase';

// Set the configuration for your app
// TODO: Replace with your project's config object
// Your web app's Firebase configuration
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

function writeTestData() {
    // console.log(database);
    const messagesRef = database.ref(`messages/${randomNumber()}`);
    console.log(messagesRef);

    messagesRef.set({
        message: "wow"
    })

    // let setSf = citiesRef.doc('message').set({
    //     message: "message one"
    // });
    // let setLa = citiesRef.doc('message').set({
    //     message: "message two"
    // });

}

function getTestData(callbackFunction = () => {}) {
    const messagesRef = database.ref(`messages`);
    messagesRef.on('value', function(snapshot) {
        callbackFunction(snapshot);
    });
}

function listenTo(dataToListenTo = '', callbackFunction = () => {}) {
    const databaseRef = database.ref(dataToListenTo);
    databaseRef.on('value', function(snapshot) {
        callbackFunction(snapshot);
    });

    return databaseRef;
}

function writeTo(dataToWriteTo = '', value) {
    const databaseRef = database.ref(dataToWriteTo);

    databaseRef.push(value)
}

function updateTo(dataToWriteTo = '', value) {
    const databaseRef = database.ref(dataToWriteTo);

    databaseRef.update(value)
}

function remove(dataToWriteTo = '') {
    const databaseRef = database.ref(dataToWriteTo);

    databaseRef.remove();
}

function writeToMessages(value) {
    const messagesRef = database.ref('messages');

    messagesRef.push({
        message: value
    })
}

function randomNumber() {
    return Math.floor(Math.random() * 1e6);
}

export default {
    writeTo,
    writeToMessages,
    listenTo,
    writeTestData,
    getTestData,
    updateTo,
    remove
}