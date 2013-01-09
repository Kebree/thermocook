Ext.define('thermocook.List.Store.ConstructedListStore',{
    extend : 'Ext.data.Store',
    requires : ['thermocook.List.Model.ConstructedListModel'],
    model : 'thermocook.List.Model.ConstructedListModel',
    autoLoad: false,
    remoteSort : false
});
