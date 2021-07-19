import Utilities from "../Utilities";
import MainGame from "./MainGame";
//import MainSettings from "./MainSettings";

export default class MainMenu extends Phaser.Scene {
	/**
	 * Unique name of the scene.
	 */
	public static Name = "MainMenu";

	public preload(): void {
		// Preload as needed.
	}

	public create(): void {
		Utilities.LogSceneMethodEntry("MainMenu", "create");

        // this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#9900FF");

		// const textYPosition = this.cameras.main.height / 3;

		// const newGameText = this.add.text(this.cameras.main.centerX, textYPosition, "Start");
		// newGameText
		// 	.setFontFamily("monospace")
		// 	.setFontSize(40)
		// 	.setFill("#fff")
		// 	.setAlign("center")
		// 	.setOrigin(0.5);
		// newGameText.setInteractive();
		// newGameText.on("pointerdown", () => { this.scene.start(MainGame.Name); }, this);

		this.sound.add("bgm", {
			loop: true,
			volume: 0.5
		}).play();

		this.scene.start(MainGame.Name);
	}
}
