<?php
include_once 'db_link.php';
header('Content-Type: text/html; charset=iso-8859-1');

$start = $_GET['start'];
$end = $start + $_GET['limit'];
$limits = array("start" => $start, "end" => $end);

$sorter = NULL;
if (isset($_GET['sort'])) {
	$sorting = json_decode($_GET['sort']);
	$property = $sorting[0] -> property;
	$way = $sorting[0] -> direction;
	$sorter = array("col" => $property, "direction" => $way);
} else {
	$sorter = array("col" => "name", "direction" => "ASC");
}

if (isset($_GET['exclude'])) {
	$query = sprintf("SELECT * FROM ingredient WHERE id NOT IN (SELECT id_ingredient FROM lk_rec_ing WHERE id_recipe='%s') ORDER BY %s %s", $_GET['exclude'],$sorter['col'],$sorter['direction']);
	$res = $connec -> executeQuery($query);
	$arr = array();
	while ($row = mysql_fetch_assoc($res)) {
		$arr[] = $row;
	}
	mysql_free_result($res);
} else {
	$arr = $connec -> select('ingredient', array("*"), NULL, $sorter);
}

$filter = NULL;
if (isset($_GET['filter'])) {
	$filter = $_GET['filter'][0];
	$property = $filter['field'];
	$type = $filter['data']['type'];
	$value = $filter['data']['value'];
}

$i = 0;
$ret = "{'ingredient' : [";
foreach ($arr as $ingredient) {
	if (!isset($filter) || preg_match("/^$value/", $ingredient['name'])) {
		if ($i >= $start && $i < $end)
			$ret .= "{'id' : '" . $ingredient['id'] . "', 'name' : '" . $ingredient['name'] . "', 'measure' : '" . $ingredient['measure'] . "'},";
		$i++;
	}
}
$ret = substr_replace($ret, "", -1);
$ret .= "], 'totalCount' : '$i'}";
echo $ret;
unset($filter);
