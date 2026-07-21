import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

const RoomPage = ({ uuid }) => {
    const navigate = useNavigate();

    const [roomCode, setRoomCode] = useState("");
    const [name, setName] = useState("");
    // const [joinRoomCode, setJoinRoomCode] = useState("");

   
    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center gap-8">
           

            <div className="flex w-96 min-h-[350px] py-3 flex-col gap-5 rounded-xl border border-gray-300 bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-semibold">Create Room</h2>

                <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="rounded-lg border px-4 py-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <h2 className="text-2xl font-semibold">Join Room</h2>

                <input
                    type="text"
                    placeholder="Enter Room Code"
                    className="rounded-lg border px-4 py-3"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                />

                <button
                    className="flex-1 rounded-lg bg-blue-600 py-3 text-white"
                    onClick={() => setRoomCode(uuid)}
                >
                    Generate
                </button>
                <button
                    className="rounded-lg bg-blue-600 py-2 text-white"
                    onClick={() => {
                        if (!roomCode.trim() || !name.trim()) {
                            alert("Please enter a room code or name.");
                            return;
                        }

                        const roomData = {
                            name,
                            roomCode,
                        };

                        socket.emit("userJoined", roomData);

                        navigate(`/${roomCode}`);
                    }}
                >
                    Join Room
                </button>
            </div>
        </div>
    );
};

export default RoomPage;
