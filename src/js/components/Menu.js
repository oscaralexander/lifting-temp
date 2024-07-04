export default class Menu {
    constructor($el) {
        this.$el = $el;
        this.$$subMenuToggle = this.$el.querySelectorAll('[aria-controls]');

        this.initListeners();
    }

    initListeners() {
        for (const $subMenuToggle of this.$$subMenuToggle) {
            $subMenuToggle.addEventListener('click', this.onSubMenuToggleClick.bind(this), false);
        }
    }

    onSubMenuToggleClick(e) {
        const id = e.target.getAttribute('aria-controls');
        const isExpanded = e.target.getAttribute('aria-expanded') === 'true';

        this.$el.querySelectorAll(`[aria-controls="${id}"]`).forEach($toggle => {
            $toggle.setAttribute('aria-expanded', !isExpanded);
        });

        e.preventDefault();
    }
}
