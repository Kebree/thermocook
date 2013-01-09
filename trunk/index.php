<?php
session_start();
include_once 'thermocook/lib/tc/db_link.php';
$error = "";

function authenticate($login, $password) {
    global $error;
    global $connec;
    $query = sprintf("SELECT * FROM users WHERE login='%s' and password='%s'", $login, $password);
    $result = $connec -> executeQuery($query);
    if(mysql_num_rows($result)==1)
        return true;
    $error = "Login ou mot de passe non valide";
    return false;
}
 
if(isset($_POST["username"]))
{
    if(authenticate($_POST["username"], $_POST["password"]))
    {
        $_SESSION["username"] = $_POST["username"];
    }
}
if(isset($_SESSION['username'])) {
?>
<!DOCTYPE html>
<html>
    <head>
        <script type="text/javascript">
                        username = "<?php echo $_SESSION['username']; ?>"
        </script>
        <!--        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"> -->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>ThermoCook (Beta)</title>

        <!-- Style sheets -->
        <link rel="stylesheet" type="text/css" href="thermocook/lib/extjs/resources/css/ext-neptune.css">
        <link rel="stylesheet" type="text/css" href="thermocook/Style/style.css">

        <script type="text/javascript" src="thermocook/lib/extjs/ext-all.js"></script>
        <script type="text/javascript" src="thermocook/lib/extjs/examples/ux/form/field/tinymce/tiny_mce.js"></script>

        <!-- Main application -->
        <script type="text/javascript" src="thermocook/app.js"></script>

        <!-- Model -->

        <!-- Store -->
        <script type="text/javascript" src="thermocook/ViewIngredients/Store/IngredientListStore.js"></script>

        <script type="text/javascript" src="thermocook/Recipes/Store/RecipesListStore.js"></script>
        <script type="text/javascript" src="thermocook/Recipes/Store/AvailIngsStore.js"></script>
        <script type="text/javascript" src="thermocook/Recipes/Store/UsedIngsStore.js"></script>

        <script type="text/javascript" src="thermocook/List/Store/ListMainStore.js"></script>
        <script type="text/javascript" src="thermocook/List/Store/UsedRecStore.js"></script>
        <script type="text/javascript" src="thermocook/List/Store/ConstructedListStore.js"></script>

        <!-- Controller -->
        <script type="text/javascript" src="thermocook/ViewIngredients/Controller/IngredientListControll.js"></script>
        <script type="text/javascript" src="thermocook/ViewIngredients/Controller/ContextMenuControll.js"></script>

        <script type="text/javascript" src="thermocook/Recipes/Controller/RecipesListControll.js"></script>
        <script type="text/javascript" src="thermocook/Recipes/Controller/IngsControll.js"></script>

        <script type="text/javascript" src="thermocook/List/Controller/ListControll.js"></script>

        <!-- View -->

        <script type="text/javascript" src="thermocook/AddIngredient/View/MainView.js"></script>

        <script type="text/javascript" src="thermocook/ViewIngredients/View/MainView.js"></script>
        <script type="text/javascript" src="thermocook/ViewIngredients/View/IngredientListGrid.js"></script>
        <script type="text/javascript" src="thermocook/ViewIngredients/View/ContextMenu.js"></script>

        <script type="text/javascript" src="thermocook/Recipes/View/ViewMainView.js"></script>
        <script type="text/javascript" src="thermocook/Recipes/View/RecipesListGrid.js"></script>
        <script type="text/javascript" src="thermocook/Recipes/View/AddMainView.js"></script>
        <script type="text/javascript" src="thermocook/Recipes/View/AvailIngsGrid.js"></script>
        <script type="text/javascript" src="thermocook/Recipes/View/UsedIngsGrid.js"></script>
        <script type="text/javascript" src="thermocook/Recipes/View/ContextMenu.js"></script>

        <script type="text/javascript" src="thermocook/List/View/ListMainView.js"></script>
        <script type="text/javascript" src="thermocook/List/View/RecListGrid.js"></script>
        <script type="text/javascript" src="thermocook/List/View/UsedRecsGrid.js"></script>
        <script type="text/javascript" src="thermocook/List/View/ConstructedListGrid.js"></script>
        <script type="text/javascript" src="thermocook/List/View/ContextMenu.js"></script>

    </head>
    <body>

    </body>
</html>
<?php
} else {
?>
<html>
    <head>
        <title>Login</title>
        <link rel="stylesheet" type="text/css" href="thermocook/Style/login.css">
        <script type="text/javascript" src="thermocook/lib/tc/sha256.js"></script>
    </head>
    <body>
        <script>
            function encPass(form) {
                form.password.value = sha256_digest(form.password.value);
            }
            
        </script>
        <h1>Login</h1>
        <?php 
        if ($error != "") {
            echo '<p class="error">'.$error.'</p>';
            $error = "";         
        }
        ?>
        <form action="index.php" method="post" onsubmit='encPass(this)'>
            <div class="labl">
                <label>Username : </label>
            </div>
            <div class="field">
                <input type="text" name="username" value=""/>
                </div>
                <br />
                <div class="labl">
                <label>Password : </label>
                </div>
                <div class="field">
                <input type="password" " name="password" />
            </div>
            <br />
            <input type="submit" value="Validate" class="btn" />
        </form>
    </body>
</html>
<?php
}
?>