<?php
//echo "{recipe : [{id:1, name : 'un'},{id:2, name : 'deux'}]}";
require_once 'db_link.php';
header('Content-Type: text/html; charset=iso-8859-1');

$ret = "{recipe :[";
$query = "SELECT * FROM recipe ORDER BY name ASC";
$result = $connec -> executeQuery($query);
while ($recipe = mysql_fetch_assoc($result)) {
    $ret .= "{id : '".$recipe['id']."', name : '".$recipe['name']."'},";
}
$ret = substr_replace($ret, "", -1);
$ret .= "]}";
echo $ret;