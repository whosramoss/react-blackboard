export interface ICanvasEditor {
  color: string;
  brushWidth: number;
  backgroundColor: string;
  activeControl: string;
  timelineProcessing: boolean;
}

export const initCanvasEditor: ICanvasEditor = {
  color: '#8fce00',
  brushWidth: 2,
  backgroundColor: '#292929',
  activeControl: 'pencil',
  timelineProcessing: false,
};

export interface ICanvasControls {
  canvas?: fabric.Canvas;
  editorState: ICanvasEditor;
}
