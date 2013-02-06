Ext.define('thermocook.Recipes.Store.AvailIngsStore',{
    extend : 'Ext.data.Store',
    requires : ['thermocook.Recipes.Model.AvailIngsModel'],
    model : 'thermocook.Recipes.Model.AvailIngsModel',
    pageSize: 19,
    autoLoad: false,
    remoteSort : true
});
