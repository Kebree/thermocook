Ext.define('thermocook.ViewIngredients.Store.IngredientListStore',{
    extend : 'Ext.data.Store',
    requires : ['thermocook.ViewIngredients.Model.IngredientListModel'],
    model : 'thermocook.ViewIngredients.Model.IngredientListModel',
    pageSize: 20,
    autoLoad: false,
    remoteSort : true,
});
