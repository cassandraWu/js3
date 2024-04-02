class winScene extends Phaser.Scene {

  constructor ()
  {
      super({ key: "winScene" });
  }

  preload() {
    this.load.image('win', 'assets/win.png')
      this.load.audio("win","assets/yay.mp3")
      

}
create() {
  this.add.image(0, 0, 'win').setOrigin(0, 0);
  this.music = this.sound.add("win",{loop: false}).setVolume(0.5);
this.music.play();

  console.log("win");

  var spaceDown = this.input.keyboard.addKey('SPACE');
  
  spaceDown.on('down', () => {
      console.log("Spacebar pressed, go to next menu");
      this.scene.stop("winScene");
      this.scene.start("Intro1");
  });
}

  
}

