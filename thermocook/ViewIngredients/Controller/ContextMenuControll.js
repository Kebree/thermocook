Ext.define('thermocook.ViewIngredients.Controller.ContextMenuControll', {
	extend : 'Ext.app.Controller',
	models : [],
	stores : [],
	views : ['thermocook.ViewIngredient.View.ContextMenu'],
	init : function() {
		this.control({
			'contextMenu' : {
				deleteRow : function(c) {
					Ext.getCmp('ingredientList').fireEvent('deleteRow',c.config.row, c.config.grid);
				}
			}
		});
	}
});
