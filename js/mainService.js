/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskManagement')
    .service('mainService', ['$q', function ($q) {
        return{
            getTasks: function () {
                return [
                    {
                        name:'Task1',
                        description: 'Task1 description',
                        x:0,
                        y:150,
                        connections:["Task2"]
                    },
                    {
                        name:'Task2',
                        description: 'Task2 description',
                        x:270,
                        y:150,
                        connections:["Task1", "Task3", "Task4"]
                    }
                ];
            }
        };
    }]);