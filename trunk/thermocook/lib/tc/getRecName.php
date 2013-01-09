<?php
include_once 'db_link.php';

$query = sprintf("SELECT name from recipe WHERE id='%s'", $_GET['id']);
$res = $connec -> executeQuery($query);
$row = mysql_fetch_assoc($res);
echo $row['name'];
