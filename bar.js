class Bar{
    constructor(){
        this.bar_length = 400;
        
        this.bar_xi = 0;
        this.bar_xf = 0;

        this.bar_yi = 0;
        this.bar_yf = 0;
        
        this.bar_center = [width/2, height/2];

        this.m = 0;

    }
    
    //draw bar given the angle of inclination
    draw_bar(angle){
        
        if(!angle){
            angle += 1e-6;
        }

        this.m = tan(angle*PI/180);
        let diffY = (this.m*this.bar_length)/(2*sqrt(pow(this.m,2)+1));
        let diffX = diffY/this.m;

        this.bar_xi = this.bar_center[0]-diffX;
        this.bar_xf = this.bar_center[0]+diffX;

        this.bar_yi = this.bar_center[1]+diffY; //volteados los signos
        this.bar_yf = this.bar_center[1]-diffY;

        stroke(255);
        // stroke("blue");
        strokeWeight(2);
        line(this.bar_xi, this.bar_yi, this.bar_xf, this.bar_yf);
        
        return { 
            m: this.m,
            xi: this.bar_xi, 
            yi: this.bar_yi,
            xf: this.bar_xf,
            yf: this.bar_yf
        };

    }

}