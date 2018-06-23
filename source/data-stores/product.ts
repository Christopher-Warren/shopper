
import {computed} from "mobx"

import {CurrencyControl} from "./currency-control"

/**
 * PRODUCT OPTIONS INTERFACE
 */
export interface ProductOptions {
	id: string
	title: string
	value: number
	currencyControl: CurrencyControl
}

/**
 * PRODUCT CLASS
 * - represent a single ecommerce product
 * - expose getters for the total value and formatted price tag
 */
export class Product {
	private readonly id: string
	private readonly currencyControl: CurrencyControl

	readonly value: number
	readonly title: string

	constructor(options: ProductOptions) {
		Object.assign(this, options)
	}

	@computed get price(): string {
		const {currencyControl, value} = this
		return currencyControl.convertAndFormat(value)
	}
}
