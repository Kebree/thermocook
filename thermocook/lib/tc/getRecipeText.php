<?php
require_once 'db_link.php';
$id = $_GET['id'];

$query = sprintf("SELECT * FROM recipe WHERE id='%s'", $id = $_GET['id']);
$result = $connec -> executeQuery($query);
$row = mysql_fetch_assoc($result);
mysql_free_result($result);
echo utf8_encode($row['recipe']);
