var filters = {
	ftype : 'filters',
	// encode and local configuration options defined previously for easier reuse
	local : true,
	filters : [{
		type : 'string',
		dataIndex : 'name'
	}]
};

Ext.define('thermocook.Recipes.View.RecipesListGrid', {
    title : 'Recettes',
    extend : 'Ext.grid.Panel',
    id : 'recipesList',
    alias : 'widget.recipesListGrid',
	features : [filters],
    remoteFilter : true,
    columns : [{
        header : 'Nom',
        dataIndex : 'name',
        width : 300
    }]
})