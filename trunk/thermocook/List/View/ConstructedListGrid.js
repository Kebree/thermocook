var filters = {
	ftype : 'filters',
	// encode and local configuration options defined previously for easier reuse

	local : true,
	filters : [{
		type : 'string',
		dataIndex : 'name'
	}]
};

Ext.define('thermocook.List.View.ConstructedListGrid', {
	title : 'Liste',
	extend : 'Ext.grid.Panel',
	alias : 'widget.constructedListGrid',
	features : [filters],
	remoteFilter : false,
	autoScroll : true,
	tools : [{
		type : 'print',
		handler : function() {
			var mygetrequest = new XMLHttpRequest();
			var ret = "";
			mygetrequest.onreadystatechange = function() {
				if (mygetrequest.readyState == 4) {
					if (mygetrequest.status == 200 || window.location.href.indexOf("http") == -1) {
						ret = mygetrequest.responseText
					} else {
						alert("An error has occured making the request")
					}
				}
			};
			mygetrequest.open("GET", "thermocook/lib/tc/manageList.php?operation=print&format=html", false);
			mygetrequest.send();
			Ext.create('Ext.window.Window', {
				title : 'Liste',
				height : 600,
				width : 1200,
				constrain : true,
				autoScroll : true,
				modal : true,
				maximizable : true,
				maximized : true,
				items : [{
					xtype : 'panel',
					height : 490,
					width : 1160,
					margin : '15px',
					html : ret
				}]
			}).show();
		}
	}],
	width : 425,
	height : 600,
	columns : [{
		header : 'Nom',
		dataIndex : 'name',
		width : 200
	}, {
		header : 'Quantité',
		dataIndex : 'quantity',
		width : 200
	}]
});