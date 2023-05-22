<?php
header("Access-Control-Allow-Origin:*");

$dsn = "mysql:dbname=todo;host=localhost:3306";
$username = "root";
$password = "";

try {
    $connection = new PDO($dsn, $username, $password);

    $content = file_get_contents("php://input");
    $task = json_decode($content);
    $id = $task->id;
    $name = $task->name;
    $description = $task->description;
    $date = $task->date;

    $sqlQuery = "UPDATE tasks 
            SET name = '$name', description = '$description', date = '$date'
            WHERE id = $id;";
    $connection->query($sqlQuery, PDO::FETCH_OBJ);

    header("HTTP/1.1 200 OK");
    header('Content-Type: application/json');
    print json_encode("updated successfully");
} catch (Exception $exception) {
    header("HTTP/1.1 500 Internal Server Error");
    header('Content-Type: application/json');
    print json_encode($exception);
}