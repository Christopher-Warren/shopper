
import {
	CartItem,
	ShopperState,
	ShopperActions,
	ShopifyResults,
	ShopperGetters,
} from "../interfaces"

export function prepareActions({
	state,
	getters,
	checkout,
}: {
	state: ShopperState
	getters: ShopperGetters
	checkout: (items: CartItem[]) => Promise<string>
}): ShopperActions {

	function zeroAllQuantity() {
		for (const item of state.catalog) item.quantity = 0
	}

	return {
		addToCart(item: CartItem) {
			item.quantity = (item.quantity < 1)
				? 1
				: item.quantity
		},

		clearCart() {
			zeroAllQuantity()
		},

		async checkout({checkoutInSameWindow}: {checkoutInSameWindow: boolean}) {
			const url = await checkout(getters.itemsInCart)
			const checkoutLocation: Location = checkoutInSameWindow
				? window.location
				: (() => {
					const checkoutWindow = window.open("", "_blank")
					checkoutWindow.document.write(`loading checkout... if you are experiencing issues, please email <a href="mailto:suzie@nailcareer.com">suzie@nailcareer.com</a>`)
					return checkoutWindow.location
				})()
			zeroAllQuantity()
			checkoutLocation.href = url
		},

		setError(message: string) {
			state.error = message
			state.catalog = []
		},

		setShopifyResults({products}: ShopifyResults) {
			state.catalog = products.map(product => ({
				product,
				quantity: 0,
				quantityMax: 5,
				quantityMin: 1,
			}))
		}
	}
}
