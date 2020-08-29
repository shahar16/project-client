import React from "react";
import { DashCircleFill } from "react-bootstrap-icons";

class Constants {
	constructor() {
		this.serverUrl = "http://localhost:3001";
		this.productPageStyle = {
			height: "600px"
		}
		this.iconStyle = {
			"marginRight": "5px"
		}
		this.deleteStyle = {
			variant:       "warning",
			icon:          <DashCircleFill style={this.iconStyle}/>,
			text:          "Delete Store",
		}
	}
}

export default new Constants();