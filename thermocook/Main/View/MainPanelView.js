mainPanel = Ext.create('Ext.panel.Panel', {
    title : 'Bienvenue ' + username,
    margin : 5,
    layout : 'hbox',
    items : [{
        xtype : 'panel',
        title : false,
        html : '<h1>Dernières recettes</h1>',
        width : 300,
        margin : 10,
        items : [{
            xtype : 'lastRectGrid'
        }]
    }, {
        xtype : 'panel',
        title : 'droite',
        html : 'droite html',
        flex : 1,
        margin : 10
    }]
})
