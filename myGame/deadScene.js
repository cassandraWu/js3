class deadScene extends Phaser.Scene {

  constructor ()
  {
      super({ key: "deadScene" });
  }

  preload() {
    this.load.image('dead', 'assets/dead.png')
      this.load.audio("lose","assets/lose.mp3")
      

}
create() {
  this.add.image(0, 0, 'dead').setOrigin(0, 0);
  this.music = this.sound.add("lose",{loop: false}).setVolume(0.5);
this.music.play();

  console.log("loaded");

  var spaceDown = this.input.keyboard.addKey('SPACE');
  
  spaceDown.on('down', () => {
      console.log("Spacebar pressed, go to next menu");
      this.scene.stop("deadScene");
      let playerPos = {};
      playerPos.x = 384;
      playerPos.y = 1109;
      this.scene.start("level1");
  });
}

  
}

