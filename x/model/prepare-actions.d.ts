import { CartItem, ShopperState, ShopperActions, ShopperGetters } from "../interfaces";
export declare function prepareActions({ state, update, getters, checkout, }: {
    update: () => void;
    state: ShopperState;
    getters: ShopperGetters;
    checkout: (items: CartItem[]) => Promise<string>;
}): ShopperActions;
