<?php
include "validation.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $developer_name = clean_input($_POST["developer_name"]);
    $title = clean_input($_POST["title"]);
    $titleDescription = clean_input($_POST["title_description"]);

        if (validate($developer_name, $title, $titleDescription)) {
            include 'database.php';

            $sql = "UPDATE introduction SET developer_name = ?, title = ?, title_description = ? where id = 1";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param("sss", $developer_name, $title, $titleDescription);

            if ($stmt->execute() === TRUE) {
                echo "Success";
            } else {
                echo "Unsuccess";
            }

            $stmt->close();
            $mysqli->close();
        } else {
            echo "Validation failed";
        }
} else {
    echo "Invalid request method";
}

    function validate($developer_name, $title, $titleDescription){
        $errors = array();

        if (empty($developer_name)) {
            $errors[0] = "Developer name is required";
        } else if(!is_valid_alphabetic($developer_name)){
            $errors[0] = "Developer name should only contain alphabetic characters";
        } 

        if (empty($title)) {
            $errors[0] = "Title is required";
        } else if(!is_valid_alphabetic($title)){
            $errors[0] = "Title should only contain alphabetic characters $title";
        } 

        if (empty($titleDescription)) {
            $errors[0] = "Description is required";
        }
        
        if(empty($errors)){
            return true;
        } else{
            echo json_encode($errors);
            return false;
        }
    }
?>
