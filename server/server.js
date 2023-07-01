const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");

const routes = require("./routes");

const app = express();

const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type --application/json
app.use(express.json());

// app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// headers
const appHeaders = function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
};

app.use(appHeaders);
app.get("/", (req, res) => {
    res.json({
        message: "Welcom to mini ecom server"
    });
});

app.use("/api", routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});