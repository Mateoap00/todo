<?php
header("Access-Control-Allow-Origin:*");

$dsn = "mysql:dbname=todo;host=localhost:3306";
$username = "root";
$password = "";

try {
    $connection = new PDO($dsn, $username, $password);

    $id = $_GET['id'];

    $sqlQuery = "DELETE FROM tasks WHERE id = $id";
    $connection->query($sqlQuery, PDO::FETCH_OBJ);

    header("HTTP/1.1 200 OK");
    header('Content-Type: application/json');
    print json_encode("deleted successfully");
} catch (Exception $exception) {
    header("HTTP/1.1 500 Internal Server Error");
    header('Content-Type: application/json');
    print json_encode($exception);
}