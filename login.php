<?php
    session_start();
    include "validation.php";

    if (isset($_SESSION['username'])) {
        header("Location: admin.php");
        exit();
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = clean_input($_POST["username"]);
        $password = clean_input($_POST["password"]);
    
        if (validate($username, $password)) {

            include 'database.php';

            $register_user = "SELECT username, password FROM USER WHERE username = ?";

            $stmt = $mysqli->prepare($register_user);
            $stmt->bind_param("s", $username);

            $stmt->execute();

            $stmt->store_result();

            if ($stmt->num_rows > 0) {
                $stmt->bind_result($db_username, $db_password);
                $stmt->fetch();

                if ($db_username === $username && $password === $db_password) {  
                    $_SESSION['username'] = $db_username;
                    echo "Success";           
                }else{
                    echo "Unsuccess";
                }             
            } else{
                echo "Unsuccess";
            }
        } 
    } else {
        include "login-index.html";
    }

    function validate($username, $password){
        $errors = array();

        if (empty($username)) {
            $errors[0] = "Username is required";
        } else if(strlen($username) < 3 || strlen($username) > 20){
            $errors[0] = "Username must be 3 to 20 characters long";
        } else if(!is_valid_username($username)){
            $errors[0] = "Invalid Username Format";
        }

        if (empty($password)) {
            $errors[1] = "Password is required";
        } else if(strlen($password) < 8){
            $errors[1] = "Password must be at least 8 characters long.";
        } else if(!is_valid_password($password)){
            $errors[1] = "Password must contain at least one uppercase letter, lowercase letter, digit, and special character (@, $, !, %, *, ?, or &)";
        }

        if(empty($errors)){
            return true;
        } else{
            echo json_encode($errors);
            return false;
        }
    }

?>