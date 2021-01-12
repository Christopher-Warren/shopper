import shopifyBuy from "shopify-buy/index.es.js";
export class ShopifyAdapter {
    constructor({ domain, storefrontAccessToken }) {
        this._shopifyClient = shopifyBuy.buildClient({
            domain,
            storefrontAccessToken
        });
    }
    async fetchEverything() {
        try {
            const collections = await this._shopifyClient.collection.fetchAllWithProducts();
            let products = [];
            for (const collection of collections) {
                for (const shopifyProduct of collection.products) {
                    const product = products.find(product => product.id === shopifyProduct.id);
                    // if the product is already known, add the collection id
                    if (product) {
                        const existingCollectionId = product.collections.find(id => id === collection.id);
                        if (!existingCollectionId)
                            product.collections.push(collection.id);
                    }
                    // else, add the new product to the products array
                    else {
                        const product = this._shopifyProductToShopperProduct(shopifyProduct, collection.id);
                        products.push(product);
                    }
                }
            }
            return {
                products,
                collectionIds: collections.map((collection) => collection.id)
            };
        }
        catch (error) {
            error.message = "shopify error" + error.message;
            throw error;
        }
    }
    async checkout(items) {
        const checkout = await this._shopifyClient.checkout.create({
            lineItems: items.map(item => ({
                variantId: item.product.firstVariantId,
                quantity: item.quantity
            }))
        });
        return checkout.webUrl;
    }
    _shopifyProductToShopperProduct(shopifyProduct, collectionId) {
        const [firstVariant] = shopifyProduct.variants;
        return {
            id: shopifyProduct.id,
            available: shopifyProduct.availableForSale,
            value: parseFloat(firstVariant.price),
            comparedValue: firstVariant.compareAtPrice
                ? parseFloat(firstVariant.compareAtPrice)
                : null,
            title: shopifyProduct.title,
            description: shopifyProduct.descriptionHtml,
            collections: collectionId ? [collectionId] : [],
            firstVariantId: firstVariant.id,
            image: firstVariant.image
                ? {
                    alt: firstVariant.image.alt ?? "",
                    src: firstVariant.image.src,
                }
                : null,
        };
    }
}
//# sourceMappingURL=shopify-adapter.js.map