(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  var form = document.querySelector('.myForm');
  // const admin = require('firebase-admin');


  class RemoteDataStore {
    constructor(url) {
      console.log('running the DataStore function');

      if (!url) { throw new Error('No remote URL supplied.'); }
      this.serverURL = url;
    }

    // helps with POST and PUT requests for NON-Firebase requests
    post_helper(type, url, val) {
      return $.ajax({ type: type, url: url, contentType: 'application/json',
        data: JSON.stringify(val),
        success: function (response) {
          console.log('function returned: ' + JSON.stringify(response));
        }
      });
    }

    helper(type, url, cb) {
      return $.ajax({ type: type, url: url, contentType: 'application/json',
        success: function (response) {
          console.log('function returned: ' + JSON.stringify(response));
          if (cb !== undefined) { cb(response); }
        }
      });
    }


    add(key, val) { return this.post_helper('POST',   this.serverURL, val);             }
    get(key, cb)  { return this.helper     ('GET',    this.serverURL + '/' + key, cb);  }
    getAll(cb)    { return this.helper     ('GET',    this.serverURL, cb);              }
    put(key, val) { return this.post_helper('PUT',    this.serverURL + '/' + key, val); }
    remove(key)   { return this.helper     ('DELETE', this.serverURL + '/' + key);      }
  }    
    
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);

