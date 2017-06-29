'use strict';
var app = angular.module('crm', ['angular-storage']);

var baseurl = "http://localhost:5000/api/";

app.config(['storeProvider', function (storeProvider) {
  storeProvider.setStore('sessionStorage');
}]);
