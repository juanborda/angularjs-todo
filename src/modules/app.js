angular.module('app', [

        // external services
        'ui.router',
        'ngTouch',
        'templates-app',
        'ui.bootstrap.tpls',
        'ui.bootstrap',
        'LocalStorageModule',
        'ngAnimate',
        'angular-loading-bar',
        'ui-notification',

        // app modules
        'app.header-general',
        'app.footer',
        'app.example',
        'app.todos',
        'app.edit-todo-modal',

        // shared services
        'app.http-services',
        'app.shared-directives',
        'app.shared-filters'

    ])
    .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", "localStorageServiceProvider",
        function appConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, localStorageServiceProvider) {
            $urlRouterProvider.otherwise('todos');
            localStorageServiceProvider.setPrefix('prodear');
            $locationProvider.html5Mode(true);
        }])
    .run(function () {
    })
    .controller('AppCtrl', ['$scope', '$state',
        function AppCtrl($scope, $state) {

            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (angular.isDefined(toState.data.pageTitle)) {
                    $scope.pageTitle = toState.data.pageTitle;
                }
                $scope.bodyClass = toState.data.bodyClass || '';
                $scope.metas = toState.data.metas || {};
            });
        }
    ]);
