import React from "react";
import { useState } from "react";

const RoomPage = () => {
    const [roomCode, setRoomCode] = useState();

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center gap-8">
            <div className="flex w-96 min-h-[300px] flex-col gap-5 rounded-xl border border-gray-300 bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-semibold">Create Room</h2>

                <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="rounded-lg border px-4 py-3"
                />

                <div className="flex flex-col gap-2">
                    <label className="font-medium">Room Code</label>

                    <div className="flex items-center justify-between rounded-lg border bg-gray-100 px-4 py-3">
                        <span className="font-mono text-lg">{roomCode}</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="flex-1 rounded-lg bg-blue-600 py-3 text-white">
                        Generate
                    </button>

                    <button className="flex-1 rounded-lg border py-3">
                        Copy
                    </button>
                </div>
            </div>

            <div className="flex w-96 min-h-[300px] flex-col gap-5 rounded-xl border border-gray-300 bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-semibold">Create Room</h2>

                <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="rounded-lg border px-4 py-3"
                />
                <h2 className="text-2xl font-semibold">Join Room</h2>

                <input
                    type="text"
                    placeholder="Enter Room Code"
                    className="rounded-lg border px-4 py-3"
                />
            </div>
        </div>
    );
};

export default RoomPage;
