var favList;
var mygetrequest = new XMLHttpRequest();
mygetrequest.open("GET", "/thermocook/lib/tc/getFavs.php", false);
mygetrequest.onreadystatechange = function() {
    if (mygetrequest.status == 200 && mygetrequest.readyState == 4) {
        favList = mygetrequest.responseText;
    } else {
        alert("An error has occured making the request");
    }
};
//load JSON data
mygetrequest.send();

mainPanel = Ext.create('Ext.panel.Panel', {
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
        layout: {
            type: 'table',
            // The total column count must be specified here
            columns: 2
        },
        margin : 20,
        items : Ext.JSON.decode(favList),
        autoScroll : true,
        height : 650,
        width : 760
    }]
})
