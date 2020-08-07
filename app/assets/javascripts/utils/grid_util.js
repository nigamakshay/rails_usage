//add methods to be used by grids

app.service('gridService', function() {

  this.addRow = function(scope, data = {}) {
    scope.gridOptions.data.push(data);
  }

  this.deleteRow = function(scope, row) {
    var index = scope.gridOptions.data.indexOf(row.entity);
    scope.gridOptions.data.splice(index, 1);
    if(row.entity.id) {
      scope.rowsDeleted.push(row.entity.id);
    } else {
      this.removeDirtyRowForDeletedRow(scope, row);      
    }
  }

  this.getDirtyRows = function(scope) {
    var dirtyRows = scope.gridApi.rowEdit.getDirtyRows().map(function (gridRow) {
      return gridRow.entity;
    });

    return dirtyRows;
  }

  this.removeDirtyRowForDeletedRow = function(scope, row) {
    scope.deletedRowHash = scope.deletedRowHash || {};
    scope.deletedRowHash[row.entity.$$hashKey] = row.entity;
  }  

  this.resetData = function(scope, data) {    
    scope.gridApi.rowEdit.setRowsClean(this.getDirtyRows(scope));
    scope.gridOptions.data = angular.copy(data);    
    scope.rowsDeleted = [];
  }

  this.displayErrorAlert = function(colDef) {
    var validation_messages = Object.values(colDef.validation_messages);
    var validation_text = "";
    for(i in validation_messages) {
      validation_text = validation_text + '\n' + validation_messages[i]; 
    }
  
    alert(colDef.name + " validation failed:" + '\n\n' + validation_text); 
  }           
});

