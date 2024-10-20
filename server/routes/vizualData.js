const Router = require("express");
const { testData, graphData } = require("../controllers/vizualData");
const router = Router();

// Route for test temp data
router.post("/testData",testData);
router.post("/graphdata",graphData);


module.exports = router;