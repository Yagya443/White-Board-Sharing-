import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import roughjs from "roughjs";

const roughGenerator = roughjs.generator();

const WhiteBoard = ({
    canvasRef,
    ctxRef,
    element,
    setElement,
    tool,
    color,
}) => {
    // const canvasRef = useRef(null);
    // const ctxRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);

    // console.log(color);

    const handleMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        setIsDrawing(true);
        switch (tool) {
            case "pencil":
                setElement((prev) => [
                    ...prev,
                    {
                        type: "pencil",
                        stroke: color,
                        path: [[offsetX, offsetY]],
                    },
                ]);
                break;

            case "square":
                setElement((prev) => [
                    ...prev,
                    {
                        type: "square",
                        stroke: color,
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
        setIsDrawing(false);
    };
    const handleMouseMove = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        console.log("Is 1");

        if (isDrawing) {
            // console.log('Is 2');

            switch (tool) {
                case "pencil":
                    setElement((prev) => {
                        const updated = [...prev];
                        const lastStroke = updated[updated.length - 1];
                        updated[updated.length - 1] = {
                            ...lastStroke,
                            path: [...lastStroke.path, [offsetX, offsetY]],
                        };

                        return updated;
                    });
                    break;
                case "square":
                    setElement((prev) =>
                        prev.map((ele, index) => {
                            if (index === prev.length - 1) {
                                return {
                                    ...ele,
                                    x2: offsetX,
                                    y2: offsetY,
                                };
                            }
                            return ele;
                        }),
                    );
                    break;

                default:
                    break;
            }
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

        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const roughCanvas = roughjs.canvas(canvas);

        element.forEach((ele) => {
            switch (ele.type) {
                case "pencil":
                    roughCanvas.linearPath(ele.path, {
                        stroke: ele.stroke,
                    });
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

                default:
                    break;
            }
        });
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
