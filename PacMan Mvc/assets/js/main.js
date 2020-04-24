// Variables globales
const map = document.querySelector('.map')
const pacMan = document.querySelector('img[src="assets/img/pacman.gif"]')
const redGhost = document.querySelector('img[src="assets/img/red-ghost.png"]')
const blueGhost = document.querySelector('img[src="assets/img/blue-ghost.png"]')
const pinkGhost = document.querySelector('img[src="assets/img/pink-ghost.png"]')
const button = document.querySelector('input[type="button"]')
const form = document.querySelector('.form')
//La div du gameOver que l'on affiche lorsque les conditions du GameOver sont remplise
const gameOverScreen = document.querySelector('.GameOver')

let pacManInterval
let redGhostInterval
let currentRedGhostDirection
let blueGhostInterval
let currentBlueGhostDirection
let pinkGhostInterval
let currentPinkGhostDirection
let score = 0
let scoreUserDataBase = 0
let level = 1

const directions = [ 'toLeft', 'toRight', 'toTop', 'toBottom' ]

console.log('jeu lancé')

// Collection des murs axe horizontal droite-gauche
// Collection des murs axe horizontal droite-gauche
const blockedSquaresToLeft = [
    {top:300, left:200},{top:500, left:200},{top:700, left:200},{top:200, left:300},{top:300, left:300},{top: 400, left: 400}, {top:500, left:300},{top:800, left:300},
    {top:0, left:500}, {top:200, left:500}, {top:600, left:500}, {top:800, left:500}, {top:400, left:600}, {top:200, left:700}, {top:300, left:700},
    {top:500, left:700}, {top:800, left:700}, {top:700, left:800},
//ligne en left 0
    {top:0, left:0}, {top:100, left:0}, {top:200, left:0}, {top:600, left:0}, {top:700, left:0}, {top:800, left:0},{top:900, left:0}
]
// Collection des murs axe horizontal gauche-droite
const blockedSquaresToRight = [
    {top:700, left:100}, {top:200, left:200}, {top:300, left:200},{top: 400, left: 500}, {top:500, left:200}, {top:800, left:200}, {top:400, left:300},
    {top:0, left:400}, {top:200, left:400}, {top:600, left:400}, {top:800, left:400}, {top:200, left:600}, {top:300, left:600},
    {top:500, left:600}, {top:800, left:600}, {top:300, left:700}, {top:500, left:700}, {top:700, left:700},
//ligne en left 900
    {top:0, left:900}, {top:100, left:900}, {top:200, left:900}, {top:600, left:900}, {top:700, left:900},
    {top:800, left:900}, {top:900, left:900}
]
// Collection des murs axe vertical bas-haut
const blockedSquaresToTop = [
    {top:400, left:0}, {top:600, left:0}, {top:800, left:0}, {top:100, left:100}, {top:200, left:100}, {top:400, left:100},{top:400, left:400},
    {top:400, left:500}, {top:600, left:100},{top:400, left:100}, {top:700, left:100}, {top:900, left:100}, {top:900, left:200},
    {top:100, left:300}, {top:300, left:300}, {top:700, left:300}, {top:900, left:300}, {top:200, left:400}, {top:500, left:400},
    {top:600, left:400}, {top:800, left:400}, {top:200, left:500}, {top:500, left:500}, {top:600, left:500}, {top:800, left:500},
    {top:100, left:600}, {top:300, left:600}, {top:700, left:600}, {top:900, left:600}, {top:900, left:700}, {top:100, left:800},
    {top:200, left:800}, {top:400, left:800}, {top:600, left:800}, {top:700, left:800}, {top:900, left:800}, {top:400, left:900},
    {top:600, left:900}, {top:800, left:900} ,
//ligne en top 0
    {top:0, left:0}, {top:0, left:100}, {top:0, left:200}, {top:0, left:300}, {top:0, left:400}, {top:0, left:500}, {top:0, left:600},
    {top:0, left:700}, {top:0, left:800}, {top:0, left:900}
]
// Collection des murs axe vertical haut-bas
const blockedSquaresToBottom = [
    {top:200, left:0}, {top:400, left:0}, {top:700, left:0}, {top:0, left:100}, {top:100, left:100}, {top:200, left:100}, {top:400, left:100},
    {top:400, left:400}, {top:400, left:500}, {top:600, left:100}, {top:800, left:100}, {top:800, left:200}, {top:0, left:300}, {top:200, left:300},
    {top:600, left:300}, {top:800, left:300}, {top:100, left:400}, {top:300, left:400}, {top:500, left:400}, {top:700, left:400}, {top:100, left:500},
    {top:300, left:500}, {top:500, left:500}, {top:700, left:500}, {top:0, left:600}, {top:200, left:600}, {top:600, left:600}, {top:800, left:600},
    {top:800, left:700}, {top:0, left:800}, {top:100, left:800}, {top:200, left:800}, {top:400, left:800}, {top:600, left:800}, {top:800, left:800},
    {top:200, left:900}, {top:400, left:900}, {top:700, left:900},
//ligne en top 900
    {top:900, left:0}, {top:900, left:100}, {top:900, left:200}, {top:900, left:300}, {top:900, left:400}, {top:900, left:500}, {top:900, left:600},
    {top:900, left:700}, {top:900, left:800}, {top:900, left:900}
]

