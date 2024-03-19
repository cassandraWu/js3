
class level2 extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'level2' });
    }
    init(data) {
          this.playerPos = data.playerPos;}


    preload() {

        // Step 1, load JSON
        this.load.tilemapTiledJSON ("level2", "assets/living2.tmj")

        // Step 2 : Preload any images here
        this.load.image("livingRoomimg" , "assets/livingRoom.png");
        this.load.image("magecityimg" , "assets/magecity.png");
        this.load.image("trimsanddoorsimg" , "assets/trimsanddoors.png");
        this.load.image("Wall_unstableimg" , "assets/Wall_unstable.png");

    } // end of preload //

    create (){

    console.log("animationScene")

    //Step 3 - Create the map from main
    let map= this.make.tilemap({key: "level2"})

    
    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let livingroomTiles = map.addTilesetImage("livingRoom", "livingRoomimg");
    let magecityTiles = map.addTilesetImage("magecity", "magecityimg");
    let trimsanddoorsTiles = map.addTilesetImage(" trimsanddoors", " trimsanddoorsimg");
    let WallunstableTiles = map.addTilesetImage("Wall_unstable", "Wall_unstableimg");

    




    //Step 5  create an array of tiles
    let tilesArray= [
        livingroomTiles,  magecityTiles, trimsanddoorsTiles,  WallunstableTiles
    ];

    

    
 

    // Step 6  Load in layers by layers
    this.floorLayer = map.createLayer("floor", tilesArray,0,0);
    this.wallLayer = map.createLayer("wall", tilesArray,0,0);
     this.deco1Layer = map.createLayer("deco1", tilesArray,0,0);
     this.deco2Layer = map.createLayer("deco2", tilesArray,0,0);
    this.deco3Layer = map.createLayer("deco3", tilesArray,0,0);

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
      )



      var level3Down = this.input.keyboard.addKey(51);
  
      level3Down.on(
          "down",
          function () {
            console.log("3 pressed, jump to level 3");
            this.scene.start("level3");
          },
          this
      )
      this.cursors = this.input.keyboard.createCursorKeys();
  

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

        //object layer
        let choc1 = map.findObject("objectLayer", (obj) => obj.name === "choc1");

    

     this.player = this.physics.add.sprite(510, 572, 'Wonka');
window.player = this.player

this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.5).setOffset(17,32)

// this.player = this.physics.add.sprite(40, 40, 'oompa');
// window.player = this.player



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
            this.player.y > 573 &&
            this.player.x > 456 &&
            this.player.x < 558 
          ) {
            console.log("Door2");
            this.level1();
          }

        }

     level1(player, tile) {
      console.log("level1 function");
      let playerPos = {};
      playerPos.x = 384
      playerPos.y = 1109
          this.scene.start("level1",{playerPos: playerPos});
     } 
    
    }
        
        

       // end of update // 
    