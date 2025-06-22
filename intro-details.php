<?php
    include 'database.php';  

    $sql = "SELECT developer_name, title, title_description FROM introduction WHERE id = 1";
    $stmt = $mysqli->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $data = $result->fetch_assoc();
        header('Content-Type: application/json');
        echo json_encode($data);
    } else {
        echo json_encode(array("error" => "No data found"));
    }

    $stmt->close();
?>