const getPositionOf = (element) => {
    const top = parseInt(getComputedStyle(element, null).getPropertyValue('top'), 10)
    const left = parseInt(getComputedStyle(element, null).getPropertyValue('left'), 10)
    return { top, left }
}

const isTheCharacterBlocked = (characterPositon, movingDirection) => {
    let blockedSquares
    switch (movingDirection) {
        case 'toLeft':
            blockedSquares = blockedSquaresToLeft
            break
        case 'toRight':
            blockedSquares = blockedSquaresToRight
            break
        case 'toTop':
            blockedSquares = blockedSquaresToTop
            break
        case 'toBottom':
            blockedSquares = blockedSquaresToBottom
            break
    }

    return blockedSquares.some(square => {
        const topsAreEquals = characterPositon.top === square.top
        const leftsAreEquals = characterPositon.left === square.left
        return topsAreEquals && leftsAreEquals
    })
}

// Mouvements du Pacman
const movePacMan = (to) => {
    clearInterval(pacManInterval)

    pacMan.className = to

    let pacManPosition = getPositionOf(pacMan)

    pacManInterval = setInterval(() => {
        if (!isTheCharacterBlocked(pacManPosition, to)) {
            switch (to) {
                case 'toLeft':
                    pacMan.style.left = pacManPosition.left === 0 ? 900 + "px" : pacManPosition.left - 100 + "px"
                    break
                case 'toRight':
                    pacMan.style.left = pacManPosition.left === 900 ? 0 : pacManPosition.left + 100 + "px"
                    break
                case 'toTop':
                    pacMan.style.top = pacManPosition.top - 100 + "px"
                    break
                case 'toBottom':
                    pacMan.style.top = pacManPosition.top + 100 + "px"
                    break
            }
            pacManPosition = getPositionOf(pacMan)
            const dots = document.querySelectorAll('.dot')
            dots.forEach((dot) => {
                const dotPosition = getPositionOf(dot)
                //Lorsque la position de PacMan est égale à la position d'une pacgomme existante,
                if ((dotPosition.top === pacManPosition.top) && (dotPosition.left === pacManPosition.left)){
                    //On retire la pacgomme
                    map.removeChild(dot)

                    //On incrémente le score
                    score++
                    scoreUserDataBase++


                    //On affiche le nouveau score
                    document.getElementById('score').innerHTML = " " + score + " points"
                    document.getElementById('scoreUserDataBase').innerHTML = " " + scoreUserDataBase + " points"

                    //90 pacgommes par niveau, pour passer au niveau suivant, on doit manger toutes les pacgommes
                    //Sachant qu'il y a 90 pacgommes par niveau, au niveau 1 le score requis pour level up est 90
                    //Au niveau 2, 180. D'où le 90*level
                    if (score === 90*level){
                        //Lorsque le score est égal a 90,180,etc...
                        //Le niveau augmente de 1
                        level ++
                        //On  affiche de nouveau le niveau en HTML car il ne se met pas jour automatiquement
                        document.getElementById('level').innerHTML = level
                        //On remet des pacgommes
                        displayDots()
                    }
                }
            })
            isGameOver() //Vérifie après déplacement si il y a GameOver
        }
    },250)
}


