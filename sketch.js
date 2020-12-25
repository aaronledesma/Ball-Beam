let barra;
let bar_state;
let ball;
let ball_center;
let th;
let gravity = 0.05;

function setup(){
    createCanvas(900,900);
    gravity = createVector(0, gravity);
    th = 0;
    // ball_state;

    barra = new Bar();
    ball = new Ball(width/2, height/2, 10);    

}

function draw(){
    background(0);
 
    th = -(9/20)*mouseY+135;
    if(th > 50){
        th = 50;
    } else if(th < -50){
        th = -50;
    }
    // th = 0;

    // line(width-100,100, width-100, 500);

    let gravity = createVector(0, 0.05);
    
    let mass1 = p5.Vector.mult(gravity, ball.mass);    

    ball.apply_force(mass1);

    

    bar_state = barra.draw_bar(th);    

    let initial = createVector(bar_state.xi, bar_state.yi).add((bar_state.xf-bar_state.xi)/2,(bar_state.yf-bar_state.yi)/2);
    let final = createVector(bar_state.xf-bar_state.xi, bar_state.yf-bar_state.yi).rotate(90*PI/180);
    
    //normal de la barra
    drawArrow(initial, final, "blue");
    
    // stroke(255);
    
    
    ball_state = ball.draw_ball(bar_state);
    ball.friction(bar_state);
    ball.edges(bar_state);
    ball.update_ball();
    
    // frameRate(4);
    
    // drawLine(5,height);

}

function drawLine(m, b){
    stroke("red");
    line(width/2-400, (width/2-400)*-(m)+b, width/2+400, (width/2+400)*(-m)+b);
}

function drawArrow(base, vec, myColor) {
    push();
        stroke(myColor);
        strokeWeight(3);
        fill(myColor);
        translate(base.x, base.y);
        line(0, 0, vec.x, vec.y);
        rotate(vec.heading());
        let arrowSize = 10;
        translate(vec.mag() - arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }