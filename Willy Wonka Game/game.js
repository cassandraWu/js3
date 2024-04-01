
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#000000',
    scene: [Intro1, Intro2, Intro3, level1, level2, level3, level4, deadScene, winScene]

};

let game = new Phaser.Game(config);