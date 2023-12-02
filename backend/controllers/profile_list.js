const { 
  fetchListService, 
  fetchColumnsService
} = require('../services');


exports.fetchColumnsController = async (req, res) => {
    try {
        const columns = await fetchColumnsService();
        res.json({ columns });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.fetchListController = async (req, res) => {
  try {
      const query = {
          page: parseInt(req.query.page) || 1,
          pageSize: parseInt(req.query.pageSize) || 10,
          columns: req.query.columns || [],
          sort: req.query.sort || null
      };

      const result = await fetchListService(query);
      res.json(result);
  } catch (error) {
      res.status(500).send(error.message);
  }
}