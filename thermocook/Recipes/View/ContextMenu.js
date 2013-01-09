Ext.define('thermocook.Recipes.View.ContextMenu', {
	extend : 'Ext.menu.Menu',
	alias : 'widget.recContextMenu',
	items : [{
		text : 'Edit',
		handler : function() {
			Ext.getCmp('recipesList').fireEvent('edit',this.up().config);
		}
	},{
		text : 'Delete',
		handler : function() {
			ctxtMenu = this.up();
			Ext.MessageBox.confirm('Attention', 'Etes vous sûr de supprimer cette recette ?', function(btn) {
				if(btn == "yes")
					Ext.getCmp('recipesList').fireEvent('deleteRow',ctxtMenu.config);
			});
			
		}
	}]
}); 