Ext.define('thermocook.Recipes.View.addToFavButton', {
    extend : 'Ext.button.Button',
    text : 'Mettre en favoris',
    id : 'favButton'
});

Ext.define('thermocook.Recipes.View.rmFromFavButton', {
    extend : 'Ext.button.Button',
    text : 'Enlever des favoris',
    id : 'favButton'
});

Ext.define('thermocook.Recipes.Controller.RecipesListControll', {
	extend : 'Ext.app.Controller',
	models : ['thermocook.Recipes.Model.RecipesListModel'],
	stores : ['thermocook.Recipes.Store.RecipesListStore'],
	views : ['thermocook.Recipes.View.RecipesListGrid'],
	init : function() {
		var mygetrequest = new XMLHttpRequest();
		var ret = "";
		mygetrequest.onreadystatechange = function() {
			if (mygetrequest.readyState == 4) {
				if (mygetrequest.status == 200 || window.location.href.indexOf("http") == -1) {
					ret = mygetrequest.responseText
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
                    mygetrequest.open("GET", "thermocook/lib/tc/Service.php?function=isFav&id=" + record.data.id, false)
                    mygetrequest.send(null);
                                    
                    panel = Ext.getCmp('recipeButton');
                    panel.update("");
                    panel.removeAll("");
                    button = Ext.create('thermocook.Recipes.View.addToFavButton');
                    button.on({click : Ext.bind(favorite, this, [record.data.id])});
                    if(ret == "true"){
                        button = Ext.create('thermocook.Recipes.View.rmFromFavButton');
                        button.on({click : Ext.bind(unfavorite, this, [record.data.id])});
                    }
                    panel.add(button);
                    
                    mygetrequest.open("GET", "thermocook/lib/tc/getRecipe.php?id=" + record.data.id + "&name=" + record.data.name, false)
                    mygetrequest.send(null);
					panel = Ext.getCmp('recipeText');
					panel.update("<h1>" + ret + "</h1>");
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