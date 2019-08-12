
import {OmniStorage} from "omnistorage"

import {ProductStore} from "../stores/product-store"
import {CartText} from "../components/cart/cart-interfaces"
import {ShopifySettings} from "../shopify/shopify-interfaces"
import {ElementAttributes, CurrencyControlOptions} from "../stores/stores-interfaces-store"
import { CartPanelText } from "source/components/cart/panel/panel-interfaces";

/**
 * Product details that are not related to shopify
 */
export interface ProductEvaluation {
	quantityMin: number
	quantityMax: number
	precision?: number
	attributes?: ElementAttributes
}

/** Function to evaluate non-shopify product details */
export type ProductEvaluator = (product: ProductStore) => ProductEvaluation

/**
 * Collection to load and display
 */
export interface CollectionToLoad {

	/** Collection identifier */
	collectionId: string

	/** Dom element in which to render this collection's product displays */
	productsArea?: HTMLElement
}

/**
 * Ecommerce shopify store options
 * - display multiple collections on a single page
 */
export interface EcommerceShopifyStoreOptions {

	/** Storage facility for cart items */
	omniStorage: OmniStorage

	/** Currency conversion control options */
	currency: CurrencyControlOptions

	/** Shopify store authentication settings */
	shopify: ShopifySettings

	/** Dom element in which to render the cart area */
	cartArea: HTMLElement

	/** Collections to load and display */
	collectionsToLoad: CollectionToLoad[]

	/** Detailed options for the shopper cart system */
	cartSystemOptions: {

		/** Whether or not to open the checkout url in a new window */
		checkoutInNewWindow: boolean

		/** Text labels throughout the cart system display */
		cartText?: CartText
	}

	/** Function to evaluate non-shopify properties for each product */
	evaluator: ProductEvaluator
}

/**
 * Renderable collection details
 */
export interface Collection {
	collectionId: string
	products: ProductStore[]
	productsArea?: HTMLElement
}