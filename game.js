import Field from "./field.js";
import PopUp from "./popUp.js";

const gameField = new Field();
const gameFinishBanner = new PopUp();

export default class Game {
    constructor() {
        this.sec = 5;
        this.clock = undefined;
        this.gameBtn = document.querySelector('.game__btn');
        this.gameTarget = document.querySelector('.game__target');
        this.timer = document.querySelector('.game__timer');
        this.howToPlay = document.querySelector('.pop-up-how-to-play');
        this.howToBtn = document.querySelector('.game__how-to-play');

        this.gameBtn.addEventListener('click', () => {
            const gameBtnText = document.querySelector('.game__btn span');
            if (gameBtnText.innerText === 'PLAY') {
                this.startGame();
                this.gameBtn.classList.add('hidden');
            }
        });
        this.howToBtn.addEventListener('click', () => {
            this.howToPlay.classList.toggle('hidden');
        });
    };

    // 찾아야 할 고래를 랜덤하게 표시
    showSelectedImage = () => {
        const randomNum = Math.floor(Math.random() * 30) + 1;
        this.gameTarget.innerHTML = `<img src='./imgs/icons/${randomNum}.png' id='game__target__img' data-num='${randomNum}'>`;
    };

    // 타이머 시작
    startTimer = () => {
        this.sec = 5;
        this.timer.innerText = `05:00`;
        this.clock = setInterval(() => {
    		this.timer.innerText = `0${--this.sec}:00`;
    		if (this.sec === 0) {
                this.stopGame();
    			gameFinishBanner.showWithText('포포~ 이눔시끼 어딨는 거야~');
    		}
    	}, 1000);
    };

    // 타이머 정지
    stopTimer = () => {
    	clearInterval(this.clock);
    };

    // 게임 시작
    startGame = () => {
        gameFinishBanner.hide();
        this.howToPlay.classList.add('hidden');
        gameField.field.innerHTML = '';
    	this.startTimer();
    	this.showSelectedImage();
    	gameField.createItems();
    };

    // 게임 종료
    stopGame = () => {
        gameField.field.innerHTML = '';
    	this.stopTimer();
    };

    // 고래를 클릭했을 때 조건에 따라 결과 출력
    onTargetClick = (e) => {
        const target = e.target.dataset.num;
        const gameTargetImg = document.querySelector('#game__target__img');
        if (!target) {
            e.preventDefault();
        }
        else if (gameTargetImg.dataset.num == target && this.sec>0 && this.sec<5) {
            this.stopGame();
            gameFinishBanner.showWithText('정말 고마워요~ 당신의 눈썰미에 건배!!');
        }
        else {
            this.stopGame();
            gameFinishBanner.showWithText('포포~ 이눔시끼 어딨는 거야~');
        }
    };
}
