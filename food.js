class Food {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 5;
    }
    
    draw() {
      noStroke();
      fill(color(0, 0, 0));
      circle(this.x, this.y, this.width);
    }
}
