sap.ui.define(["sap/ui/base/Object"], function (Reducer) {
	"use strict";

	function isPrimitiveType(vValue) {
		// strings, numbers, boolean values true/false , null
		return vValue === null ||
			vValue === undefined ||
			(vValue).constructor === String || (vValue).constructor === Number || (vValue).constructor === Boolean;
	}

	var Transformer = Reducer.extend("sap.fe.json.Transformer", {

		doVisit: function (vSource, aVisitors) {
			var aVisited = [],
				aToVisit = [{
					data: vSource,
					parent: null,
					path: null
				}],
				mCurrent,
				mVisitorResult,
				fnReducer = function (mInfo, oCurrentVisitor) {
					var mResult = oCurrentVisitor.visit(mInfo.data, mInfo.parent, mInfo.path),
						sPath = mResult.path || mInfo.path,
						oParent = mResult.parent || mInfo.parent,
						oData = mResult.data,
						oRoot = mResult.root || mInfo.root;

					if (mInfo.parent && mInfo.sPath) {
						mInfo.parent[mInfo.sPath] = oRoot || oData;
					}

					return {
						data: oData,
						parent: oParent,
						path: sPath,
						done: mInfo.done || mResult.done
					};
				};

			while ((mCurrent = aToVisit.pop())) {
				if (aVisited.includes(mCurrent.data)) {
					continue;
				}
				aVisited.push(mCurrent.data);

				mVisitorResult = aVisitors.reduce(fnReducer, mCurrent);

				if (mVisitorResult.done) {
					continue;
				}

				for (var sKey in mCurrent.data) {
					if (mCurrent.data.hasOwnProperty(sKey)) {
						aToVisit.push({
							data: mCurrent[sKey],
							parent: mVisitorResult.data,
							path: sKey
						});
					}
				}
			}
		},

		reduce: function (mJson, mContext) {

		}

	});

	return Transformer;
});

