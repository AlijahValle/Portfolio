<?php 
    include 'database.php';

    $sql = "SELECT about_description FROM about WHERE id = 1";
    $result = $mysqli->query($sql);

    $intro = array();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $intro = $row;
    }

    echo json_encode($intro);

    $mysqli->close();
?>
