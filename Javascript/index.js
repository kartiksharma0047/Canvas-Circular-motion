let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouse = {
    x: undefined,
    y: undefined
};
let colors = ["#00bdff","#4d39ce","#088eff"];

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function randomIntFromRange(min, max) {  // Get random values - int values
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloatFromRange(min, max) {   // Get random values - float values
    return Math.random() * (max - min) + min;
}

window.addEventListener("resize", function () {  //Resize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function randomColor(colors) {   //Get random color
    return colors[Math.floor(Math.random() * colors.length)];
}

function CircularMotion(){
    let obj={};

    obj.radius=randomIntFromRange(1,5);
    obj.x=canvas.width/2
    obj.y=canvas.height/2
    obj.radian=Math.random() * Math.PI*2;
    obj.velocity=randomFloatFromRange(0.02,0.05);
    obj.distanceFromCenter = randomIntFromRange(100,150);
    obj.color=randomColor(colors);

    obj.draw=(lastPoint)=>{
        c.beginPath();
        c.strokeStyle=obj.color;
        c.lineWidth=obj.radius;
        c.moveTo(lastPoint.x,lastPoint.y);
        c.lineTo(obj.x,obj.y);
        c.stroke();
        c.closePath();
    }
    obj.update=()=>{
        const lastPoint={
            x:obj.x,
            y:obj.y
        };
        // Move points over time
        obj.radian+=obj.velocity

        // Circluar motion
        obj.x=mouse.x+Math.cos(obj.radian)*obj.distanceFromCenter;
        obj.y=mouse.y+Math.sin(obj.radian)*obj.distanceFromCenter;
        obj.draw(lastPoint);
    }

    return obj;
}

let particles=[];
for(let i=0;i<300;i++){
    particles.push(CircularMotion());
}

function animate(){
    requestAnimationFrame(animate);
    // Reduce opacity to create fading effect
    c.fillStyle = "rgba(255, 255, 255, 0.1)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle)=>{
        particle.update(particles)
    })
}
animate();
