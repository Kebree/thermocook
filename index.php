<?php
session_start();
include_once 'thermocook/lib/tc/db_link.php';
require_once('thermocook/lib/recaptcha/recaptchalib.php');
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

if(isset($_POST['newuser'])) {
    $query = sprintf("SELECT * FROM users WHERE login='%s'", $_POST['newuser']);
    $result = $connec -> executeQuery($query);
    if(mysql_num_rows($result)==1)
        $error .= "Login déjà utilisé<br/>";
    
    $query = sprintf("SELECT * FROM users WHERE email='%s'", $_POST['mail']);
    $result = $connec -> executeQuery($query);
    if(mysql_num_rows($result)==1)
        $error .= "Email déjà utilisé";
    
    $privatekey = "6LelXNsSAAAAAL0VHtcQgtsMNGv_It0NP2SE_dPa";
    $resp = recaptcha_check_answer ($privatekey,
                                $_SERVER["REMOTE_ADDR"],
                                $_POST["recaptcha_challenge_field"],
                                $_POST["recaptcha_response_field"]);

    if (!$resp->is_valid) {
    // What happens when the CAPTCHA was entered incorrectly
    	$error .= "invalid captcha";
    }
    
    unset($result);
    
    if($error == ""){
        $query = sprintf("INSERT INTO users VALUES ('%s','%s','%s','%s','%s')", 
            $_POST['newuser'], 
            $_POST['mail'],
            $_POST['newpassword'],
            $_POST['firstname'],
            $_POST['name']);
        $connec -> executeQuery($query);         
    } 
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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Login</title>
        <link rel="stylesheet" type="text/css" href="thermocook/Style/login.css" />
        <script type="text/javascript" src="thermocook/lib/tc/sha256.js"></script>
    </head>
    <body> 
        <script type="text/javascript">
        <?php
        if(isset($_POST['newuser']) && $error !=""){
           ?>
        window.onload = function(e){ 
            form = document.getElementById("scrolling");
            form.style.display = "block";
            form.newuser.value = "<?php echo $_POST['newuser']?>";
            form.mail.value = "<?php echo $_POST['mail']?>";
            form.firstname.value = "<?php echo $_POST['firstname']?>";
            form.name.value = "<?php echo $_POST['name']?>";
        }
           <?php            
        }?>
        function encPass(form) {
            if (typeof form.password != 'undefined') {
                form.password.value = sha256_digest(form.password.value);
            }
            if (typeof form.newpassword != 'undefined') {
                form.newpassword.value = sha256_digest(form.newpassword.value);
            }
            if (typeof form.newpasswordbis != 'undefined') {
                form.newpasswordbis.value = sha256_digest(form.newpasswordbis.value);
            }
        }
            
        
        function displayForm() {
            var elt = document.getElementById("scrolling");
            if(elt.style.display == "none" || elt.style.display == ""){
                elt.style.display = "block";
            }
            else {
                elt.style.display = "none";
            }
        }
        
        error_map = new Array(0,0,0,0,0,0);
        error_list = new Array(
            "Le nom d'utilisateur doit faire plus de 3 caractères",
            "Le mot de passe doit faire plus de 8 caractères",
            "Les mots de passe doivent être identiques",
            "Email non valide",
            "Le champ prénom est obligatoire",
            "Le champ nom est obligatoire"
        )
        
        function validateForm() {
            form = document.getElementById("scrolling");
            NodeList.prototype.forEach = HTMLCollection.prototype.forEach = Array.prototype.forEach;
            ret = true;
            document.getElementById("scrolling").elements.forEach(function(value, index, array) {
                if(!validField(value))
                    ret = false;
            });
            if(ret)
                encPass(form);
            return ret;
        }
        
        function validField(field) {
            document.getElementById("error").innerHTML = "";
            var ret = true;
            switch (field.name) {
                case "newuser" :
                    error_map[0] = 0;
                    if(field.value.length < 3) {
                        error_map[0] = 1;
                        ret = false;  
                    }
                    break;
                case "newpassword":
                    error_map[1] = 0;
                    if(field.value.length < 8) {
                        error_map[1] = 1;
                        ret = false;  
                    }
                
                    break;
                case "newpasswordbis":
                    error_map[2] = 0;
                    if(field.value != document.getElementById("scrolling")["newpassword"].value) {
                        error_map[2] = 1;
                        ret = false;  
                    }
                    break;
                case "mail" :
                    error_map[3] = 0;
                    var x=field.value;
                    var atpos=x.indexOf("@");
                    var dotpos=x.lastIndexOf(".");
                    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
                        error_map[3] = 1;
                        ret = false;  
                    }
                    break;
                case "firstname":
                    error_map[4] = 0;
                    if(field.value.length == 0) {
                        error_map[4] = 1;
                        ret = false;  
                    }
                    break;
                case "name":
                    error_map[5] = 0;
                    if(field.value.length == 0) {
                        error_map[5] = 1;
                        ret = false;  
                    }
                    break;
            }
            error_list.forEach(updateError);
            return ret;
        }
        
        function updateError(value, index, array) {
            if(error_map[index])
                document.getElementById("error").innerHTML += value+"<br/>";
        }
        </script>
        
        <div id="gauche">
            <h1>Login</h1>
            
            <form action="index.php" method="post" onsubmit='encPass(this)'>
                <div class="labl">
                    <label>Username : </label>
                </div>
                <div class="field">
                    <input type="text" name="username" value=""/>
                </div>
                <div class="labl">
                    <label>Password : </label>
                </div>
                <div class="field">
                    <input type="password" name="password" />
                </div>
                <div>
                    <input type="submit" value="Valider" class="btn" />
                </div>
            </form>
            
            <?php 
            if ($error != "") {
                echo '<p class="error">'.$error.'</p>';     
            }
            if(isset($_POST['newuser']) && $error == "") {
                echo '<p class="info">Vous avez été correctement enregistré, vous pouvez dés à présent vous connecter</p>';
            }
            $error = "";    
            ?>
        </div>
        <div id="droite">
            <h1 onclick="displayForm()"> Pas encore inscrit ? </h1>
            <form action="index.php" method="post" onsubmit='return validateForm()' id="scrolling">
                <div class="labl">
                    <label>Identifiant : </label>
                </div>
                <div class="field">
                    <input type="text" name="newuser" onchange="validField(this)" value=""/>
                </div>
                <div class="labl">
                    <label>Mot de passe : </label>
                </div>
                <div class="field">
                    <input type="password" onchange="validField(this)" name="newpassword" />
                </div>
                <div class="labl">
                    <label>Vérification : </label>
                </div>
                <div class="field">
                    <input type="password" onchange="validField(this)" name="newpasswordbis" />
                </div>
                <div class="labl">
                    <label>e-mail : </label>
                </div>
                <div class="field">
                    <input type="text" onchange="validField(this)" name="mail" />
                </div>
                <div class="labl">
                    <label>Prénom : </label>
                </div>
                <div class="field">
                    <input type="text" onchange="validField(this)" name="firstname" />
                </div>
                <div class="labl">
                    <label>Nom : </label>
                </div>
                <div class="field">
                    <input type="text" onchange="validField(this)" name="name" />
                </div>
                <div class="field" style="margin-top: 20px;">
                    <?php
                    $publickey = "6LelXNsSAAAAAFQ6M6QGFrT_-SdNk0Ya3mCiOzdL"; // you got this from the signup page
                    echo recaptcha_get_html($publickey);
                    ?>
                </div>
                <div>
                    <input type="submit" value="Valider" class="btn" />
                </div>
            </form>
            <p id="error" class="error"></p>
        </div>
    </body>
</html>
<?php
}
?>
