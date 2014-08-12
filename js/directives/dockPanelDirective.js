/**
 * Created by MCG on 2014.08.11..
 */
angular.module('TaskRunner.Directive.DockPanel', [])
    .directive('dockPanel', function () {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            scope: {
                orientation: '@',
                minSize: '=',
                maxSize: '=',
                dockStyle: '='
            },
            template: '<div class="dock-panel" ng-class="dockStyle">' +
                '<div class="splitter"></div>' +
                '<div class="dock-container" ng-transclude>' +
                '</div>',
            controller: function ($scope) {
            },
            link: function (scope, element) {
                var horizontal = scope.dockStyle === 'left' || scope.dockStyle === 'right';
                var centerPanel = $("[dock-style='center']", element.parent('.dock-control'));

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
                var drag = false;

                element.bind('mousedown', function (ev) {
                    ev.preventDefault();
                    drag = true;
                });

                element.parent('.dock-control').bind('mousemove', function (ev) {
                    if (!drag) {
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
                });

                $(document).bind('mouseup', function (ev) {
                    drag = false;
                });

                scope.$on('$destroy', function () {
                    element.unbind('mousedown');
                    element.parent('.dock-control').unbind('mousemove');
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
            scope: {
            },
            template: '<div class="dock-control" ng-transclude></div>',
            link: function (scope, element) {
            }
        };
    });
