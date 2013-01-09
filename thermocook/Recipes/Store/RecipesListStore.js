Ext.define('thermocook.Recipes.Store.RecipesListStore',{
    extend : 'Ext.data.Store',
    requires : ['thermocook.Recipes.Model.RecipesListModel'],
    model : 'thermocook.Recipes.Model.RecipesListModel',
    pageSize: 25,
    autoLoad: false,
    remoteSort : false,
    remoteFilter : false
});
