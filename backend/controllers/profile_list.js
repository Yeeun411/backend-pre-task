const { 
    fetchProfileListService,
    fetchAvailableColumnsService
} = require('../services/profile_list.js');

const { 
    FetchListDto
} = require('../dtos/profile_list.js');

exports.fetchProfileListController = async (req, res) => {
    try {
        const fetchListDto = new FetchListDto(req.query);
    
        const result = await fetchProfileListService(fetchListDto);

        if (!result) {
            return res.status(404).send("Profile cards not found");
        }

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};


exports.fetchAvailableColumnsController = async (req, res) => {
    try {
        const result = await fetchAvailableColumnsService();

        if (!result) {
            return res.status(404).send("Columns not found");
        }

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}