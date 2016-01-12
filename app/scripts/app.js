'use strict';

angular
  .module('BootstrapTraining', [
    'ngRoute',
    'ui.router',
  ])
  .config(function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/carolina');
    $stateProvider
      .state('homec', {
        url: '/carolina',
        templateUrl: 'scripts/carolina/home/home.html',
        controller: 'HomecCtrl',
        controllerAs: 'homec'
      }).state('homes', {
        url: '/santiago',
        templateUrl: 'scripts/santiago/home/home.html',
        controller: 'HomesCtrl',
        controllerAs: 'homes'
      }).state('homem', {
        url: '/mateo',
        templateUrl: 'scripts/mateo/home/home.html',
        controller: 'HomemCtrl',
        controllerAs: 'homem'
      });
  });