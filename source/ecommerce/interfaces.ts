
import {Product} from "../stores/product"
import {ShopifySettings} from "../shopify"
import {CurrencyControlOptions} from "../stores"
import {CartText} from "../components/cart/interfaces"

/**
 * Ecommerce shopify store options
 * - display multiple collections on a single page
 */
export interface EcommerceShopifyStoreOptions {

	/** Currency conversion control options */
	currency: CurrencyControlOptions

	/** Shopify store authentication settings */
	shopify: ShopifySettings

	/** Dom element in which to render the cart area */
	cartArea: HTMLElement

	/** Collections to load and display */
	collections: {

		/** Collection identifier */
		collectionId: string

		/** Dom element in which to render this collection's product displays */
		productsArea?: HTMLElement
	}[]

	/** Detailed options for the shopperman cart system */
	cartSystem: {

		/** Whether or not to open the checkout url in a new window */
		checkoutInNewWindow: boolean

		/** Text labels throughout the cart system display */
		cartText?: CartText
	}

	/** Function which decides the quantity allowances for each product */
	quantifier: (product: Product) => {
		quantityMin: number
		quantityMax: number
	}
}

