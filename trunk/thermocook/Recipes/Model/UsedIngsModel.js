Ext.define('thermocook.Recipes.Model.UsedIngsModel',{
    extend : 'Ext.data.Model',
    idProperty : 'id',
    fields : [{
        name : 'name',
        type : 'string'
    },{
        name : 'quantity',
        type : 'string'
    },{
        name : 'measure',
        type : 'string'
    }]
});