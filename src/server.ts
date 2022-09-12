import express, { Request, Response } from "express";

const app = express();

app.get("/", (request: Request, response: Response) => {
    return response.json({
        message: "Hello Word"
    })
});

app.listen(3000, () => console.log("Server is running"));