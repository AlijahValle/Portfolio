<?php 
    $server_name = "localhost";
    $server_username = "root";
    $server_password = "";
    $database_name = "portfolio_db";
    $isValid;

    $mysqli = new mysqli($server_name, $server_username, $server_password, $database_name);

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }
?>