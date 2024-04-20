const { declareType, snakeToCamelCaseConversion, TypedData, Types, withTypeOptions } = require("ydb-sdk");
const { v4: uuidv4 } = require("uuid");

class Users extends TypedData {
  constructor(data) {
    super(data);
    this.login = data.login;
    this.FullName = data.FullName;
    this.id = data.id;
    this.password = data.password;
  }

  static create({ FullName, login, password }) {
    return new this({ FullName, login, password, id: uuidv4() });
  }
}

withTypeOptions({ namesConversion: snakeToCamelCaseConversion });

declareType(Types.UTF8, Users.prototype, 'id');
declareType(Types.UTF8, Users.prototype, 'login');
declareType(Types.UTF8, Users.prototype, 'FullName');
declareType(Types.UTF8, Users.prototype, 'password');

module.exports = { Users };
