var filters = {
	ftype : 'filters',
	// encode and local configuration options defined previously for easier reuse
	local : true,
	filters : [{
		type : 'string',
		dataIndex : 'name'
	}]
};

Ext.define('thermocook.List.View.RecListGrid', {
    title : 'Recettes disponibles',
    extend : 'Ext.grid.Panel',
    alias : 'widget.recListGrid',
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