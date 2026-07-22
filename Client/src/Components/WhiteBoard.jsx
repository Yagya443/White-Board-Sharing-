import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import roughjs from "roughjs";
import { socket } from "../socket";
import { useParams } from "react-router-dom";

const roughGenerator = roughjs.generator();

const WhiteBoard = ({
    canvasRef,
    ctxRef,
    element,
    setElement,
    tool,
    color,
    handleUndo,
    setRedoStack,
}) => {
    // const canvasRef = useRef(null);
    // const ctxRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const handleIncoming = ({ element: incoming, isNew }) => {
            setElement((prev) => {
                if (isNew) {
                    return [...prev, incoming];
                }
                const updated = [...prev];
                updated[updated.length - 1] = incoming;
                return updated;
            });
        };

        socket.on("drawing", handleIncoming);
        return () => socket.off("drawing", handleIncoming);
    }, [setElement]);

    const { roomCode } = useParams();
    // console.log(roomCode);

    const handleMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        setIsDrawing(true);
        switch (tool) {
            case "pencil":
                setElement((prev) => {
                    const newEl = {
                        type: "pencil",
                        stroke: color,
                        path: [[offsetX, offsetY]],
                    };
                    socket.emit("drawing", {
                        roomCode,
                        element: newEl,
                        isNew: true,
                    });
                    return [...prev, newEl];
                });
                break;

            case "square":
                setElement((prev) => {
                    const newEl = {
                        type: "square",
                        stroke: color,
                        x1: offsetX,
                        y1: offsetY,
                        x2: offsetX,
                        y2: offsetY,
                    };
                    socket.emit("drawing", {
                        roomCode,
                        element: newEl,
                        isNew: true,
                    });
                    return [...prev, newEl];
                });
                break;

            case "circle":
                setElement((prev) => {
                    const newEl = {
                        type: "circle",
                        stroke: color,
                        x1: offsetX,
                        y1: offsetY,
                        x2: offsetX,
                        y2: offsetY,
                    };
                    socket.emit("drawing", {
                        roomCode,
                        element: newEl,
                        isNew: true,
                    });
                    return [...prev, newEl];
                });

                break;

            case "eraser":

            default:
                break;
        }

        setRedoStack(element);
        // Create a new stroke
    };

    const handleMouseUp = (e) => {
        setIsDrawing(false);
    };
    const handleMouseMove = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        // console.log("Is 1");

        if (isDrawing) {
            switch (tool) {
                case "pencil":
                    setElement((prev) => {
                        const updated = [...prev];
                        // console.log("updated", updated);

                        const lastStroke = updated[updated.length - 1];
                        // console.log("LastStroke", lastStroke);

                        updated[updated.length - 1] = {
                            ...lastStroke,
                            path: [...lastStroke.path, [offsetX, offsetY]],
                        };
                        socket.emit("drawing", {
                            roomCode,
                            element: updated[updated.length - 1],
                            isNew: false,
                        });
                        return updated;
                    });
                    break;

                case "square":
                    setElement((prev) => {
                        const updated = prev.map((ele, index) => {
                            if (index === prev.length - 1) {
                                return {
                                    ...ele,
                                    x2: offsetX,
                                    y2: offsetY,
                                };
                            }
                            return ele;
                        });
                        socket.emit("drawing", {
                            roomCode,
                            element: updated[updated.length - 1],
                            isNew: false,
                        });

                        return updated;
                    });

                    break;

                case "circle":
                    setElement((prev) => {
                        const updated = prev.map((ele, index) => {
                            if (index === prev.length - 1) {
                                return {
                                    ...ele,
                                    x2: offsetX,
                                    y2: offsetY,
                                };
                            }
                            return ele;
                        });

                        socket.emit("drawing", {
                            roomCode,
                            element: updated[updated.length - 1],
                            isNew: false,
                        });

                        return updated;
                    });

                    break;

                default:
                    break;
            }
            setRedoStack(element);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctxRef.current = ctx;
    }, []);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;

        // console.log(element);

        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const roughCanvas = roughjs.canvas(canvas);

        element.forEach((ele) => {
            switch (ele.type) {
                case "pencil":
                    roughCanvas.linearPath(ele.path, { stroke: ele.stroke });
                    break;
                case "square":
                    roughCanvas.rectangle(
                        ele.x1,
                        ele.y1,
                        ele.x2 - ele.x1,
                        ele.y2 - ele.y1,
                        { stroke: ele.stroke },
                    );
                    break;
                case "circle":
                    const radius = Math.sqrt(
                        (ele.x2 - ele.x1) ** 2 + (ele.y2 - ele.y1) ** 2,
                    );
                    roughCanvas.circle(ele.x1, ele.y1, radius * 2, {
                        stroke: ele.stroke,
                    });
                    break;

                default:
                    break;
            }
        });
        // handleUndo()
    }, [element]);

    return (
        <>
            <canvas
                className="h-full w-screen"
                id="canvas"
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
            />
        </>
    );
};

export default WhiteBoard;