//Constante qui définit le déplacement du fantôme rouge
const moveRedGhost = () => {
    clearInterval(redGhostInterval)

    let redGhostPosition = getPositionOf(redGhost)

    const randomInt = Math.floor(Math.random() * 4)
    const randomDirection = directions[randomInt] // Soit 'toLeft', 'toRight', 'toTop', 'toBottom'

    if (!isGameOver()) {
        redGhostInterval = setInterval(() => {
            currentRedGhostDirection = randomDirection

            if (!isTheCharacterBlocked(redGhostPosition, randomDirection)) {
                move(redGhost,redGhostPosition, randomDirection)
                redGhostPosition = getPositionOf(redGhost)

            } else {
                moveRedGhost() // La fonction est relancée si le fantôme est bloqué
                return
            }
            isGameOver() //Vérifie après déplacement si il y a GameOver
        }, 250)
        if (level >= 4 ){
            clearInterval(redGhostInterval)
            redGhostInterval = setInterval(() => {
                moveToPacMan(redGhost)
                isGameOver()
            },260)
        }
    }
}


//Constante qui définit le déplacement du fantôme bleu
const moveBlueGhost = () => {

    clearInterval(blueGhostInterval)

    let blueGhostPosition = getPositionOf(blueGhost)

    const randomInt = Math.floor(Math.random() * 4)
    const randomDirection = directions[randomInt]

    blueGhostInterval = setInterval(() => {
        currentBlueGhostDirection = randomDirection

        if (!isTheCharacterBlocked(blueGhostPosition, randomDirection)) {
            move(blueGhost, blueGhostPosition, randomDirection)
            blueGhostPosition = getPositionOf(blueGhost)
        } else {
            moveBlueGhost() // La fonction est relancée si le fantôme est bloqué
            return
        }
        isGameOver()
    }, 250)
    if (level >= 3 ){
        clearInterval(blueGhostInterval)
        blueGhostInterval = setInterval(() => {
            moveToPacMan(blueGhost)
            isGameOver()
        },260)
    }
}

//Constante qui définit le déplacement du fantôme rose
const movePinkGhost = () => {
    clearInterval(pinkGhostInterval)

    let pinkGhostPosition = getPositionOf(pinkGhost)

    const randomInt = Math.floor(Math.random() * 4)

    const randomDirection = directions[randomInt]

    pinkGhostInterval = setInterval (() => {
        currentPinkGhostDirection = randomDirection
        if (!isTheCharacterBlocked(pinkGhostPosition, randomDirection)) {
            move(pinkGhost, pinkGhostPosition, randomDirection)
            pinkGhostPosition = getPositionOf(pinkGhost)
        }
        else{
            movePinkGhost()
            return
        }
        isGameOver() //Vérifie après déplacement si il y a GameOver
    },250)
    if (level >= 2 ){
        clearInterval(pinkGhostInterval)
        pinkGhostInterval = setInterval(() => {
            moveToPacMan(pinkGhost)
            isGameOver()
        },260)
    }
}

const move = (character, from, to) => {
    switch (to) {
        case 'toLeft':
            character.style.left = from.left === 0 ? 900 + "px" : from.left - 100 + "px"
            break
        case 'toRight':
            character.style.left = from.left === 900 ? 0 : from.left + 100 + "px"
            break
        case 'toTop':
            character.style.top = from.top - 100 + "px"
            break
        case 'toBottom':
            character.style.top = from.top + 100 + "px"
            break
    }
}

const moveToPacMan = (ghost) => {
    const pacManPosition = getPositionOf(pacMan)
    const ghostPosition = getPositionOf(ghost)
    const delta = getDelta(pacManPosition, ghostPosition)
    let direction
    if (delta.top === delta.left) direction = [delta.topDirection, delta.leftDirection][Math.floor(Math.random() * 2)]
    if (delta.topDirection === null) direction = delta.leftDirection
    else if (delta.leftDirection === null) direction = delta.topDirection
    else direction = delta.top < delta.left ? delta.topDirection : delta.leftDirection

    if (isTheCharacterBlocked(ghostPosition, direction)) {
        direction = direction === delta.topDirection ? delta.leftDirection : delta.topDirection
        if (direction === null) {
            let otherDirections = directions.filter(direction => direction !== delta.topDirection && direction !== delta.leftDirection)
            direction = otherDirections[Math.floor(Math.random() * 2)]
        }
        console.log('direction:', direction)
    }

    while (isTheCharacterBlocked(ghostPosition, direction)) {
        let otherDirections = directions.filter(direction => direction !== delta.topDirection && direction !== delta.leftDirection)
        direction = otherDirections[Math.floor(Math.random() * 2)]
    }
    move(ghost, ghostPosition, direction)
}

const getDelta = (pacManPosition, ghostPosition) => {
    const top = pacManPosition.top - ghostPosition.top
    const left = pacManPosition.left - ghostPosition.left
    let topDirection, leftDirection
    if (top === 0) topDirection = null
    else topDirection = top > 0 ? 'toBottom' : 'toTop'
    if (left === 0) leftDirection = null
    else leftDirection = left > 0 ? 'toRight' : 'toLeft'
    return { top, left, topDirection, leftDirection }
}

