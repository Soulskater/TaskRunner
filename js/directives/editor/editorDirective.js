/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskRunner.Directive.Editor', ['TaskRunner.Directive'])
    .controller("editorController", ['$scope', function ($scope) {

        $scope.renderItems = function () {
            for (var i = 0; i < $scope.items.length; i++) {
                $scope.items[i].x = 30 + (i * 240);
                $scope.items[i].y = 150;
            }
        };

        this.getItem = function (property) {
            if (!property.bind) {
                return null;
            }

            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].name === property.bind.name) {
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

        this.onItemClick = function (item) {
            for (var i = 0; i < $scope.items.length; i++) {
                $scope.items[i].selected = false;
            }
            item.selected = true;
        };
    }])
    .directive('editor', ["$timeout", function ($timeout) {
        return{
            restrict: "AE",
            transclude: false,
            replace: true,
            templateUrl: 'js/directives/editor/templates/editor.tmpl.html',
            scope: {
                width: "=",
                height: "=",
                autoSize: '=',
                items: '='
            },
            controller: 'editorController',
            link: function ($scope, element, attrs) {
                if ($scope.autoSize) {
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
                }
            }
        };
    }])
    .controller("itemController", ['$scope', function ($scope) {
        $scope.onItemClick = function (item) {
            item.selected = true;
            item.x = 0;
            item.y = 0;
        };
    }])
    .directive('item', [function () {
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
                x: "=px",
                y: "=py",
                properties: '='
            },
            controller: 'itemController',
            link: function ($scope, element, attrs, editorCtrl) {
                $scope.onItemClick = editorCtrl.onItemClick;
                $scope.getItem = editorCtrl.getItem;

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
    .directive('draggable', [function () {
        return{
            restrict: "A",
            link: function ($scope, element, attrs) {

                var currentX = 0;
                var currentY = 0;

                element.on("mousedown", selectElement);

                function selectElement(evt) {
                    currentX = evt.clientX;
                    currentY = evt.clientY;

                    element.on("mousemove", moveElement);
                }

                function moveElement(evt) {
                    var dx = evt.clientX - currentX;
                    var dy = evt.clientY - currentY;
                    $scope.$apply(function () {
                        $scope.x += dx;
                        $scope.y += dy;
                    });

                    currentX = evt.clientX;
                    currentY = evt.clientY;
                }

                function deselectElement(evt) {
                    element.off("mousemove");
                }

                element.on("mouseout", deselectElement);
                element.on("mouseup", deselectElement);
            }
        };
    }]);