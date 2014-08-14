/**
 * Created by MCG on 2014.08.11..
 */
angular.module('TaskRunner.Directive.DockPanel', [])
    .controller('dockPanelCtrl', function ($scope) {
        $scope.isCollapsed = false;
        $scope.isDragging = false;

        this.setDrag = function (value) {
            $scope.isDragging = value;
        };
        this.toggleCollapse = function () {
            $scope.isCollapsed = !$scope.isCollapsed;
        };
    })
    .directive('dockPanel', function ($timeout) {
        return {
            restrict: 'AE',
            replace: true,
            require: '',
            transclude: true,
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
            controller: "dockPanelCtrl",
            link: function (scope, element, attrs, dockControlCtrl) {
                scope.$watch("isCollapsed", function () {
                    refreshSize();
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
                }

                element.parent('.dock-control').bind('mousemove', function (ev) {
                    if (!scope.isDragging) {
                        return;
                    }

                    var bounds = element[0].getBoundingClientRect();
                    var pos = 0;

                    switch (scope.dockStyle) {
                        case "left":
                            pos = ev.clientX - element.width();
                            element.width(element.width() + pos);
                            centerPanel.css({left: element.width()});
                            break;
                        case "right":
                            pos = bounds.left - ev.clientX;
                            element.width(element.width() + pos);
                            centerPanel.css({right: element.width()});
                            break;
                        case "top":
                            pos = ev.clientY - bounds.top;
                            element.height(pos);
                            centerPanel.css({top: element.height()});
                            break;
                        case "bottom":
                            pos = bounds.top - ev.clientY;
                            element.height(element.height() + pos);
                            centerPanel.css({bottom: element.height()});
                            break;
                    }
                    $timeout(function () {
                        $(window).resize();
                    });
                });

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
                    //element.unbind('mousedown');
                    element.parent('.dock-control').unbind('mousemove');
                    //$(document).unbind('mouseup');
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
                element.dblclick(function () {
                    $scope.$apply(function () {
                        dockPanelCtrl.toggleCollapse();
                    });
                });
            }
        };
    })
    .directive('dockSplitter', function () {
        return {
            restrict: 'AE',
            replace: true,
            require: '^dockPanel',
            template: '<div class="splitter"></div>',
            link: function ($scope, element, attrs, dockPanelCtrl) {
                element.bind('mousedown', function (ev) {
                    ev.preventDefault();
                    dockPanelCtrl.setDrag(true);
                });

                $(document).bind('mouseup', function (ev) {
                    $scope.$apply(function () {
                        dockPanelCtrl.setDrag(false);
                    });
                });

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
            template: '<div class="dock-control" ng-transclude></div>',
            controller: function ($scope) {

            },
            link: function ($scope, element, attrs, dockPanelCtrl) {

            }
        };
    });
