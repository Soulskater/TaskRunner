/**
 * Created by gmeszaros on 8/15/2014.
 */
angular.module('TaskRunner.Directive.Hammer', [])
    .directive('tap', function () {
        return {
            restrict: 'A',
            replace: true,
            link: function ($scope, element, attrs) {
                element.hammer({
                }).bind('tap', function (event) {
                    var func = $scope.$eval(attrs.tap);
                    if (typeof func === 'function') {
                        $scope.$apply(function () {
                            func(event);
                        });
                    }
                });

                //
                //Disposing
                $scope.$on('$destroy', function () {
                    element.hammer().unbind('tap');
                });
            }
        };
    }).directive('doubleTap', function () {
        return {
            restrict: 'A',
            replace: true,
            link: function ($scope, element, attrs) {
                element.hammer({
                    taps: 2
                }).bind('tap', function (event) {
                    if (event.gesture.tapCount === 2) {
                        var func = $scope.$eval(attrs.doubleTap);
                        if (typeof func === 'function') {
                            func(event);
                        }
                    }
                });

                //
                //Disposing
                $scope.$on('$destroy', function () {
                    element.hammer().unbind('tap');
                });
            }
        };
    }).directive('drag', function () {
        return {
            restrict: 'A',
            replace: true,
            link: function ($scope, element, attrs) {
                element.hammer({
                }).bind('panmove', function (event) {
                    var func = $scope.$eval(attrs.drag);
                    if (func) {
                        func(event);
                    }
                });
                element.hammer({
                }).bind('panstart', function (event) {
                    var func = $scope.$eval(attrs.dragStart);
                    if (func) {
                        func(event);
                    }
                });
                element.hammer({
                }).bind('panend', function (event) {
                    var func = $scope.$eval(attrs.dragEnd);
                    if (func) {
                        func(event);
                    }
                });

                //
                //Disposing
                $scope.$on('$destroy', function () {
                    element.hammer().unbind('panmove');
                    element.hammer().unbind('panstart');
                    element.hammer().unbind('panend');
                });
            }
        };
    });