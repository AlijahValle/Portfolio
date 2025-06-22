<?php 
    include 'database.php';

    $sql = "SELECT project_id, project_name, demo_url, depository_url, description, date_posted, project_img, project_img_path FROM projects";
    $result = $mysqli->query($sql);

    $projects = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $projects[] = $row;
        }
    }

    echo json_encode($projects);

    $mysqli->close();
?>

