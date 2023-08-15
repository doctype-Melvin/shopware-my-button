import Plugin from "src/plugin-system/plugin.class";

export default class MyButton extends Plugin {
	static options = {
		buttonInitialTextContent: `In den Warenkorb`,
		buttonInitialColor: `#0b539b`,
		buttonProcessTextContent: `Wird in den Warenkorb gelegt`,
		buttonProcessColor: `#595959`,
	};

	updateButtonAppearance(button) {
		button.style.backgroundColor = this.options.buttonProcessColor;
		button.textContent = this.options.buttonProcessTextContent;
	}

	restoreButtonAppearance(button) {
		button.textContent = this.options.buttonInitialTextContent;
		button.style.backgroundColor = this.options.buttonInitialColor;
	}

	init() {
		const allBuyButtons = [...document.querySelectorAll(".btn-buy")];

		allBuyButtons.forEach((button) => {
			button.textContent = this.options.buttonInitialTextContent;

			button.addEventListener("click", () => {
				this.updateButtonAppearance(button);
				setTimeout(() => this.restoreButtonAppearance(button), 1000);
			});
		});
	}
}
