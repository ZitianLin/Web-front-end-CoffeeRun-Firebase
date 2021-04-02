(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore(url){
        if (!url) {
            throw new Error('No remote URL supplied.');
        }

        this.serverUrl = url;
        this.data = {};
    }

    RemoteDataStore.prototype.add = function (dataEmail, data) {
           
        var collection = firebase.firestore().collection('orders');
        return collection.add(data);

    };

    RemoteDataStore.prototype.getAll = function () {
        var key;
        var value;
        var collection = firebase.firestore().collection('orders');

        collection.get().then((querySnapshot) => {
            querySnapshot.forEach((element) => {
                console.log(element.data());
                key = element.data().emailAddress;
                value = element.data();
                this.data[key] = value;
            });
        });
        console.log(this.data);
        return this.data;
    };



    RemoteDataStore.prototype.get = function (key) {

        var collection = firebase.firestore().collection('orders');
        collection.get().then((querySnapshot) => {
            var savedData;
            querySnapshot.forEach((element) => {
                if(element.data().emailAddress == key)
                    savedData = element;
            });

            console.log(savedData.data());
            return str(savedData.data());
        });
    };

    RemoteDataStore.prototype.remove = function (key) {
        var collection = firebase.firestore().collection('orders');
        collection.get().then((querySnapshot) => {
            var savedData;
            querySnapshot.forEach((element) => {
                if(element.data().emailAddress == key)
                    savedData = element;
            });
            collection.doc(savedData.id).delete();
        });
        
    };

    RemoteDataStore.prototype.removeAll = function(){
        var collection = firebase.firestore().collection('orders');
        collection.get().then((querySnapshot) => {
            querySnapshot.forEach((element) => {
                collection.doc(element.id).delete();
            });
        });
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);
