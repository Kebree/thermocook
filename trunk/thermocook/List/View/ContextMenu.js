Ext.define('thermocook.List.View.ContextMenu', {
	extend : 'Ext.menu.Menu',
	alias : 'widget.listContextMenu',
	items : [{
		text : 'Supprimer',
		handler : function() {
			Ext.getCmp('list').fireEvent('remove',this.up().config);
		}
	}]
}); 