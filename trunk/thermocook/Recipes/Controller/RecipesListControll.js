Ext.define('thermocook.Recipes.Controller.RecipesListControll', {
	extend : 'Ext.app.Controller',
	models : ['thermocook.Recipes.Model.RecipesListModel'],
	stores : ['thermocook.Recipes.Store.RecipesListStore'],
	views : ['thermocook.Recipes.View.RecipesListGrid'],
	init : function() {
		var mygetrequest = new XMLHttpRequest();
		var recipe = "";
		mygetrequest.onreadystatechange = function() {
			if (mygetrequest.readyState == 4) {
				if (mygetrequest.status == 200 || window.location.href.indexOf("http") == -1) {
					recipe = mygetrequest.responseText
				} else {
					alert("An error has occured making the request")
				}
			}
		};
		this.control({
			'recipesListGrid' : {
				render : function(c) {
					c.store.loadPage(1);
				},
				itemclick : function(grid, record) {
					mygetrequest.open("GET", "thermocook/lib/tc/getRecipe.php?id=" + record.data.id + "&name=" + record.data.name, false)
					mygetrequest.send(null)
					panel = Ext.getCmp('rightRecipe');
					panel.update("<h1>" + recipe + "</h1>");
				},
				itemcontextmenu : function(view, list, node, rowIndex, e) {
					e.preventDefault();
					contextMenu = Ext.create('thermocook.Recipes.View.ContextMenu', {
						config : {
							row : list,
							grid : view
						}
					});
					contextMenu.showAt(e.getX(), e.getY());
				},
				edit : function(c) {
					addRecipeHandler(c.row.data.id);
				},
				deleteRow : function(c) {
					view = Ext.getCmp('recipesList');
                	url = view.store.proxy.url;
                	view.store.proxy.url = "thermocook/lib/tc/delRecipe.php?id=" + c.row.data.id;
                	view.store.remove(c.row);
                	view.store.sync();
                	view.store.proxy.url = url;
                	Ext.getCmp('rightRecipe').update('Choisir une recette.');
				}
			}
		});
	}
});
