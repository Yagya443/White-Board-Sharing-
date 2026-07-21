import { Routes, Route } from "react-router-dom";
import RoomPage from "../src/Pages/RoomPage";
import HomePage from "../src/Pages/HomePage";
import { useEffect } from "react";
import { socket } from "./socket";

const App = () => {
    const uuid = crypto.randomUUID();

    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id);
        });

        return () => {
            socket.off("connect");
        };
    }, []);

    return (
        <Routes>
            <Route path="/" element={<RoomPage uuid={uuid} />} />
            <Route path="/:roomCode" element={<HomePage />} />
        </Routes>
    );
};

export default App;
