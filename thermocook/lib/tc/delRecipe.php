<?php
include_once 'db_link.php';

$connec->remove('recipe', array("id" => $_GET["id"]));
$connec->remove('lk_rec_ing', array("id_recipe" => $_GET["id"]));
echo "{success : true, msg : 'Recette supprimée'}";