class CookieNotice {
    /**
     * 
     * @param {Object} config Pass an object with the keys available here to
     * overwrite any of these settings. Not that wrapperClasses *must* be an array.
     */
    constructor (config = {}) {
        this.config = Object.assign({
            text: 'Diese Website verwendet Cookies. Durch die Benutzung der Website erklären Sie sich mit dem Gebrauch von Cookies einverstanden. Mehr Informationen finden Sie in unserer <a href="/datenschutz">Datenschutzerklärung.</a>',
            buttonLabel: 'OK',
            hideClass: 'd-none',
            wrapperElement: 'div',
            wrapperClasses: ['cookie-notice-wrapper'],
            buttonId: 'cookies-accept-button',
            template: '<div class="alert alert-warning"><p>${text}</p><button id="${buttonId}" class="btn btn-sm btn-primary">${buttonLabel}</button></div>',
            storageKey: 'cookies-accepted',
            trueValue: 'true',
        }, config);
        this.domElement = null;
    }

    /* ACCEPT STATUS */

    /**
     * Set the flag for accepted cookies in the localStorage.
     */
    acceptCookies () {
        localStorage.setItem(this.config.storageKey, this.config.trueValue);
    }

    /**
     * Remove the flag for accepted cookies in the localStorage.
     */
    revokeAcceptCookies () {
        localStorage.removeItem(this.config.storageKey);
    }

    /**
     * Check whether the flag for accepted cookies is set in the local storage.
     */
    isAccepted () {
        return localStorage.getItem(this.config.storageKey) === this.config.trueValue;
    }

    /* HTML ELEMENT */

    /**
     * Builds the notice and returns it (as a wrapper element);
     */
    buildNotice () {
        const wrapper = document.createElement(this.config.wrapperElement);
        wrapper.classList.add(...this.config.wrapperClasses);
        const template = this.config.template.replace(/\${(\w+)}/g, (match, field) => {
            return field in this.config ? this.config[field] : match;
        });
        wrapper.innerHTML = template;
        return wrapper;
    }

    /**
     * Get the notice instance if it exists, otherwise build it and store it in
     * this instance.
     */
    getNotice () {
        return this.domElement ? this.domElement : this.domElement = this.buildNotice();
    }

    /**
     * 
     * @param {HTMLElement} mount The mount point, i.e. the HTML element the
     * notice will be appended to.
     */
    mountNotice (mount) {
        if (!mount instanceof HTMLElement) {
            throw 'Mount point needs to be an HTMLElement';
        }
        mount.appendChild(this.getNotice());
    }

    /**
     * Reveal the notice by removing the class used to hide it.
     */
    show () {
        if (!this.domElement) {
            throw 'Cookie notice not initialized yet.';
        }
        this.domElement.classList.remove(this.config.hideClass);
    }

    /**
     * Hide the notice by adding the configured hide class to the wrapper.
     */
    hide () {
        if (!this.domElement) {
            throw 'Cookie notice not initialized yet.';
        }
        this.domElement.classList.add(this.config.hideClass);
    }

    /* API FOR CLIENTS*/

    /**
     * Builds and mounts the cookie notice, unless it has been accepted already.
     * 
     * @param {HTMLElement} mount The moint point you want the notice to be
     * appended to.
     */
    mountNoticeIfNotAccepted (mount) {
        if (!this.isAccepted()) {
            this.mountNotice(mount);
        }
    }

    /**
     * Register click handlers for the button that will mark cookies as accepted
     * in the localStorage and hide the cookie notice. You can also register your
     * own event handlers for the click instead of using this.
     */
    acceptAndCloseOnButtonClick () {
        this.getNotice().querySelector(`#${this.config.buttonId}`).addEventListener('click', e => {
            this.acceptCookies();
            this.hide();
        });
    }

}

export default CookieNotice;
