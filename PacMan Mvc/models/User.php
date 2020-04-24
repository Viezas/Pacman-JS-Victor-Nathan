<?php

function getTopScore()
{
    $db = dbConnect();

    $query = $db->query('SELECT * FROM users ORDER BY users.score DESC limit 10');
    $scores = $query->fetchAll();

    return $scores;
}

function getInsertTopScore($data)
{
    $db = dbConnect();
    $query = $db->prepare('INSERT INTO users(name, score, user_id) VALUES (?,?,?)');
    $result = $query->execute(
        array(
            $data['name'],
            $data['score'],
            $data['user_id'],
        ));
    return $result;
}

function doesPlayerExist($data){
    $db = dbConnect();
    $query = $db->prepare('SELECT * FROM users WHERE name = :PacmanUserName');
    $query->execute(
        [
            'PacmanUserName' => $data['name'],
        ]
    );
    $PacmanUserExist = $query->fetch();

    return $PacmanUserExist;
}

function updatePlayerInformations($data){
    $db = dbConnect();
    $query = $db->prepare('UPDATE users SET name = :PacmanUserName, score = :PacmanUserScore, user_id = :PacmanUserId WHERE name = :PacmanUserName ');
    $result = $query->execute(
        [
            'PacmanUserName' => $data['name'],
            'PacmanUserScore' => $data['score'],
            'PacmanUserId' => $data['user_id'],
        ]
    );

    return $result;
}