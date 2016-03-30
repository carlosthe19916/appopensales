'use strict';

var resourceRequests = 0;
var loadingTimer = -1;

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Config url prefix
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

angular.module(ApplicationConfiguration.applicationModuleName).config(function (opensalesProvider) {
  opensalesProvider.restUrl = 'http://localhost:27660';
});

//Then define the init function for starting up the application
angular.element(document).ready(function () {

  //Fixing facebook bug with redirect
  if (window.location.hash && window.location.hash === '#_=_') {
    if (window.history && history.pushState) {
      window.history.pushState('', document.title, window.location.pathname);
    } else {
      // Prevent scrolling by storing the page's current scroll offset
      var scroll = {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
      };
      window.location.hash = '';
      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scroll.top;
      document.body.scrollLeft = scroll.left;
    }
  }

  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);

});

angular.module(ApplicationConfiguration.applicationModuleName).config(function($httpProvider) {
  //$httpProvider.interceptors.push('errorInterceptor');

  var spinnerFunction = function(data, headersGetter) {
    if (resourceRequests == 0) {
      loadingTimer = window.setTimeout(function() {
        $('#loading').show();
        loadingTimer = -1;
      }, 500);
    }
    resourceRequests++;
    return data;
  };
  $httpProvider.defaults.transformRequest.push(spinnerFunction);

  $httpProvider.interceptors.push('spinnerInterceptor');
  //$httpProvider.interceptors.push('authInterceptor');

});

angular.module(ApplicationConfiguration.applicationModuleName).factory('spinnerInterceptor', function($q, $window, $rootScope, $location) {
  return {
    response: function(response) {
      resourceRequests--;
      if (resourceRequests == 0) {
        if(loadingTimer != -1) {
          window.clearTimeout(loadingTimer);
          loadingTimer = -1;
        }
        $('#loading').hide();
      }
      return response;
    },
    responseError: function(response) {
      resourceRequests--;
      if (resourceRequests == 0) {
        if(loadingTimer != -1) {
          window.clearTimeout(loadingTimer);
          loadingTimer = -1;
        }
        $('#loading').hide();
      }

      return $q.reject(response);
    }
  };
});

/*angular.module(ApplicationConfiguration.applicationModuleName).factory('errorInterceptor', function($q, $window, $rootScope, $location, Notifications, Auth) {
  return {
    response: function(response) {
      return response;
    },
    responseError: function(response) {
      if (response.status == 401) {
        Auth.authz.logout();
      } else if (response.status == 403) {
        $location.path('/forbidden');
      } else if (response.status == 404) {
        $location.path('/notfound');
      } else if (response.status) {
        if (response.data && response.data.errorMessage) {
          Notifications.error(response.data.errorMessage);
        } else {
          Notifications.error("An unexpected server error has occurred");
        }
      }
      return $q.reject(response);
    }
  };
});*/
