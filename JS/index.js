// VANILA NODE

// Import the 'http' module
const http = require("http");

// Define the hostname and port
const hostname = "127.0.0.1";
const port = 3000;

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Set the status code and content type of the response
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");

    // Send the response body
    res.end("Hello, World!\n");
});

// Start the server and listen for incoming requests
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});





// NODE + EXPRESS

// Import the express module
const express = require("express");

// Create an instance of the express application
const app = express();

// Define a route handler for the root path
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});






// NODE + NEST

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    console.log("Application is running on http://localhost:3000");
}
bootstrap();

import { Module } from "@nestjs/common";
import { HelloController } from "./hello.controller";

@Module({
    controllers: [HelloController],
})
export class AppModule {}

import { Controller, Get } from "@nestjs/common";

@Controller("hello")
export class HelloController {
    @Get()
    getHello() {
        return "Hello, World!";
    }
}
