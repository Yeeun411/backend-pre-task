const FetchListDto = require('../dto/FetchListDto');
const profileCardService = require('../services/profile-cards');

exports.fetchList = async (req, res) => {
  const fetchListDto = new FetchListDto(req.query);

  const { list, total } = await profileCardService.fetchList(fetchListDto);
  
  res.json({ list, total });
};

exports.fetchColumns = async (req, res) => {
    const columns = await profileCardService.fetchColumns();
    
    res.json({ columns });
  };