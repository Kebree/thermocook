<?php
require_once 'db_link.php';
require_once "ShoppingList.php";

$shopList = ShoppingList::getInstance();
if(isset($_GET['id']))
	$id = $_GET['id'];

switch ($_GET['operation']) {
	case 'add':
		$shopList -> add($connec, $id);
		echo $shopList -> output();
		break;
	case 'remove':
		$shopList -> delete($connec, $id);
		echo $shopList -> output();
		break;
	case 'removeIng':
		$shopList -> removeIng($id);
		break;
	case 'clean':
		$shopList -> clean();
		break;
	case 'print':
		echo $shopList -> output($_GET['format']);
		break;
	default:
		
		break;
}




/*$rec_ids = $_GET['recipes'];

$query = sprintf("SELECT * FROM lk_rec_ing LEFT JOIN ingredient ON id_ingredient = ingredient.id WHERE id_recipe IN (%s)", $rec_ids);
$result = $connec -> executeQuery($query);

$ings = array();
$ings_name = array();
$ings_measure = array();

while($row = mysql_fetch_assoc($result)) {
	if(isset($ings[$row["id_ingredient"]])) {
		$ings[$row["id_ingredient"]] += $row["quantity"];
	} else {
		$ings[$row["id_ingredient"]] = $row["quantity"];
		$ings_name[$row["id_ingredient"]] = $row["name"];
		$ings_measure[$row["id_ingredient"]] = $row["measure"];
	}
}

$ret = "{list:[";
foreach($ings as $id => $quantity) {
    $ret .= "{name : '".$ings_name[$id]."',quantity : '".$ings[$id]." ".$ings_measure[$id]."'},";
}
$ret = substr_replace($ret, "", -1);
$ret .= "]}";
echo $ret;*/