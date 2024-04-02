class level2 extends Phaser.Scene {
  constructor() {
    super({ key: "level2" });
  }
  init(data) {
    this.playerPos = data.playerPos;
  }

  preload() {
    // Step 1
    this.load.tilemapTiledJSON("level2", "assets/level2.tmj");
     this.load.spritesheet("Wonka", "assets/Wonka.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("e1spritesheet", "assets/oompa.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("choc3", "assets/choc3.png", {
      frameWidth: 16,
      frameHeight: 32,
    });

    //mp3
    this.load.audio("collect","assets/collect.mp3")

    // Step 2 : Preload any images here
    this.load.image("livingRoomimg", "assets/livingRoom.png");
    this.load.image("magecityimg", "assets/magecity.png");
    this.load.image("trimsanddoorsimg", "assets/trimsanddoors.png");
    this.load.image("Wall_unstableimg", "assets/Wall_unstable.png");
  } // end of preload //

  create() {
    console.log("animationScene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "level2" });

    //Tiled Image
    let livingroomTiles = map.addTilesetImage("livingRoom", "livingRoomimg");
    let magecityTiles = map.addTilesetImage("magecity", "magecityimg");
    let trimsanddoorsTiles = map.addTilesetImage(
      " trimsanddoors",
      " trimsanddoorsimg"
    );
    let WallunstableTiles = map.addTilesetImage(
      "Wall_unstable",
      "Wall_unstableimg"
    );

    //Step 5  create an array of tiles
    let tilesArray = [
      livingroomTiles,
      magecityTiles,
      trimsanddoorsTiles,
      WallunstableTiles,
    ];

    // Step 6  Load in layers by layers
    this.floorLayer = map.createLayer("floor", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wall", tilesArray, 0, 0);
    this.deco1Layer = map.createLayer("deco1", tilesArray, 0, 0);
    this.deco2Layer = map.createLayer("deco2", tilesArray, 0, 0);
    this.deco3Layer = map.createLayer("deco3", tilesArray, 0, 0);

    //animations
    this.anims.create({
      key: "Wonka-up",
      frames: this.anims.generateFrameNumbers("Wonka", {
        start: 105,
        end: 112,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "Wonka-left",
      frames: this.anims.generateFrameNumbers("Wonka", {
        start: 118,
        end: 125,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "Wonka-down",
      frames: this.anims.generateFrameNumbers("Wonka", {
        start: 131,
        end: 138,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "Wonka-right",
      frames: this.anims.generateFrameNumbers("Wonka", {
        start: 144,
        end: 151,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "oompa-up",
      frames: this.anims.generateFrameNumbers("e1spritesheet", { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });
  
    this.anims.create({
        key:'oompa-left',
        frames:this.anims.generateFrameNumbers('e1spritesheet',
        { start:118, end:125 }),
        frameRate:5,
        repeat:-1
    });
  
    this.anims.create({
        key:'oompa-down',
        frames:this.anims.generateFrameNumbers('e1spritesheet',
        { start:131, end:138 }),
        frameRate:5,
        repeat:-1
    });
  
    this.anims.create({
        key:'oompa-right',
        frames:this.anims.generateFrameNumbers('e1spritesheet ',
        { start:144, end:151 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
      key: "choc3Anim",
      frames: this.anims.generateFrameNumbers("choc3", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });

    console.log("wonka loaded");

    this.player = this.physics.add.sprite(510, 572, "Wonka");
    window.player = this.player;

    this.player.body
      .setSize(this.player.width * 0.5, this.player.height * 0.5)
      .setOffset(17, 32);

      //choc object layer
    let choc1 = map.findObject("objectLayer", (obj) => obj.name === "c1");
    let choc2 = map.findObject("objectLayer", (obj) => obj.name === "c2");
    let choc3 = map.findObject("objectLayer", (obj) => obj.name === "c3");


    this.choc1 = this.physics.add.sprite(choc1.x, choc1.y,"choc3").play("choc3Anim");
    this.choc2 = this.physics.add.sprite(choc2.x, choc2.y,"choc3").play("choc3Anim");
    this.choc3 = this.physics.add.sprite(choc3.x, choc3.y, "choc3").play("choc3Anim");
  
    this.physics.add.overlap(this.player, this.choc1, this.hitItem, null, this);
    this.physics.add.overlap(this.player, this.choc2, this.hitItem, null, this);
    this.physics.add.overlap(this.player, this.choc3, this.hitWin, null, this);

    //enemy layer
    let oompa1 = map.findObject("enemyLayer", (obj) => obj.name === "oompa1");
    let oompa2 = map.findObject("enemyLayer", (obj) => obj.name === "oompa2");
    let oompa3 = map.findObject("enemyLayer", (obj) => obj.name === "oompa3");


    this.oompa1 = this.physics.add
      .sprite(oompa1.x, oompa1.y, "e1spritesheet").play("oompa-up");
      this.oompa2 = this.physics.add
      .sprite(oompa2.x, oompa2.y, "e1spritesheet").play("oompa-up");
      this.oompa3 = this.physics.add
      .sprite(oompa3.x, oompa3.y, "e1spritesheet").play("oompa-up");
      
    this.oompa1.body.setSize(this.player.width * 0.5, this.player.height * 0.5)
      

    this.physics.add.overlap(this.player, this.oompa1, this.hitEnemy, null, this);
    this.physics.add.overlap(this.player, this.oompa2, this.hitEnemy, null, this);
    this.physics.add.overlap(this.player, this.oompa3, this.hitEnemy, null, this);

//      // in create, add tweens  
   this.tweens.add({
    targets: this.oompa1,
    y: 250,
    flipY: false,
    yoyo: true,
    duration: 1000,
    repeat: -1,
    onYoyo: () => {
        console.log("onYoyo");
        this.oompa1.play("oompa-down");
    },
    onRepeat: () => {
        console.log("onRepeat");
        this.oompa1.play("oompa-up");
    }

});

this.tweens.add({
  targets: this.oompa2,
  y: 250,
  flipY: false,
  yoyo: true,
  duration: 1000,
  repeat: -1,
  onYoyo: () => {
      console.log("onYoyo");
      this.oompa2.play("oompa-up");
  },
  onRepeat: () => {
      console.log("onRepeat");
      this.oompa2.play("oompa-down");
  }
});

this.tweens.add({
 targets: this.oompa3,
 y: 250,
 flipY: false,
 yoyo: true,
 duration: 1000,
 repeat: -1,
 onYoyo: () => {
     console.log("onYoyo");
     this.oompa3.play("oompa-up");
 },
 onRepeat: () => {
     console.log("onRepeat");
     this.oompa3.play("oompa-down");
 }
});

    //Jump to levels
    var level1Down = this.input.keyboard.addKey(49);

    level1Down.on(
      "down",
      function () {
        console.log("1 pressed, jump to level 1");
        this.scene.start("level1");
      },
      this
    );

    var level2Down = this.input.keyboard.addKey(50);

    level2Down.on(
      "down",
      function () {
        console.log("2 pressed, jump to level 2");
        this.scene.start("level2");
      },
      this
    );

    var level4Down = this.input.keyboard.addKey(52);

    level4Down.on(
      "down",
      function () {
        console.log("4 pressed, jump to level 4");
        this.scene.start("level4");
      },
      this
    );

    var level3Down = this.input.keyboard.addKey(51);

    level3Down.on(
      "down",
      function () {
        console.log("3 pressed, jump to level 3");
        this.scene.start("level3");
      },
      this
    );
    this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    this.wallLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.wallLayer);

    this.deco1Layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.deco1Layer);

    this.deco2Layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.deco2Layer);

    this.deco3Layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.deco3Layer);

    this.collect= this.sound.add("collect").setVolume(1)
  } // end of create ////////////////////////////////////////////////

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("Wonka-left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("Wonka-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play("Wonka-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play("Wonka-down", true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.stop();
    }
    //door
    if (this.player.y > 573 && this.player.x > 456 && this.player.x < 558) {
      console.log("Door2");
      this.level1();
    }
  }
  // end of update ///////////////////////////////////////////////

  level1(player, tile) {
    console.log("level1 function");
    let playerPos = {};
    playerPos.x = 384;
    playerPos.y = 1109;
    this.scene.start("level1", { playerPos: playerPos });
  }

  //disable enemy
  hitEnemy(player, oompa1) {
    console.log("hitEnemy");
    // this.hitSnd.play();
    this.cameras.main.shake(200); // 500ms
    //(player knockback) player.x = player.x - 50
    oompa1.disableBody(true, true);
    return false;
  }

  hitItem(player, Item) {
    console.log("Hit Choc!!!");
    // this.cameras.main.shake(200);
    Item.disableBody(true, true);
    this.collect.play()
    return false;
  }

  hitWin(player, Win) {
    console.log("Hit Win!!!");
    // this.cameras.main.shake(200);
    Win.disableBody(true, true);
    this.scene.start("freechoc")
    return false;
  }
}

