<?php
include "validation.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $aboutDescription = clean_input($_POST["about_description"]);

        if (validate($aboutDescription)) {
            include 'database.php';

            $sql = "UPDATE about SET about_description = ? where id = 1";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param("s", $aboutDescription);

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

    function validate($aboutDescription){
        $errors = array();

        if (empty($aboutDescription)) {
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
