Ext.define('thermocook.List.Model.ConstructedListModel',{
    extend : 'Ext.data.Model',
    idProperty : 'id',
    fields : [{
        name : 'name',
        type : 'string'
    },{
        name : 'quantity',
        type : 'string'
    }]
});