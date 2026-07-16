import {
    Pencil,
    Square,
    Circle,
    Eraser,
    MousePointer2,
    Undo2,
    Redo2,
    Trash2,
    Download,
    Share2,
    Users,
} from "lucide-react";

const BoardPage = () => {
    return (
        <div className="h-screen w-full bg-[#f5f5f5] overflow-hidden">
            {/* Top Navbar */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-white shadow flex justify-between items-center px-6 z-20">
                <div>
                    <h1 className="text-xl font-bold">WhiteBoard</h1>
                    <p className="text-sm text-gray-500">Room: A7B29F</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                        <Users size={18} />
                        <span>4 Online</span>
                    </div>

                    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                        <Share2 size={18} className="inline mr-2" />
                        Share
                    </button>
                </div>
            </div>

            {/* Left Toolbar */}

            <div className="absolute top-24 left-6 bg-white rounded-2xl shadow-lg p-3 flex flex-col gap-3 z-20">
                <button className="p-3 rounded-xl hover:bg-gray-100">
                    <MousePointer2 />
                </button>

                <button className="p-3 rounded-xl bg-blue-100 text-blue-600">
                    <Pencil />
                </button>

                <button className="p-3 rounded-xl hover:bg-gray-100">
                    <Square />
                </button>

                <button className="p-3 rounded-xl hover:bg-gray-100">
                    <Circle />
                </button>

                <button className="p-3 rounded-xl hover:bg-gray-100">
                    <Eraser />
                </button>

                <hr />

                <button className="p-3 rounded-xl hover:bg-gray-100">
                    <Undo2 />
                </button>

                <button className="p-3 rounded-xl hover:bg-gray-100">
                    <Redo2 />
                </button>

                <button className="p-3 rounded-xl hover:bg-red-100 text-red-600">
                    <Trash2 />
                </button>
            </div>

            {/* Right Color Palette */}

            <div className="absolute top-28 right-6 bg-white rounded-2xl shadow-lg p-4 z-20">
                <p className="font-semibold mb-3">Colors</p>

                <div className="grid grid-cols-2 gap-3">
                    <button className="w-10 h-10 rounded-full bg-black"></button>
                    <button className="w-10 h-10 rounded-full bg-red-500"></button>
                    <button className="w-10 h-10 rounded-full bg-blue-500"></button>
                    <button className="w-10 h-10 rounded-full bg-green-500"></button>
                    <button className="w-10 h-10 rounded-full bg-yellow-400"></button>
                    <button className="w-10 h-10 rounded-full bg-purple-500"></button>
                </div>
            </div>

            {/* Bottom Controls */}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full px-8 py-3 flex gap-6 z-20">
                <button>
                    <Undo2 />
                </button>

                <button>
                    <Redo2 />
                </button>

                <button>
                    <Download />
                </button>
            </div>

            {/* Whiteboard Canvas */}

            <canvas
                id="canvas"
                className="absolute top-0 left-0 w-full h-full cursor-crosshair"
            />
        </div>
    );
};

export default BoardPage;
