Ext.define('thermocook.ViewIngredients.Model.IngredientListModel',{
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