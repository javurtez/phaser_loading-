import SplashScreen from "./SplashScreen";
import Utilities from "../Utilities";

export default class Preloader extends Phaser.Scene {
	/**
	 * Unique name of the scene.
	 */
	public static Name = "Preloader";

	public preload(): void {
		this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#9900FF");

		this.load.path = "assets/";

		this.load.bitmapFont('font_lato_bold', 'fonts/lato-bold.png', 'fonts/lato-bold.fnt');
		this.load.image("loading_ui", "loading.png");
		this.load.image("white_ui", "white.png");
	}

	public create(): void {
		Utilities.LogSceneMethodEntry("Preloader", "create");

		this.addProgressBar();

		this.load.image("heart_ui", "ui/heart_plus.png");
		this.load.image("stairs_ui", "ui/stairs.png");
		this.load.image("trophy_ui", "ui/trophy.png");

		this.load.image("button_ui", "ui/button.png");

		this.load.audio("score", "audio/score.wav");
		this.load.audio("bgm", "audio/neon_running_loop.mp3");

		this.load.start();

		this.load.on("complete", () => {
			this.scene.start(SplashScreen.Name);
		});
	}

	/**
	 * Adds a progress bar to the display, showing the percentage of assets loaded and their name.
	 */
	private addProgressBar(): void {
		const width = this.cameras.main.width;
		const height = this.cameras.main.height;

		var maxScale = 5;
		const progressBar = this.add.sprite((width / 2) / 4, (height / 2), "white_ui").setOrigin(0, .5);
		const progressBox = this.add.sprite((width / 2) / 4, (height / 2), "loading_ui").setOrigin(0, .5).setScale(maxScale, 1);

		const loadingText = this.make.bitmapText({
			x: width / 2,
			y: height / 2 - 54,
			text: "LOADING...",
			font: "font_lato_bold",
			size: 24
		});
		loadingText.setOrigin(0.5);

		const percentText = this.make.bitmapText({
			x: width / 2,
			y: height / 2 + 50,
			text: "0%",
			font: "font_lato_bold",
			size: 18
		});
		percentText.setOrigin(0.5)

		this.load.on("progress", (value: number) => {
			percentText.setText(parseInt(value * 100 + "", 10) + "%");
			progressBar.setScale(value * 5, 1);
		});

		this.load.on("complete", () => {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
		});
	}
}
