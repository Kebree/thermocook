Ext.define('thermocook.ViewIngredients.View.ContextMenu', {
	extend : 'Ext.menu.Menu',
	alias : 'widget.contextMenu',
	items : [{
		text : 'delete',
		handler : function() {
			this.up().fireEvent('deleteRow',this.up());
		}
	}]
}); 