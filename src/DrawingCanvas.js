import { useEffect, useRef, useState } from "react";

let coordinates = {
  x: 0,
  y: 0,
};

const DrawingCanvas = () => {
  const canvas = useRef();
  const [context, setContext] = useState();
  const [color, setColor] = useState("#080808");
  const [drawData, setDrawData] = useState();

  const clearCanvasHandler = () => {
    if (!canvas.current) return;
    const canvasCtx = canvas.current.getContext("2d");
    console.log("This is the CLICK!");
    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    }
  };

  const saveCanvasFinalDrawHandler = () => {
    if (!canvas.current) return;
    const canvasCtx = canvas.current.getContext("2d");
    if (canvasCtx) {
      setDrawData(
        canvasCtx.getImageData(
          0,
          0,
          canvas.current.width,
          canvas.current.height
        )
      );
    }
  };

  useEffect(() => {
    let mouseDown = false;
    let start = coordinates;
    let end = coordinates;
    let canvasOffsetLeft = 0;
    let canvasOffsetTop = 0;

    const handleMouseDown = (e) => {
      mouseDown = true;

      start = {
        x: e.clientX - canvasOffsetLeft,
        y: e.clientY - canvasOffsetTop,
      };

      end = {
        x: e.clientX - canvasOffsetLeft,
        y: e.clientY - canvasOffsetTop,
      };
    };
    const handleMouseUp = (e) => {
      mouseDown = false;
    };
    const handleMouseMove = (e) => {
      if (mouseDown && context) {
        start = {
          x: end.x,
          y: end.y,
        };

        end = {
          x: e.clientX - canvasOffsetLeft,
          y: e.clientY - canvasOffsetTop,
        };

        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.strokeStyle = `${color}`;
        context.lineWidth = 5;
        context.stroke();
        context.closePath();
      }
    };

    if (canvas.current) {
      const renderCtx = canvas.current.getContext("2d");

      if (renderCtx) {
        canvas.current.addEventListener("mousedown", handleMouseDown);
        canvas.current.addEventListener("mouseup", handleMouseUp);
        canvas.current.addEventListener("mousemove", handleMouseMove);

        canvasOffsetLeft = canvas.current.offsetLeft;
        canvasOffsetTop = canvas.current.offsetTop;

        setContext(renderCtx);
      }
    }

    return function cleanup() {
      if (canvas.current) {
        canvas.current.removeEventListener("mousedown", handleMouseDown);
        canvas.current.removeEventListener("mousemove", handleMouseMove);
        canvas.current.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [context, color]);

  // TOUCH DRAWING

  useEffect(() => {
    let mouseDown = false;
    let start = coordinates;
    let end = coordinates;
    let canvasOffsetLeft = 0;
    let canvasOffsetTop = 0;

    const touchStartHnadler = (e) => {
      console.log("touchStartHnadler", e);
      mouseDown = true;

      start = {
        x: e.clientX - canvasOffsetLeft,
        y: e.clientY - canvasOffsetTop,
      };

      end = {
        x: e.clientX - canvasOffsetLeft,
        y: e.clientY - canvasOffsetTop,
      };
    };

    // Handling mouse move

    const touchMoveHandler = (e) => {
      console.log(mouseDown);

      if (mouseDown && context) {
        start = {
          x: end.x,
          y: end.y,
        };
        console.log("startMove", start);

        end = {
          x: e.touches[0].clientX - canvasOffsetLeft,
          y: e.touches[0].clientY - canvasOffsetTop,
        };
        console.log("endMove", end);

        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.strokeStyle = `${color}`;
        context.lineWidth = 5;
        context.stroke();
        context.closePath();
      }
    };

    // Handling mouse up

    const touchEndHnadler = (e) => {
      mouseDown = false;
    };

    if (canvas.current) {
      const renderCtx = canvas.current.getContext("2d");

      if (renderCtx) {
        canvas.current.addEventListener("touchstart", touchStartHnadler);
        canvas.current.addEventListener("touchmove", touchMoveHandler);
        canvas.current.addEventListener("touchend", touchEndHnadler);

        canvasOffsetLeft = canvas.current.offsetLeft;
        canvasOffsetTop = canvas.current.offsetTop;

        setContext(renderCtx);
      }
    }

    return () => {
      canvas.current.removeEventListener("touchstart", touchStartHnadler);
      canvas.current.removeEventListener("touchmove", touchMoveHandler);
      canvas.current.removeEventListener("touchend", touchEndHnadler);
    };
  }, [context, color]);

  return (
    <div>
      <div>
        <canvas id="myCanvas" width={300} height={300} ref={canvas}></canvas>
      </div>
      <div>
        <button
          className="colorBtn btnBlack"
          onClick={() => {
            setColor("#080808");
          }}
        ></button>
        <button
          className="colorBtn btnRed"
          onClick={() => {
            setColor("#f70202");
          }}
        ></button>
        <button
          className="colorBtn btnYellow"
          onClick={() => {
            setColor("#f7ef02");
          }}
        ></button>
        <button
          className="colorBtn btnBlue"
          onClick={() => {
            setColor("#0213f7");
          }}
        ></button>
        <button
          className="colorBtn btnGreen"
          onClick={() => {
            setColor("#0bf702");
          }}
        ></button>
      </div>
      <button
        onClick={() => {
          clearCanvasHandler();
        }}
      >
        clear
      </button>
      <button
        onClick={() => {
          saveCanvasFinalDrawHandler();
        }}
      >
        save
      </button>
      <button>next</button>
    </div>
  );
};

export default DrawingCanvas;
