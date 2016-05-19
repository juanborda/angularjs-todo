angular.module('app.confirmation-popup', [])
    .directive('confirmation', [function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'common/directives/confirmation-popup/confirmation-popup.tpl.html',
            scope: {
                onConfirm: '&',
                btnTitle: '@',
                btnClass: '@'
            },
            link: function ($scope, $elem, $attrs) {

                $elem.click(function (e) {
                    e.stopPropagation();
                });

                $scope.title = $scope.btnTitle;
                $scope.confirm = function ($event) {
                    $event.stopPropagation();
                    if(angular.isFunction($scope.onConfirm)){
                        $scope.onConfirm();
                    }
                };

                $scope.cancel = function ($event) {
                    $event.stopPropagation();
                    $scope.isOpen = false;
                };
            }
        };
    }]);
