Ext.define('thermocook.AddIngredient.View.MainView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.addIngredientMain',
	title : 'Nouvel ingredient',
	items : [{
		xtype : 'form',
		margin : 10,
		url : 'thermocook/lib/tc/addIngredient.php',
		defaultType : 'textfield',
		items : [{
			fieldLabel : 'Nom',
			name : 'name',
			allowBlank : false
		},{
			fieldLabel : 'Unité',
			name : 'measure',
			allowBlank : true
		}],
		buttons : [{
			text : 'Ajouter',
			formBind : true, //only enabled once the form is valid
			disabled : true,
			handler : function() {
				var form = this.up('form').getForm();
				if (form.isValid()) {
					form.submit({
						success : function(form, action) {
							Ext.Msg.alert('Success', action.result.msg);
							setDefault();
						},
						failure : function(form, action) {
							Ext.Msg.alert('Failed', action.result.msg);
						}
					});
				}
			}
		}]
	}]
})
