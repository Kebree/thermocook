<?php
session_start();
require_once 'db_link.php';
$query = sprintf("SELECT id FROM recipe WHERE name='%s'", $_GET['recName']);
$result = $connec -> executeQuery($query);
$rec_id = 0;
if (mysql_num_rows($result) == 0) {
	$rec_id = $connec -> insert('recipe', array("name","autor"), array($_GET['recName'],$_SESSION['userid']));
} else {
	$row = mysql_fetch_assoc($result);
	$rec_id = $row['id'];
}

$query = sprintf("UPDATE `recipe` SET recipe='%s' WHERE id='%s'", mysql_real_escape_string($_POST['recipeText']), $rec_id);
$res = $connec -> executeQuery($query);
echo "{success : true, msg : 'Recette mise à jour'}";
