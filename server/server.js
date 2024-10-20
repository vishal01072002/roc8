const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {connect} = require("./config/dbConnect");
require("dotenv").config();

const userRoute = require("./routes/user");
const vizualRoute = require("./routes/vizualData");
const { setupExcel } = require('./controllers/vizualData');

const app = express();

app.use(express.json()); // to parse JSON payloads
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_LINK,
    credentials:true,    
}))
// connect with database
connect();

// extract exel file and save in DB
setupExcel();

// mounting
app.use("/api/v1/user", userRoute);
app.use("/api/v1/graph", vizualRoute);

// Test Route
app.get("/", (req, res) => {
    return res.json({
      success: true,
      message: "Your server is up and running ...",
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
