import { gsap } from 'gsap';

export default class Page {
    $backdrop;
    $el;

    constructor($el) {
        this.$el = $el;
        this.$backdrop = $el.querySelector('.js-pageBackdrop');

        this.initListeners();
    }

    initListeners() {
        if (!document.documentElement.ontouchstart) {
            window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        }

        window.addEventListener('scroll', this.onScroll.bind(this), false);
    }

    onScroll() {
        const threshold = window.innerWidth * 0.5;
        this.$el.classList.toggle('is-hideLogo', window.scrollY > threshold);
    }

    onMouseMove(e) {
        const mouseX = (e.pageX / window.innerWidth) * 2 - 1;
        const mouseY = (e.pageY / window.innerHeight) * 2 - 1;

        gsap.to(this.$backdrop, {
            x: -24 * mouseX,
            y: -24 * mouseY,
            duration: 5,
            ease: 'power1.out',
        });
    }
}
