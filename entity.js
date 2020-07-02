class Entity {
    constructor(x, y, genome) {
        this.x = x;
        this.y = y;
        
        this.hunger = 10;
        this.width = 10;

        this.visionFar = 125;
        this.visionAngle = Math.PI/3;
        this.direction = -Math.PI/2; // cap adalt

        this.brain = genome;
        this.brain.score = 0;
    }
  
    move() {
        let nearestFood = [];
        for (let i=0; i<food.length; ++i) {
            let hit = collideCircleCircle(this.x,this.y,this.width, food[i].x,food[i].y,food[i].width);
            if (!hit) {
                hit = collidePointArc(food[i].x,food[i].y, this.x,this.y,this.visionFar,this.direction,this.visionAngle);
                if (hit) {
                    nearestFood.push(i);
                }
            }
        }
 
        let minDistance = 0;
        let angle = 0;
        if (nearestFood.length > 0) {
            let vecInit = createVector(this.x,this.y);
            let currentFood = food[nearestFood[0]];
            minDistance = dist(this.x,this.y, currentFood.x, currentFood.y);
            let shortestPoint;
            for (let i=0; i<nearestFood.length; ++i) {
                let currentFood = food[nearestFood[i]];
                const distance = dist(this.x,this.y, currentFood.x, currentFood.y);
                if (distance <= minDistance) {
                    minDistance = distance;
                    let va = p5.Vector.fromAngle(this.direction, this.visionFar);
                    let vb = createVector(currentFood.x, currentFood.y).sub(vecInit);
                    angle = va.angleBetween(vb);
                    shortestPoint = [currentFood.x, currentFood.y];
                }
            }
            line(this.x,this.y, shortestPoint[0], shortestPoint[1]);
        }

        let input = [
            //this.hunger,
            minDistance,
            angle
        ]

        let output = this.brain.activate(input);
        let direction;
        if (output[0] > output[1] && output[0] > output[2]) direction = -1;
        else if (output[1] > output[0] && output[1] > output[2]) direction = 0;
        else direction = 1;
        let angleDirection = direction * Math.PI/100;
        let forward = output[2] * 1;

        // let angleDirection = (Math.floor(Math.random() * Math.floor(3))-1) * Math.PI/100;
        // let forward = Math.floor(Math.random() * Math.floor(2)) * 1;

        this.direction = this.direction+angleDirection;
        let newPosition = p5.Vector.fromAngle(this.direction, forward);
        let newx = Math.abs((this.x+newPosition.x)%canvasWidth);
        let newy = Math.abs((this.y+newPosition.y)%canvasHeight);

        for (let i=0; i<food.length; ++i) {
            let hit = collideCircleCircle(newx,newy,this.width, food[i].x,food[i].y,food[i].width);
            if (hit) {
                food.splice(i,1);
                i--;
                this.hunger = this.hunger - 1;
                this.brain.score++;
            }
        }
        
        this.x = newx;
        this.y = newy;
    }
  
    draw() {
      stroke(2);
      fill(color(255, 255, 255, 50));
      arc(this.x, this.y, 2*this.visionFar, 2*this.visionFar, this.direction-this.visionAngle/2, this.direction+this.visionAngle/2, PIE);
      fill(color(255, 255, 255));
      circle(this.x, this.y, this.width);
  
      fill(0);
      text(this.hunger, this.x, this.y);
    }
  
}
