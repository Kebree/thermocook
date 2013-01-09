Ext.define('thermocook.List.Controller.ListControll', {
	extend : 'Ext.app.Controller',
	models : ['thermocook.List.Model.ListMainModel', 'thermocook.List.Model.UsedRecModel', 'thermocook.List.Model.ConstructedListModel'],
	stores : ['thermocook.List.Store.ListMainStore', 'thermocook.List.Store.UsedRecStore', 'thermocook.List.Store.ConstructedListStore'],
	views : ['thermocook.List.View.RecListGrid', 'thermocook.List.View.UsedRecsGrid', 'thermocook.List.View.ConstructedListGrid'],
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
			'recListGrid' : {
				render : function(c) {
					c.store.load();
				},
				drop : function(data, rec) {
					item = data.records[0];
					Ext.getCmp('list').store.load({
						params : {
							operation : 'remove',
							id : item.data.id
						}
					});
					/*mygetrequest.open("POST", "thermocook/lib/tc/manageList.php", false);
					 mygetrequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					 mygetrequest.send("recipes="+items);
					 Ext.getCmp('list').update(ret);*/
				}
			},
			'usedRecsGrid' : {
				render : function(c) {
					//c.store.load();
				},
				drop : function(data, rec) {
					item = data.records[0];
					Ext.getCmp('list').store.load({
						params : {
							operation : 'add',
							id : item.data.id
						}
					});
				},
				edit : function(editor, e) {
					/*recName = Ext.getCmp('nameRec').getValue();
					 ingID = e.record.data.id;
					 quantity = e.record.data.quantity;
					 mygetrequest.open("GET", "thermocook/lib/tc/manageIngredient.php?action=changeQuant&id_ing=" + ingID + "&rec_name=" + recName + "&quantity=" + quantity, false);
					 mygetrequest.send(null);
					 e.record.commit();*/
				}
			},
			'constructedListGrid' : {
				render : function(c) {
					c.store.load();
					mygetrequest.open("GET", "thermocook/lib/tc/manageList.php?operation=clean", false);
					mygetrequest.send();
				},
				remove : function(c) {
					view = c.grid;
					row = c.row;
                	url = view.store.proxy.url;
                	view.store.proxy.url = "thermocook/lib/tc/manageList.php?operation=removeIng&id="+row.data.id;
                	view.store.remove(row);
                	view.store.sync();
                	view.store.proxy.url = url;
				},
                itemcontextmenu  : function(view, list, node, rowIndex, e) {
        			e.preventDefault();
        			contextMenu = Ext.create('thermocook.List.View.ContextMenu', {config : {row : list, grid : view}});
        			contextMenu.showAt(e.getX(), e.getY());
                }
			}
		});
	}
});
