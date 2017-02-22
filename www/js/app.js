// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


    // ON INIT
    // weird test info collector without console.log outside of angular
    window.tests = [];
    console.log('INITIALIZED');

    // REGISTER IN GCM
    var pushNotification = window.plugins.pushNotification;

    pushNotification.register(
            successHandler,
            errorHandler,
            {
              'senderID':'digger-159520',
              'ecb':'onNotificationGCM' // callback function
            }
    );

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});



// ON SUCCESS REGISTER IN GCM
function successHandler(result) {
  window.tests.push('successHandler');
  window.tests.push('Success: '+ result);
}
// ON ERROR
function errorHandler(error) {
  window.tests.push('Error: '+ error);
}

// ON PUSH
function onNotificationGCM(e) {
  switch(e.event){
    case 'registered':
      if (e.regid.length > 0){
        window.tests.push('registered bloock in onNotificationGCM');
        window.tests.push('deviceRegistered - is the next even if I cant see where is this func - maybe I should write it...');
        deviceRegistered(e.regid);
      }
      break;

    case 'message':
      if (e.foreground){
        // When the app is running foreground.
        alert('The room temperature is set too high')
      }
      break;

    case 'error':
      window.tests.push('Error: ' + e.msg);
      break;

    default:
      window.tests.push('An unknown event was received');
      break;
  }
}