import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import roughjs from "roughjs";

const roughGenerator = roughjs.generator();

const WhiteBoard = ({ canvasRef, ctxRef, element, setElement, tool }) => {
    // const canvasRef = useRef(null);
    // const ctxRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);

    // console.log(element);

    const handleMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;

        setIsDrawing(true);

        switch (tool) {
            case "pencil":
                setElement((prev) => [
                    ...prev,
                    {
                        type: "pencil",
                        stroke: "black",
                        path: [[offsetX, offsetY]],
                    },
                ]);
                break;

            case "square":
                setElement((prev) => [
                    ...prev,
                    {
                        type: "square",
                        stroke: "black",
                        x1: offsetX,
                        y1: offsetY,
                        x2: offsetX,
                        y2: offsetY,
                    },
                ]);
                break;

            default:
                break;
        }
        // Create a new stroke
    };

    const handleMouseUp = (e) => {
        // console.log("Mouse Up", e.target);

        setIsDrawing(false);
    };
    const handleMouseMove = (e) => {
        if (!isDrawing) return;

        const { offsetX, offsetY } = e.nativeEvent;

        switch (tool) {
            case "pencil":
                setElement((prev) => {
                    // Copy previous array
                    const updated = [...prev];
                    // Get the last stroke
                    const lastStroke = updated[updated.length - 1];
                    // Create updated stroke
                    updated[updated.length - 1] = {
                        ...lastStroke,
                        path: [...lastStroke.path, [offsetX, offsetY]],
                    };

                    return updated;
                });
                break;
            case "square":
                console.log("Hello");

                setElement((prev) => {
                    const updated = [...prev];

                    const lastSquare = updated[updated.length - 1];

                    updated[updated.length - 1] = {
                        ...lastSquare,
                        x2: offsetX,
                        y2: offsetY,
                    };

                    return updated;
                });
                break;

            default:
                break;
        }
    };

    useLayoutEffect(() => {
        const roughCanvas = roughjs.canvas(canvasRef.current);

        element.forEach((ele) => {
            switch (ele.type) {
                case "pencil":
                    roughCanvas.linearPath(ele.path);
                    break;

                case "square":
                    roughCanvas.rectangle(
                        ele.x1,
                        ele.y1,
                        ele.x2 - ele.x1,
                        ele.y2 - ele.y1,
                    );
                    break;

                default:
                    break;
            }
        });
    }, [element]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctxRef.current = ctx;
    }, []);

    return (
        <>
            <canvas
                className="h-full w-screen"
                id="canvas"
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            />
        </>
    );
};

export default WhiteBoard;
