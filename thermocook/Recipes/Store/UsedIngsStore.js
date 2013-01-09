Ext.define('thermocook.Recipes.Store.UsedIngsStore',{
    extend : 'Ext.data.Store',
    requires : ['thermocook.Recipes.Model.UsedIngsModel'],
    model : 'thermocook.Recipes.Model.UsedIngsModel',
    autoScroll : true,
    autoLoad: false,
    remoteSort : false,
    remoteFilter : false
});
