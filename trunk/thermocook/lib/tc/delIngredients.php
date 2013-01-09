<?php
include_once 'db_link.php';

$connec->remove('ingredient', array("id" => $_GET["id"]));
echo "{success : true, msg : 'Ingrédient Supprimé'}";