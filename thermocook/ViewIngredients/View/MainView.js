Ext.define('thermocook.ViewIngredient.View.MainView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.viewIngredientMain',
	title : 'Consulter les ingrédients',
	constructor : function(config) {
		this.superclass.constructor.call(this, config);
		store = Ext.create('thermocook.ViewIngredients.Store.IngredientListStore', {
			proxy : {
				type : 'ajax',
				url : "thermocook/lib/tc/getIngredients.php",
				reader : {
					type : 'json',
					root : 'ingredient',
					totalProperty : 'totalCount'
				}
			}
		});
		this.add({
			xtype : 'ingredientListGrid',
			store : store,
			dockedItems : [{
				xtype : 'pagingtoolbar',
				store : store,
				dock : 'bottom',
				displayInfo : true
			}]
		});
	}
})
