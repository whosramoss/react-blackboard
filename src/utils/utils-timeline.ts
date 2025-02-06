class UtilsTimeline {
  public actions: any[] = [{ background: '#292929' }];

  public currentIndex = 0;

  public limit = 200;

  public add(object: any) {
    console.log('added', object);
    this.actions.push(object);
    this.currentIndex = this.actions.length - 1;
    if (this.actions.length > this.limit) {
      this.actions.shift();
    }
  }

  public undo() {
    console.log('undo', this);
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.actions[this.currentIndex];
    }
  }

  public redo() {
    console.log('redo', this);
    if (this.currentIndex < this.actions.length - 1) {
      this.currentIndex++;
      return this.actions[this.currentIndex];
    }
  }
}

const timeline = new UtilsTimeline();
export default timeline;
