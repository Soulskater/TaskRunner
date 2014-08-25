/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskRunner', ['TaskRunner.Directive.Editor', 'TaskRunner.Directive.DockPanel', 'TaskRunner.Directive.Hammer', 'TaskRunner.Directive.TreeView'])
    .controller('TaskRunnerCtrl', ['$scope', 'mainService', function ($scope, $service) {
        $scope.flows = $service.getFlows();
        $scope.currentFlow = $service.getFlow();
        $scope.toolBoxItems = $service.getToolBoxItems();

        $scope.onDragStart = function (item, event) {

        };

        $scope.onDrag = function (item, event) {

        };
        $scope.onDragEnd = function (item, event) {
            $scope.$broadcast("itemAdded", item, event);
        };
    }]);