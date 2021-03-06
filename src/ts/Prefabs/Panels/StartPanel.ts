import MainGame from "../../Scenes/MainGame"

export default class StatusPanel extends Phaser.GameObjects.Container {
    constructor(scene: MainGame, x: number, y: number) {
        super(scene, x, y, null);

        var positionY = 180;
        var resetBtn = scene.add.sprite(0, positionY, "button_ui").setOrigin(.5).setScale(3, 1.2).setInteractive().
            on('pointerdown', () => this.OnStart());
        var resetTxt = scene.add.bitmapText(0, positionY, "font_lato_bold", "Start", 28).setOrigin(.5);

        this.add([resetBtn, resetTxt]);

        scene.add.existing(this);
    }

    public Open(): void {
        this.setVisible(true);
        this.setActive(true);
    }
    public Close(): void {
        this.setVisible(false);
        this.setActive(false);
    }

    private OnStart(): void {
        (this.scene as MainGame).StartGame();
    }
}
