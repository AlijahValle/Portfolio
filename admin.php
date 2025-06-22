<?php 
    session_start();

    if (!isset($_SESSION['username'])) {
        header("Location: login.php");
        exit();
    } else {
        $username = $_SESSION['username'];
        
        include "admin-index.html";
    }
?>