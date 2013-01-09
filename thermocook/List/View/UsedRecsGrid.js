var filters = {
	ftype : 'filters',
	// encode and local configuration options defined previously for easier reuse

	filters : [{
		type : 'string',
		dataIndex : 'name'
	}]
};

Ext.define('thermocook.List.View.UsedRecsGrid', {
    title : 'Recettes sélectionnées',
    extend : 'Ext.grid.Panel',
    alias : 'widget.usedRecsGrid',
	features : [filters],
    remoteFilter : false,
    autoScroll : true,
    height : 600,
    width : 300,
    columns : [{
        header : 'Nom',
        dataIndex : 'name',
        width : 275
    }]
})