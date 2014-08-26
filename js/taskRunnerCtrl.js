/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskRunner', ['TaskRunner.Directive.Editor', 'TaskRunner.Directive.DockPanel', 'TaskRunner.Directive.Hammer', 'TaskRunner.Directive.TreeView', 'TaskRunner.Directive.Control'])
    .controller('TaskRunnerCtrl', ['$scope', 'mainService', function ($scope, $service) {

        $scope.data = $service.data;
        $scope.currentFlow = null;
        $scope.selectedTask = null;
        $scope.flowSelected = false;

        _init();
        function _init() {
            $service.getFlows();
            $service.getTasks();
        }
        $scope.selectedTaskChanged = function (task) {
            $scope.selectedTask = task;
            $scope.flowSelected = false;
        };
        $scope.selectFlow = function (flow) {
            $scope.currentFlow = flow;
            $scope.flowSelected = true;
        };
        $scope.toggleFlowSelected = function () {
            $scope.flowSelected = !$scope.flowSelected;
        };
        $scope.addNewSetting = function () {
            if(!$scope.currentFlow.Properties)
                $scope.currentFlow.Properties = [];
            $scope.currentFlow.Properties.push({"New Property": ""});
        };

        $scope.onDragEnd = function (item, event) {
            $scope.$broadcast("itemAdded", item, event);
        };
    }]);