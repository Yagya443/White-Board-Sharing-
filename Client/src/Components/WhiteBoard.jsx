import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import roughjs from "roughjs";

const roughGenerator = roughjs.generator();

const WhiteBoard = ({ canvasRef, ctxRef, element, setElement }) => {
    // const canvasRef = useRef(null);
    // const ctxRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);

    // console.log(element);

    const handleMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;

        setIsDrawing(true);

        // Create a new stroke
        setElement((prev) => [
            ...prev,
            {
                type: "pencil",
                stroke: "black",
                path: [[offsetX, offsetY]],
            },
        ]);
    };

    console.log(element);
    const handleMouseUp = (e) => {
        // console.log("Mouse Up", e.target);

        setIsDrawing(false);
    };
    const handleMouseMove = (e) => {
        if (!isDrawing) return;

        const { offsetX, offsetY } = e.nativeEvent;

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
    };

    useLayoutEffect(() => {
        const roughCanvas = roughjs.canvas(canvasRef.current);

        element.forEach((ele) => {
            roughCanvas.linearPath(ele.path);
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
