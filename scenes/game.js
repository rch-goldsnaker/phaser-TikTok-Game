import Balls from '../gameObjects/balls.js';


export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }
  
  
  init() {
    this.score = 0;
  }


  preload() {
    this.load.image('background', 'images/background.png');
    this.load.image('platform', 'images/platform.png');
    this.load.image('ball', 'images/ball.png');
    this.load.image('bluebrick', 'images/brickBlue.png');
    this.load.image('blackbrick', 'images/brickBlack.png');
    this.load.image('greenbrick', 'images/brickGreen.png');
    this.load.image('orangebrick', 'images/brickOrange.png');
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, true);

    this.add.image(410, 250, 'background');
    
    this.bricks = this.physics.add.staticGroup({
      key: ['bluebrick', 'orangebrick', 'greenbrick', 'blackbrick'], 
      frameQuantity: 10,
      gridAlign: { 
        width: 10, 
        height: 4, 
        cellWidth: 67, 
        cellHeight: 34, 
        x: 112, 
        y: 100
      }
    });

    this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();
    this.platform.body.allowGravity = false;
    this.platform.setCollideWorldBounds(true);
    
    this.cursors = this.input.keyboard.createCursorKeys();
    
    // this.ball = this.physics.add.image(385, 430, 'ball');
    // this.ball.setBounce(1);
    // this.ball.setCollideWorldBounds(true);
    // this.ball.setData('glue', true);

    this.groupBalls = this.add.group();
    this.groupBalls.enableBody = true; 
    this.groupBalls.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 50; i++) {
      var c = this.groupBalls.create(Math.random() * 500, Math.random() * 500, 'ball');
      c.name = 'veg' + i;
      console.log(c)
    }
    
    this.ball = new Balls(this, 385, 430, 'ball');

    this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);

    this.physics.add.collider(this.ball, this.bricks, this.brickImpact, null, this);

    this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', { fontSize: '20px', fill: '#fff', fontFamily: 'verdana, arial, sans-serif' });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.platform.setVelocityX(-500);
      if(this.ball.getData('glue')) {
        this.ball.setVelocityX(-500);
      }
    }
    else if (this.cursors.right.isDown) {
      this.platform.setVelocityX(500);
      if (this.ball.getData('glue')) {
        this.ball.setVelocityX(500);
      }
    }
    else {
      this.platform.setVelocityX(0);
      if (this.ball.getData('glue')) {
        this.ball.setVelocityX(0);
      }
    }

    if (this.ball.y > 500 && this.ball.active) {
      console.log('fin', this.ball.y, this.ball, '--');
      this.endGame();
    }

    if (this.cursors.up.isDown) {
      // if (this.ball.getData('glue')) {
      //   this.ball.setVelocity(-60, -300);
      //   this.ball.setData('glue', false);
      // }
      // this.ball.setVelocity(-60, -300);
      // this.ball.setData('glue', false);

      // this.ball = new Balls(this, 385, 430, 'ball');

      // this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);

      // this.physics.add.collider(this.ball, this.bricks, this.brickImpact, null, this);

      // this.physics.add.collider(this.ball, this.ball);

      // groupBall = this.groupBalls.getFirstExists(false);

      // if (groupBall) {
      //   groupBall.reset(sprite.x + 6, sprite.y - 8);
      //   groupBall.body.velocity.y = -300;
      // }
    }
  }

  platformImpact(ball, platform) {
    this.increasePoints(1);
    let relativeImpact = ball.x - platform.x;
    if(relativeImpact > 0) {
      console.log('derecha!');
      ball.body.setVelocityX(8 * relativeImpact);
    } else if(relativeImpact < 0) {
      console.log('izquierda!');
      ball.body.setVelocityX(8 * relativeImpact);
    } else {
      console.log('centro!!');
      ball.body.setVelocityX(Phaser.Math.Between(-10, 10))
    }
  }

  brickImpact(ball, brick) {
    brick.disableBody(true, true);
    this.increasePoints(10);
    if (this.bricks.countActive() === 0) {
      this.endGame(true);
    }
  }

  increasePoints(points) {
    this.score += points;
    this.scoreText.setText('PUNTOS: ' + this.score);
  }

  endGame(completed = false) {
    this.scene.pause();
    if(! completed) {
      this.scene.start('gameover');
    } else {
      this.scene.start('congratulations');
    }
  }
}