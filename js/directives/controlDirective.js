/**
 * Created by gmeszaros on 8/26/2014.
 */
angular.module('TaskRunner.Directive.Control', [])
    .directive('control', function () {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            template: '<div ng-switch="controlType">' +
                '<input type="text" ng-switch-when="String" ng-model="bindProperty" ng-transclude/>' +
                '<input type="number" ng-switch-when="Number" ng-model="bindProperty" ng-transclude/>' +
                '<input type="checkbox" ng-switch-when="Bool" ng-model="bindProperty" ng-transclude/>' +
                ' </div>',
            scope: {
                controlType: '=',
                bindProperty: "="
            },
            link: function ($scope, element, attrs) {

                //
                //Disposing
                $scope.$on('$destroy', function () {
                });
            }
        };
    })