import DownloadIcon from '../icons/download';
import DeleteIcon from '../icons/delete';
import UndoIcon from '../icons/undo';
import RedoIcon from '../icons/redo';
import { ICanvasControls } from '~/models/canvas-models';
import { useRightCanvasControls } from '~/hooks/useRightCanvasControls';

export default function RightControls({ canvas }: ICanvasControls) {
  const { enableDelete, handleDownloadClick, handleDeleteIcon, handleUndoRedoClick } =
    useRightCanvasControls({ canvas });

  return (
    <div className='secondary controls'>
      <button onClick={handleUndoRedoClick('undo')} className='control-item'>
        <UndoIcon />
      </button>
      <button onClick={handleUndoRedoClick('redo')} className='control-item'>
        <RedoIcon />
      </button>
      <button onClick={handleDownloadClick} className='control-item color'>
        <DownloadIcon />
      </button>
      <button disabled={!enableDelete} onClick={handleDeleteIcon} className='control-item color'>
        <DeleteIcon />
      </button>
    </div>
  );
}
