var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#1d1d1d',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {y:1.5},
            enableSleeping: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var nuevo;
var Numero;
var count = 0;
var movRect;
var image;
var image2;
var game = new Phaser.Game(config);
var x= 0;
var compoundBody;
var door;

var ballsChat = [];
var ballsChatGenerated = [];
var rects=[];
var stopDoor;
var open = false;

function preload() {
    this.load.image('platform', 'images/platform.png');
    this.load.image('ball', 'images/ball.png');
    this.load.image('stop','images/stop2.png');
}

function create() {
    this.matter.world.setBounds(0, 0, window.innerWidth, window.innerHeight, 32, true, true, true, true);

    new rectGroundAngle(5,300,10,600,0, this)
    new rectGroundAngle(250, 275, 10, 550, 0, this)
    new rectGroundAngle(200, 300, 10, 600, 0, this)

    new triangleGround(60, 640, 200, 90, 0x6666ff, this, 33, -15)

    new triangleGround2(150, 500, 130, 30, 0x6666ff, this, 110, -5)
    new triangleGround(55, 400, 130, 30, 0x6666ff, this, 21, -5)
    new triangleGround2(150, 300, 130, 30, 0x6666ff, this, 110, -5)

    new triangleGround(220, 590, 45, 30, 0x6666ff, this, 8, -5)

    stopDoor = this.matter.add.image(60, 430, 'stop', null, { isStatic: true })
    stopDoor2 = this.matter.add.image(60, 430, 'stop', null, { isStatic: true })
}

setInterval(pushingNewElements, 1000);

function pushingNewElements(){
    ballsChat.push({ id: Phaser.Math.Between(100, 700), image:"https://picsum.photos/30/30"})
}

setInterval(renderingElements, 1000);

function renderingElements(){
    if (ballsChat.length>0) {
        nuevo = new Brain(game.scene.scenes[0], count);
        count = count + 1;
    }
}

setInterval(removingDoor, 15000);

function removingDoor() {
    if(open){
        open = false
    }else{
        open = true
    }
}

function rectGroundAngle(x, y, w, h, angle, scene) {
    scene.add.rectangle(x, y, w, h, 0x6665ff).angle = angle;
    angleRad = angle * (Math.PI / 180);
    let rec = scene.matter.add.rectangle(x, y, w, h, { restitution: 1, isStatic: true, angle: angleRad});
    rects.push(rec)
    rec.friction = 0;
    rec.frictionStatic = 0;
}

function triangleGround(x,y,w,h,color,scene,xd,yd){
    xt=x+xd; yt=y+yd; x1 = 0; y1 = 0; x2 = 0; y2 = h; x3 = w; y3 = h;
    scene.add.triangle(xt,yt,x1,y1,x2,y2,x3,y3,color);
    let tri = scene.matter.add.trapezoid(x, y, w, h, 2, { restitution: 1, isStatic: true, friction: 0});
    tri.friction = 0;
    tri.frictionStatic = 0;
}

function triangleGround2(x, y, w, h, color, scene, xd, yd) {
    xt = x + xd; yt = y + yd; x1 = 0; y1 = 0; x2 = 0; y2 = h; x3 = -w;y3 = h;
    scene.add.triangle(xt, yt, x1, y1, x2, y2, x3, y3, color);
    let tri = scene.matter.add.trapezoid(x, y, -w, h, 2, { restitution: 1, isStatic: true, friction: 0 });
    tri.friction = 0;
    tri.frictionStatic = 0;
}

class Brain extends Phaser.GameObjects.Sprite {
    constructor (scene,number)
    {
        super(scene);
        this.loadImage(scene,number)
    }

    loadImage (scene,number) {
        scene.load.once('complete', function(){
            let ball = scene.matter.add.image(Phaser.Math.Between(100, 250),0, ballsChat[number].id)
            ball.setBody({
                type: 'circle',
                radius: 20
            });
            
            let body = ball.body;
            scene.matter.body.setInertia(body, Infinity)
            ball.setVelocity(0, 0);
            ball.setBounce(0.5);
            ball.setFriction(0, 0, 0);
            ball.setFrictionAir(0);
            ball.setAngularVelocity(0);
            ballsChatGenerated.push(ball);
        });
        scene.load.image(ballsChat[number].id, ballsChat[number].image);
        scene.load.start();
    }
}

function update(){
    if(open){
        stopDoor.setPosition(-10, 630);
        stopDoor2.setPosition(-10, 550);
    }else{
        stopDoor.setPosition(200, 630);
        stopDoor2.setPosition(221, 545);
    }
    if(ballsChatGenerated.length !== 0){
        for (let i = 0; i < ballsChatGenerated.length; i++) {
            if (ballsChatGenerated[i].x >250) {
                ballsChatGenerated[i].visible = false
                ballsChatGenerated[i].body.destroy();
            }
        }
    }
}