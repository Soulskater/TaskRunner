/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskRunner.Directive.Editor', ['TaskRunner.Directive'])
    .constant("types", {
        string: 'String',
        bool: 'Bool',
        int: 'Number'
    })
    .controller("editorController", ['$scope', function ($scope) {

        var dragProperty = null;
        this.getItem = function (property, reference) {
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].Id === reference.Key) {
                    var item = $scope.items[i];
                    var props = property.Direction === "input" ? item.OutputProperties : item.InputProperties;
                    for (var j = 0; j < props.length; j++) {
                        var prop = props[j];
                        if (prop.PropertyName === reference.Value) {
                            return {
                                x: item.x,
                                y: item.y + (100 / (props.length + 1)) * (j + 1),
                                property: prop
                            };
                        }
                    }
                }
            }
            return null;
        };

        this.propertyDragStart = function (itemId, property) {
            dragProperty = { itemId: itemId, property: property};
        };

        this.propertyDragEnd = function (itemId, property) {
            if (!dragProperty) {
                return;
            }
            if (dragProperty.property.Direction === "input") {
                dragProperty.property.Reference = {
                    Key: itemId,
                    Value: property.PropertyName
                };
                if (!property.References) {
                    property.References = [];
                }
                property.References.push({
                    Key: dragProperty.itemId,
                    Value: dragProperty.property.PropertyName
                });
            }
            else {
                if (!dragProperty.property.References) {
                    dragProperty.property.References = [];
                }
                dragProperty.property.References.push({
                    Key: itemId,
                    Value: property.PropertyName
                });
                property.Reference = {
                    Key: dragProperty.itemId,
                    Value: dragProperty.property.PropertyName
                };
            }
        };

        $scope.renderItems = function () {
            for (var i = 0; i < $scope.items.length; i++) {
                $scope.items[i].x = 30 + (i * 240);
                $scope.items[i].y = 150;
            }
        };

        $scope.getProperties = function (item, direction) {
            var result = [];
            if (!direction) {
                return item.properties;
            }

            for (var i = 0; i < item.properties.length; i++) {
                if (item.properties[i].direction === direction) {
                    result.push(item.properties[i]);
                }
            }
            return result;
        };
    }])
    .
    directive('editor', ["$timeout", function ($timeout) {
        return{
            restrict: "AE",
            transclude: false,
            replace: true,
            templateUrl: 'js/directives/editor/templates/editor.tmpl.html',
            scope: {
                autoSize: '=',
                items: '=',
                selectedChanged: '&'
            },
            controller: 'editorController',
            link: function ($scope, element, attrs) {
                /*if ($scope.autoSize) {
                 $timeout(function () {
                 setSize();
                 }, 50);
                 $(window).resize(function () {
                 $scope.$apply(function () {
                 setSize();
                 });
                 });
                 }

                 function setSize() {
                 $scope.width = element.parent().width();
                 $scope.height = element.parent().height() - element.parent().offset().top;
                 }*/
                $scope.$watch("items", function () {
                    $scope.renderItems();
                });

                $scope.$on('itemAdded', function (event, sampleItem, mouseEvent) {
                    $scope.$apply(function () {
                        var newItem = angular.copy(sampleItem);
                        newItem.x = mouseEvent.gesture.center.x - element.parent().offset().left;
                        newItem.y = mouseEvent.gesture.center.y - element.parent().offset().top;
                        $scope.items.push(newItem);
                        $scope.selectItem(newItem);
                    });
                });
                var prevX = 0;
                var prevY = 0;
                $scope.onDragStartItem = function (item, event) {
                    prevX = event.gesture.center.x - element.parent().offset().left;
                    prevY = event.gesture.center.y - element.parent().offset().top;
                };
                $scope.selectItem = function (item) {
                    for (var i = 0; i < $scope.items.length; i++) {
                        $scope.items[i].selected = false;
                    }
                    item.selected = true;
                    $scope.selectedChanged({task: item});
                };
                $scope.onDragItem = function (item, event) {
                    $scope.$apply(function () {
                        var x = event.gesture.center.x - element.parent().offset().left;
                        var y = event.gesture.center.y - element.parent().offset().top;
                        item.x += x - prevX;
                        item.y += y - prevY;
                        prevX = x;
                        prevY = y;
                    });
                };
            }
        };
    }])
    .controller("itemController", ['$scope', function ($scope) {
    }])
    .directive('item', [ 'types', function ($types) {
        return{
            restrict: "AE",
            require: '^editor',
            replace: true,
            templateUrl: 'js/directives/editor/templates/item.tmpl.html',
            transclude: true,
            scope: {
                width: "=",
                height: "=",
                data: '=',
                dragStartItem: '&',
                dragItem: '&',
                itemClick: '&'
            },
            controller: 'itemController',
            link: function ($scope, element, attrs, editorCtrl) {
                $scope.getItem = editorCtrl.getItem;
                $scope.onDragStartItem = function (event) {
                    $scope.dragStartItem({item: $scope.data, event: event});
                };
                $scope.onDragItem = function (event) {
                    $scope.dragItem({item: $scope.data, event: event});
                };

                //
                //It needs for angular, removes svg wrapper
                var e = angular.element(element.children());
                element.replaceWith(e);
            }
        };
    }])
    .directive('title', [function () {
        return{
            restrict: "E",
            replace: true,
            template: '<div class="font-s box-header" ng-transclude></div>',
            transclude: true,
            link: function ($scope, element, attrs) {
            }
        };
    }])
    .directive('description', [function () {
        return{
            restrict: "AE",
            replace: true,
            template: '<div class="font-xs" ng-transclude></div>',
            transclude: true,
            link: function ($scope, element, attrs, ctrl) {
            }
        };
    }])
    .directive('connector', ["types", function ($types) {
        return{
            restrict: "AE",
            replace: true,
            require: '^editor',
            template: '<svg><circle r="4" class="connector" ng-class="setStyle()" ng-cx="x" ng-cy="y" ng-mousedown="startDrag()" ng-mouseup="endDrag()"></circle></svg>',
            scope: {
                itemId: '=',
                property: '=',
                x: '=px',
                y: '=py'
            },
            link: function ($scope, element, attrs, editorCtrl) {
                $scope.setStyle = function () {
                    return {
                        string: $scope.property.PropertyValueType === $types.string,
                        bool: $scope.property.PropertyValueType === $types.bool,
                        number: $scope.property.PropertyValueType === $types.int,
                        'un-bind': $scope.property.Direction === "input" ? $scope.property.Reference === null : $scope.property.References === null
                    };
                };
                $scope.startDrag = function () {
                    editorCtrl.propertyDragStart($scope.itemId, $scope.property);
                };
                $scope.endDrag = function () {
                    editorCtrl.propertyDragEnd($scope.itemId, $scope.property);
                };

                //
                //It needs for angular, removes svg wrapper
                var e = angular.element(element.children());
                element.replaceWith(e);
            }
        };
    }]);