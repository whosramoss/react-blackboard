import React from 'react';
import { Controls } from '../ui/controls';
import { useEditorCanvas } from '~/hooks/useCanvasEditor';
import { Editor } from '../ui/editor';
import Center from './_components/center';

export default function App() {
  const values = useEditorCanvas()
  
  return (
    <div className='app'>
      <Center>
        BlackBoard
      </Center>
      <Editor.Root>
        {
          values.canvas && (
            <React.Fragment>
              <Controls.Left {...values}/>
              <Controls.Right {...values}/>
            </React.Fragment>
          )
        }
        <Editor.Canvas/>
      </Editor.Root>
    </div>
  );
}

