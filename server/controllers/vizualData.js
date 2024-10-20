const { excelReader } = require("../config/excelReader");
const VizualData = require("../models/VizualData");

function dateFormater (date) {
    const excelEpoc = new Date(1900, 0, -1).getTime();
    const msDay = 86400000;
  
    return new Date(excelEpoc + (date * msDay));
}

// @desc   setup and save excel data into db
// route   Server process
// access  Server
exports.setupExcel = async () => {
    try {
        const isSaved = await VizualData.findOne({Sno:1});
        if(isSaved){
            // data is already saved in db
            return;
        }
        const excelData = excelReader();
        const formatedData = excelData.map((value,indx) => {
            const IsYoung = value?.Age === "15-25" ? true : false;
            return {...value,IsYoung,Sno:indx+1,Day:dateFormater(value?.Day)};
        });
        
        await VizualData.insertMany(formatedData);
        console.log(formatedData.slice(0,1));
    } catch (error) {
        console.log(error);
    }
}

// @desc   Test excel data
// route   POST /api/graph/testData
// access  Server test
exports.testData = async(req,res) => {
    const data = excelReader();
    const temps = data?.slice(0,5);

    const updated = temps.map((value,indx) => {
        const IsYoung = value?.Age === "15-25" ? true : false;
        return {...value,IsYoung,Sno:indx+1,Day:dateFormater(value?.Day)};
    });

    // console.log(updated);

    return res.status(200).json({
        success: true,
        message: "data fetch successful",
        data: updated,
    });
}

// @desc   response the graph data
// route   POST /api/graph/graphData
// access  Private
exports.graphData = async(req,res) => {
    try {
        // Bar data accumulation
        const {startDate, endDate} = req.body;
        //console.log(startDate,endDate);
        const barData = await VizualData.aggregate([
            {
                $match: {
                  Day: {
                    $gte: new Date(startDate), // Match data from startDate
                    $lte: new Date(endDate)    // Match data up to and including endDate
                  }
                }
            },
            {
                $group:{
                    _id:{
                        IsYoung: '$IsYoung',
                        Gender: '$Gender'
                    },
                    A:{ $sum: '$A'},
                    B:{ $sum: '$B'},
                    C:{ $sum: '$C'},
                    D:{ $sum: '$D'},
                    F:{ $sum: '$F'},
                    G:{ $sum: '$G'},
                }
            },
            {
                // Format the result
                $project: {
                    _id: 0,
                    IsYoung: '$_id.IsYoung',
                    Gender: '$_id.Gender',
                    A: 1,
                    B: 1,
                    C: 1,
                    D: 1,
                    E: 1,
                    F: 1
                }
            },
        ])

        // console.log(barData);

        // Line Chart data accumulation satisf
        const lineChartData = await VizualData.aggregate([
            {
                $match: {
                  Day: {
                    $gte: new Date(startDate), // Match data from startDate
                    $lte: new Date(endDate)    // Match data up to and including endDate
                  }
                }
            },
            {
                $group:{
                    _id:{
                        Day: '$Day',
                        IsYoung: '$IsYoung',
                        Gender: '$Gender'
                    },
                    A:{ $sum: '$A'},
                    B:{ $sum: '$B'},
                    C:{ $sum: '$C'},
                    D:{ $sum: '$D'},
                    F:{ $sum: '$F'},
                    G:{ $sum: '$G'},
                }
            },
            {
                // Format the result
                $project: {
                    _id: 0,
                    Day: '$_id.Day',
                    IsYoung: '$_id.IsYoung',
                    Gender: '$_id.Gender',
                    A: 1,
                    B: 1,
                    C: 1,
                    D: 1,
                    E: 1,
                    F: 1
                }
            },
            {
                $sort: { Day: 1 }  // Sort by Day
            }
        ]).exec();


        return res.status(200).json({
            success: true,
            message: "data fetch successful",
            barData: barData,
            lineChartData: lineChartData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error in graph Data",
            error:error.message,
        });
    }
    
}