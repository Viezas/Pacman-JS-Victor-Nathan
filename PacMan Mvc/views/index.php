<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pacman</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<div class="container">

    <div class="Game_Column">
        <div>
            <input type="button" value="Lancer le jeu !" class="btnGame">
        </div>
        <div class="map">
            <img src="assets/img/pacman.gif" alt="Pacman">
            <img src="assets/img/red-ghost.png" alt="red-ghost">
            <img src="assets/img/blue-ghost.png" alt="blue-ghost">
            <img src="assets/img/pink-ghost.png" alt="pink-ghost">
            <img src="assets/img/background.svg" alt="Labyrinthe">
        </div>
    </div>

    <div class="Info_Column">
        <h2>Infos :</h2>
        <h3>Pseudo : <span id="pseudo"></span></h3>
        <h3>Score : <span id="score"></span></h3>
        <h3>Lv : <span id="level"></span></h3>
    </div>

    <div class="Classement_Column">
        <h2>Classement :</h2>
        <ul></ul>
    </div>

    <div class="GameOver">
        <h1>GAME OVER !!</h1>
        <div class="form">
            <form>
                <div class="scoreDiv"><p>Votre score final est de : <span id="scoreUserDataBase"></span></p></div>
                <div class="centerNameSubmit">
                    <input type="text" placeholder="Entrez un pseudo (3 charactères min)" size="31%" class="text_input"autofocus required minlength="3" maxlength="10">
                    <input type="submit" class="submit_input" value="Enregistrer">
                </div>
            </form>
        </div>
        <div class="message"></div>
        <div class="btnReGame">
            <a href="index.php">Rejouer !</a>
        </div>
    </div>
</div>
<script src="assets/js/main.js"></script>
</body>
</html>