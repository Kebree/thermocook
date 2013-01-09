<?php
require_once 'db_link.php';
$query = sprintf("SELECT id FROM recipe WHERE name='%s'", $_GET['rec_name']);
$result = $connec -> executeQuery($query);
$rec_id = 0;
$add = ($_GET['action'] == 'add');
if(mysql_num_rows($result) == 0 && $add){
	$rec_id = $connec -> insert('recipe', array("name"), array($_GET['rec_name']));
} else {
	$row = mysql_fetch_assoc($result);
	$rec_id = $row['id'];
}

if($add)
	$res = $connec -> insert('lk_rec_ing', array('id_ingredient', 'id_recipe'), array($_GET['id_ing'],$rec_id));
else if ($_GET['action'] == 'remove')
	$res = $connec -> remove('lk_rec_ing', array('id_ingredient' => $_GET['id_ing'], 'id_recipe' => $rec_id));
else if ($_GET['action'] == 'changeQuant') {
	$query = sprintf("UPDATE `lk_rec_ing` SET quantity='%s' WHERE id_ingredient='%s' AND id_recipe='%s'",
		$_GET['quantity'],
		$_GET['id_ing'],
		$rec_id);
	$res = $connec -> executeQuery($query);
}
	
	
if($res) {
	echo "ingredient added";
}

