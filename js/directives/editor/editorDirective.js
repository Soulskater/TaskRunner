/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskRunner.Directive.Editor', ['TaskRunner.Directive'])
    .constant("types", {
        string: 'string',
        bool: 'bool',
        int: 'int'
    })
    .controller("editorController", ['$scope', function ($scope) {

        this.getItem = function (property) {
            if (!property.bind) {
                return null;
            }

            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].type === property.bind.name) {
                    var item = $scope.items[i];
                    for (var j = 0; j < $scope.items[i].properties.length; j++) {
                        var prop = item.properties[j];
                        if (prop.name === property.bind.field) {
                            var props = $scope.getProperties(item, prop.direction);
                            var index = props.indexOf(prop);
                            return {
                                x: item.x,
                                y: item.y + (100 / (props.length + 1)) * (index + 1),//y+(height/(outputs.length + 1))*($index+1)
                                property: prop
                            };
                        }
                    }
                }
            }
            return null;
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

        /*this*/
    }])
    .directive('editor', ["$timeout", function ($timeout) {
        return{
            restrict: "AE",
            transclude: false,
            replace: true,
            templateUrl: 'js/directives/editor/templates/editor.tmpl.html',
            scope: {
                //width: "=sizeX",
                //height: "=sizeY",
                autoSize: '=',
                items: '='
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
            type: 'svg',
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
            restrict: "AE",
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
            template: '<svg><circle r="4" class="connector" ng-class="setStyle()" ng-cx="x" ng-cy="y"></circle></svg>',
            scope: {
                property: '=',
                x: '=px',
                y: '=py'
            },
            link: function ($scope, element, attrs, ctrl) {
                $scope.setStyle = function () {
                    return {
                        string: $scope.property.type === $types.string,
                        bool: $scope.property.type === $types.bool,
                        int: $scope.property.type === $types.int,
                        'un-bind': $scope.property.bind === undefined
                    };
                };
            }
        };
    }]);