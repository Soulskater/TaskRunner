/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskRunner')
    .service('mockService', ['$q', function ($q) {
        return{
            getMockTasks: function () {
                var tasks = [
                    {
                        "DisplayText": "Add",
                        "Groups": ["Calculator"],
                        "DotNetType": "TaskRunner.Plugin.Samples.Calculator.Add",
                        "ContainerAssembly": "TaskRunner.Plugin.Samples, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                        "InputProperties": [
                            {
                                "PropertyName": "Number1",
                                "LabelText": "Number 1",
                                "HintText": "The first number to add",
                                "Required": true,
                                "DefaultValue": "0",
                                "PropertyValueType": "Number",
                                "Value": null,
                                "Reference": null,
                                "Direction": "input"
                            },
                            {"PropertyName": "Number2", "LabelText": "Number 2", "HintText": "The second number to add", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": null, "Direction": "input"},
                            {"PropertyName": "Number3", "LabelText": "Number 2", "HintText": "The third number to add", "Required": false, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": null, "Direction": "input"}
                        ],
                        "OutputProperties": [
                            {"LabelText": "Result", "ShortDescription": null, "References": null ,"Direction": "output", "PropertyValueType": "Number"}
                        ],
                        "Id": "00000000-0000-0000-0000-000000000000",
                        "UserGivenDisplayName": null,
                        "Position": null,
                        "HelpText": "Add Numbers"
                    },
                    {
                        "DisplayText": "Multiply",
                        "Groups": ["Calculator"],
                        "DotNetType": "TaskRunner.Plugin.Samples.Calculator.Multiply",
                        "ContainerAssembly": "TaskRunner.Plugin.Samples, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                        "InputProperties": [
                            {"PropertyName": "Number1", "LabelText": "Number 1", "HintText": "The first number to multiply", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": null, "Direction": "input"},
                            {"PropertyName": "Number2", "LabelText": "Number 2", "HintText": "The second number to multiply", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": null, "Direction": "input"},
                            {"PropertyName": "Number3", "LabelText": "Number 2", "HintText": "The third number to multiply", "Required": false, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": null, "Direction": "input"}
                        ],
                        "OutputProperties": [
                            {"LabelText": "Result", "ShortDescription": null, "References": null ,"Direction": "output", "PropertyValueType": "Number"}
                        ],
                        "Id": "00000000-0000-0000-0000-000000000000",
                        "UserGivenDisplayName": null,
                        "Position": null,
                        "HelpText": null
                    },
                    {
                        "DisplayText": "Substract",
                        "Groups": ["Calculator"],
                        "DotNetType": "TaskRunner.Plugin.Samples.Calculator.Substract",
                        "ContainerAssembly": "TaskRunner.Plugin.Samples, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                        "InputProperties": [
                            {"PropertyName": "Number1", "LabelText": "Number 1", "HintText": "The first number to substract from", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": null, "Direction": "input"},
                            {"PropertyName": "Number2", "LabelText": "Number 2", "HintText": "The second number to substract", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": null, "Direction": "input"},
                            {"PropertyName": "Number3", "LabelText": "Number 2", "HintText": "The third number to substract", "Required": false, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": null, "Direction": "input"}
                        ],
                        "OutputProperties": [
                            {"LabelText": "Result", "ShortDescription": null, "References": null ,"Direction": "output", "PropertyValueType": "Number"}
                        ],
                        "Id": "00000000-0000-0000-0000-000000000000",
                        "UserGivenDisplayName": null,
                        "Position": null,
                        "HelpText": "Substract numbers"
                    }
                ];

                return tasks;
            },
            getMockFlow: function (tasks) {

                var flow = {
                    Id: "aaf8f049-3bef-4362-ba5c-1475fde8414d",
                    DisplayName: "Flow 1",
                    UserId: "",
                    Tasks: tasks,
                    Properties: [
                        { KEY: "VALUE" }
                    ]
                };

                return flow;
            }
        };
    }]);
angular.module('TaskRunner')
    .service('mainService', ['$q', 'mockService', function ($q, $mock) {
        return{
            getFlows: function () {
                var flow1 = $mock.getMockFlow($mock.getMockTasks());
                var flow2 = angular.copy(flow1);
                flow2.Id = "c02a9ab1-9a03-4f33-80a5-18b2470ebfdd";
                flow2.DisplayName = "Flow 2";
                var flow3 = angular.copy(flow1);
                flow3.Id = "7573a265-2ed2-42ea-9ab5-8ee203c1a01b";
                flow3.DisplayName = "Flow 3";
                return [ flow1, flow2, flow3 ];
            },
            getFlow: function () {
                return $mock.getMockFlow($mock.getMockTasks());
            },
            getToolBoxItems: function () {
                var task1 = {
                    Id: "4518985f-c78d-464c-8b28-ff34400df69d",
                    Namespace: "SampleNamespace",
                    FullType: "SampleTaskType1",
                    DisplayName: "Sample task 1",
                    InputProperties: [
                        {
                            Name: "sampleInput1",
                            Direction: 'input',
                            DefaultValue: 'DefaultValue',
                            Required: true,
                            Type: "string",
                            Value: "",
                            References: [ ]
                        }
                    ],
                    OutputProperties: [
                        {
                            Name: "sampleOutput",
                            Direction: 'output',
                            DefaultValue: 'someVal',
                            Required: true,
                            Type: "string",
                            Value: "",
                            References: [ ]
                        }
                    ]
                };

                var task2 = {
                    Id: "0def21da-4046-4ed8-9748-4e9e20b970dd",
                    Namespace: "SampleNamespace",
                    FullType: "SampleTaskType1",
                    DisplayName: "Sample task 1",
                    InputProperties: [
                        {
                            Name: "sampleInput1",
                            Direction: 'input',
                            DefaultValue: 'DefaultValue',
                            Required: true,
                            Type: "string",
                            Value: "",
                            References: [ ]
                        }
                    ],
                    OutputProperties: [
                        {
                            Name: "sampleOutput",
                            Direction: 'output',
                            DefaultValue: 'someVal',
                            Required: true,
                            Type: "string",
                            Value: "",
                            References: [ ]
                        }
                    ]
                };

                return [ task1, task2 ];
            }
        };
    }]);