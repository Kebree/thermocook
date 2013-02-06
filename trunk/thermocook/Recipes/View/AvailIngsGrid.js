var filters = {
	ftype : 'filters',
	// encode and local configuration options defined previously for easier reuse

	filters : [{
		type : 'string',
		dataIndex : 'name'
	}]
};

Ext.define('thermocook.Recipes.View.AvailIngsGrid', {
    title : 'Ingrédients disponibles',
    extend : 'Ext.grid.Panel',
    alias : 'widget.availIngsGrid',
	features : [filters],
    remoteFilter : true,
    width : 410,
    columns : [{
        header : 'Nom',
        dataIndex : 'name',
        width : 385
    },{
        header : 'Unité',
        dataIndex : 'measure',
        hidden : true
    }]
})