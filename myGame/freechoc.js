class freechoc extends Phaser.Scene {

  constructor ()
  {
      super({ key: "freechoc" });
  }

  preload() {
    this.load.image('free', 'assets/free.png')
      this.load.audio("freechoc","assets/freechoc.mp3")
      

}
create() {
  this.add.image(0, 0, 'free').setOrigin(0, 0);
  this.music = this.sound.add("freechoc",{loop: false}).setVolume(0.5);
this.music.play();

  console.log("free");

  var spaceDown = this.input.keyboard.addKey('SPACE');
  
  spaceDown.on('down', () => {
      console.log("Spacebar pressed, go to next menu");
      this.scene.stop("winScene");
      this.scene.start("level1");
  });
}

  
}

