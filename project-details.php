<?php
include 'database.php'; 

    if(isset($_POST['projectId'])){
        $projectId = $_POST['projectId'];
        
        $sql = "SELECT project_name, demo_url, depository_url, description FROM projects WHERE project_id = ?";
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param("i", $_POST['projectId']); 
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $data = $result->fetch_assoc();
            header('Content-Type: application/json');
            echo json_encode($data);
        } else {
            echo json_encode(array('error' => 'No project found with the provided ID'));
        }

    $stmt->close();
    } else {
        echo json_encode(array('error' => 'Project ID not provided'));
    }
?>
