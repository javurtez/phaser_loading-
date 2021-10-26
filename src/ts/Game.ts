import 'phaser';
import Boot from "./Scenes/Boot";
import Preloader from "./Scenes/Preloader";
import MainMenu from "./Scenes/MainMenu";
import SplashScreen from "./Scenes/SplashScreen";
import Utilities from "./Utilities";
import MainGame from "./Scenes/MainGame";

const gameConfig: Phaser.Types.Core.GameConfig = {
	width: 412,
	height: 650,
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	parent: "content",
	title: "Loading-"
};

export default class Game extends Phaser.Game {
	constructor(config: Phaser.Types.Core.GameConfig) {
		Utilities.LogSceneMethodEntry("Game", "constructor");

		super(config);

		this.scene.add(Boot.Name, Boot);
		this.scene.add(Preloader.Name, Preloader);
		this.scene.add(SplashScreen.Name, SplashScreen);
		this.scene.add(MainMenu.Name, MainMenu);
		this.scene.add(MainGame.Name, MainGame);
		this.scene.start(Boot.Name);
	}
}

window.onload = (): void => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const game = new Game(gameConfig);
};
