import { ICanvasControls } from '~/models/canvas-models';
import { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react';
import { fabric } from 'fabric';

export const useLeftCanvasControls = ({ canvas, editorState }: ICanvasControls) => {
  const [editorData, setEditorState] = useState(editorState);
  const [openModal, setOpenModal] = useState<'imgDialog' | ''>('');

  const colorRef = useRef<HTMLInputElement>();

  const handleControlClick = () => {
    colorRef.current?.click();
  };

  const handleColorChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;

    if (canvas) {
      const activeElements = canvas?.getActiveObjects();
      if (activeElements.length) {
        activeElements.forEach((obj) => {
          console.log({ obj });
          if (obj.type === 'path') {
            obj.set('stroke', value);
          } else obj.set('fill', value);
        });
        canvas.renderAll();
      }
      canvas.freeDrawingBrush.color = e.target.value;
      setEditorState((prev) => ({
        ...prev,
        color: value,
      }));
    }
  };

  const handleToggleDrawingMode = (type: 'pencil' | 'move' | 'laser') => () => {
    if (type === 'move') {
      canvas!.isDrawingMode = false;
    } else canvas!.isDrawingMode = true;

    setEditorState((prev) => ({
      ...prev,
      activeControl: type,
    }));

    editorState.activeControl = type;
  };

  const handleShapeClick =
    (shape: 'square' | 'circle' | 'text' | 'image') =>
    async (data: any = '') => {
      handleToggleDrawingMode('move')();
      const imgURL = data as string;

      let shapeObj;
      switch (shape) {
        case 'circle':
          shapeObj = new fabric.Circle({
            top: 30,
            left: 30,
            fill: editorData.color,
            radius: 50,
          });
          break;
        case 'square':
          shapeObj = new fabric.Rect({
            top: 30,
            left: 30,
            fill: editorData.color,
            width: 100,
            height: 100,
          });
          break;
        case 'text':
          shapeObj = new fabric.Textbox('Text', {
            top: 30,
            left: 30,
            fill: editorData.color,
            fontFamily: 'Helvetica',
            fontSize: 25,
          });
          break;
        case 'image':
          shapeObj = await new Promise((res) => {
            fabric.Image.fromURL(imgURL, function (image) {
              image.set({ left: 30, top: 30 }).scale(0.2);
              res(image);
            });
          });
          break;
      }

      if (shapeObj) {
        canvas!.add(shapeObj as any);
      }
    };

  const handleImgClick = () => {
    setOpenModal((prev) => (prev === 'imgDialog' ? '' : 'imgDialog'));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const urlEl = (e.target as HTMLFormElement).querySelector('input');
    handleShapeClick('image')(urlEl?.value);
  };

  const handleClear = () => {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = '#292929';
    }
  };

  return {
    openModal,
    editorData,
    colorRef,
    handleControlClick,
    handleColorChange,
    handleToggleDrawingMode,
    handleShapeClick,
    handleImgClick,
    handleSubmit,
    handleClear,
  };
};
