Ext.define('thermocook.ViewIngredients.Controll.IngredientListControll', {
    extend : 'Ext.app.Controller',
    models : ['thermocook.ViewIngredients.Model.IngredientListModel'],
    stores : ['thermocook.ViewIngredients.Store.IngredientListStore'],
    views : ['thermocook.ViewIngredient.View.IngredientListGrid'],
    init : function() {
        this.control({
            'ingredientListGrid' : {
                render : function(c) {
                    c.store.loadPage(1);
                },
                itemcontextmenu  : function(view, list, node, rowIndex, e) {
        			e.preventDefault();
        			contextMenu = Ext.create('thermocook.ViewIngredients.View.ContextMenu', {config : {row : list, grid : view}});
        			contextMenu.showAt(e.getX(), e.getY());
                },
                deleteRow : function(row, view) {
                	//console.log(row);
                	url = view.store.proxy.url;
                	view.store.proxy.url = "thermocook/lib/tc/delIngredients.php?id="+row.data.id;
                	view.store.remove(row);
                	view.store.sync();
                	view.store.proxy.url = url;
                }
            }
        });
    }
});
