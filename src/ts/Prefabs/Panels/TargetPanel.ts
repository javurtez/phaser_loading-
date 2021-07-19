import MainGame from "../../Scenes/MainGame";

export default class TargetPanel extends Phaser.GameObjects.Container {
    targetText: Phaser.GameObjects.Text;
    hitText: Phaser.GameObjects.Text;
    constructor(scene: MainGame, x: number, y: number) {
        super(scene, x, y);

        var fontSize = 20;
        var target = scene.add.text(-100, -220, "Target").setFontSize(fontSize).setOrigin(.5).setFontStyle("Bold");
        var hit = scene.add.text(100, -220, "Hit").setFontSize(fontSize).setOrigin(.5).setFontStyle("Bold");

        fontSize = 30;
        this.targetText = scene.add.text(-100, -170, "").setFontSize(fontSize).setOrigin(.5).setFontStyle("Bold");
        this.hitText = scene.add.text(100, -170, "").setFontSize(fontSize).setOrigin(.5).setFontStyle("Bold");

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
