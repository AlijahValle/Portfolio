<?php
    include "validation.php";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $project_name = clean_input($_POST["project_name"]);
        $demo_url = clean_input($_POST["demo_url"]);
        $depository_url = clean_input($_POST["depository_url"]);
        $description = clean_input($_POST["description"]);
        $currentDate = date('Y-m-d');
        $uploadedFile = $_FILES['project_image'];
        $targetDir = "uploads/";
        $targetFile = $targetDir . basename($_FILES["project_image"]["name"]);

        if (validate($project_name, $demo_url, $depository_url, $description, $uploadedFile, $targetFile)) {
            include 'database.php';

            $sql = "INSERT INTO projects (project_name, demo_url, depository_url, description, date_posted, project_img, project_img_path) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param("sssssss", $project_name, $demo_url, $depository_url, $description, $currentDate, $_FILES["project_image"]["name"], $targetFile);

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

    function validate($project_name, $demo_url, $depository_url, $description, $uploadedFile, $targetFile){
        $errors = array();

        if (empty($project_name)) {
            $errors[0] = "Project is required";
        } else if(!is_valid_alphabetic($project_name)){
            $errors[0] = "Project name should only contain alphabetic characters";
        } 

        if (empty($demo_url)) {
            $errors[1] = "Demo url is required";
        } else if(!is_valid_url($demo_url)){
            $errors[1] = "Invalid URL";
        } 

        if (empty($depository_url)) {
            $errors[2] = "Demo url is required";
        } else if(!is_valid_url($depository_url)){
            $errors[2] = "Invalid URL";
        } 

        if (empty($description)) {
            $errors[3] = "Description is required";
        }

        $check = getimagesize($_FILES["project_image"]["tmp_name"]);
        if($check === false) {
            $errors[4] = "File is not an image.";
        }
        if (file_exists($targetFile)) {
            $errors[4] = "Sorry, file already exists.";
        }
        if (!move_uploaded_file($_FILES["project_image"]["tmp_name"], $targetFile)) {
            $errors[4] = "Sorry, there was an error uploading your file.";
        }

        if(empty($errors)){
            return true;
        } else{
            echo json_encode($errors);
            return false;
        }
    }
?>
