class Intro1 extends Phaser.Scene {

  constructor ()
  {
      super({ key: "Intro1" });
  }

  preload() {
    this.load.image('Image1', 'assets/Intropage.png')
      this.load.audio("bgMusic","assets/bgMusic.mp3")
      this.load.audio("turn","assets/page.mp3")
      

}

create () {
     this.add.image(0, 0, 'Image1').setOrigin(0, 0).setScale(1);
     this.music = this.sound.add("bgMusic",{loop: true}).setVolume(0.1);
this.music.play();
this.music = this.sound.add("turn",{loop: false}).setVolume(0.3);
this.music.play();

   
    console.log("menu page - Intro1");
  //   let map = this.make.tilemap({ key: "world" });

    var spaceDown = this.input.keyboard.addKey('SPACE');
    
    spaceDown.on('down', function(){
    console.log("Spacebar pressed, go to next menu");
    this.scene.stop("Intro1");
    this.scene.start("Intro2");
    }, this );

}
  
}

