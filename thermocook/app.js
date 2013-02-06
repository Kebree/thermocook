Ext.Loader.setConfig({
	enabled : true,
    'paths': {
        'Ext.ux': 'thermocook/lib/extjs/examples/ux',
        'Ext.ux.form.field': 'thermocook/lib/extjs/examples/ux/form/field'
    }
});

Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.ux.grid.FiltersFeature', 'Ext.ux.form.field.TinyMCE', 'Ext.toolbar.Paging', 'Ext.dd.*']);

function accueilButtonClckd() {
    window.location.reload();
}

function addRecipeHandler(recID) {
	recEditID = recID;
	center = Ext.getCmp('centerPanel');
	center.removeAll(true);
	center.update('');
	center.add({
		xtype : 'addMainView',
		margin : 5
	});
	center.doLayout();

}

function viewRecipeHandler() {
	center = Ext.getCmp('centerPanel');
	center.removeAll(true);
	center.update('');
	center.add({
		xtype : 'viewRecipesMain',
		margin : 5
	});
	center.doLayout();

}

function addIngredientHandler(item) {
	center = Ext.getCmp('centerPanel');
	center.removeAll(true);
	center.update('');
	center.add({
		xtype : 'addIngredientMain',
		margin : 5
	});
	center.doLayout();
}

function viewIngredientHandler(item) {
	center = Ext.getCmp('centerPanel');
	center.removeAll(true);
	center.update('');
	center.add({
		xtype : 'viewIngredientMain',
		margin : 5
	});
	center.doLayout();
}

function newListHandler() {
	center = Ext.getCmp('centerPanel');
	center.removeAll(true);
	center.update('');
	center.add({
		xtype : 'listMainView',
		margin : 5
	});
	center.doLayout();
}

function utf8_decode(str_data) {
	var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;

	str_data += '';

	while (i < str_data.length) {
		c1 = str_data.charCodeAt(i);
		if (c1 < 128) {
			tmp_arr[ac++] = String.fromCharCode(c1);
			i++;
		} else if (c1 > 191 && c1 < 224) {
			c2 = str_data.charCodeAt(i + 1);
			tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = str_data.charCodeAt(i + 1);
			c3 = str_data.charCodeAt(i + 2);
			tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}

	return tmp_arr.join('');
}



function unfavorite(id, isMain) {
    isMain = typeof isMain !== 'undefined' ? isMain : false;
    var mygetrequest = new XMLHttpRequest();
    var ret = "";
    mygetrequest.onreadystatechange = function() {
        if (mygetrequest.readyState == 4) {
            if (mygetrequest.status == 200 || window.location.href.indexOf("http") == -1) {
                ret = mygetrequest.responseText
            } else {
                alert("Une erreur est apparue lors du chargement de la requête - Suppression d'une recette des favoris")
            }
        }
    };
    mygetrequest.open("GET", "thermocook/lib/tc/Service.php?function=rmFav&id=" + id, false)
    mygetrequest.send(null);
    
    if(isMain) {
        favRequest.open("GET", "/thermocook/lib/tc/getFavs.php", false);
        favRequest.send();
        Ext.getCmp('favList').removeAll();
        Ext.getCmp('favList').add(Ext.JSON.decode(favList));
    } else {
        button = Ext.getCmp('favButton');
        parent = button.up();
        parent.removeAll();
        button = Ext.create('thermocook.Recipes.View.addToFavButton');
        button.on({click : Ext.bind(favorite, this, [id])});
        parent.add(button);     
    }
};

function favorite(id) {
    var mygetrequest = new XMLHttpRequest();
    var ret = "";
    mygetrequest.onreadystatechange = function() {
        if (mygetrequest.readyState == 4) {
            if (mygetrequest.status == 200 || window.location.href.indexOf("http") == -1) {
                ret = mygetrequest.responseText
            } else {
                alert("Une erreur est apparue lors du chargement de la requête - Ajout d'une recette dans les favoris")
            }
        }
    };
    mygetrequest.open("GET", "thermocook/lib/tc/Service.php?function=addFav&id=" + id, false)
    mygetrequest.send(null);
    
    button = Ext.getCmp('favButton');
    parent = button.up();
    parent.removeAll();
    button = Ext.create('thermocook.Recipes.View.rmFromFavButton');
    button.on({click : Ext.bind(unfavorite, this, [id])});
    parent.add(button);
};

recEditID = null;

Ext.application({
	name : 'thermocook',
	controllers : ['thermocook.List.Controller.ListControll', 
	   'thermocook.ViewIngredients.Controll.IngredientListControll', 
	   'thermocook.ViewIngredients.Controller.ContextMenuControll', 
	   'thermocook.Recipes.Controller.RecipesListControll', 
	   'thermocook.Recipes.Controller.IngsControll',
       'thermocook.Main.Controller.LastRectControll'],
	launch : function() {
		Ext.EventManager.addListener(Ext.getBody(), 'keydown', function(e) {
			if (e.getTarget().type != 'text' && e.getKey() == '8') {
				e.preventDefault();
			}
		});

		Ext.create('Ext.container.Viewport', {
			layout : 'fit',

			items : [{
				xtype : 'panel',
				layout : 'border',
				items : [{
					xtype : 'toolbar',
					region : 'north',
					items : [ {
					    text : 'Accueil',
					    handler : accueilButtonClckd
					},{
						text : 'Recettes',
						menu : {
							xtype : 'menu',
							items : [{
								text : 'Voir recettes',
								handler : viewRecipeHandler
							}, {
								text : 'Nouvelle recette',
								handler : function() {
									addRecipeHandler(null);
								}
							}]
						}
					}, {
						text : 'Ingrédients',
						menu : {
							xtype : 'menu',
							items : [{
								text : 'Voir ingrédients',
								handler : viewIngredientHandler
							}, {
								text : 'Nouvel ingrédient',
								handler : addIngredientHandler
							}]
						}
					}, {
						text : 'Liste',
						menu : {
							xtype : 'menu',
							items : [{
								text : 'Voir actuelle'
							}, {
								text : 'Nouvelle liste',
								handler : newListHandler
							}]
						}
					},{
                        text : 'Compte',
                        menu : {
                            xtype : 'menu',
                            items : [{
                                text : 'Mon compte'/*,
                                handler : viewRecipeHandler*/
                            }, {
                                text : 'Déconnexion',
                                href : 'logout.php'
                            }]
                        }
                    }]
				}, {
					xtype : 'panel',
                    autoScroll : true,
					region : 'center',
					id : 'centerPanel',
					items : [{ xtype : 'mainPanel' }]
				}]
			}]
		});
	}
});

