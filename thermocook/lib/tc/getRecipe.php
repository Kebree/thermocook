<?php
require_once 'db_link.php';
header('Content-Type: text/html; charset=iso-8859-1');

$id = $_GET['id'];
$name = $_GET['name'];

$query = sprintf("SELECT * FROM recipe JOIN users ON autor=users.id WHERE recipe.id='%s'", $_GET['id']);
$result = $connec -> executeQuery($query);
$recipe = mysql_fetch_assoc($result);
mysql_free_result($result);

echo '<div id="recipeBody">';
echo utf8_decode("<h1 class=\"recH1\"> $name </h1>");
echo utf8_decode("<p class=\"underTitle\"> Ajoutée par ${recipe['login']} le ".date("d/m/o à H:i",strtotime($recipe['date']))."</p>");
echo utf8_decode("<h2> Ingrédients </h2>");

echo "<table class=\"ingTable\">";
$query = sprintf("SELECT * FROM lk_rec_ing LEFT JOIN ingredient ON  id_ingredient = id WHERE id_recipe='%s'", $id = $_GET['id']);
$result = $connec -> executeQuery($query);
while($row = mysql_fetch_assoc($result)) {
    echo "<tr>";
    echo "<td class=\"ingName\">".$row['name']."</td><td class=\"ingQuant\">".$row['quantity']." ".$row['measure']."</td>";
    echo "</tr>";
}
echo "</table>";

echo utf8_decode("<h2> Réalisation </h2>");
echo '<div id="recText">';
echo $recipe['recipe'];
echo '</div>';
echo '</div>';
