import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDS3UaX3BHpuR9nkgGPEXNwsRz4ZajS6c0",
    authDomain: "psupktmaterial.firebaseapp.com",
    databaseURL: "https://psupktmaterial.firebaseio.com",
    projectId: "psupktmaterial",
    storageBucket: "psupktmaterial.appspot.com",
    messagingSenderId: "673539716089",
    appId: "1:673539716089:web:67e7cce961c3cab2"
}

firebase.initializeApp(config);

const database = firebase.database();

const storage = firebase.storage();

const auth = firebase.auth()

export { firebase, database, auth, storage as default}