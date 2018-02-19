import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyCNwuPcyqqd7KD6jT2A6gh_dfRp2BSr2Mo",
    authDomain: "monefydb.firebaseapp.com",
    databaseURL: "https://monefydb.firebaseio.com/",
    projectId: "monefydb",
    storageBucket: "monefydb.appspot.com",
    messagingSenderId: "628234001672"
};

firebase.initializeApp(config);

export default {
    database: firebase.database()
}