import {Element as PolymerElement} from '@polymer/polymer/polymer-element'

export default class extends PolymerElement {

	static get template() {
		return `<div>My name is [[name]].</div>`
	}

	constructor() {
		super()
		this.name = 'aggre'
	}

	static get properties() {
		return {
			name: {
				type: String
			}
		}
	}

}
