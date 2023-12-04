const { col } = require("sequelize");

class FetchListDto {
  constructor(query) {
    this.page = parseInt(query.current, 10);
    this.pageSize = parseInt(query.pageSize, 10);
    this.columns = query.columns;
    this.sort = query.sort;
  }
}

module.exports = {
  FetchListDto
};