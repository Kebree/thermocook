Ext.define('thermocook.Recipes.View.AddMainView', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.addMainView',
	title : 'Nouvelle recette',
	layout : {
		type : 'vbox',
	},
	id : 'newRecipePanel',
	autoScroll : true,
	constructor : function(config) {
		this.superclass.constructor.call(this, config);
		exclude = "";
		if (recEditID != null) {
			exclude = "&exclude=" + recEditID;
		}
		store = Ext.create('thermocook.Recipes.Store.AvailIngsStore', {
			proxy : {
				type : 'ajax',
				url : "thermocook/lib/tc/getIngredients.php?nofilter=true" + exclude,
				reader : {
					type : 'json',
					root : 'ingredient',
					totalProperty : 'totalCount'
				}
			}
		});
		url = "thermocook/lib/tc/getUsedIngs.php";
		if (recEditID != null) {
			url += "?id=" + recEditID;
		}
		storeUsed = Ext.create('thermocook.Recipes.Store.UsedIngsStore', {
			proxy : {
				type : 'ajax',
				url : url,
				reader : {
					type : 'json',
					root : 'ingredient'
				}
			}
		});
		this.add([{
			xtype : 'panel',
			title : 'Nom',
			margin : 10,
			items : [{
				xtype : 'form',
				margin : 10,
				defaultType : 'textfield',
				items : [{
					fieldLabel : 'Nom',
					id : 'nameRec',
					name : 'name',
					allowBlank : false
				}]
			}]
		}, {
			xtype : 'panel',
			margin : 10,
			title : 'Ingrédients',
			layout : 'hbox',
			items : [{
				xtype : 'availIngsGrid',
				id : 'availIngsGrid',
				viewConfig : {
					plugins : {
						ptype : 'gridviewdragdrop',
						dragGroup : 'firstGridDDGroup',
						dropGroup : 'secondGridDDGroup'
					},
					listeners : {
						drop : function(node, data, dropRec, dropPosition) {
							Ext.getCmp('availIngsGrid').fireEvent('drop', data, Ext.getCmp('nameRec').getValue());
						}
					}
				},
				store : store,
				height : 575,
				dockedItems : [{
					xtype : 'pagingtoolbar',
					store : store,
					dock : 'bottom',
					displayInfo : true
				}]
			}, {
				xtype : 'usedIngsGrid',
				id : 'usedIngsGrid',
				viewConfig : {
					plugins : {
						ptype : 'gridviewdragdrop',
						dragGroup : 'secondGridDDGroup',
						dropGroup : 'firstGridDDGroup'
					},
					listeners : {
						beforedrop : function(node, data, dropRec, dropPosition) {
							if (Ext.getCmp('nameRec').getValue() == "") {
								Ext.MessageBox.alert('Erreur', 'Donner un nom à la recette avant d\'ajouter des ingrédients', function() {
									Ext.getCmp('newRecipePanel').setActiveTab(0);
								});
								return false;
							}
						},
						drop : function(node, data, dropRec, dropPosition) {
							Ext.getCmp('nameRec').setReadOnly(true);
							Ext.getCmp('usedIngsGrid').fireEvent('drop', data, Ext.getCmp('nameRec').getValue());
						}
					}
				},
				width : 600,
				height : 575,
				margin : '0 0 0 40',
				store : storeUsed
			}]
		}, {
			xtype : 'form',
			title : 'Réalisation',

			items : [{
				xtype : 'tinymcefield',
				name : 'recipeText',
				id : 'recipeText',
				labelAlign : 'top',
				height : 500,
				width : 700,
				tinymceConfig : {
					theme_advanced_buttons1 : 'bold,italic,underline,strikethrough,|,bullist,numlist,|,justifyleft,justifycenter,justifyright,justifyfull,formatselect,fontselect,fontsizeselect,|,pasteword,emotions',
					theme_advanced_buttons2 : '',
					theme_advanced_buttons3 : '',
					theme_advanced_buttons4 : '',
					skin : 'o2k7'
				}
			}],

			buttons : [{
				text : 'Sauvegarder',
				handler : function() {
					var form = this.up('form').getForm();
					if (Ext.getCmp('nameRec').getValue() == "") {
						Ext.MessageBox.alert('Erreur', 'Donner un nom à la recette avant d\'ajouter la réalisation', function() {
							Ext.getCmp('newRecipePanel').setActiveTab(0);
						});
						return false;
					}
					if (form.isValid()) {
						this.up('form').submit({
							success : function(form, action) {
								Ext.Msg.alert('Success', action.result.msg);
							},
							url : "thermocook/lib/tc/updateRecipe.php?recName=" + Ext.getCmp('nameRec').getValue()
						});
					}
				}
			}]

		}]);
		this.setActiveTab(0);
		if (recEditID != null) {
			var mygetrequest = new XMLHttpRequest();
			var recipe = "";
			mygetrequest.onreadystatechange = function() {
				if (mygetrequest.readyState == 4) {
					if (mygetrequest.status == 200 || window.location.href.indexOf("http") == -1) {
						recipe = mygetrequest.responseText;
					} else {
						alert("An error has occured making the request");
					}
				}
			}
			mygetrequest.open("GET", "thermocook/lib/tc/getRecName.php?id=" + recEditID, false);
			mygetrequest.send(null);
			Ext.getCmp('nameRec').setValue(recipe);
			Ext.getCmp('nameRec').setReadOnly(true);

			mygetrequest.open("GET", "thermocook/lib/tc/getRecipeText.php?id=" + recEditID, false);
			mygetrequest.send(null);
			Ext.getCmp('recipeText').setValue(recipe);
		}
	}
});
