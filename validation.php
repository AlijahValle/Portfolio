<?php 

    function is_valid_alphabetic($input) {
        $regex = '/^[a-zA-Z\s.&.]+$/';
        return preg_match($regex, $input);
    }

    function is_valid_name($name) {
        $regex = '/^[a-zA-Z]+(?:\s+[a-zA-Z]+)*(?:\s+[a-zA-Z]\.)?$/';
        return preg_match($regex, $name);
    }

    function is_valid_email_input($email) {
        $regex = '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
        return preg_match($regex, $email);
    }

    function is_valid_username($username){
        $regex = '/^[a-zA-Z0-9_.-]{3,20}$/';
        return preg_match($regex, $username);
    }

    function is_valid_password($password){
        $regex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/';
        return preg_match($regex, $password);
    }

    function is_valid_url($url) {
        return filter_var($url, FILTER_VALIDATE_URL) !== false;
    }

    function clean_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        return $data;
    }
?>