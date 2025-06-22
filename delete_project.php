<?php
include 'database.php';

if(isset($_POST['projectId'])){
    $projectId = $_POST['projectId'];
    
    $sql = "DELETE FROM projects WHERE project_id = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("i", $projectId); 
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo 'success';
    } else {
        echo 'error';
    }
    $stmt->close();
} else {
    echo 'error';
}
?>
