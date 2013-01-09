<?php
require_once 'db_link.php';
$id = $_GET['id'];
$name = $_GET['name'];
echo '<div id="recipeBody">';
echo "<h1 class=\"recH1\"> $name </h1>";
echo "<h2> Ingrédients </h2>";

echo "<table class=\"ingTable\">";
$query = sprintf("SELECT * FROM lk_rec_ing LEFT JOIN ingredient ON  id_ingredient = id WHERE id_recipe='%s'", $id = $_GET['id']);
$result = $connec -> executeQuery($query);
while($row = mysql_fetch_assoc($result)) {
    echo "<tr>";
    echo "<td class=\"ingName\">".$row['name']."</td><td class=\"ingQuant\">".utf8_encode($row['quantity'])." ".utf8_encode($row['measure'])."</td>";
    echo "</tr>";
}
echo "</table>";

echo "<h2> Réalisation </h2>";
echo '<div id="recText">';
$query = sprintf("SELECT * FROM recipe WHERE id='%s'", $id = $_GET['id']);
$result = $connec -> executeQuery($query);
$row = mysql_fetch_assoc($result);
mysql_free_result($result);
echo utf8_encode($row['recipe']);
echo '</div>';
echo '</div>';
