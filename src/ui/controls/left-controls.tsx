import MoveIcon from '../icons/move';
import PencilIcon from '../icons/pencil';
import LaserIcon from '../icons/laser';
import SqaureIcon from '../icons/square';
import CircleIcon from '../icons/circle-icon';
import TextIcon from '../icons/text';
import ImgIcon from '../icons/image';
import { ICanvasControls } from '~/models/canvas-models';
import { useLeftCanvasControls } from '~/hooks/useLeftCanvasControls';

export default function LeftControls({ canvas, editorState }: ICanvasControls) {
  const {
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
  } = useLeftCanvasControls({ canvas, editorState });

  return (
    <div className='controls'>
      <button onClick={handleControlClick} className='control-item color'>
        <div style={{ background: editorData.color }} className='color-display'></div>
        <input ref={colorRef as any} type='color' onChange={handleColorChange} />
      </button>
      <button
        onClick={handleToggleDrawingMode('move')}
        className={`control-item ${editorData.activeControl === 'move' ? 'active' : ''}`}
      >
        <MoveIcon />
      </button>
      <button
        onClick={handleToggleDrawingMode('pencil')}
        className={`control-item ${editorData.activeControl === 'pencil' ? 'active' : ''}`}
      >
        <PencilIcon />
      </button>
      <button
        onClick={handleToggleDrawingMode('laser')}
        className={`control-item ${editorData.activeControl === 'laser' ? 'active' : ''}`}
      >
        <LaserIcon />
      </button>
      <button onClick={handleShapeClick('square')} className='control-item'>
        <SqaureIcon />
      </button>
      <button onClick={handleShapeClick('circle')} className='control-item'>
        <CircleIcon />
      </button>
      <button onClick={handleShapeClick('text')} className='control-item'>
        <TextIcon />
      </button>
      <div className='menu'>
        <button onClick={handleImgClick} className='control-item'>
          <ImgIcon />
        </button>
        {openModal === 'imgDialog' && (
          <div className='image-input dropdown'>
            <h3>Import Image</h3>
            <form onSubmit={handleSubmit} className='field'>
              <input type='text' placeholder='Paste url here' />
              <button>Import</button>
            </form>
          </div>
        )}
      </div>
      <button onClick={handleClear}> clear</button>
    </div>
  );
}
