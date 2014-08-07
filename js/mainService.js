/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskManagement')
    .service('mockService', ['$q', function ($q) {
        return{
            getMockTasks: function (count) {
                var tasks = [];
                for (var i = 0; i < count; i++) {
                    tasks.push({
                        name: 'Task' + (i + 1),
                        description: 'Task' + (i + 1) + ' description',
                        x: 10 + (i * 200),
                        y: 150,
                        addConnection: function (task) {
                            this.connections.push(task);
                            task.parent = this;
                        },
                        parent: null,
                        connections: []
                    });
                    if (i > 0) {
                        tasks[i - 1].addConnection(tasks[i]);
                    }
                }
                return tasks;
            }
        };
    }]);
angular.module('TaskManagement')
    .service('mainService', ['$q', 'mockService', function ($q, $mock) {
        return{
            getTasks: function () {
                return $mock.getMockTasks(5);
            }
        };
    }]);