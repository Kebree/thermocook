var filters = {
	ftype : 'filters',
	// encode and local configuration options defined previously for easier reuse

	filters : [{
		type : 'string',
		dataIndex : 'name'
	}]
};

Ext.define('thermocook.ViewIngredient.View.IngredientListGrid', {
    title : 'Ingredients',
	extend : 'Ext.grid.Panel',
	id : 'ingredientList',
	alias : 'widget.ingredientListGrid',
    remoteFilter : true,
	features : [filters],
    columns : [{
        header : 'Nom',
        dataIndex : 'name',
        width : 350
    },{
        header : 'Unité',
        dataIndex : 'measure',
        width : 350
    }]
})