Ext.define('thermocook.Recipes.View.ViewMainView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.viewRecipesMain',
    title : 'Consulter les recettes',
    layout : 'hbox',
    constructor : function(config) {
        this.superclass.constructor.call(this, config);
        store = Ext.create('thermocook.Recipes.Store.RecipesListStore', {
            proxy : {
                type : 'ajax',
                url : "thermocook/lib/tc/getRecipes.php",
                reader : {
                    type : 'json',
                    root : 'recipe'
                }
            }
        });
        this.add({
            xtype : 'panel',
            id : 'leftRecipe',
            margin : 10,
            items : [{
                xtype : 'recipesListGrid',
                store : store
            }]
        }, {
            xtype : 'panel',
            autoScroll : true,
            id : 'rightRecipe',
            margin : '30 0 0 50',
            width : 900,
            height : 600,
            html : 'Choisir une recette.'
        });
    }
})
