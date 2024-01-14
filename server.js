const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URL;
mongoose.connect(
    connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, goose) => {
        if (err) console.log("ERROR on connection MongoDB");
        else {
            console.log("MongoDB connection succeed");
            // console.log(goose);   // buyerda mongoose clientni beradi.
            const server = require("./app");
            let PORT = process.env.PORT || 3003;
            server.listen(PORT, function () {
                console.log(
                    `The server is running successfully on port: ${PORT},
                    http://localhost:${PORT}`
            );
        });
    }
});


