export function createCurrencyStorage({ key, dataStore }) {
    let loaded = false;
    return {
        async save(code) {
            if (!loaded)
                return null;
            const store = { code };
            await dataStore.setItem(key, JSON.stringify(store));
        },
        async load() {
            const raw = await dataStore.getItem(key);
            loaded = true;
            if (!raw)
                return;
            const { code } = JSON.parse(raw);
            return code;
        },
    };
}
//# sourceMappingURL=create-currency-storage.js.map