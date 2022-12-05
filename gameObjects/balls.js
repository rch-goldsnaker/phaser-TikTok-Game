class Balls extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.body.setBounce(1);
        this.body.setCollideWorldBounds(true);
        //this.body.setData('glue', true);
        this.body.setVelocity(-60, -300);
    }
}

export default Balls;