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
import { useRef, useState } from "react";
import WhiteBoard from "../Components/WhiteBoard";

const BoardPage = () => {
    const [color, setColor] = useState("#000000");
    const [tool, setTool] = useState("pointer");
    const [element, setElement] = useState([]);

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    // console.log(element);

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
                        <span>0 Online</span>
                    </div>

                    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                        <Share2 size={18} className="inline mr-2" />
                        Share
                    </button>
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                        <Download size={18} className="inline mr-2" />
                        Download
                    </button>
                    {/* < /> */}
                </div>
            </div>

            <div className="absolute top-24 left-6 bg-white rounded-2xl shadow-lg p-3 flex flex-col gap-3 z-20">
                <button
                    className={`p-3 rounded-xl  ${tool === "pointer" ? "bg-blue-100 text-blue-600 " : "hover:bg-gray-100"}`}
                    onClick={(e) => setTool("pointer")}
                >
                    <MousePointer2 />
                </button>

                <button
                    className={`p-3 rounded-xl  ${tool === "pencil" ? "bg-blue-100 text-blue-600 " : "hover:bg-gray-100"}`}
                    onClick={(e) => setTool("pencil")}
                >
                    <Pencil />
                </button>

                <button
                    className={`p-3 rounded-xl  ${tool === "square" ? "bg-blue-100 text-blue-600 " : "hover:bg-gray-100"}`}
                    onClick={(e) => setTool("square")}
                >
                    <Square />
                </button>

                <button
                    className={`p-3 rounded-xl  ${tool === "circle" ? "bg-blue-100 text-blue-600 " : "hover:bg-gray-100"}`}
                    onClick={(e) => setTool("circle")}
                >
                    <Circle />
                </button>

                <button
                    className={`p-3 rounded-xl  ${tool === "eraser" ? "bg-blue-100 text-blue-600 " : "hover:bg-gray-100"}`}
                    onClick={(e) => setTool("eraser")}
                >
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

            <div className="absolute top-28 right-6 bg-white rounded-2xl shadow-lg p-4 z-20">
                <p className="font-semibold mb-3">Colors</p>
                <label htmlFor="color">Select Color:</label>
                <input
                    type="color"
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    // className="mt-1"
                />
            </div>

            <div className="absolute top-0 left-0 w-full h-full cursor-crosshair">
                <WhiteBoard
                    canvasRef={canvasRef}
                    ctxRef={ctxRef}
                    element={element}
                    setElement={setElement}
                    tool={tool}
                    color={color}
                />
                {/* <h1>{JSON.stringify(element)}</h1> */}
            </div>
        </div>
    );
};

export default BoardPage;
