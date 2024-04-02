class level1 extends Phaser.Scene {
  constructor() {
    super({ key: "level1" });
  }
  init(data) {
    this.playerPos = data.playerPos;
  }
  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("level1", "assets/level1.tmj");
    this.load.spritesheet("Wonka", "assets/Wonka.png", {
      frameWidth: 64,
      frameHeight: 64,
});
    this.load.spritesheet("e1spritesheet", "assets/oompa.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.audio("door","assets/door.mp3")
    this.load.audio("walk","assets/walk.mp3")

    // Step 2 : Preload any images here
    this.load.image("choco1img", "assets/choco1.png");
    this.load.image("choco2img", "assets/choco2.png");
    this.load.image("defimon2img", "assets/defimon2.png");
    this.load.image("magecityimg", "assets/magecity.png");
    this.load.image("tuxmon-32x32img", "assets/tuxmon-32x32.png");
  } // end of preload //

  create() {
    this.music = this.sound.add("door",{loop: false}).setVolume(0.3);
this.music.play();

this.music = this.sound.add("walk",{loop: true}).setVolume(0.5);
this.music.play();

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

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "level1" });

    // Step 4 Load the game tiles
    let defimon2Tiles = map.addTilesetImage("defimon2", "defimon2img");
    let choco1Tiles = map.addTilesetImage("choco1", "choco1img");
    let choco2Tiles = map.addTilesetImage("choco2", "choco2img");
    let magecityTiles = map.addTilesetImage("magecity", "magecityimg");
    let tuxmonTiles = map.addTilesetImage("tuxmon-32x32", "tuxmon-32x32img");

    //Step 5  create an array of tiles
    let tilesArray = [
      defimon2Tiles,
      choco1Tiles,
      choco2Tiles,
      magecityTiles,
      tuxmonTiles,
    ];

    // Step 6  Load in layers by layers
    this.floorLayer = map.createLayer("floor", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wall", tilesArray, 0, 0);
    this.treesLayer = map.createLayer("trees", tilesArray, 0, 0);
    this.decoLayer = map.createLayer("deco", tilesArray, 0, 0);
    this.plantsLayer = map.createLayer("plants", tilesArray, 0, 0);

     //This is player
     this.player = this.physics.add.sprite(
      this.playerPos.x,
      this.playerPos.y,
      "Wonka"
    );
    window.player = this.player;

    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.5);

    // Enemy Object Layer
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

    // in create, add tweens  
   this.tweens.add({
    targets: this.oompa1,
    x: 50,
    flipX: false,
    yoyo: true,
    duration: 5000,
    repeat: -1,
    onYoyo: () => {
        console.log("onYoyo");
        this.oompa1.play("oompa-up");
    },
    onRepeat: () => {
        console.log("onRepeat");
        this.oompa1.play("oompa-down");
    }
});

this.tweens.add({
  targets: this.oompa2,
  x: 450,
  flipX: false,
  yoyo: true,
  duration: 4000,
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
  x: 250,
  flipX: false,
  yoyo: true,
  duration: 6000,
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
    var level2Down = this.input.keyboard.addKey(50);

    level2Down.on(
      "down",
      function () {
        console.log("2 pressed, jump to level 2");
        this.scene.start("level2");
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

    this.cursors = this.input.keyboard.createCursorKeys();

    

   
    // this.player = this.physics.add.sprite(40, 40, 'oompa');
    // window.player = this.player

    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    //collision
    this.wallLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.wallLayer);

    this.treesLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.treesLayer);

    this.decoLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.decoLayer);

    this.plantsLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.plantsLayer);
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

    //door coordinates
    if (this.player.x > 768 &&
      this.player.x < 816 && 
      this.player.y > 838  &&
      this.player.y < 858
      ) {
      console.log("level4");
      this.level4();
    }

    if (this.player.x > 1030 &&
      this.player.x < 1264 && 
      this.player.y > 1050  &&
      this.player.y < 1085
      ) {
      console.log("level3");
      this.level3();
    }

    if (
      this.player.x > 352 &&
      this.player.x < 384 &&
      this.player.y > 1050 &&
      this.player.y < 1150
    ) {
      console.log("Door1");
      this.level2();
    }

    ///testing
    if (
      this.player.x > 776 &&
      this.player.x < 816 &&
      this.player.y > 464 &&
      this.player.y < 848
    ) {
      console.log("Door2");
      this.level4();
    }
  }
  //end of update

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



//Jump levels
  level2(player, tile) {
    console.log("level2 function");
    let playerPos = {};
    playerPos.x = 384;
    playerPos.y = 1109;
    this.scene.start("level2", { playerPos: playerPos });
  }

  level4(player, tile) {
    console.log("level4 function");
    let playerPos = {};
    playerPos.x = 847;
    playerPos.y = 900;
    this.scene.start("level4", { playerPos: playerPos });
  }

  level3(player, tile) {
    console.log("level3 function");
    let playerPos = {};
    playerPos.x = 1218;
    playerPos.y = 900;
    this.scene.start("level3", { playerPos: playerPos });
  }

  //  level4(player, tile) {
  //   console.log("level4 function");
  //   let playerPos = {};
  //   playerPos.x = 800
  //   playerPos.y = 848
  //       this.scene.start("level4",{playerPos: playerPos});

  // level4(player, tile) {
  //   console.log("level4 function");
  //   this.scene.start("level4");
  

}
