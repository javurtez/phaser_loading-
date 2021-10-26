export default class StatusPanel extends Phaser.GameObjects.Container {

    healthText: Phaser.GameObjects.BitmapText;
    levelText: Phaser.GameObjects.BitmapText;
    maxLevelText: Phaser.GameObjects.BitmapText;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, null);

        this.SetImages();

        scene.add.existing(this);
    }

    SetImages(): void {

        console.log(this.y);

        var heartImg = this.scene.add.sprite(-160, -this.y + 30, "heart_ui").setOrigin(.5).setScale(.4);
        var stairsImg = this.scene.add.sprite(-30, -this.y + 30, "stairs_ui").setOrigin(.5).setScale(.4);
        var trophyImg = this.scene.add.sprite(100, -this.y + 30, "trophy_ui").setOrigin(.5).setScale(.4);

        var fontSize = 24;
        var textX = 35;
        this.healthText = this.scene.add.bitmapText(heartImg.x + textX, heartImg.y, "font_lato_bold", "100", fontSize).setOrigin(0, .5);
        this.levelText = this.scene.add.bitmapText(stairsImg.x + textX, heartImg.y, "font_lato_bold", "0", fontSize).setOrigin(0, .5);
        this.maxLevelText = this.scene.add.bitmapText(trophyImg.x + textX, heartImg.y, "font_lato_bold", "0", fontSize).setOrigin(0, .5);

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
