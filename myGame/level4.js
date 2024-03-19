
class level4 extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'level4' });
    }

    preload() {

        // Step 1, load JSON
        this.load.tilemapTiledJSON ("level4", "assets/level4.tmj")
        this.load.spritesheet('Wonka', 'assets/Wonka.png',{ frameWidth:64, frameHeight:64 });

        // Step 2 : Preload any images here
        this.load.image("choco2img" , "assets/choco2.png");
        this.load.image("magecityimg" , "assets/magecity.png");
        this.load.image("treesimg" , "assets/trees.png");
        this.load.image("trimsanddoorsimg" , "assets/trimsanddoors.png");
       

    } // end of preload //

    create (){

    console.log("level4")

    //Step 3 - Create the map from main
    let map= this.make.tilemap({key: "level4"})

    
    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let choco2Tiles = map.addTilesetImage("choco2", "choco2img");
    let magecityTiles = map.addTilesetImage("magecity", "magecityimg");
    let treesTiles = map.addTilesetImage("trees", "treesimg");
    let trimsanddoorsTiles = map.addTilesetImage("trimsanddoors", "trimsanddoorsimg");
  




    //Step 5  create an array of tiles
    let tilesArray= [
       choco2Tiles, magecityTiles, treesTiles, trimsanddoorsTiles
    ];
 

    // Step 6  Load in layers by layers
    this.floorlayer = map.createLayer("floor", tilesArray,0,0);
    this.wallLayer = map.createLayer("wall", tilesArray,0,0);
    this.deco1Layer = map.createLayer("deco1", tilesArray,0,0);
     this.deco2Layer = map.createLayer("deco2", tilesArray,0,0);
    this.deco3Layer = map.createLayer("deco3", tilesArray,0,0);
    this.deco4Layer = map.createLayer("deco4", tilesArray,0,0);
    this.deco5Layer = map.createLayer("deco5", tilesArray,0,0);

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
      )

      var level4Down = this.input.keyboard.addKey(52);
  
      level4Down.on(
          "down",
          function () {
            console.log("4 pressed, jump to level 4");
            this.scene.start("level4");
          },
          this
      )
  


this.anims.create({
    key:'Wonka-up',
    frames:this.anims.generateFrameNumbers('Wonka',
    { start:105, end:112 }),
    frameRate:5,
    repeat:-1
});

this.anims.create({
    key:'Wonka-left',
    frames:this.anims.generateFrameNumbers('Wonka',
    { start:118, end:125 }),
    frameRate:5,
    repeat:-1
});

this.anims.create({
    key:'Wonka-down',
    frames:this.anims.generateFrameNumbers('Wonka',
    { start:131, end:138 }),
    frameRate:5,
    repeat:-1
});

this.anims.create({
    key:'Wonka-right',
    frames:this.anims.generateFrameNumbers('Wonka',
    { start:144, end:151 }),
    frameRate:5,
    repeat:-1
});

this.player = this.physics.add.sprite(400, 400, 'Wonka');
window.player = this.player

this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.5).setOffset(20,30)

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

     this.deco4Layer.setCollisionByExclusion(-1, true);
     this.physics.add.collider(this.player, this.deco4Layer);

     this.deco5Layer.setCollisionByExclusion(-1, true);
     this.physics.add.collider(this.player, this.deco5Layer);

    } // end of create //

    update () {

      if (this.cursors.left.isDown)
      {
          this.player.setVelocityX(-160);
          this.player.anims.play('Wonka-left', true);
      }
      else if (this.cursors.right.isDown)
      {
          this.player.setVelocityX(160);
          this.player.anims.play('Wonka-right', true);
      } else if (this.cursors.up.isDown)
      {
          this.player.setVelocityY(-160);
          this.player.anims.play('Wonka-up', true);
      } else if (this.cursors.down.isDown)
      {
          this.player.setVelocityY(160);
          this.player.anims.play('Wonka-down', true);
      } else {
          this.player.setVelocity(0);
          this.player.anims.stop();
      }

      if (
        this.player.y > 332 &&
        this.player.x > 468 &&
        this.player.x < 508
      ) {
        console.log("level4");
        this.level1();
      }

    }

 level1(player, tile) {
  console.log("level1 function");
  let playerPos = {};
  playerPos.x = 817
  playerPos.y = 900
      this.scene.start("level1",{playerPos: playerPos});
 } 



       

     // end of update // 
    

  }