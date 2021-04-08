
(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  const firebaseConfig = {
    apiKey: "AIzaSyBDmP8dYlHq7N4OXMRjqHDUT6jggCUfVDo",
    authDomain: "coffeerun-67ce4.firebaseapp.com",
    databaseURL: "https://coffeerun-67ce4-default-rtdb.firebaseio.com",
    projectId: "coffeerun-67ce4",
    storageBucket: "coffeerun-67ce4.appspot.com",
    messagingSenderId: "1059103280448",
    appId: "1:1059103280448:web:83875117f6b0b37a99fea5"
  };

  class FireBaseDataStore {
      constructor() {
          console.log('running the FireBaseDataStore function');
            firebase.initializeApp(firebaseConfig);
        // firebase.initializeApp(App.FirebaseConfig.firebaseConfig);
        this.firestore = firebase.firestore();
      }

      async add(key, val) {
          console.log('firebase add  ');
          const docRef = this.firestore.doc(`orders/${this.makeDocHash(20)}`);
          return docRef.set(val); // i realize that could just use .add, but wanted to try .set instead.
        // return this.firestore.doc(`orders/${key}`).set(val);
      }
      async get(email, cb)  { 
          const docRef = this.firestore.collection(`orders`);
          const snapshot = await docRef.where('emailAddress', '==', email).get();
          return await snapshot.docs.map(e => e.data());
      }
      async getAll(cb)    { 
          const docRef = this.firestore.collection(`orders`);
          const snapshot = await docRef.get();
          return await snapshot.docs.map(e => e.data());
      }
      async remove(email)   { 
          const docRef = await this.firestore.collection(`orders`);
          const batch = this.firestore.batch();
          const snapshot = await docRef.where('emailAddress', '==', email).get();
          snapshot.forEach(doc => {
              batch.delete(doc.ref);
          });
          await batch.commit();
      }
      makeDocHash(len) {
          var result           = '';
          var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          var charactersLength = characters.length;
          for ( var i = 0; i < len; i++ ) {
             result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          return result;
       }
  }
  App.FireBaseDataStore = FireBaseDataStore;
  window.App = App;

})(window);