const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");

// routes
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type --application/json
app.use(express.json());

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const Role = db.role;
// db.sequelize.sync({force: true}).then(() => {
//     console.log("Drop and Resync Db");
//     initial();
// });

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}

// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcom to mini ecom server"
    });
});

// headers
const appHeaders = function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
};

app.use(appHeaders);

const PORT = process.env.PORT || 8000;

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});