(function (window) {
  'use strict';

  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'https://co.audstanley.com/coffeeorders';
  var App = window.App;

  var Truck = App.Truck;
  // var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FireBaseDataStore = App.FireBaseDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;

  // var myTruck = new Truck('ncc-1701', new DataStore());
  var checkList = new CheckList(CHECKLIST_SELECTOR);

  //var remoteDataStore = new RemoteDataStore(SERVER_URL);
  var remoteDataStore = new FireBaseDataStore();

  var formHandler = new FormHandler(FORM_SELECTOR);
  var myTruck = new Truck('ncc-1701', remoteDataStore);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  window.myTruck = myTruck;

  formHandler.addSubmitHandler(function(data) {
    return myTruck.createOrder.call(myTruck, data)
      .then(() => {
        checkList.addRow.call(checkList, data);
      }); 
  });

  // formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  // formHandler.addSubmitHandler(function(data) {
  //   myTruck.createOrder.bind(myTruck);
  //   checkList.addRow.call(checkList, data);
  // });

  formHandler.addInputHandler(Validation.isCompanyEmail);

  console.log(formHandler);
})(window);
