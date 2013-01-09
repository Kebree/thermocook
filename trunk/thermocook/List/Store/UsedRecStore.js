Ext.define('thermocook.List.Store.UsedRecStore',{
    extend : 'Ext.data.Store',
    requires : ['thermocook.List.Model.UsedRecModel'],
    model : 'thermocook.List.Model.UsedRecModel',
    autoLoad: false,
    remoteSort : false
});
