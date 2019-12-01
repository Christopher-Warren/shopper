
import {ShopperState, CartItem, ShopperGetters} from "../interfaces.js"

const price = (value: number) => `\$${value.toFixed(2)} CAD`

export function prepareState() {
	const state: ShopperState = {
		error: "",
		catalog: [],
	}

	const getters: ShopperGetters = {
		get itemsInCart() {
			return state.catalog.filter(item => item.quantity > 0)
		},
		get cartValue() {
			return getters.itemsInCart.reduce(
				(subtotal: number, item: CartItem) =>
					subtotal + (item.product.value * item.quantity),
				0
			)
		},
		get cartPrice() {
			return price(getters.cartValue)
		},
		get cartQuantity() {
			return (() => {
				let sum = 0
				for (const item of getters.itemsInCart) sum += item.quantity
				return sum
			})()
		},
		getItemPrice(item: CartItem) {
			return price(item.product.value)
		}
	}

	return {state, getters}
}
