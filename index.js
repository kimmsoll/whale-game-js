const contents = document.querySelector(".contents");
const redoBtn = document.querySelector(".game__redo");
const howToBtn = document.querySelector(".game__how-to-play");
const howToPopUp = document.querySelector(".pop-up-how-to-play");
const timer = document.querySelector(".game__timer span");

const gameBtn = document.querySelector(".game__btn");
const gameTarget = document.querySelector(".game__target");
const gameField = document.querySelector(".game__field");

const popUp = document.querySelector(".pop-up");
const popUpBtn = document.querySelector(".pop-up__btn i");
const popUpText = document.querySelector(".pop-up__text");

const WHALE_SIZE = gameTarget.clientHeight;
let sec = 5;
let clock;

// 시간대 감지하여 배경 이미지 표시
const checkHours = () => {
	const splashBg = document.querySelector(".splash");
	const now = new Date();
	const hour = now.getHours();
	if(hour>=6 && hour<20){
		contents.style.backgroundImage = "url('./imgs/bg/bg1.png')";
		gameField.style.backgroundImage = "url('./imgs/bg/bg1.png')";
		splashBg.style.backgroundImage = "url('./imgs/bg/logo_bg1.png')";
	}else{
		contents.style.backgroundImage = "url('./imgs/bg/bg2.png')";
		gameField.style.backgroundImage = "url('./imgs/bg/bg2.png')";
		splashBg.style.backgroundImage = "url('./imgs/bg/logo_bg2.png')";
	}
}

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
		img.setAttribute("src",`./imgs/icons/${i}.png`);
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
	gameTarget.innerHTML = `<img src="./imgs/icons/${randomNum}.png" id="game__target__img" data-num="${randomNum}">`;
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

// 타이머 정지
const stopTimer = () => {
	// 타이머 정지
	clearInterval(clock);
	// 타이머 초기화
	sec = 5;
	timer.innerText = `0${sec}:00`;
	gameBtn.classList.add("cant-see")
}

// 게임 시작
const startGame = () => {
	// 찾을 아이템 등장, 전체 아이템 생성 및 배치
	showSelectedImage();
	createItems();
	// howToPopUp 보인다면 없애고, gameBtn 있는 경우만 innerHTML 변경
	const hasHidden = howToPopUp.classList.contains("hidden");
	const hasCantSee = gameBtn.classList.contains("cant-see");
	if(!hasHidden){
		howToPopUp.classList.add("hidden");
	}
	if(!hasCantSee){
		gameBtn.innerHTML = `<i class="far fa-stop-circle"></i><span>STOP</span>`;
	}
	//popup 초기화
	popUp.classList.add("hidden");
	// 타이머 시작
	startTimer();
}

// 게임 종료
const stopGame = () => {
	stopTimer();
	// gameField 초기화
	gameField.innerHTML = "";
}

// splash 창 숨김
const hideSplash = () => {
	setTimeout(()=>{
		const splashScreen = document.querySelector(".splash");
		splashScreen.style.zIndex = -1;
	}, 2000);
}

gameBtn.addEventListener("click", () => {
	const btnText = gameBtn.querySelector("span");
	if(btnText.innerText === "PLAY"){
		startGame();
	} else {
		stopGame();
		popUpLose();
	}
});

checkHours();
window.addEventListener("load", hideSplash);
gameField.addEventListener("click", onTargetClick);
popUpBtn.addEventListener("click", startGame);
howToBtn.addEventListener("click", () => howToPopUp.classList.toggle("hidden"));
redoBtn.addEventListener("click", () => location.reload());