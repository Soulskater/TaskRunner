/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskManagement.Directive.Editor', ['TaskManagement.Directive'])
    .controller("editorController", ['$scope', function ($scope) {
    }])
    .directive('editor', [function () {
        return{
            restrict: "AE",
            transclude: true,
            replace: true,
            templateUrl: 'js/directives/editor/templates/editor.tmpl.html',
            scope: {
                width: "=width",
                height: "=height"
            },
            controller: 'editorController',
            link: function ($scope, element, attrs) {

            }
        };
    }])
    .controller("itemController", ['$scope', function ($scope) {
    }])
    .directive('item', [function () {
        return{
            restrict: "AE",
            replace: true,
            templateUrl: 'js/directives/editor/templates/item.tmpl.html',
            scope: {
                width: "=",
                height: "=",
                x: "=",
                y: "="
            },
            controller: 'itemController',
            link: function ($scope, element, attrs) {
                //
                //It needs for angular, removes svg wrapper
                var e = angular.element(element.children());
                element.replaceWith(e);
            }
        };
    }]);