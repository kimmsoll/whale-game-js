export default class Field {
    constructor() {
        this.WHALE_SIZE = 100;
        this.field = document.querySelector('.game__field');
    };

    // 고래 생성
    createItems = () => {
	    for (let i=1; i<=30; i++) {
	    	const img = document.createElement('img')
	    	img.setAttribute('src',`./imgs/icons/${i}.png`);
	    	img.setAttribute('class', 'whale');
	    	img.setAttribute('data-num', i);
	    	this.displayItems(img);
	    }
    };

    // 랜덤한 숫자 x, y 반환
    getRandomPosition = () => {
        const x = this.field.clientWidth - this.WHALE_SIZE;
        const y = this.field.clientHeight - this.WHALE_SIZE;
        const randomX = Math.floor(Math.random() * Math.floor(x));
        const randomY = Math.floor(Math.random() * Math.floor(y));
        return [randomX, randomY];
    };
    
    // 고래들을 랜덤하게 배치
    displayItems = (item) => {
	    this.field.appendChild(item);
	    const xy = this.getRandomPosition();
	    item.style.left = `${xy[0]}px`;
	    item.style.top = `${xy[1]}px`;
    };
}
