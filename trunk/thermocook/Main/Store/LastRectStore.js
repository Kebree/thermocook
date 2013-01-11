Ext.define('thermocook.Main.Store.LastRectStore',{
    extend : 'Ext.data.Store',
    requires : ['thermocook.Main.Model.LastRectModel'],
    model : 'thermocook.Main.Model.LastRectModel',
    pageSize: 25,
    autoLoad: false,
    remoteSort : true,
    proxy : {
        type : 'ajax',
        url : 'thermocook/lib/tc/getLastRect.php',
        reader : {
            type : 'json',
            root : 'objects'
        }
    }
});
