<?php
session_start();
require_once 'db_link.php';

$query = sprintf("SELECT * FROM favourites JOIN recipe ON id_recipe=recipe.id WHERE id_user='%s'",$_SESSION['userid']);
$result = $connec -> executeQuery($query);
while ($fav = mysql_fetch_assoc($result)) {
    $ret[] = sprintf("Ext.create('thermocook.Main.View.Favourite',{
    items : [{
        xtype : 'panel',
        html : '%s',
        flex : 1
    },{
        xtype : 'button',
        text : 'Enlever'
    }]
    
})", $fav["name"]);
}


echo "[".implode(',', $ret)."]";