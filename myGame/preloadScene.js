class preloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "preloadScene" });
  }

 

  create() {
    spaceDown.on(
      "down",
      function () {
        let playerPos = {};
        playerPos.x = 797;
        playerPos.y = 1218;
        this.scene.start("Intro1", { playerPos: playerPos });
      },
      this
    );
  }
}
