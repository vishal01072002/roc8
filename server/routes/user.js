const Router = require("express");
const router = Router();

const {login, signup} = require("../controllers/user");
const { excelReader } = require("../config/excelReader");


// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

// Route for test temp data
router.post("/testData",async(req,res) => {
    const excelEpoc = new Date(1900, 0, -1).getTime();
    const msDay = 86400000;

    function excelDateToJavascript(excelDate) {
      return  new Date(excelEpoc + excelDate * msDay);
    }
    const data = excelReader();
    const temps = data?.slice(0,2);

    const updated = temps.map((value,indx) => {
        const IsYoung = value?.Age === "15-25" ? true : false;
        return {...value,IsYoung,Sno:indx+1,Day:excelDateToJavascript(value?.Day)};
    });

    console.log(updated);

    return res.status(200).json({
        success: true,
        message: "data fetch successful",
        data: updated,
    })
});


module.exports = router;