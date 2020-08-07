
// controller for http://127.0.0.1:3000/employees

app.controller('EmployeesCtrl', ['$scope', '$http', '$log', '$q', '$interval', 'gridService', function ($scope, $http, $log, $q, $interval, gridService) {
  
  $scope.gridOptions = {
    rowHeight: 25, 
    rowEditWaitInterval: -1
  };

  $scope.gridOptions.columnDefs = [
    { name: 'name', validators: {required: true, minLength: 1, maxLength: 15}, validation_messages: {required: "Name is mandatory", value: "Length should be between 3 and 15 characters"}},
    { name: 'gender', editableCellTemplate: 'ui-grid/dropdownEditor', 
     cellFilter: 'mapGender', editDropdownValueLabel: 'gender', editDropdownOptionsArray: [
      { id: 1, gender: 'male' }, 
      { id: 2, gender: 'female' } 
      ]
    },
    { name: 'designation', editableCellTemplate: 'ui-grid/dropdownEditor', 
      cellFilter: 'mapDesignation', editDropdownValueLabel: 'designation', editDropdownOptionsArray: [
        { id: 1, designation: 'manager' }, 
        { id: 2, designation: 'executive' }, 
        { id: 3, designation: 'store keeper' }, 
        { id: 4, designation: 'helper' }, 
        { id: 5, designation: 'security' } 
      ]
    }, 
    { name: 'department', editableCellTemplate: 'ui-grid/dropdownEditor', 
      cellFilter: 'mapDepartment', editDropdownValueLabel: 'department', editDropdownOptionsArray: [
        { id: 1, department: 'Sales' }, 
        { id: 2, department: 'Marketing' }, 
        { id: 3, department: 'Store' }, 
        { id: 4, department: 'Security' }
      ]
    },        
    { name: 'date_of_joining', displayName: 'Date of joining' , type: 'date', cellFilter: 'date:"yyyy-MM-dd"' },
    { name: 'Delete', cellTemplate: '<button class="btn primary" ng-click="grid.appScope.deleteEmployee(row)">Delete</button>' }
  ];
 
  $scope.addEmployee = function(row) {
    gridService.addRow($scope, {"gender": 1, "designation": 1, "department": 1, "date_of_joining": new Date()});
  };

  $scope.deleteEmployee = function(row) {
    gridService.deleteRow($scope, row);
  };

  $scope.gridOptions.data = angular.copy(employees); //copies data to grid when page is loaded, employees is returned  by 
  $scope.rowsDeleted = []; // track id of rows for which delete button is clicked
  $scope.deletedRowHash = []; // track hashKey of rows for which delete button is clicked, to remove from dirty rows to avoid creation of new rows

  $scope.gridOptions.onRegisterApi = function(gridApi) {
    $scope.gridApi = gridApi;
    gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
  };

  $scope.resetData = function(employees) {    
    gridService.resetData($scope, employees);
  };

  $scope.gridOptions.onRegisterApi = function(gridApi){
    //set gridApi on scope
    $scope.gridApi = gridApi;
    gridApi.validate.on.validationFailed($scope,function(rowEntity, colDef, newValue, oldValue){
      gridService.displayErrorAlert(colDef);
    });
  };
 
$scope.save = function() {

  var payload = {};
  
  if($scope.rowsDeleted.length > 0) {
    payload["employeesDeleted"] = $scope.rowsDeleted;
  }

  var dirtyRows = gridService.getDirtyRows($scope);

  // remove dirtyRows for which delete button is clicked, otherwise a new record will be created by save request
  for(rowIndex in dirtyRows) {
    if($scope.deletedRowHash[dirtyRows[rowIndex].$$hashKey]) {
      dirtyRows.splice(rowIndex, 1);
    }
  }
  
  if(dirtyRows.length > 0) {
    payload["employees"] = dirtyRows;
  }
 
  $.ajax({
    url: "/employees/save",
    type: "post",
    data: {"data": JSON.parse(angular.toJson(payload))},
    success: function(result) { 
      employees = result.employees;
      $scope.resetData(result.employees);
      alert(result.message); 
    },
    error: function(error) {
      alert(error.message); 
    }
  });
}

$scope.cancel = function() {  
  $scope.resetData(employees);
}

// method to handle promise related error - "A promise was not returned when saveRow event was raised..."
$scope.saveRow = function (rowEntity) {
  var promise = $q.defer();
  $scope.gridApi.rowEdit.setSavePromise(rowEntity, promise);

    $interval( function() {        
      promise.resolve();  
    }, 2000, 1);
  };

}])

.filter('mapGender', function() {
  var genderHash = {
    1: 'male',
    2: 'female'
  };

  return function(input) {
    if (!input){
      return '';
    } else {
      return genderHash[input];
    }
  };
}) 

.filter('mapDesignation', function() {
  var designationHash = {
    1: 'manager',
    2: 'executive',
    3: 'store keeper',
    4: 'helper',
    5: 'security'
  };

  return function(input) {
    if (!input){
      return '';
    } else {
      return designationHash[input];
    }
  };
}) 

.filter('mapDepartment', function() {
  var departmentHash = {
    1: 'sales',
    2: 'marketing',
    3: 'store',
    4: 'security'
  };

  return function(input) {
    if (!input){
      return '';
    } else {
      return departmentHash[input];
    }
  };
})   

