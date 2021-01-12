export const parseConfig = (element) => ({
    mock: element.getAttribute("mock"),
    shopifyDomain: element.getAttribute("shopify-domain"),
    shopifyStorefrontAccessToken: element.getAttribute("shopify-storefront-access-token"),
    ratesUrl: element.getAttribute("rates-url") || undefined,
    baseCurrency: element.getAttribute("base-currency") || undefined,
    currencies: element.getAttribute("currencies") || undefined,
});
//# sourceMappingURL=parse-config.js.map