class Ball{
    constructor(x, y, mass){        
        
        // this.pos = createVector(width/2, height/2);
        // this.pos = p5.Vector.random2D();
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0,0);
        
        this.mass = mass;
        this.r = sqrt(this.mass)*10;
        this.pos.y -= this.r;
    }

    draw_ball(barr_s){                        

        stroke(255);
        fill(200,200,10);
        ellipse(this.pos.x, this.pos.y, this.r*2);
                
        //gravity        
        // drawArrow(this.pos, createVector(0,50), "green");

        return {
            pos: this.pos,
            r: this.r
        };

    }

    friction(bar_s){
        let diff = height - (this.pos.y + this.r);
        
        let normal = createVector(bar_s.xf-bar_s.xi, bar_s.yf-bar_s.yi).rotate(90*PI/180).normalize().mult(this.r);
        let b = bar_s.yi+bar_s.m*bar_s.xi;
        let y_recta = -bar_s.m*(this.pos.x+normal.x)+b;

        //fricción de la barra
        if(this.pos.y >= y_recta-normal.y){
            // console.log("friccion")
            let force = this.vel.copy();
            force.normalize();
            force.mult(-1);

            let miu = 0.05;
            let normal = this.mass;
            force.setMag(miu * normal);

            this.apply_force(force);
        }

        if(diff < 1){ //el piso
            // console.log("friccion");
            let force = this.vel.copy();
            force.normalize();
            force.mult(-1);

            let miu = 0.1;
            let normal = this.mass;
            force.setMag(miu * normal);

            this.apply_force(force);

        }


    }

    apply_force(force){
        this.acc = this.acc.add(force.div(this.mass)); //2da ley de newton
    }

    edges(bar_s){        
        
        let normal = createVector(bar_s.xf-bar_s.xi, bar_s.yf-bar_s.yi).rotate(90*PI/180).normalize().mult(this.r);
        // console.log(normal.x, normal.y);
        // drawArrow(this.pos, normal, color(212, 255, 254));        
        
        // let sign = bar_s.m < 0 ? -1 : 1;

        // console.log(sign);
        // fill("blue");
        // ellipse(this.pos.x+normal.x, this.pos.y+normal.y, 10);

        let b = bar_s.yi+bar_s.m*bar_s.xi;
        let y_recta = -bar_s.m*(this.pos.x+normal.x)+b;

        // fill("red");
        // ellipse(this.pos.x+normal.x, y_recta, 10);

        // console.log(b);
        // console.log(y_recta);

        // drawLine(bar_s.m, height/2);
        // stroke("green");
        // line(0, y_recta, width, y_recta);
        // line(this.pos.x+normal.x, 0, this.pos.x+normal.x, height);

        // stroke("blue");
        // line(0,this.pos.y,width,this.pos.y);

        // this.pos.y = y_recta-normal.y;

        // console.log(normal.y);
        //barra
        if(this.pos.y+normal.y >= y_recta && this.pos.x > bar_s.xi && this.pos.x < bar_s.xf){
            // console.log("entro");
            this.pos.y = y_recta-normal.y;
            
            // this.pos.x = this.pos.x+normal.x*sign;        
            
            
            // this.pos.x = width/2-this.r;
            this.vel.y = 0;
            let force = createVector(-normal.x*0.02, normal.y);
            this.apply_force(force);
        }

        // if(this.pos.y < height/2+normal.y && this.pos.x < width/2+normal.x){
        //     this.pos.y = height/2+normal.y;
        //     this.pos.x = width/2+normal.x
        //     // this.pos.x = width/2-this.r;
        //     this.vel.y = 0;
        // }

        //mundo
        //parado inmediato
        if(this.pos.y >= height-this.r){
            this.pos.y = height-this.r;
            this.vel.y = 0;
        }

        if(this.pos.x >= width-this.r){
            this.pos.x = width-this.r;
            this.vel.x = 0;
        }else if(this.pos.x <= this.r){
            this.pos.x = this.r;
            this.vel.x = 0;
        }

        //rebote
        // if(this.pos.y >= height-this.r){
        //     this.pos.y = height-this.r;
        //     this.vel.y *= -1;
        // }

        // if(this.pos.x >= width-this.r){
        //     this.pos.x = width-this.r;
        //     this.vel.x *= -1;
        // }else if(this.pos.x <= this.r){
        //     this.pos.x = this.r;
        //     this.vel.x *= -1;
        // }

    }

    update_ball(m){        

        this.vel.add(this.acc);        
        this.pos.add(this.vel);
        this.acc.set(0, 0);
        
        // drawArrow(this.pos, this.vel.copy().mult(10), "red");
        
    }
    

}