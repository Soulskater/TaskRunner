/**
 * Created by MCG on 2014.08.22..
 */
angular.module('TaskRunner.Directive.TreeView', [])
    .directive('treeView', function () {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            templateUrl: 'js/directives/treeview/templates/treeview.tmpl.html',
            scope: {
                items: "=",
                groupFields: "=",
                dragTarget: '=',
                dragItem: "&",
                dragStart: "&",
                dragEnd: "&"
            },
            controller: function ($scope) {
                this.dragTarget = $scope.dragTarget;

                this.onDragStart = function (item, event) {
                    $scope.dragStart({item: item, event: event});
                };
                this.onDragItem = function (item, event) {
                    $scope.dragItem({item: item, event: event});
                };
                this.onDragEnd = function (item, event) {
                    $scope.dragEnd({item: item, event: event});
                };
            },
            compile: function (tElement, tAttrs, transclude) {
                function groupDatasource(items, groupfields) {
                    if (!groupfields) {
                        return [
                            {
                                name: '',
                                collapsed: false,
                                items: items
                            }
                        ];
                    }
                    var groups = [];
                    var keys = [];
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        updateGroups(item[groupfields], item, keys, groups);
                    }
                    return groups;
                }

                function updateGroups(groupfields, item, keys, groups) {
                    for (var i = 0; i < groupfields.length; i++) {
                        if (keys.indexOf(groupfields[i]) === -1) {
                            keys.push(groupfields[i]);
                            groups.push({
                                name: groupfields[i],
                                collapsed: false,
                                items: [item]
                            });
                        }
                        else {
                            var group = groups[keys.indexOf(groupfields[i])];
                            group.items.push(item);
                        }
                    }
                }

                return {
                    pre: function ($scope, element, attrs) {
                        var watcher = $scope.$watch("items", function () {
                            $scope.groups = groupDatasource($scope.items, $scope.groupFields);
                        });
                        $scope.collapseGroup = function (group) {
                            group.collapsed = !group.collapsed;
                        };

                        //
                        //Disposing
                        $scope.$on('$destroy', function () {
                            watcher();
                        });
                    },
                    post: function ($scope, element, attrs) {

                    }
                };
            }
        };
    })
    .directive('treeItem', function () {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            require: '^treeView',
            template: '<li drag="onDrag" drag-start="onDragStart" drag-end="onDragEnd" ng-transclude></li>',
            link: function ($scope, element, attrs, treeViewCtrl) {

                $scope.dragging = false;
                $scope.dragAllowed = false;

                $scope.onDrag = function (event) {
                    var target = $(treeViewCtrl.dragTarget);
                    var targetX = target.offset().left;
                    var targetY = target.offset().top;
                    var mouseX = event.gesture.center.x - target.offset().left;
                    var mouseY = event.gesture.center.y - target.offset().top;
                    if (mouseX >= 0 && mouseY >= 0 && mouseX < target.width() && mouseY < target.height()) {
                        $("body").removeClass("not-allowed");
                    }
                    else {
                        $("body").addClass("not-allowed");
                    }
                    return treeViewCtrl.onDragItem($scope.item, event);
                };

                $scope.onDragStart = function (event) {
                    $scope.dragging = true;
                    $("body").addClass("drag");
                    return treeViewCtrl.onDragStart($scope.item, event);
                };

                $scope.onDragEnd = function (event) {
                    $scope.dragging = false;
                    $("body").removeClass("drag");
                    return treeViewCtrl.onDragEnd($scope.item, event);
                };
                //
                //Disposing
                $scope.$on('$destroy', function () {
                    element.hammer().unbind('pan');
                });
            }
        };
    });