Ext.define('thermocook.List.View.ListMainView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.listMainView',
	title : 'Créer une liste',
	margin : 5,
	layout : {
		type : 'hbox',
	},
	id : 'newRecipePanel',
	autoScroll : true,
	constructor : function(config) {
		this.superclass.constructor.call(this, config);
		store = Ext.create('thermocook.List.Store.ListMainStore', {
			proxy : {
				type : 'ajax',
				url : "thermocook/lib/tc/getRecipes.php",
				reader : {
					type : 'json',
					root : 'recipe'
				}
			}
		});
		storeUsed = Ext.create('thermocook.List.Store.UsedRecStore', {
			proxy : {
				type : 'ajax',
				url : "thermocook/lib/tc/manageRecList.php",
				reader : {
					type : 'json',
					root : 'recipe'
				}
			}
		});

		this.add([{
			xtype : 'recListGrid',
			id : 'recListGrid',
			viewConfig : {
				plugins : {
					ptype : 'gridviewdragdrop',
					dragGroup : 'firstGridDDGroup',
					dropGroup : 'secondGridDDGroup'
				},
				listeners : {
					drop : function(node, data, dropRec, dropPosition) {
						Ext.getCmp('recListGrid').fireEvent('drop', data);
					}
				}
			},
			store : store
		}, {
			xtype : 'usedRecsGrid',
			id : 'usedRecsGrid',
			viewConfig : {
				plugins : {
					ptype : 'gridviewdragdrop',
					dragGroup : 'secondGridDDGroup',
					dropGroup : 'firstGridDDGroup'
				},
				listeners : {
					drop : function(node, data, dropRec, dropPosition) {
						Ext.getCmp('usedRecsGrid').fireEvent('drop', data);
					}
				}
			},
			margin : '0 0 0 40',
			store : storeUsed
		},{
			xtype : 'constructedListGrid',
			margin : '0 0 0 40',
			id : 'list',
			store : Ext.create('thermocook.List.Store.ConstructedListStore', {
				proxy : {
					type : 'ajax',
					url : "thermocook/lib/tc/manageList.php",
					reader : {
						type : 'json',
						root : 'list'
					}
				}
			})
		}]);
	}
});
