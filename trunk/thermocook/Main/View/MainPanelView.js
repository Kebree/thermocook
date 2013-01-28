var favList;
var favRequest = new XMLHttpRequest();
favRequest.onreadystatechange = function() {
    if (favRequest.status == 200 && favRequest.readyState == 4) {
        favList = favRequest.responseText;
    } else {
        alert("An error has occured making the request");
    }
};
//load JSON data
favRequest.open("GET", "/thermocook/lib/tc/getFavs.php", false);
favRequest.send();

Ext.define('thermocook.Main.View.Main', {
    extend : 'Ext.panel.Panel', 
    alias : 'widget.mainPanel',
    id : 'mainPanel',
    title : 'Bienvenue ' + username,
    margin : 5,
    layout : 'hbox',
    width : 1100,
    items : [{
        xtype : 'panel',
        title : false,
        width : 300,
        margin : 20,
        items : [{
            xtype : 'lastRectGrid'
        }]
    }, {
        xtype : 'panel',
        title : 'Recettes favorites',
        id : 'favList',
        layout: {
            type: 'table',
            columns: 2
        },
        margin : 20,
        items : Ext.JSON.decode(favList),
        autoScroll : true,
        height : 650,
        width : 760
    }]
})
