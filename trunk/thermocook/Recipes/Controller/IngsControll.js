Ext.define('thermocook.Recipes.Controller.IngsControll', {
	extend : 'Ext.app.Controller',
	models : ['thermocook.Recipes.Model.AvailIngsModel', 'thermocook.Recipes.Model.UsedIngsModel'],
	stores : ['thermocook.Recipes.Store.AvailIngsStore', 'thermocook.Recipes.Store.UsedIngsStore'],
	views : ['thermocook.Recipes.View.AvailIngsGrid', 'thermocook.Recipes.View.UsedIngsGrid'],
	init : function() {
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
		}
		this.control({
			'availIngsGrid' : {
				render : function(c) {
					c.store.loadPage(1);
				},
				itemdblclick : function(grid, record) {
				    grid.store.remove(record);
				    gridDist = Ext.getCmp('usedIngsGrid');
                    gridDist.fireEvent("drop2",record,Ext.getCmp('nameRec').getValue());
                    gridDist.store.add(record);
                },
                drop2 : function(record, rec) {
                    mygetrequest.open("GET", "thermocook/lib/tc/manageIngredient.php?action=remove&id_ing=" + record.data.id + "&rec_name=" + rec, false)
                    mygetrequest.send(null)
                },
				drop : function(data, rec) {
					mygetrequest.open("GET", "thermocook/lib/tc/manageIngredient.php?action=remove&id_ing=" + data.records[0].data.id + "&rec_name=" + rec, false)
					mygetrequest.send(null)
				}
			},
			'usedIngsGrid' : {
				render : function(c) {
					c.store.load();
				},
                drop : function(data, rec) {
                    mygetrequest.open("GET", "thermocook/lib/tc/manageIngredient.php?action=add&id_ing=" + data.records[0].data.id + "&rec_name=" + rec, false)
                    mygetrequest.send(null)
                },
				drop2 : function(record, rec) {
					mygetrequest.open("GET", "thermocook/lib/tc/manageIngredient.php?action=add&id_ing=" + record.data.id + "&rec_name=" + rec, false)
					mygetrequest.send(null)
				},
                itemdblclick : function(grid, record) {
                    grid.store.remove(record);
                    gridDist = Ext.getCmp('availIngsGrid');
                    gridDist.fireEvent("drop2",record,Ext.getCmp('nameRec').getValue());
                    gridDist.store.add(record);
                },
				edit : function(editor, e) {
					recName = Ext.getCmp('nameRec').getValue();
					ingID = e.record.data.id;
					quantity = e.record.data.quantity;
					mygetrequest.open("GET", "thermocook/lib/tc/manageIngredient.php?action=changeQuant&id_ing=" + ingID + "&rec_name=" + recName + "&quantity=" + quantity, false);
					mygetrequest.send(null);
					e.record.commit();
				}
			}
		});
	}
});
