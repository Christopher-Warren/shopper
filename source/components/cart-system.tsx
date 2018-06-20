
import {h, Component} from "preact"
import {observer} from "mobx-preact"

import {Cart} from "../stores/cart"
import {CartButton} from "./cart-button"
import {CartManipulator} from "./cart-manipulator"

function isDescendant(child: Element, parent: Element) {
	if (child === parent) return true
	let {parentElement} = child
	while (parentElement) {
		if (parentElement === parent) return true
		parentElement = parentElement.parentElement
	}
	return false
}

@observer
export class CartSystem extends Component<{cart: Cart}, any> {
	private getElement() {
		const element = document.querySelector(".shopperman .cart-system")
		if (!element) throw new Error("unable to find shopperman cart system element")
		return element
	}

	private readonly handleOutsideActivity = ({target}: MouseEvent) => {
		if (!isDescendant(target as Element, this.getElement())) {
			this.props.cart.toggle(false)
		}
	}

	private readonly handleCartButtonClick = (event: MouseEvent) => this.props.cart.toggle()

	componentWillMount() {
		window.addEventListener("mousedown", this.handleOutsideActivity)
		// window.addEventListener("focus", this.handleOutsideActivity, true)
		// window.addEventListener("blur", this.handleOutsideActivity, true)
	}

	componentWillUnmount() {
		window.removeEventListener("mousedown", this.handleOutsideActivity)
		// window.removeEventListener("focus", this.handleOutsideActivity)
		// window.removeEventListener("blur", this.handleOutsideActivity)
	}

	render() {
		const {cart} = this.props
		return (
			<section
				className="cart-system"
				data-open={cart.open ? "true" : "false"}
				onBlur={event => {
					this.props.cart.toggle(false)
				}}
				>
				<CartButton {...{cart, onClick: this.handleCartButtonClick}}/>
				<div className="cart-panel">
					<h1>
						<span>Shopping Cart</span>
						&nbsp;
						<span>- {cart.items.length} item{cart.items.length === 1 ? "" : "s"}</span>
					</h1>
					<CartManipulator {...{cart}}/>
					<div className="cart-checkout">
						<a>Checkout</a>
					</div>
				</div>
			</section>
		)
	}
}
