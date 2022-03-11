export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpBtn = document.querySelector('.pop-up__btn');
        this.popUpText = document.querySelector('.pop-up__text');

        this.popUpBtn.addEventListener('click', () => {
            this.hide();
            this.onClick && this.onClick();
        });
    };

    showWithText(text) {
	    this.popUp.classList.remove('hidden');
	    this.popUpText.innerHTML = `REPLAY ?<br>엄마 🐳: ${text}`;
    };

    setEventListener(onClick) {
        this.onClick = onClick;
    };

    hide() {
        this.popUp.classList.add('hidden');
    };
}
