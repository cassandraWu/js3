class Intro2 extends Phaser.Scene {

  constructor ()
  {
      super({ key: "Intro2" });
  }

  preload() {
    this.load.image('Intro2', 'assets/Intropage2.jpg')
    this.load.audio("turn","assets/page.mp3")

}

create () {
    this.m1 = this.add.image(0, 0, 'Intro2').setOrigin(0, 0).setScale(1);
    this.music = this.sound.add("turn",{loop: false}).setVolume(0.3);
this.music.play();
   
    console.log("menu page - Intro2");
  //   let map = this.make.tilemap({ key: "world" });

    var spaceDown = this.input.keyboard.addKey('SPACE');
    
    spaceDown.on('down', function(){
    console.log("Spacebar pressed, go to next menu");
    this.scene.stop("Intro2");
    this.scene.start("Intro3");
    }, this );

}
  
}

