import axios from 'axios';

export default class XhrForm {
    constructor($el) {
        this.$el = $el;
        this.method = this.$el.getAttribute('method') ?? 'post';
        this.request = null;
        this.url = this.$el.getAttribute('action');

        this.initListeners();
    }

    initListeners() {
        this.$el.addEventListener('submit', this.onSubmit.bind(this));
    }

    async onSubmit(e) {
        e.preventDefault();

        if (this.isLoading) {
            return;
        }

        const request = {
            data: new FormData(this.$el),
            method: this.method,
            url: this.url,
        };

        console.log(request);

        if (this.$el.dataset.xhrFormConfirm) {
            if (!window.confirm(this.$el.dataset.xhrFormConfirm)) {
                return false;
            }
        }

        this.isLoading = true;
        this.isSuccess = false;

        try {
            const res = await axios(request);
            this.isLoading = false;
            this.isSuccess = true;
            this.resetErrors();

            if (res.data.redirect !== undefined) {
                window.location = res.data.redirect;
            }
        } catch (error) {
            this.isLoading = false;

            if (error.response.status === 400 && error.response.data.errors) {
                this.displayErrors(error.response.data.errors);
            }
        }
    }

    displayErrors(errors) {
        this.resetErrors();

        for (const key in errors) {
            const $input = this.$el.querySelector(`[name="${key}"]`);

            if ($input) {
                const $error = Object.assign(document.createElement('div'), {
                    className: 'field__error',
                    textContent: errors[key].shift(),
                });

                const $field = $input.closest('.field');
                $field.classList.add('has-error');
                $field.append($error);
            }
        }
    }

    resetErrors() {
        this.$el.querySelectorAll('.field__error').forEach($error => {
            const $field = $error.parentNode;
            $field.classList.remove('has-error');
            $field.removeChild($error);
        });
    }

    /**
     * Getters & setters
     */

    get isSuccess() {
        return this.$el.classList.contains('is-success');
    }

    set isSuccess(isSuccess) {
        return this.$el.classList.toggle('is-success', isSuccess);
    }

    get isLoading() {
        return this.$el.classList.contains('is-loading');
    }

    set isLoading(isLoading) {
        this.$el.querySelectorAll('button[type=submit]').forEach($submit => {
            $submit.toggleAttribute('disabled', isLoading);
        });

        return this.$el.classList.toggle('is-loading', isLoading);
    }
}
