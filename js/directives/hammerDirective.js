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
                    if(typeof func === 'function'){
                        func(event);
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
                        if(typeof func === 'function'){
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
    }).directive('move', function () {
        return {
            restrict: 'A',
            replace: true,
            link: function ($scope, element, attrs) {
                element.hammer({
                }).bind('pan', function (event) {
                    var func = $scope.$eval(attrs.move);
                    if (func) {
                        func(event);
                    }
                });

                //
                //Disposing
                $scope.$on('$destroy', function () {
                    element.hammer().unbind('swipe');
                });
            }
        };
    });