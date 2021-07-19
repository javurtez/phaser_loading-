import Utilities from "../Utilities";
import StatusPanel from "../Prefabs/Panels/StatusPanel";
import StartPanel from "../Prefabs/Panels/StartPanel";
import TargetPanel from "../Prefabs/Panels/TargetPanel";
import GameOverPanel from "../Prefabs/Panels/GameOverPanel";

const maxSpeed = 2;
const maxScoreKey = "maxScore";

export default class MainGame extends Phaser.Scene {
	/**
	 * Unique name of the scene.
	 */
	public static Name = "MainGame";

	public preload(): void {
		// Preload as needed.
	}

	statusPanel: StatusPanel;
	startPanel: StartPanel;
	targetPanel: TargetPanel;
	gameOverPanel: GameOverPanel;

	loadingImage: Phaser.GameObjects.Sprite;
	loadingTargetIndicatorImage: Phaser.GameObjects.Sprite;
	loadingPercent: number;
	loadingTarget: number;
	maxScaleX: number = 5;
	isLoadingStop: boolean;
	isGameOver: boolean;

	health: number = 100;
	level: number = 0;
	speed: number = maxSpeed;
	
	scoreClip: Phaser.Sound.BaseSound;

	//targetText: Phaser.GameObjects.Text;
	public create(): void {
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

		this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#9900FF");

		Utilities.LogSceneMethodEntry("MainGame", "create");

		this.isLoadingStop = true;
		this.level = 0;

		this.statusPanel = new StatusPanel(this, screenCenterX, screenCenterY);

		this.add.sprite(screenCenterX / 4, screenCenterY - 50, "loading_ui").setOrigin(0, .5).setScale(this.maxScaleX, 1);
		this.loadingImage = this.add.sprite(screenCenterX / 4, screenCenterY - 50, "white_ui").setOrigin(0, .5);
		this.loadingTargetIndicatorImage = this.add.sprite(screenCenterX / 4, screenCenterY + .5, "white_ui").setOrigin(0, .5).setTint(0xFF0000);

		//this.targetText = this.add.text(screenCenterX, 150, "").setFontSize(44).setOrigin(.5).setFontStyle("Bold");

		var maxLevel = parseInt(localStorage.getItem(maxScoreKey)) || 0;
		this.statusPanel.SetMaxLevel(maxLevel);

		this.targetPanel = new TargetPanel(this, screenCenterX, screenCenterY);

		this.startPanel = new StartPanel(this, screenCenterX, screenCenterY);
		this.startPanel.Open();
		this.gameOverPanel = new GameOverPanel(this, screenCenterX, screenCenterY);
		this.gameOverPanel.Close();

		this.ResetLoadingTarget(true);
		this.isLoadingStop = true;

		this.scoreClip = this.sound.add("score", {
			volume: .5
		});
	}

	public update(): void {
		if (this.isLoadingStop) return;
		this.loadingImage.setScale(this.loadingImage.scaleX + (.004 * this.speed), 1);

		if (this.loadingImage.scaleX > this.maxScaleX) {
			this.LoadingStop();
		}
	}

	public StartGame(): void {
		this.ResetLoadingTarget();
		this.time.delayedCall(50, () => {
			this.input.on('pointerdown', () => {
				this.LoadingStop();
			});
		});
		this.startPanel.Close();
	}
	public ResetLoadingGame(): void {
		var maxLevel = parseInt(localStorage.getItem(maxScoreKey)) || 0;
		if (this.level > maxLevel) {
			localStorage.setItem(maxScoreKey, this.level.toString());
			maxLevel = this.level;
		}
		this.statusPanel.SetMaxLevel(maxLevel);

		this.health = 100;
		this.level = 0;
		this.speed = maxSpeed;

		this.statusPanel.SetHealth(this.health);
		this.statusPanel.SetLevel(this.level);

		this.ResetLoadingTarget();

		this.time.delayedCall(50, () => this.isGameOver = false);

		this.gameOverPanel.Close();
	}

	private LoadingStop(): void {
		if (this.gameOverPanel.active || this.isGameOver) return;

		if (this.isLoadingStop) {
			if (this.health > 0) {
				this.level++;
				this.speed += .2;
				this.statusPanel.SetLevel(this.level);
			}

			this.ResetLoadingTarget();
		}
		else {
			this.isLoadingStop = true;

			this.scoreClip.play();

			var percent = (this.loadingImage.scaleX * 10 / this.maxScaleX * 10) / 100;
			var hitTarget = Math.round(percent * 100);
			var remainders = Math.abs(hitTarget - this.loadingTarget);
			this.health -= remainders;

			if (remainders == 0) {
				this.health += 10;
			}

			this.loadingTargetIndicatorImage.setScale((this.loadingTarget / 100) * this.maxScaleX, .1);
			this.loadingTargetIndicatorImage.setVisible(true);

			this.statusPanel.SetHealth(this.health);

			if (this.health <= 0) {
				this.isGameOver = true;
				this.gameOverPanel.Open();
			}
			this.targetPanel.SetHit(hitTarget);
		}
	}
	private ResetLoadingTarget(isStart: boolean = false): void {
		if (isStart) {
			this.loadingImage.setScale(0, 1);
			//this.targetText.setText("");
			this.targetPanel.SetTarget(-1);
			this.loadingTargetIndicatorImage.setVisible(false);
		}
		else {
			this.isLoadingStop = false;

			this.loadingImage.setScale(0, 1);
			this.loadingTarget = Phaser.Math.Between(20, 92);

			this.targetPanel.SetTarget(this.loadingTarget);
			this.targetPanel.SetHit(-1);
			//this.targetText.setText(this.loadingTarget.toString());
			this.loadingTargetIndicatorImage.setVisible(false);
		}
	}
}
