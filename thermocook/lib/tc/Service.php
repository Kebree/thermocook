<?php
session_start();
include_once 'db_link.php';

if(!isset($_GET['function'])) {
    echo "{result:'false', msg:'function must be specified}";
}

try{
    call_user_func($_GET['function'], $_GET['id']);
}
catch (Exception $e) {
    error_log("Tried to call an inexistent function");
    echo "{result:'false', msg:'function don't exists}";
}

function isFav($id) {
    global $connec;
    $query = sprintf("SELECT * FROM favourites WHERE id_recipe='%s'",$id);
    $result = $connec -> executeQuery($query);
    echo (mysql_num_rows($result) > 0)?"true":"false";
}

function addFav($id) {
    global $connec;
    $query = sprintf("INSERT INTO favourites(id_recipe, id_user) VALUES ('%s','%s')",$id, $_SESSION['userid']);
    echo $query;
    $result = $connec -> executeQuery($query);
    echo ($result)?"true":"false";
}

function rmFav($id) {
    global $connec;
    $query = sprintf("DELETE FROM favourites WHERE id_recipe='%s'  AND id_user='%s'",$id, $_SESSION['userid']);
    echo $query;
    $result = $connec -> executeQuery($query);
    echo ($result)?"true":"false";
}
