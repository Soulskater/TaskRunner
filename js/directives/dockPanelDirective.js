/**
 * Created by MCG on 2014.08.11..
 */
angular.module('TaskRunner.Directive.DockPanel', [])
    .directive('dockPanel', function ($timeout) {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            require: '^dockControl',
            scope: {
                orientation: '@',
                minSize: '=',
                maxSize: '=',
                dockStyle: '=',
                isCollapsed: '=collapsed',
                showSplitter: '='
            },
            template: '<div class="{{ \'dock-panel \' + dockStyle}}" ng-class="{ collapsed: isCollapsed }">' +
                '<dock-splitter ng-if="showSplitter != false"></dock-splitter>' +
                '<div class="dock-wrapper" ng-transclude>' +
                '</div>',
            controller: function ($scope) {
                this.onDragging = function (event) {
                    $scope.onDragging(event);
                };

                this.toggleCollapse = function () {
                    $scope.$apply(function () {
                        $scope.isCollapsed = !$scope.isCollapsed;
                    });
                };
            },
            link: function (scope, element, attrs) {
                var watcher = scope.$watch("isCollapsed", function () {
                    $timeout(function () {
                        refreshSize();
                    }, 250);
                });

                var horizontal = scope.dockStyle === 'left' || scope.dockStyle === 'right';
                var nextElement;
                if (scope.dockStyle === 'left' || scope.dockStyle === 'top') {
                    nextElement = element.next();
                }
                else {
                    nextElement = element.prev();
                }
                $timeout(function () {
                    if (horizontal) {
                        element.css({
                            minWidth: scope.minSize + "px",
                            maxWidth: scope.maxSize + "px"
                        });
                        if (scope.dockStyle === 'left') {
                            nextElement.css({left: scope.minSize});
                        }
                        else {
                            nextElement.css({right: scope.minSize});
                        }
                    }
                    else {
                        if (attrs.size === 'auto') {
                            if (scope.dockStyle === 'top') {
                                element.css({bottom: nextElement.height()});
                            }
                            else {
                                element.css({top: nextElement.height()});
                            }
                        }
                        else {
                            element.css({
                                minHeight: scope.minSize + "px",
                                maxHeight: scope.maxSize + "px"
                            });
                            if (scope.dockStyle === 'top') {
                                //nextElement.css({top: element.height()});
                            }
                            else {
                                nextElement.css({bottom: element.height()});
                            }
                        }
                    }
                }, 10);
                scope.onDragging = function (event) {
                    if (scope.isCollapsed) return;
                    var bounds = element[0].getBoundingClientRect();
                    var pos = 0;
                    switch (scope.dockStyle) {
                        case "left":
                            pos = event.gesture.center.x - element.width();
                            element.width(element.width() + pos);
                            nextElement.css({left: element.width()});
                            break;
                        case "right":
                            pos = bounds.left - event.gesture.center.x;
                            element.width(element.width() + pos);
                            nextElement.css({right: element.width()});
                            break;
                        case "top":
                            pos = event.gesture.center.y - bounds.top;
                            element.height(pos);
                            nextElement.css({top: element.height()});
                            break;
                        case "bottom":
                            pos = bounds.top - event.gesture.center.y;
                            element.height(element.height() + pos);
                            nextElement.css({bottom: element.height()});
                            break;
                    }
                };

                function refreshSize() {
                    switch (scope.dockStyle) {
                        case "left":
                            nextElement.css({left: element.width()});
                            break;
                        case "right":
                            nextElement.css({right: element.width()});
                            break;
                        case "top":
                            //nextElement.css({top: element.height()});
                            break;
                        case "bottom":
                            nextElement.css({bottom: element.height()});
                            break;
                    }
                    $(window).resize();
                }

                scope.$on('$destroy', function () {
                    watcher();
                });
            }
        };
    })
    .directive('dockTitle', function () {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            require: '^dockPanel',
            template: '<div class="font-s dock-panel-title" ng-transclude></div>',
            link: function ($scope, element, attrs, dockPanelCtrl) {

                //
                //Disposing
                $scope.$on('$destroy', function () {
                });
            }
        };
    })
    .directive('dockContent', function () {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            require: '^dockPanel',
            template: '<div class="dock-content" ng-transclude></div>',
            link: function ($scope, element, attrs, dockPanelCtrl) {

            }
        };
    })
    .directive('dockSplitter', function () {
        return {
            restrict: 'AE',
            replace: true,
            require: '^dockPanel',
            template: '<div class="splitter" drag="onDrag" double-tap="onDoubleTap"></div>',
            link: function ($scope, element, attrs, dockPanelCtrl) {
                $scope.onDrag = function (event) {
                    dockPanelCtrl.onDragging(event);
                };

                $scope.onDoubleTap = function (event) {
                    dockPanelCtrl.toggleCollapse();
                };

                //
                //Disposing
                $scope.$on('$destroy', function () {
                });
            }
        };
    })
    .directive('dockControl', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            controller: function ($scope) {

            },
            template: '<div class="dock-control" ng-transclude></div>',
            link: function ($scope, element, attrs) {

            }
        };
    });
