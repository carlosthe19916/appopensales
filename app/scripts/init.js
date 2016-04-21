'use strict';

var auth = {
  test: {
    enabled: false
  },
  wcf: {
    enabled: false
  },
  keycloak: {
    url: 'https://keycloak-softgreen.rhcloud.com/auth',
    realm: 'opensales',
    clientId: 'opensales_app',
    enabled: true
  }
};

var OPENSALES = {
  baseUrl: 'http://localhost:27660'
};

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
  opensalesProvider.restUrl = OPENSALES.baseUrl;
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

  // KEYCLOAK START
  var keycloakAuth = new Keycloak({
    url: auth.keycloak.url,
    realm: auth.keycloak.realm,
    clientId: auth.keycloak.clientId
  });
  function whoAmI(success, error) {
    keycloakAuth.loadUserProfile().success(function (data) {
      success(data);
    }).error(function () {
      error();
    });
  }
  function loadOpensalesSession(success, error, username) {
    var req = new XMLHttpRequest();
    req.open('GET', OPENSALES.baseUrl + '/com.Siacpi.Ventas.Services/AdminService.svc/whoAmI/' + username, true);
    req.setRequestHeader('Accept', 'application/json');
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          var data = JSON.parse(req.responseText);
          success && success(data);
        } else {
          error && error();
        }
      }
    };
    req.send();
  }
  function hasAnyAccess(user) {
    return user && user['realm_access'];
  }
  keycloakAuth.onAuthLogout = function () {
    location.reload();
  };
  // KEYCLOAK END

  // INIT TO BOOTSTRAP ANGULAR APP
  if (auth.test.enabled) {
    console.log('Application is starting on test mode.');
    var username = prompt('Please set your username', 'devCarlos');
    angular.module(ApplicationConfiguration.applicationModuleName).factory('Auth', function () {
      auth.authz = {
        logout: function () {
          alert('In test mode is not posible to logout.');
        },
        accountManagement: function () {
          alert('In test mode is not posible to manage your account.');
        }
      };
      auth.user = {username: username};
      auth.user.roles = ['cajero'];
      auth.loggedIn = true;
      auth.hasAnyAccess = true;
      return auth;
    });
    loadOpensalesSession(function(data) {
      auth.opsession = data;
      angular.module(ApplicationConfiguration.applicationModuleName).factory('OSSession', function () {
        return auth.opsession;
      });
      angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
      console.log('Application started.');
    }, function () {}, username);


  } else if (auth.wcf.enabled) {
    console.log('Application is starting on test mode.');
    alert('WCF Authentication not supported');


  } else if (auth.keycloak.enabled) {
    console.log('Application is starting on keycloak mode.');
    keycloakAuth.init({onLoad: 'login-required'}).success(function () {
      auth.authz = keycloakAuth;
      var roles = [];
      if (keycloakAuth.realmAccess) { roles = keycloakAuth.realmAccess.roles; }
      auth.refreshPermissions = function (success, error) {
        whoAmI(function (data) {
          auth.user = data;
          auth.user.roles = roles;
          auth.loggedIn = true;
          auth.hasAnyAccess = hasAnyAccess(data);
          success();
        }, function () {
          error();
        });
      };
      loadOpensalesSession(function(data) {
        auth.opsession = data;
        angular.module(ApplicationConfiguration.applicationModuleName).factory('OSSession', function () {
          return auth.opsession;
        });
        auth.refreshPermissions(function () {
          angular.module(ApplicationConfiguration.applicationModuleName).factory('Auth', function () {
            return auth;
          });
          angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
          console.log('Application started.');
        });
      }, function () {}, keycloakAuth.tokenParsed.preferred_username);
    }).error(function () {
      window.location.reload();
    });


  } else {
    console.log('WARNING: No method for authentication was selected.');
    angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
  }
});

angular.module(ApplicationConfiguration.applicationModuleName).config(function ($httpProvider) {
  //$httpProvider.interceptors.push('errorInterceptor');

  var spinnerFunction = function (data, headersGetter) {
    if (resourceRequests == 0) {
      loadingTimer = window.setTimeout(function () {
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

angular.module(ApplicationConfiguration.applicationModuleName).factory('spinnerInterceptor', function ($q, $window, $rootScope, $location) {
  return {
    response: function (response) {
      resourceRequests--;
      if (resourceRequests == 0) {
        if (loadingTimer != -1) {
          window.clearTimeout(loadingTimer);
          loadingTimer = -1;
        }
        $('#loading').hide();
      }
      return response;
    },
    responseError: function (response) {
      resourceRequests--;
      if (resourceRequests == 0) {
        if (loadingTimer != -1) {
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
