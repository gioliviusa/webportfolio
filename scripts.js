// Configuration sparkles
const particleCount = 100; // Number of particles
const particleSize = 3; // Size of particles in pixels
const particleColor = "#ffffff"; // Color of particles
const particleSpeed = 1; // Speed of particles

// Particle container
const particleContainer = document.getElementById("particle-container");

// Generate particles
for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particleContainer.appendChild(particle);
}

// Handle mouse move events
document.addEventListener("mousemove", function (event) {
  const particles = document.getElementsByClassName("particle");
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Move particles towards the mouse position
  for (let i = 0; i < particleCount; i++) {
    const particle = particles[i];
    const particleX = particle.offsetLeft + particleSize / 2;
    const particleY = particle.offsetTop + particleSize / 2;
    const dx = mouseX - particleX;
    const dy = mouseY - particleY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const moveX = (dx / distance) * particleSpeed;
    const moveY = (dy / distance) * particleSpeed;

    particle.style.left = particle.offsetLeft + moveX + "px";
    particle.style.top = particle.offsetTop + moveY + "px";

    // Adjust opacity based on distance
    const maxDistance = Math.sqrt(
      (window.innerWidth / 2) ** 2 + (window.innerHeight / 2) ** 2
    ); // Maximum distance from the center of the screen
    const opacity = 1 - distance / maxDistance;
    particle.style.opacity = opacity;
  }

  // Create a sparkle at the mouse position
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.left = mouseX + "px";
  sparkle.style.top = mouseY + "px";
  particleContainer.appendChild(sparkle);

  // Remove the sparkle after a short delay
  setTimeout(function () {
    particleContainer.removeChild(sparkle);
  }, 1000);
});


// adding typing animation

document.addEventListener('DOMContentLoaded', () => {
    let texts = [
      "Fast and secure transactions",
      "Ian Token's blockchain technology ensures that transactions are processed quickly and securely.",
      "Decentralized finance",
      "Ian Token is built on decentralized finance principles, providing users with more control over their financial assets.",
      "Low transaction fees",
      "Ian Token's low transaction fees make it an attractive option for users who want to save money on fees.",
      "Global accessibility",
      "Ian Token is accessible to anyone with an internet connection, making it an ideal choice for those who want to participate in the global economy.",
      "I hope you're having a great day!"
    ];
  
    function typeWriterEffect(element, texts, delay) {
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
  
      function animateTyping() {
        const currentText = texts[textIndex];
        const displayedText = isDeleting ? currentText.substring(0, charIndex - 1) : currentText.substring(0, charIndex + 1);
        element.innerHTML = displayedText;
  
        if (!isDeleting) {
          charIndex++;
        } else {
          charIndex--;
        }
  
        if (charIndex === currentText.length + 1) {
          isDeleting = true;
        }
  
        if (charIndex === 0 && isDeleting) {
          isDeleting = false;
          textIndex++;
          if (textIndex === texts.length) {
            textIndex = 0;
          }
        }
  
        const typingDelay = isDeleting ? delay / 2 : delay;
  
        if (charIndex <= currentText.length) {
          setTimeout(animateTyping, typingDelay);
        } else {
          setTimeout(animateTyping, 1000); // Delay before starting the deletion
        }
      }
  
      animateTyping();
    }
  
    const typingElement = document.getElementById('typing-effect');
    typeWriterEffect(typingElement, texts, 100);
  });
  





//   adding the game

let selectedNumber;
let betAmount;
let previousSelection;
let currentStep = 1;

function createGrid() {
  const gridContainer = document.getElementById('gridContainer');

  for (let i = 0; i <= 36; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.textContent = i;
    gridItem.addEventListener('click', () => {
      selectedNumber = i;
      highlightSelectedNumber(gridItem);
    });

    gridContainer.appendChild(gridItem);
  }
}

function highlightSelectedNumber(gridItem) {
  const gridItems = document.getElementsByClassName('grid-item');
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].classList.remove('selected');
  }
  gridItem.classList.add('selected');
}

function goToStep(step) {
  const currentScreen = document.getElementById(`step${currentStep}`);
  currentScreen.style.display = 'none';

  currentStep = step;

  const nextScreen = document.getElementById(`step${currentStep}`);
  nextScreen.style.display = 'block';

  if (currentStep === 1) {
    clearSelection();
  }

  if (currentStep === 4) {
    showLoadingResult();
  }
}

function clearSelection() {
  const gridItems = document.getElementsByClassName('grid-item');
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].classList.remove('selected');
  }
}

function selectBetAmount() {
  betAmount = parseInt(document.getElementById('betAmountInput').value);
  if (isNaN(betAmount) || betAmount <= 0) {
    alert('Invalid bet amount! Please try again.');
  } else {
    goToStep(3);
  }
}

function showLoadingResult() {
  const resultText = document.getElementById('resultText');
  const loadingInterval = setInterval(() => {
    const loadingNumber = Math.floor(Math.random() * 37); // Generates a random number from 0 to 36
    resultText.textContent = `Loading... ${loadingNumber}`;
  }, 100); // Change the interval speed if needed

  setTimeout(() => {
    clearInterval(loadingInterval);
    const winningNumber = Math.floor(Math.random() * 37); // Generates a random number from 0 to 36
    resultText.textContent = `The winning number is: ${winningNumber}`;
    if (winningNumber === selectedNumber) {
      const prize = betAmount * 36;
      resultText.textContent += ` - You won ${prize}!`;
    } else {
      resultText.textContent += ` - You lost!`;
    }
    previousSelection = selectedNumber;
  }, 4000); // Change the timeout duration if needed
}

function restartGame() {
  currentStep = 1;
  previousSelection = null;
  goToStep(currentStep);
}

createGrid();

// Add event listener to "Restart" button in the last step
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);
