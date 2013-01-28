Ext.define('thermocook.Main.View.LastRecipesList', {
    title : false,
    extend : 'Ext.grid.Panel',
    alias : 'widget.lastRectGrid',
    flex : 1,
    columns : [{
        header : 'Dernières recettes',
        dataIndex : 'name',
        flex : 1
    }],
    store : Ext.create('thermocook.Main.Store.LastRectStore'),
    trackMouseOver: false,
    disableSelection: true
})