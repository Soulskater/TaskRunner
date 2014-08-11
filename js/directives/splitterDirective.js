/**
 * Created by MCG on 2014.08.11..
 */
angular.module('TaskManagement.Directive.Splitter', [])
    .directive('splitter', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                orientation: '@'
            },
            template: '<div class="split-container {{orientation}}" ng-transclude></div>',
            controller: function ($scope) {
                $scope.panes = [];

                this.addPane = function (pane) {
                    $scope.panes.push(pane);
                    return $scope.panes.length;
                };
            },
            link: function (scope, element, attrs) {
                for (var i = 0; i < scope.panes.length; i++) {
                    var pane = scope.panes[i];
//                    var pane1Min = pane1.minSize || 0;
//                    var pane2Min = pane2.minSize || 0;
                    if (i < scope.panes.length - 1) {
                        var handler = angular.element('<div class="splitter"></div>');
                        $($('.split-pane', element)[i]).after(handler);
                        handler.bind('mousedown', function (ev) {
                            ev.preventDefault();
                            drag = true;
                            pane1 = $(this).prev();
                            pane2 = $(this).next();
                            splitter = $(this);
                        });
                    }
                }
                var vertical = scope.orientation === 'vertical';
                var drag = false;
                var pane1 = null;
                var pane2 = null;
                var splitter = null;
                element.bind('mousemove', function (ev) {
                    if (!drag) return;

                    var bounds = element[0].getBoundingClientRect();
                    var pos = 0;

                    if (vertical) {

                        var height = bounds.bottom - bounds.top;
                        pos = ev.clientY - bounds.top;

                        if (pos < pane1Min) return;
                        if (height - pos < pane2Min) return;

                        splitter.css('top', pos + 'px');
                        pane1.elem.css('height', pos + 'px');
                        pane2.elem.css('top', pos + 'px');

                    } else {

                        var width = bounds.right - bounds.left;
                        pos = ev.clientX - bounds.left - pane1.offset().left;

                        //if (pos < pane1Min) return;
                        //if (width - pos < pane2Min) return;

                        splitter.css('left', pos + 'px');
                        pane1.css('width', pos + 'px');
                        pane2.css('left', pos + 'px');
                    }
                });

                angular.element(document).bind('mouseup', function (ev) {
                    drag = false;
                });
            }
        };
    })
    .directive('pane', function () {
        return {
            restrict: 'E',
            require: '^splitter',
            replace: true,
            transclude: true,
            scope: {
                minSize: '='
            },
            template: '<div class="split-pane" ng-style="{ width:\'{{minSize + \'%\'}}\' }" ng-transclude></div>',
            link: function (scope, element, attrs, bgSplitterCtrl) {
                scope.index = bgSplitterCtrl.addPane(scope);
            }
        };
    });
