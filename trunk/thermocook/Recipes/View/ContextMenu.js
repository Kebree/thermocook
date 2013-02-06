Ext.define('thermocook.Recipes.View.ContextMenu', {
	extend : 'Ext.menu.Menu',
	alias : 'widget.recContextMenu',
	items : [{
		text : 'Éditer',
		handler : function() {
			Ext.getCmp('recipesList').fireEvent('edit',this.up().config);
		}
	},{
		text : 'Supprimer',
		handler : function() {
			ctxtMenu = this.up();
			Ext.MessageBox.confirm('Attention', 'Etes vous sûr de supprimer cette recette ?', function(btn) {
				if(btn == "yes")
					Ext.getCmp('recipesList').fireEvent('deleteRow',ctxtMenu.config);
			});
			
		}
	}]
}); 