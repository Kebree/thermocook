<?php
require_once 'db_link.php';
header('Content-Type: text/html; charset=iso-8859-1');

$ret = "{objects :[";
$query = "SELECT * FROM recipe ORDER BY id DESC LIMIT 0,5";
$result = $connec -> executeQuery($query);
while ($recipe = mysql_fetch_assoc($result)) {
    $ret .= "{id : '".$recipe['id']."', name : '".$recipe['name']."'},";
}
$ret = substr_replace($ret, "", -1);
$ret .= "]}";
echo $ret;
