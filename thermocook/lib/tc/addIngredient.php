<?php
include_once 'db_link.php';

$params = explode("&",file_get_contents('php://input'));
$params2= array();
foreach ($params as $key => $value) {
	$splitted = explode("=",$value);
	$params2[$splitted[0]] = $splitted[1];
}
$params = $params2;

$name = utf8_decode(urldecode($params["name"]));
if(isset($params["measure"]))
	$measure = urldecode($params["measure"]);
else {
	$measure = "";
}

$query = sprintf("SELECT id FROM ingredient WHERE name='%s'", $name);
$result = $connec -> executeQuery($query);
$rec_id = 0;
if (mysql_num_rows($result) == 0) {
	$rec_id = $connec -> insert('ingredient', array("name", "measure"), array($name, $measure));
} else {
	$row = mysql_fetch_assoc($result);
	$rec_id = $row['id'];
	$query = sprintf("UPDATE ingredient SET name='%s', measure='%s' WHERE id='%s'", $name, $measure, $rec_id);
	$connec -> executeQuery($query);
}

if($rec_id>1)
	echo "{success : true, msg : 'Ingrédient ajouté'}";
else if ($id == -2)
	echo "{success : false, msg : 'L\'ingrédient existe déjà !'}";
