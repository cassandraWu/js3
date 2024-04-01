
class animationScene extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'animationScene' });
    }

    preload() {

        this.load.spritesheet('llemme', 'assets/llemme.png',{ frameWidth:64, frameHeight:64 });
        this.load.spritesheet('duh', 'assets/duh.png',{ frameWidth:64, frameHeight:64 });


    } // end of preload //

    create (){

    console.log("animationScene")

    this.anims.create({
        key:'llemme-up',
        frames:this.anims.generateFrameNumbers('llemme',
        { start:105, end:112 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'llemme-left',
        frames:this.anims.generateFrameNumbers('llemme',
        { start:118, end:125 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'llemme-down',
        frames:this.anims.generateFrameNumbers('llemme',
        { start:131, end:138 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'llemme-right',
        frames:this.anims.generateFrameNumbers('llemme',
        { start:144, end:151 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'duh-up',
        frames:this.anims.generateFrameNumbers('duh',
        { start:105, end:112 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'duh-left',
        frames:this.anims.generateFrameNumbers('duh',
        { start:118, end:125 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'duh-down',
        frames:this.anims.generateFrameNumbers('duh',
        { start:131, end:138 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'duh-right',
        frames:this.anims.generateFrameNumbers('duh',
        { start:144, end:151 }),
        frameRate:5,
        repeat:-1
    });

    // this.add.sprite(100, 100, 'coin')
    // this.add.sprite(100, 300, 'coin').play('spin')
    // this.add.sprite(140, 300, 'coin').play('fastspin')

    // this.add.sprite(100, 200, 'fire').play('burn')
    // this.add.sprite(140, 200, 'fire').play('burn')
    // this.add.sprite(180, 200, 'fire').play('burn')
    // this.add.sprite(220, 200, 'fire').play('burn')
    // this.add.sprite(260, 200, 'fire').play('burn')
    
    // this.fireGroup = this.add.group({
    //     key: 'fire',
    //     repeat: 10,
    //     setXY: { x: 100, y: 200, stepX: Phaser.Math.Between(10,100) }
    // });

    // this.fireGroup.children.iterate( c=>{
    //     c.play('burn').setScale(2)
    // })

    this.add.sprite(100, 100, 'llemme').play('llemme-up').setScale(2)
    this.add.sprite(250, 100, 'llemme').play('llemme-left').setScale(2)
    this.add.sprite(400, 100, 'llemme').play('llemme-down').setScale(2)
    this.add.sprite(550, 100, 'llemme').play('llemme-right').setScale(2)

    this.add.sprite(100, 300, 'duh').play('duh-up').setScale(2)
    this.add.sprite(250, 300, 'duh').play('duh-left').setScale(2)
    this.add.sprite(400, 300, 'duh').play('duh-down').setScale(2)
    this.add.sprite(550, 300, 'duh').play('duh-right').setScale(2)

   

    } // end of create //

    update () {

    } // end of update // 
}