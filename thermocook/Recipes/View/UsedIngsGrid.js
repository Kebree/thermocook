Ext.define('thermocook.Recipes.View.UsedIngsGrid', {
    title : 'Ingrédients utilisés',
    extend : 'Ext.grid.Panel',
    alias : 'widget.usedIngsGrid',
    remoteFilter : false,
    columns : [{
        header : 'Nom',
        dataIndex : 'name',
        width : 300
    },{
        header : 'Quantité',
        dataIndex : 'quantity',
        width : 200,
        field: {
            allowBlank: false
        }
    },{
        header : 'Unité',
        dataIndex : 'measure',
        readOnly : true,
        width : 100
    }],
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2
        })
    ]
})