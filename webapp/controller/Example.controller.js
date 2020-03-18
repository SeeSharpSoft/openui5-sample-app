sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	var oExtensionAPI = Controller.extend("sap.ui.demo.todo.fragment.Example", {
		onPressOk: function() {
			alert("it works");
		}
	});

	return new oExtensionAPI();
});
