<?php
require_once 'db_link.php';
$id = $_GET['id'];

$ret = "{'ingredient' : [";
$query = sprintf("SELECT * FROM lk_rec_ing LEFT JOIN ingredient ON  id_ingredient = id WHERE id_recipe='%s'", $id = $_GET['id']);
$result = $connec -> executeQuery($query);

while($row = mysql_fetch_assoc($result)) {
    $ret .= "{'id' : '".$row['id']."','name' : '".$row['name']."','quantity':'".utf8_encode($row['quantity'])."','measure' : '".$row['measure']."'},";
}
$ret = substr_replace($ret, "", -1);
$ret .= "]}";
echo $ret;
