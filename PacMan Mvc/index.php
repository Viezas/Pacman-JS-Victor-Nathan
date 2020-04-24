<?php

//https://www.youtube.com/watch?v=dQw4w9WgXcQ

require ('helpers.php'); //1er étape

if(isset($_GET['controller'])){

    switch ($_GET['controller']) {
        case 'ajax' :
            require 'controllers/ajaxController.php';
            break;

        default :
            require 'controllers/indexController.php';
    }
}
else{ //si je passe pas par controller
    require 'controllers/indexController.php';
}

