const express = require("express");
const http = require("http");

const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});

app.get("/", (req, res) => {
    // console.log("Hello World");
    res.send("Hello ");
});

// io.on("connection", (socket) => {
//     console.log("Connected:", socket.id);

//     socket.on("userJoined", ({ name, roomCode }) => {
//         socket.join(roomCode);

//         socket.roomCode = roomCode;
//         socket.name = name;

//         console.log(`${name} joined ${roomCode}`);
//     });

//     socket.on("disconnect", () => {
//         console.log("Disconnected:", socket.id);
//     });
// });

io.on("connection", (socket) => {
    console.log("Connected:", socket.id);
    socket.on("userJoined", ({ name, roomCode }) => {
        socket.join(roomCode);
        console.log(`${name} joined ${roomCode}`);

        io.to(roomCode).emit("userJoined", {
            name,
            roomCode,
        });
    });

    socket.on("drawing", ({ roomCode, element }) => {
        socket.to(roomCode).emit("drawing", element);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected:", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server is been connected");
});