//Fonction du GameOver, lorsqu'un fantôme croise PacMan ou inversement
//On afiche un message, le PacMan est emprisoné et disparait de même pour les fantômes
const isGameOver = () => {
    const redGhostPosition = getPositionOf(redGhost)
    const pinkGhostPosition = getPositionOf(pinkGhost)
    const blueGhostPosition = getPositionOf(blueGhost)
    const pacManPosition = getPositionOf(pacMan)
    if ((redGhostPosition.top === pacManPosition.top && redGhostPosition.left === pacManPosition.left)
        || (pinkGhostPosition.top === pacManPosition.top && pinkGhostPosition.left === pacManPosition.left)
        || (blueGhostPosition.top === pacManPosition.top && blueGhostPosition.left === pacManPosition.left))
    {
        redGhost.style.display = "none"
        blueGhost.style.display = "none"
        pinkGhost.style.display = "none"
        pacMan.style.left = "500" + 'px'
        pacMan.style.top = "400" + 'px'
        pacMan.style.zIndex = "-1"
        gameOverScreen.style.display = "flex"
        gameOverScreen.style.zIndex = "1"
        form.style.display= "flex"
        return true
    }
    return false
}


//Mouvement du PacMan au clavier physique
addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 37:
            movePacMan('toLeft')
            break
        case 39:
            movePacMan('toRight')
            break
        case 38:
            movePacMan('toTop')
            break
        case 40:
            movePacMan('toBottom')
            break
    }
})

//Const qui crée les pacgommes et retire celles en trop
const displayDots = () => {
    for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 10; row++) {
            const dot = document.createElement('div')
            dot.className = 'dot'
            dot.style.left = col * 100 + 'px'
            dot.style.top = row * 100 + 'px'
            map.insertBefore(dot, pacMan)
        }
    }
    map.removeChild(map.children[3])
    map.removeChild(map.children[12])
    map.removeChild(map.children[4])
    map.removeChild(map.children[12])
    map.removeChild(map.children[40])
    map.removeChild(map.children[49])
    map.removeChild(map.children[77])
    map.removeChild(map.children[86])
    map.removeChild(map.children[78])
    map.removeChild(map.children[86])
}

//Const qui lance lance le déplacement des fantômes précédemment définit et affiche les pacgommes
const start = () => {
    moveRedGhost()
    moveBlueGhost()
    movePinkGhost()
    displayDots()
}

//Lancement du jeu à la vaildation du formulaire
button.addEventListener('click', (e) => {
    e.preventDefault()
    start()
    button.style.display = "none"
    map.style.display = "block"
    document.getElementById('level').innerHTML = level
})


//Partie Ajax
const url ='index.php?controller=ajax';
let posts = [];
const ul = document.querySelector('ul');
const titleInput = document.querySelector('[type="text"]');
const submit = document.querySelector('[type="submit"]');
const messageArea = document.querySelector('.message');

window.fetch(url).then(
    // Les fonctions retournent toujours une valeur
    // Si elles retournent rien, la valeur retournée est void
    // result => result.json() // Le retour de la valeur est implicite
    // result => {
    //     console.log(result);
    //     return result.json()
    // }
    result => result.json()
).then(
    json => {
        console.log(json);// [{...},{...},{...}]
        posts = json.reverse().reverse(); // [{...},{...},{...}]
        //.reverse() pour metre les derniers post au dessus de la list
        const postsList = posts.map(post => `<li>${post.name} (${post.score}pts)</li>`);
        const ulContent = postsList;
        ul.innerHTML = ulContent;
    }
).catch(
    error => console.log(error)
);

submit.addEventListener('click', event => {
        event.preventDefault() //pour ne pas qu'il recharge la page ESSENTIEL

        // récupérer les données du formulaire
        const name = titleInput.value;
        const score = scoreUserDataBase;
        const user_id = 1;
        titleInput.value = '';
        scoreUserDataBase = '';
        fetch('index.php?controller=ajax', {
            method: 'POST',
            body: JSON.stringify({
                name,
                score,
                user_id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(
                response => response.json()
            ).then(
            json => {
                console.log(json)

                if (json.error){
                    messageArea.innerHTML = json.error;
                } else {
                    messageArea.innerHTML = json.message;
                }
            }
        ).catch(
            error => console.error(error)
        )
})
