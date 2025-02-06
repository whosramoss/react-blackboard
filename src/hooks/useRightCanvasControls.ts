import { useEffect, useState } from 'react';
import { ICanvasControls } from '~/models/canvas-models';

export const useRightCanvasControls = ({ canvas }: Pick<ICanvasControls, 'canvas'>) => {
  const [enableDelete, setEnableDelete] = useState(false);

  useEffect(() => {
    const handleSelectionCreate = () => {
      setEnableDelete(true);
    };

    const handleSelectionClear = () => {
      setEnableDelete(false);
    };

    canvas?.on('selection:created', handleSelectionCreate);
    canvas?.on('selection:cleared', handleSelectionClear);

    return () => {
      canvas?.off('selection:created', handleSelectionCreate);
      canvas?.off('selection:cleared', handleSelectionClear);
    };
  }, [canvas]);

  const handleDownloadClick = () => {
    const url =
      canvas?.toDataURL({
        format: 'jpeg',
        quality: 1,
      }) || '';
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'file.png';
    anchor.click();
    console.log({ url });
  };

  const handleDeleteIcon = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Delete' }));
  };

  const handleUndoRedoClick = (type: 'undo' | 'redo') => () => {
    if (type === 'undo') {
      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyZ' }));
    } else {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { ctrlKey: true, code: 'KeyZ', shiftKey: true }),
      );
    }
  };

  return {
    enableDelete,
    handleDownloadClick,
    handleDeleteIcon,
    handleUndoRedoClick,
  };
};
