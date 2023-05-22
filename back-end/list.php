<?php
header("Access-Control-Allow-Origin:*");
$content = file_get_contents("php://input");

$dsn = "mysql:dbname=todo;host=localhost:3306";
$username = "root";
$password = "";

try {
    $connection = new PDO($dsn, $username, $password);
    $sqlQuery = "SELECT * FROM tasks;";
    $result = $connection->query($sqlQuery, PDO::FETCH_OBJ);

    $tasks = [];
    foreach ($result as $task) {
        $tasks[] = $task;
    }

    header("HTTP/1.1 200 OK");
    header('Content-Type: application/json');
    print json_encode($tasks);
} catch (Exception $exception) {
    header("HTTP/1.1 500 Internal Server Error");
    header('Content-Type: application/json');
    print json_encode($exception);
}