Ext.define('thermocook.List.Store.ListMainStore',{
    extend : 'Ext.data.Store',
    requires : ['thermocook.List.Model.ListMainModel'],
    model : 'thermocook.List.Model.ListMainModel',
    autoLoad: false,
    remoteSort : false
});
