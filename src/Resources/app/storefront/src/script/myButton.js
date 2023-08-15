import AddToCartPlugin from "src/plugin/add-to-cart/add-to-cart.plugin";
import HttpClient from "src/service/http-client.service";
import DomAccess from "src/helper/dom-access.helper";

export default class MyButton extends AddToCartPlugin {
	static options = {
		buttonInitialTextContent: `In den Warenkorb`,
		buttonInitialColor: `#0b539b`,
		buttonProcessTextContent: `Wird in den Warenkorb gelegt`,
		buttonProcessColor: `#595959`,
	};

	init() {
		this._client = new HttpClient(window.accessKey, window.contextToken);
		this.PluginManager = window.PluginManager;
		this._cartEl = DomAccess.querySelector(document, ".header-cart");

		const allBuyButtons = [...document.querySelectorAll(".btn-buy")];
		allBuyButtons.forEach((button) => {
			button.textContent = this.options.buttonInitialTextContent;
			button.addEventListener("click", () => {
				this.updateButtonAppearance(button);
				setTimeout(() => {
					this.restoreButtonAppearance(button);
				}, 1000);
			});
		});

		super.init();
	}

	updateButtonAppearance(button) {
		button.textContent = this.options.buttonProcessTextContent;
		button.style.backgroundColor = this.options.buttonProcessColor;
	}

	restoreButtonAppearance(button) {
		button.textContent = this.options.buttonInitialTextContent;
		button.style.backgroundColor = this.options.buttonInitialColor;
	}

	_openOffCanvasCart(instance, requestUrl, formData) {
		this._client.post(
			requestUrl,
			formData,
			this._afterAddItemToCart.bind(this)
		);
	}

	_afterAddItemToCart() {
		this._refreshCartValue();
	}

	_refreshCartValue() {
		const cartWidgetEl = DomAccess.querySelector(
			this._cartEl,
			"[data-cart-widget]"
		);
		const cartWidgetInstance = this.PluginManager.getPluginInstanceFromElement(
			cartWidgetEl,
			"CartWidget"
		);
		cartWidgetInstance.fetch();
	}
}
