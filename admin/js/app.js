'use strict';
var app = angular.module('crm', ['angular-storage']);

var baseurl = "http://localhost:7000/api/";

app.config(['storeProvider', function (storeProvider) {
  storeProvider.setStore('sessionStorage');
}]);
