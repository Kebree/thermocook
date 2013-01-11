Ext.define('thermocook.Main.View.LastRecipesList', {
    title : 'Dernières recettes',
    extend : 'Ext.grid.Panel',
    alias : 'widget.lastRectGrid',
    flex : 1,
    columns : [{
        dataIndex : 'name',
        flex : 1
    }],
    store : Ext.create('thermocook.Main.Store.LastRectStore')
})