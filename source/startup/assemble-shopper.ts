
import {makeReader} from "../toolbox/pubsub.js"
import {ShopifyAdapter} from "../ecommerce/shopify-adapter.js"
import {registerComponents} from "../toolbox/register-components.js"
import {CartItem, ShopperModel, ShopperAssembly} from "../interfaces.js"
import {prepareShopperComponents} from "../framework/prepare-shopper-components.js"
import {
	prepSlowAdapter,
	MockFailingShopifyAdapter,
	MockPassingShopifyAdapter,
} from "../ecommerce/shopify-adapter-mocks.js"
import {prepareState} from "../model/prepare-state.js"
import {objectMap} from "../toolbox/object-map.js"
import {prepareActions} from "../model/prepare-actions.js"
import {hitch} from "../toolbox/hitch.js"

export function assembleShopper({
	mock,
	components,
	shopifyDomain,
	shopifyStorefrontAccessToken,
}: ShopperAssembly) {

	//
	// setup shopify adapter
	//

	const shopifyAdapter: ShopifyAdapter = mock !== null
		? new (prepSlowAdapter({
			ms: 2 * 1000,
			Adapter: mock === "fail"
				? MockFailingShopifyAdapter
				: MockPassingShopifyAdapter,
		}))
		: new ShopifyAdapter({
			domain: shopifyDomain,
			storefrontAccessToken: shopifyStorefrontAccessToken
		})
	const checkout = async(items: CartItem[]) => shopifyAdapter.checkout(items)

	//
	// create shopper model
	//

	const {state, getters} = prepareState()
	const {reader, update} = makeReader(state)
	const model: ShopperModel = {
		reader,
		getters,
		actions: objectMap(
			prepareActions({state, checkout, getters}),
			value => hitch(value, {after: update})
		)
	}

	//
	// register the components
	//

	registerComponents(prepareShopperComponents(model, components))

	//
	// return a function to begin loading the catalog
	//

	return {
		async loadCatalog() {
			try {
				model.actions.setShopifyResults(await shopifyAdapter.fetchEverything())
			}
			catch (error) {
				const message = "shopping cart error"
				model.actions.setError(message)
				error.message = `${message}: ${error.message}`
				console.error(error)
			}
		}
	}
}
