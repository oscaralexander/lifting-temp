export default class Banner {
    constructor($el) {
        this.$el = $el;
        this.$menuToggle = document.getElementById('menuToggle');
        this.$navigation = this.$el.querySelector('.js-bannerNavigation');

        this.scrollDirection = 1;
        this.scrollY = window.scrollY;

        this.initListeners();
    }

    initListeners() {
        window.addEventListener(
            'scroll',
            () => {
                const scrollDirection = this.scrollY > 0 && window.scrollY < this.scrollY ? -1 : 1;

                if (scrollDirection !== this.scrollDirection) {
                    this.isScrollingUp = scrollDirection === -1;
                    this.scrollDirection = scrollDirection;
                }

                this.isScrolled = window.scrollY > this.$el.offsetTop - window.scrollY;
                this.scrollY = window.scrollY;
            },
            false
        );

        this.$navigation.addEventListener(
            'transitionend',
            e => {
                if (e.target === this.$navigation) {
                    if (!this.$menuToggle.checked) {
                        const $$expandable = this.$navigation.querySelectorAll('[aria-expanded]');

                        for (const $expandable of $$expandable) {
                            $expandable.setAttribute('aria-expanded', false);
                        }
                    }
                }
            },
            false
        );

        this.$menuToggle.addEventListener('change', () => {
            document.body.classList.toggle('is-menuVisible', this.$menuToggle.checked);
        });

        // this.$$subMenuToggles.forEach($subMenuToggle => {
        //     $subMenuToggle.addEventListener('click', this.onToggleSubMenu.bind(this), true);
        // });
    }

    /**
     * Setters
     */

    set isScrollingUp(isScrollingUp) {
        this.$el.classList.toggle('is-scrollingUp', isScrollingUp);
    }

    set isScrolled(isScrolled) {
        this.$el.classList.toggle('is-scrolled', isScrolled);
    }
}
