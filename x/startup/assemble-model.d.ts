import { ShopperModel, ShopperAssemblyOptions } from "../interfaces.js";
export declare function assembleModel({ mock, cartStorage, shopifyDomain, shopifyStorefrontAccessToken, }: ShopperAssemblyOptions): {
    model: ShopperModel;
    loadCatalog(): Promise<void>;
};
