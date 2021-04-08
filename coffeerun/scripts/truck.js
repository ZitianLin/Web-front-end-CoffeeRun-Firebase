(function (window) {
  'use strict';
  var App = window.App || {};

  function Truck(truckId, db) {
    console.log('In Truck constructor');
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.createOrder = function(order) { 
    console.log('Adding order for ' + order.emailAddress);
    return this.db.add(order.emailAddress, order).catch(e => {
      console.log('error adding to firebase')
    });
  }
  Truck.prototype.deliverOrder = function(id) {
    console.log('Delivering order for ' + id);
    return this.db.remove(id);
  }

  Truck.prototype.printOrders = function() {
    var customerIdArray = Object.keys(this.db.getAll());

    console.log('Truck #' + this.truckId + ' has pending orders:');
    customerIdArray.forEach(function(id) {
      console.log(this.db.get(id));
    }.bind(this));
  }

  Truck.prototype.printOrders = function() {
    return this.db.getAll()
    .then(function (orders) {
        var customerIdArray = Object.keys(orders);
        console.log(`Truck #${this.truckId} has pending orders:`);
        customerIdArray.forEach(function(id) {
            console.log(orders[id]);
            if (printfn) { 
                printfn(orders[id]);
            }
        }.bind(this));
    }.bind(this));
}

  App.Truck = Truck;
  window.App = App;

})(window);