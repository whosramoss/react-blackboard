import { fabric } from 'fabric';
import { useState, useRef, useEffect } from 'react';
import { ICanvasEditor, initCanvasEditor } from '~/models/canvas-models';
import timeline from '~/utils/utils-timeline';

export const useEditorCanvas = () =>{
    const [canvas, setCanvas] = useState<fabric.Canvas>();
  const editorState = useRef<ICanvasEditor>(initCanvasEditor);

  useEffect(() => {
    const canvas = createCanvas(editorState.current);
    const isLaser = editorState.current.activeControl === 'laser';
    const isTimelineProcessing = editorState.current.timelineProcessing;

    canvas.on('object:added', function (event) {
      if (isLaser) {
        event.target?.animate('opacity', 0, {
          onChange: (a: number) => {
            if (a === 0) {
              if (event.target) canvas.remove(event.target);
            }
            canvas.renderAll.bind(canvas)();
          },
          duration: 600,
        });
      } else {
        if (isTimelineProcessing) return;
        const json = event.target?.canvas?.toDatalessJSON();
        timeline.add(json);
      }
    });

    canvas.on('object:modified', function (event) {
      if (!isLaser) {
        if (isTimelineProcessing) return;
        const json = event.target?.canvas?.toDatalessJSON();
        timeline.add(json);
      }
    });

    canvas.on('object:removed', function (event) {
      if (!isLaser) {
        if (isTimelineProcessing) return;
        const json = event.target?.canvas?.toDatalessJSON();
        timeline.add(json);
      }
    });

    window.addEventListener('keydown', function (e) {
      if (e.code === 'Backspace' || e.code === 'Delete') {
        canvas.getActiveObjects().forEach((obj: any) => {
          if (obj.type === 'textbox' && obj.isEditing) {
            return;
          }
          canvas.remove(obj);
        });
      }
      const evtobj = e;
      console.log({ evtobj });

      if (evtobj.code === 'KeyZ' && evtobj.ctrlKey && evtobj.shiftKey) {
        editorState.current.timelineProcessing = true;
        const state = timeline.redo();
        console.log(state);
        canvas.loadFromJSON(state, () => {
          return null;
        });
        editorState.current.timelineProcessing = false;
        return;
      }

      if (evtobj.code === 'KeyZ' && evtobj.ctrlKey) {
        editorState.current.timelineProcessing = true;
        const state = timeline.undo();
        canvas.loadFromJSON(state, () => {
          return null;
        });
        editorState.current.timelineProcessing = false;
        return;
      }
    });

    setCanvas(canvas);
  }, []);

  return {canvas, editorState:editorState.current}
}

function createCanvas(editorStateRef: any): fabric.Canvas {
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = '#2196f3';
  fabric.Object.prototype.cornerStyle = 'circle';
  fabric.Object.prototype.strokeWidth = 5;
  fabric.Object.prototype.borderScaleFactor = 2;
  fabric.Object.prototype.cornerSize = 10;

  const freeDrawingControls = ['pencil', 'laser'];

  const canvas = new fabric.Canvas('fabric-container', {
    width: ((window.innerHeight - 150) * 3) / 2,
    height: window.innerHeight - 150,
    isDrawingMode: freeDrawingControls.includes(editorStateRef.activeControl),
    selectionLineWidth: 3,
    backgroundColor: editorStateRef.backgroundColor,
    selectionColor: '#2195f37c',
    selectionBorderColor: '#2196f3',
  });

  function resizeCanvas() {
    const { innerWidth } = window;
    const width = innerWidth - 180;
    const height = width * (2 / 3);
    
    console.log('resizeCanvas',{ width, height, diff: width - height });

    const diff = 500;
    const currentDiff = width - height;
    const scale = currentDiff / diff;

    canvas.setZoom(scale);
    canvas.setDimensions({ width: width, height: height });
    canvas.requestRenderAll();
  }

  resizeCanvas();

  window.addEventListener('resize', resizeCanvas);

  canvas.freeDrawingBrush.width = editorStateRef.brushWidth;
  canvas.freeDrawingBrush.color = editorStateRef.color;
  return canvas;
}