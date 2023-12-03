class FetchListDto {
    constructor(query) {
      this.page = query.page;
      this.pageSize = query.pageSize;
      this.columns = query.columns;
      this.sort = query.sort;
    }
  }
  
module.exports = {
    FetchListDto
  };