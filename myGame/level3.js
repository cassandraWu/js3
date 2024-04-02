class level3 extends Phaser.Scene {
  constructor() {
    super({ key: "level3" });
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("level3", "assets/level3.tmj");
    this.load.tilemapTiledJSON("level1", "assets/level1.tmj");
    this.load.spritesheet("Wonka", "assets/Wonka.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("choc1", "assets/choc1.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("e1spritesheet", "assets/oompa.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    //mp3
    this.load.audio("collect","assets/collect.mp3")
  

    // Step 2 : Preload any images here
    this.load.image("1_Generic_32x32img", "assets/1_Generic_32x32.png");
    this.load.image("livingRoomimg", "assets/livingRoom.png");
    this.load.image("magecityimg", "assets/magecity.png");
    this.load.image("treesimg", "assets/trees.png");
    this.load.image("trimsanddoorsimg", "assets/trimsanddoors.png");
  } // end of preload //

  create() {
    console.log("animationScene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "level3" });

   //Tiled Image
    let GenericTiles = map.addTilesetImage(
      "1_Generic_32x32",
      "1_Generic_32x32img"
    );
    let livingroomTiles = map.addTilesetImage("livingRoom", "livingRoomimg");
    let magecityTiles = map.addTilesetImage("magecity", "magecityimg");
    let treesTiles = map.addTilesetImage("trees", "treesimg");
    let trimsanddoorsTiles = map.addTilesetImage(
      "trimsanddoors",
      "trimsanddoorsimg"
    );

    //Step 5  create an array of tiles
    let tilesArray = [
      GenericTiles,
      livingroomTiles,
      treesTiles,
      magecityTiles,
      trimsanddoorsTiles,
    ];

    // Step 6  Load in layers by layers
    this.floorlayer = map.createLayer("floor", tilesArray, 0, 0);
    this.carpetLayer = map.createLayer("carpet", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wall", tilesArray, 0, 0);
    this.decoLayer = map.createLayer("deco", tilesArray, 0, 0);
    this.deco2Layer = map.createLayer("deco2", tilesArray, 0, 0);
    this.deco3Layer = map.createLayer("deco3", tilesArray, 0, 0);
    this.deco4Layer = map.createLayer("deco4", tilesArray, 0, 0);


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
      key: "choc1Anim",
      frames: this.anims.generateFrameNumbers("choc1", { start: 0, end: 1 }),
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
  
    
    this.player = this.physics.add.sprite(400, 400, "Wonka");
    window.player = this.player;

    this.player.body
      .setSize(this.player.width * 0.5, this.player.height * 0.5)
      .setOffset(20, 30);

      // this.music = this.sound.add("collect",{loop: false}).setVolume(0.3);
      // this.music.play();

    //choc object layer
    let c1 = map.findObject("objectLayer", (obj) => obj.name === "choc1");
    let c2 = map.findObject("objectLayer", (obj) => obj.name === "choc2");
    let c3 = map.findObject("objectLayer", (obj) => obj.name === "choc3");
    let c4 = map.findObject("objectLayer", (obj) => obj.name === "choc4");

    this.c1 = this.physics.add
      .sprite(c1.x, c1.y, "choc1")
      .setScale(1.5)
      .play("choc1Anim");
    this.c2 = this.physics.add
      .sprite(c2.x, c2.y, "choc1")
      .setScale(1.5)
      .play("choc1Anim");
    this.c3 = this.physics.add
      .sprite(c3.x, c3.y, "choc1")
      .setScale(1.5)
      .play("choc1Anim");
    this.c4 = this.physics.add
      .sprite(c4.x, c4.y, "choc1")
      .setScale(1.5)
      .play("choc1Anim");

    this.physics.add.overlap(this.player, this.c1, this.hitWin, null, this);
    this.physics.add.overlap(this.player, this.c2, this.hitItem, null, this);
    this.physics.add.overlap(this.player, this.c3, this.hitItem, null, this);
    this.physics.add.overlap(this.player, this.c4, this.hitItem, null, this);

     // Enemy Object Layer
     let e1 = map.findObject("enemyLayer", (obj) => obj.name === "oompa1");
     let e2 = map.findObject("enemyLayer", (obj) => obj.name === "oompa2");
     let e3 = map.findObject("enemyLayer", (obj) => obj.name === "oompa3");

 
     this.e1 = this.physics.add
       .sprite(e1.x, e1.y, "e1spritesheet").play("oompa-up");
       this.e2 = this.physics.add
       .sprite(e2.x, e2.y, "e1spritesheet").play("oompa-up");
       this.e3 = this.physics.add
       .sprite(e3.x, e3.y, "e1spritesheet").play("oompa-up");
       
     this.e1.body.setSize(this.player.width * 0.5, this.player.height * 0.5)
       
 
     this.physics.add.overlap(this.player, this.e1, this.hitEnemy, null, this);
     this.physics.add.overlap(this.player, this.e2, this.hitEnemy, null, this);
     this.physics.add.overlap(this.player, this.e3, this.hitEnemy, null, this);

      // in create, add tweens  
    this.tweens.add({
     targets: this.e1,
     y: 250,
     flipY: false,
     yoyo: true,
     duration: 1000,
     repeat: -1,
     onYoyo: () => {
         console.log("onYoyo");
         this.e1.play("oompa-down");
     },
     onRepeat: () => {
         console.log("onRepeat");
         this.e1.play("oompa-up");
     }
 
 });
 
 this.tweens.add({
   targets: this.e2,
   y: 250,
   flipY: false,
   yoyo: true,
   duration: 1000,
   repeat: -1,
   onYoyo: () => {
       console.log("onYoyo");
       this.e2.play("oompa-up");
   },
   onRepeat: () => {
       console.log("onRepeat");
       this.e2.play("oompa-down");
   }
 });

 this.tweens.add({
  targets: this.e3,
  y: 250,
  flipY: false,
  yoyo: true,
  duration: 1000,
  repeat: -1,
  onYoyo: () => {
      console.log("onYoyo");
      this.e3.play("oompa-up");
  },
  onRepeat: () => {
      console.log("onRepeat");
      this.e3.play("oompa-down");
  }
});
 

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

    var level3Down = this.input.keyboard.addKey(51);

    level3Down.on(
      "down",
      function () {
        console.log("3 pressed, jump to level 3");
        this.scene.start("level3");
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

    

   

    //object layer
    let start = map.findObject("objectLayer", (obj) => obj.name === "start");

   
    this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    this.wallLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.wallLayer);

    this.decoLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.decoLayer);

    this.deco2Layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.deco2Layer);

    this.deco3Layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.deco3Layer);

    this.deco4Layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.deco4Layer);

    this.collect= this.sound.add("collect").setVolume(1)

  } // end of create //


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

    if (
      this.player.x > 400 &&
      this.player.x < 450 &&
      this.player.y > 480 &&
      this.player.y < 500
    ) {
      console.log("Door3");
      this.level1();
    }
  } // end of update //

  level1(player, tile) {
    console.log("level1 function");
    let playerPos = {};
    playerPos.x = 1219
    playerPos.y = 1085
        this.scene.start("level1",{playerPos: playerPos});
   } 

  hitItem(player, Item) {
    console.log("Hit Choc!!!");
    // this.cameras.main.shake(200);
    this.collect.play()
    Item.disableBody(true, true);
    return false;
    
   
  }

  hitWin(player, Win) {
    console.log("Hit free!!!");
    // this.cameras.main.shake(200);
    Win.disableBody(true, true);
    this.scene.start("freechoc2")
    return false;
  }

  
   //disable enemy
 hitEnemy(player, e1) {
  console.log("hitEnemy");
  // this.hitSnd.play();
  this.cameras.main.shake(200); // 500ms
  //(player knockback) player.x = player.x - 50
  e1.disableBody(true, true);
  this.scene.start("deadScene")
  return false;
}

}
