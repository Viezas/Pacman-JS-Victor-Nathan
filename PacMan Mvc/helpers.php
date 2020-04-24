<?php


function dbConnect()
{
    try {
        $db = new PDO('mysql:host=localhost:3306;dbname=dv19ngauv;charset=utf8', 'dv19ngauv', 'tqW1_2c0', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    } catch (Exception $exception)
    {
        die('Erreur : ' . $exception->getMessage());
    }

    return $db;
}