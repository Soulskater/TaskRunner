/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskRunner')
    .service('mockService', ['$q', function ($q) {
        return{
            getMockTasks: function (count) {
                var tasks = [];
                var task1 = {
                    type: "SampleTaskType1",
                    name: "Sample task 1",
                    properties: [
                        {
                            name: "sampleInput1",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "sampleInput2",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "sampleOutput1",
                            direction: 'output',
                            type: "string",
                            bind: {
                                name: 'SampleTaskType2',
                                field: 'sampleInput1'
                            }
                        },
                        {
                            name: "sampleOutput2",
                            direction: 'output',
                            type: "bool",
                            bind: {
                                name: 'SampleTaskType2',
                                field: 'sampleInput2'
                            }
                        }
                    ]
                };
                var task2 = {
                    type: "SampleTaskType2",
                    name: "Sample task 2",
                    properties: [
                        {
                            name: "sampleInput1",
                            direction: 'input',
                            type: "string",
                            bind: {
                                name: 'SampleTaskType1',
                                field: 'sampleOutput1'
                            }
                        },
                        {
                            name: "sampleInput2",
                            direction: 'input',
                            type: "bool",
                            bind: {
                                name: 'SampleTaskType1',
                                field: 'sampleOutput2'
                            }
                        },
                        {
                            name: "sampleOutput1",
                            direction: 'output',
                            type: "string",
                            bind: {
                                name: 'SampleTaskType3',
                                field: 'sampleInput1'
                            }
                        },
                        {
                            name: "sampleOutput2",
                            direction: 'output',
                            type: "bool"
                        }
                    ]
                };
                var task3 = {
                    type: "SampleTaskType3",
                    name: "Sample task 3",
                    properties: [
                        {
                            name: "sampleInput1",
                            direction: 'input',
                            type: "string",
                            bind: {
                                name: 'SampleTaskType2',
                                field: 'sampleOutput1'
                            }
                        },
                        {
                            name: "sampleOutput1",
                            direction: 'output',
                            type: "string"
                        },
                    ]
                };
                tasks.push(task1, task2, task3);
                return tasks;
            }
        };
    }]);
angular.module('TaskRunner')
    .service('mainService', ['$q', 'mockService', function ($q, $mock) {
        return{
            getTasks: function () {
                return $mock.getMockTasks(5);
            },
            getTemplates: function () {
                var task1 = {
                    namespace: "SampleNamespace1",
                    type: "SampleTaskType1",
                    name: "Sample task 1",
                    properties: [
                        {
                            name: "sampleInput1",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "sampleInput2",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "sampleOutput1",
                            direction: 'output',
                            type: "string"
                        },
                        {
                            name: "sampleOutput2",
                            direction: 'output',
                            type: "bool"
                        }
                    ]
                };
                var task2 = {
                    namespace: "SampleNamespace1",
                    type: "SampleTaskType2",
                    name: "Sample task 2",
                    properties: [
                        {
                            name: "sampleInput1",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "sampleInput2",
                            direction: 'input',
                            type: "bool"
                        },
                        {
                            name: "sampleOutput1",
                            direction: 'output',
                            type: "string"
                        },
                        {
                            name: "sampleOutput2",
                            direction: 'output',
                            type: "bool"
                        }
                    ]
                };
                var task3 = {
                    namespace: "SampleNamespace3",
                    type: "SampleTaskType3",
                    name: "Sample task 3",
                    properties: [
                        {
                            name: "sampleInput1",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "sampleOutput1",
                            direction: 'output',
                            type: "string"
                        }
                    ]
                };
                return [ task1,  task2, task3 ];
            }
        };
    }]);