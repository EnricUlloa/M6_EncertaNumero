let maxNumber = parseInt(prompt("Indica el número màxim pel joc:", "10")) || 10;
let secretNumber = Math.floor(Math.random() * maxNumber) + 1;
let attempts = 20;
let bestScore = localStorage.getItem("bestScore") || "-";
let history = [];

document.getElementById("attempts").textContent = attempts;
document.getElementById("best-score").textContent = bestScore;

document.getElementById("check").addEventListener("click", () => {
    let guess = Number(document.getElementById("guess").value);
    
    if (!guess || guess < 1 || guess > maxNumber) {
        alert(`El número introduït no és correcte. Ha de ser entre 1 i ${maxNumber}`);
        return;
    }

    history.push(guess);
    document.getElementById("history").textContent = history.join(", ");
    
    attempts--;
    document.getElementById("attempts").textContent = attempts;

    if (guess < secretNumber) {
        document.getElementById("message").textContent = "El número és més gran!";
    } else if (guess > secretNumber) {
        document.getElementById("message").textContent = "El número és més petit!";
    } else {
        document.getElementById("message").textContent = "🎉 Felicitats! Has encertat!";
        document.getElementById("message").style.color = "green";
        document.getElementById("secret-number").textContent = secretNumber;
        document.getElementById("reset").disabled = false;
        document.getElementById("check").disabled = true; // Evita seguir jugando

        if (bestScore === "-" || attempts > bestScore) {
            localStorage.setItem("bestScore", attempts);
            document.getElementById("best-score").textContent = attempts;
        }
    }

    if (attempts === 0) {
        document.getElementById("message").textContent = `😢 Has perdut! El número era ${secretNumber}`;
        document.getElementById("message").style.color = "red";
        document.getElementById("secret-number").textContent = secretNumber;
        document.getElementById("reset").disabled = false;
        document.getElementById("check").disabled = true; // Evita seguir jugando
    }
});

document.getElementById("reset").addEventListener("click", () => {
    maxNumber = parseInt(prompt("Indica el número màxim pel joc:", "10")) || 10;
    secretNumber = Math.floor(Math.random() * maxNumber) + 1;
    attempts = 20;
    history = [];
    document.getElementById("attempts").textContent = attempts;
    document.getElementById("history").textContent = "";
    document.getElementById("secret-number").textContent = "?";
    document.getElementById("message").textContent = "Comencem la partida...";
    document.getElementById("message").style.color = "black";
    document.getElementById("reset").disabled = true;
    document.getElementById("check").disabled = false; // Reactivar el botón de jugar
});
