import { gsap } from 'gsap';

export default class Page {
    constructor($el) {
        this.$el = $el;
        this.$backdrop = $el.querySelector('.js-pageBackdrop');
        this.$backdropBg = $el.querySelector('.js-pageBackdropBg');
        this.$backdropFg = $el.querySelector('.js-pageBackdropFg');

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

        if (this.$backdrop) {
            gsap.to(this.$backdrop, {
                x: -8 * mouseX,
                y: -4 * mouseY,
                duration: 3,
                ease: 'power4.out',
            });
        }

        if (this.$backdropBg && this.$backdropFg) {
            gsap.to(this.$backdropBg, {
                x: -8 * mouseX,
                y: -4 * mouseY,
                duration: 3,
                ease: 'power4.out',
            });

            gsap.to(this.$backdropFg, {
                x: -16 * mouseX,
                y: -8 * mouseY,
                duration: 3,
                ease: 'power4.out',
            });
        }
    }
}
