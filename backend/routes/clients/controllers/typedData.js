const { declareType, snakeToCamelCaseConversion, TypedData, Types, withTypeOptions } = require("ydb-sdk");

class Clients extends TypedData {
  constructor(data) {
    super(data);
    this.AccountNumber = data.AccountNumber;
    this.LastName = data.LastName;
    this.FirstName = data.FirstName;
    this.MiddleName = data.MiddleName;
    this.DateOfBirth = data.DateOfBirth;
    this.INN = data.INN;
    this.ResponsibleFullName = data.ResponsibleFullName;
    this.Status = data.Status;
  }

  static create({ AccountNumber, LastName, FirstName, MiddleName, DateOfBirth, INN,ResponsibleFullName, Status}) {
    return new this({ AccountNumber, LastName, FirstName, MiddleName, DateOfBirth, INN,ResponsibleFullName, Status});
  }
}

withTypeOptions({ namesConversion: snakeToCamelCaseConversion });

declareType(Types.UINT64, Clients.prototype, 'AccountNumber');
declareType(Types.UTF8, Clients.prototype, 'LastName');
declareType(Types.UTF8, Clients.prototype, 'FirstName');
declareType(Types.UTF8, Clients.prototype, 'MiddleName');
declareType(Types.DATE, Clients.prototype, 'DateOfBirth');
declareType(Types.UINT64, Clients.prototype, 'INN');
declareType(Types.UTF8, Clients.prototype, 'ResponsibleFullName');
declareType(Types.UTF8, Clients.prototype, 'Status');

module.exports = { Clients };
