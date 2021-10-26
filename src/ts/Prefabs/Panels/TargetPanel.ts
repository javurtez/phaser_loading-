import MainGame from "../../Scenes/MainGame";

export default class TargetPanel extends Phaser.GameObjects.Container {
    
    targetText: Phaser.GameObjects.BitmapText;
    hitText: Phaser.GameObjects.BitmapText;

    constructor(scene: MainGame, x: number, y: number) {
        super(scene, x, y);

        var fontSize = 28;
        var target = scene.add.bitmapText(-100, -220, "font_lato_bold", "Target", 29).setOrigin(.5);
        var hit = scene.add.bitmapText(100, -220, "font_lato_bold", "Hit", 29).setOrigin(.5);

        fontSize = 36;
        this.targetText = scene.add.bitmapText(-100, -170, "font_lato_bold", "", 35).setOrigin(.5);
        this.hitText = scene.add.bitmapText(100, -170, "font_lato_bold", "", 35).setOrigin(.5);

        this.add([target, hit, this.targetText, this.hitText]);

        scene.add.existing(this);
    }

    public SetTarget(target: number): void {
        this.targetText.setText(target == - 1 ? "" : target.toString());
    }
    public SetHit(hit: number): void {
        this.hitText.setText(hit == -1 ? "" : hit.toString());
    }
}
