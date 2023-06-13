import firebase from 'firebase/app';
import 'firebase/database';
import service from '../serviceAccountKey.json';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: service.db_url,
};

// Initialize Firebase
// Initialize Firebase
let app;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app(); // if already initialized, use that one
}

// Initialize Realtime Database and get a reference to the service
const database = firebase.database(app);

export default database;
