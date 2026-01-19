const config = {
    gravity: 0.6,
    jumpStrength: 10,
    speedStart: 5,
    speedMax: 13,
    speedIncrement: 0.001,
    spawnMin: 60,
    spawnMax: 140
};

let state = {
    playing: false,
    gameOver: false,
    score: 0,
    speed: config.speedStart,
    frames: 0,
    nextSpawn: 0,
    y: 0,
    vy: 0,
    jumping: false,
    obstacles: []
};

const dino = document.getElementById("dino");
const world = document.getElementById("world");
const scoreEl = document.getElementById("score-val");
const hiScoreEl = document.getElementById("hi-score-val");
const msg = document.getElementById("game-message");
const btnRestart = document.getElementById("btn-restart");

hiScoreEl.textContent =
    String(localStorage.getItem("dinoHighScore") || 0).padStart(5, "0");

function startGame() {
    state = { ...state, playing: true, gameOver: false, score: 0, frames: 0 };
    world.querySelectorAll(".obstacle").forEach(o => o.remove());
    msg.style.display = "none";
    dino.classList.add("dino-running");
    requestAnimationFrame(loop);
}

function gameOver() {
    state.playing = false;
    state.gameOver = true;
    dino.classList.remove("dino-running");
    msg.style.display = "flex";

    const hi = Math.max(state.score | 0, hiScoreEl.textContent | 0);
    localStorage.setItem("dinoHighScore", hi);
    hiScoreEl.textContent = String(hi).padStart(5, "0");
}

function spawnObstacle() {
    const o = document.createElement("div");
    o.className = "obstacle";
    o.style.width = "20px";
    o.style.height = "40px";
    o.style.left = world.clientWidth + "px";
    world.appendChild(o);

    state.obstacles.push({ el: o, x: world.clientWidth });
}

function loop() {
    if (!state.playing) return;

    state.frames++;
    state.score += 0.1;
    scoreEl.textContent = String(state.score | 0).padStart(5, "0");

    if (state.frames > state.nextSpawn) {
        spawnObstacle();
        state.nextSpawn =
            state.frames + Math.random() * (config.spawnMax - config.spawnMin);
    }

    state.obstacles.forEach((o, i) => {
        o.x -= state.speed;
        o.el.style.left = o.x + "px";
        if (o.x < -50) {
            o.el.remove();
            state.obstacles.splice(i, 1);
        }
    });

    if (state.speed < config.speedMax)
        state.speed += config.speedIncrement;

    requestAnimationFrame(loop);
}

document.addEventListener("keydown", e => {
    if (e.code === "Space" && !state.playing) startGame();
});

btnRestart.addEventListener("click", startGame);