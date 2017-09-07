import {Element as PolymerElement} from '@polymer/polymer/polymer-element'
import MyName from './my-name'

export default class extends PolymerElement {

	static get template() {
		return `<my-name></my-name>`
	}

	static get properties() {
		return {
			isGameCompleted: {
				type: Boolean
			}
		}
	}

}

customElements.define('my-name', MyName)
