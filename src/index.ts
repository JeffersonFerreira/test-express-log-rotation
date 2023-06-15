import express from "express"
import winston from "winston";
import expressWinston from "express-winston"
import winstonDailyRotateTransport from "winston-daily-rotate-file";

const app = express()

const my_logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.simple(),
        winston.format.timestamp(),
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.prettyPrint({colorize: true})
        }),

        // Group logs by day 💖
        new winstonDailyRotateTransport({
            filename: "./logs/application-%DATE%.log",
            datePattern: "YYYY-MM-DD-HH"
        })
    ]
})

app.use(expressWinston.logger({winstonInstance: my_logger}));

app.get("/", async (req, res) => {
    return res.send("Hello world");
})

app.get("/falty", async (req, res) => {
    throw new Error("This route sucks");
})

app.listen(3000, function () {
    console.log("App listening at port %d", 3000)
})