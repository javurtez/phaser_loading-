export default class StatusPanel extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, null);

        this.SetImages();

        scene.add.existing(this);
    }

    healthText: Phaser.GameObjects.Text;
    levelText: Phaser.GameObjects.Text;
    maxLevelText: Phaser.GameObjects.Text;
    SetImages(): void {

        console.log(this.y);

        var heartImg = this.scene.add.sprite(-160, -this.y + 30, "heart_ui").setOrigin(.5).setScale(.4);
        var stairsImg = this.scene.add.sprite(-30, -this.y + 30, "stairs_ui").setOrigin(.5).setScale(.4);
        var trophyImg = this.scene.add.sprite(100, -this.y + 30, "trophy_ui").setOrigin(.5).setScale(.4);

        var fontSize = 33;
        var textX = 35;
        this.healthText = this.scene.add.text(heartImg.x + textX, heartImg.y, "100").setOrigin(0, .5).setFontSize(fontSize);
        this.levelText = this.scene.add.text(stairsImg.x + textX, heartImg.y, "0").setOrigin(0, .5).setFontSize(fontSize);
        this.maxLevelText = this.scene.add.text(trophyImg.x + textX, heartImg.y, "0").setOrigin(0, .5).setFontSize(fontSize);

        this.add([heartImg, stairsImg, trophyImg, this.healthText, this.levelText, this.maxLevelText]);
    }

    public SetHealth(curHealth: number): void {
        this.healthText.setText(curHealth.toString());
    }
    public SetLevel(curLevel: number): void {
        this.levelText.setText(curLevel.toString());
    }
    public SetMaxLevel(curMaxLevel: number): void {
        this.maxLevelText.setText(curMaxLevel.toString());
    }
}
