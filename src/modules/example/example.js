angular.module('app.example', ['ui.router'])
    .config(function config($stateProvider) {
        $stateProvider
            .state('example', {
                url: '/example',
                templateUrl: 'modules/example/example.tpl.html',
                controller: 'ExampleCtrl',
                data: {
                    pageTitle: 'Examples',
                    isPublic: true
                }
            });
    }) 
    .controller('ExampleCtrl', [function () {
    }]);