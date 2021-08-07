const gameBtn = document.querySelector(".game__btn");
const gameField = document.querySelector(".game__field");
const gameTarget = document.querySelector(".game__target");
const timer = document.querySelector(".game__timer");
const popUp = document.querySelector(".pop-up");
const popUpText = document.querySelector(".pop-up__text");
const popUpBtn = document.querySelector(".pop-up__btn i");
const howToBtn = document.querySelector(".game__how-to-play");

const WHALE_SIZE = 100; 
let sec = 5;
let clock;

// 랜덤한 숫자 x, y 반환
const getRandomPosition = () => {
	const x = gameField.clientWidth - WHALE_SIZE;
	const y = gameField.clientHeight - WHALE_SIZE;
	const randomX = Math.floor(Math.random()*Math.floor(x));
	const randomY = Math.floor(Math.random()*Math.floor(y));
	return [randomX,randomY];
}

// 고래 생성
const createItems = () => {
	for(let i=1; i<=30; i++){
		const img = document.createElement("img")
		img.setAttribute("src",`imgs/icons/${i}.png`);
		img.setAttribute("class", "whale");
		img.setAttribute("data-num", i);
		displayItems(img);
	}
}

// 고래들을 랜덤하게 배치
const displayItems = (item) => {
	gameField.appendChild(item);
	const xy = getRandomPosition();
	item.style.left = `${xy[0]}px`;
	item.style.top = `${xy[1]}px`;
}

// 찾아야 할 고래를 랜덤하게 표시
const showSelectedImage = () => {
	const randomNum = Math.floor(Math.random()*30)+1;
	gameTarget.innerHTML = `<img src="imgs/icons/${randomNum}.png" id="game__target__img" data-num="${randomNum}">`;
}

// 고래를 클릭했을 때 조건에 따라 결과 출력
const onTargetClick = (e) => {
	const target = e.target.dataset.num;
	const gameTargetImg = document.querySelector("#game__target__img");
	if(!target){
		e.preventDefault();
	}
	else if(gameTargetImg.dataset.num == target && sec>0 && sec<5){
		popUpWin();
		stopGame();
	}
	else{
		popUpLose();
		stopGame();
	}
};

// 성공 팝업
const popUpWin = () => {
	popUp.classList.remove("hidden");
	popUpText.innerHTML = `REPLAY ?<br>엄마 🐳: 정말 고마워요~ 당신의 눈썰미에 건배!!`;
}

// 실패 팝업
const popUpLose = () => {
	popUp.classList.remove("hidden");
	popUpText.innerHTML = `REPLAY ?<br>엄마 🐳: 포포~ 이눔시끼 어딨는 거야~`;
}

// 타이머 시작
const startTimer = () => {
	clock = setInterval(()=>{
		timer.innerText = `0${--sec}:00`;
		if(sec === 0){
			stopGame();
			popUpLose();
		}
	},1000);
}

// 게임 시작
const startGame = () => {
	gameBtn.innerHTML = `<i class="far fa-stop-circle"> STOP</i>`;
	//popup 초기화
	popUp.classList.add("hidden");
	// 타이머 시작
	startTimer();
	showSelectedImage();
	createItems();
}

// 게임 종료
const stopGame = () => {
	// 타이머 정지
	clearInterval(clock);
	// 타이머 초기화
	sec = 5;
	timer.innerText = `0${sec}:00`;
	gameBtn.classList.add("cant-see")
	// gameField 초기화
	gameField.innerHTML = "";
}

// 게임 설명 팝업
const showHowTo = () => {
	const howToPopUp = document.querySelector(".pop-up-how-to-play");
	howToPopUp.classList.toggle("hidden");
}

gameBtn.addEventListener("click", () => {
	const btnText = document.querySelector(".game__btn i");
	if(btnText.innerText === " PLAY"){
		startGame();
	} else {
		stopGame();
		popUpLose();
	}
});

gameField.addEventListener("click", onTargetClick);
popUpBtn.addEventListener("click", startGame);
howToBtn.addEventListener("click", showHowTo);
