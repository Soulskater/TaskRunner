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
                dockStyle: '='
            },
            template: '<div class="{{ \'dock-panel \' + dockStyle}}" ng-class="{ collapsed: isCollapsed }">' +
                '<dock-splitter></dock-splitter>' +
                '<div class="dock-container" ng-transclude>' +
                '</div>',
            controller: function ($scope) {
                $scope.isCollapsed = false;

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
                    },200);
                });

                var horizontal = scope.dockStyle === 'left' || scope.dockStyle === 'right';
                var centerPanel = $("[dock-style=\"'center'\"]", element.parent('.dock-control'));

                if (horizontal) {
                    element.css({
                        minWidth: scope.minSize + "px",
                        maxWidth: scope.maxSize + "px"
                    });
                    if (scope.dockStyle === 'left')
                        centerPanel.css({left: scope.minSize});
                    else
                        centerPanel.css({right: scope.minSize});
                }
                else {
                    element.css({
                        minHeight: scope.minSize + "px",
                        maxHeight: scope.maxSize + "px"
                    });

                    if (scope.dockStyle === 'top')
                        centerPanel.css({top: scope.minSize});
                    else
                        centerPanel.css({bottom: scope.minSize});
                }

                scope.onDragging = function (event) {
                    var bounds = element[0].getBoundingClientRect();
                    var pos = 0;

                    switch (scope.dockStyle) {
                        case "left":
                            pos = event.gesture.center.x - element.width();
                            element.width(element.width() + pos);
                            centerPanel.css({left: element.width()});
                            break;
                        case "right":
                            pos = bounds.left - event.gesture.center.x;
                            element.width(element.width() + pos);
                            centerPanel.css({right: element.width()});
                            break;
                        case "top":
                            pos = event.gesture.center.y - bounds.top;
                            element.height(pos);
                            centerPanel.css({top: element.height()});
                            break;
                        case "bottom":
                            pos = bounds.top - event.gesture.center.y;
                            element.height(element.height() + pos);
                            centerPanel.css({bottom: element.height()});
                            break;
                    }
                    $timeout(function () {
                        $(window).resize();
                    });
                };

                function refreshSize() {
                    switch (scope.dockStyle) {
                        case "left":
                            centerPanel.css({left: element.width()});
                            break;
                        case "right":
                            centerPanel.css({right: element.width()});
                            break;
                        case "top":
                            centerPanel.css({top: element.height()});
                            break;
                        case "bottom":
                            centerPanel.css({bottom: element.height()});
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
            template: '<div class="font-s dock-panel-title" double-tap="onDoubleTap" ng-transclude></div>',
            link: function ($scope, element, attrs, dockPanelCtrl) {

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
            template: '<div class="splitter" drag="onDrag"></div>',
            link: function ($scope, element, attrs, dockPanelCtrl) {
                $scope.onDrag = function (event) {
                    dockPanelCtrl.onDragging(event);
                };

                //
                //Disposing
                $scope.$on('$destroy', function () {
                    element.unbind('mousedown');
                    $(document).unbind('mouseup');
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
