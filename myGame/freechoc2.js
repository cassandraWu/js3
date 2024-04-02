class freechoc2 extends Phaser.Scene {

  constructor ()
  {
      super({ key: "freechoc2" });
  }

  preload() {
    this.load.image('freechoco', 'assets/freechoc2.png')
      this.load.audio("freechoc","assets/freechoc.mp3")
      

}
create() {
  this.add.image(0, 0, 'freechoco').setOrigin(0, 0);
  this.music = this.sound.add("freechoc",{loop: false}).setVolume(0.5);
this.music.play();

  console.log("freechoco");

  var spaceDown = this.input.keyboard.addKey('SPACE');
  
  spaceDown.on('down', () => {
      console.log("Spacebar pressed, go to next menu");
      this.scene.stop("freechoc2");
      let playerPos = {};
      playerPos.x = 1219
      playerPos.y = 1085
      this.scene.start("level1", { playerPos: playerPos });

  });
}

  
}

