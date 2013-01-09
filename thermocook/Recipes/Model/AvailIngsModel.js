Ext.define('thermocook.Recipes.Model.AvailIngsModel',{
    extend : 'Ext.data.Model',
    idProperty : 'id',
    fields : [{
        name : 'name',
        type : 'string'
    },{
        name : 'measure',
        type : 'string'
    }]
});