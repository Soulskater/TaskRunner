/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskRunner', ['TaskRunner.Directive.Editor', 'TaskRunner.Directive.DockPanel', 'TaskRunner.Directive.Hammer', 'TaskRunner.Directive.TreeView'])
    .controller('mainController', ['$scope', 'mainService', function ($scope, $service) {
        $scope.tasks = $service.getTasks();
        $scope.templates = $service.getTemplates();

        $scope.onDragStart = function (item, event) {
            return{
                allowedObject: '.editor-container'
            };
        };

        $scope.onDrag = function (item, event) {

        };
        $scope.onDragEnd = function (item, event) {
            $scope.$broadcast("itemAdded", item, event);
        };
    }]);