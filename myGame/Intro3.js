class Intro3 extends Phaser.Scene {

  constructor ()
  {
      super({ key: "Intro3" });
  }

  preload() {
    this.load.image('Intro3', 'assets/Intropage3.jpg')

}

create () {
    this.m1 = this.add.image(0, 0, 'Intro3').setOrigin(0, 0).setScale(1);
   
    console.log("menu page - Intro3");
  //   let map = this.make.tilemap({ key: "world" });

    var spaceDown = this.input.keyboard.addKey('SPACE');
    
    spaceDown.on('down', function(){
    console.log("Spacebar pressed, go to next menu");
    spaceDown.on('down', function(){
      let playerPos = {};
      playerPos.x = 797
      playerPos.y = 1218
          this.scene.start("level1",{playerPos: playerPos});
          }, this );
    }, this );

}
  
}

