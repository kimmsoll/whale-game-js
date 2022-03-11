import PopUp from './popUp.js';
import Field from './field.js';
import Game from './game.js';

const gameFinishBanner = new PopUp();
const gameField = new Field();
const game = new Game();

const redoBtn = document.querySelector('.game__redo');

// 시간대 감지하여 배경 이미지 표시
const checkHours = () => {
	const splashBg = document.querySelector('#splash-screen');
	const now = new Date();
	const hour = now.getHours();
	if (hour>=6 && hour<20) {
		gameField.field.style.backgroundImage = "url('./imgs/bg/bg1.png')";
		splashBg.style.backgroundImage = "url('./imgs/bg/bg1.png')";
	} else {
		gameField.field.style.backgroundImage = "url('./imgs/bg/bg2.png')";
		splashBg.style.backgroundImage = "url('./imgs/bg/bg2.png')";
	}
}

// splash 창 숨김
const hideSplash = () => {
	gameFinishBanner.hide();
	setTimeout(() => {
		const splashScreen = document.querySelector('.splash');
		splashScreen.style.zIndex = -1;
	}, 2000);
}

checkHours();
window.addEventListener('load', hideSplash);
gameField.field.addEventListener('click', game.onTargetClick);
gameFinishBanner.setEventListener(game.startGame);
redoBtn.addEventListener('click', () => location.reload());