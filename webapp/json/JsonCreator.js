sap.ui.define([], function() {
	"use strict";

	var JsonCreator = function () {
		this._aReducers = [];
		this._mJsons = {};
	};

	JsonCreator.prototype.addReducer = function (oReducer) {
		var iIndex = oReducer.requires ? this._aReducers.findIndex(function (oItem) {
			return oReducer.requires.includes(oItem.id);
		}) : 0;
		this._aReducers.splice(iIndex, 0, oReducer);
	};

	return JsonCreator;
});
