<?php
include_once 'DBLink.php';
$connec = DBLink::getInstance();
$connec->connect("127.0.0.1", "root", "", "thermocook");
