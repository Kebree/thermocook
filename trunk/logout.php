<?php
session_start();
unset($_SESSION['username']);
session_destroy();
print("<script type=\"text/javascript\">setTimeout('location=(\"index.php\")' ,100);</script>");
