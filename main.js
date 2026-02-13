const introScreen = document.getElementById('intro-screen');
const envelope = document.getElementById('envelope');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const bribeMsg = document.getElementById('bribe-msg');
const mainPrompt = document.getElementById('main-prompt');
const particlesContainer = document.getElementById('particles');
const burstOverlay = document.getElementById('burst-overlay');

let bribeIndex = 0;
let noClickCount = 0;
const bribes = [
  "I'll buy you pizza! 🍕",
  "I'll give you double hugs! 🤗",
  "But I have flowers! 💐",
  "Wait, let's talk about this... 🥺",
  "I promise no more bad jokes! 😂",
  "Please? Just one 'Yes'? 🙏"
];

const emotionalPrompts = [
  "Are you sure? 🥺",
  "Don't you love me? 😭",
  "Think about the fries! 🍟",
  "My heart is breaking... 💔"
];

// Open Envelope
envelope.addEventListener('click', () => {
  introScreen.style.display = 'none';
  document.getElementById('screen-1').classList.add('active');
  createBurst(20);
});

// Screen Logic
window.nextScreen = (current) => {
  document.getElementById(`screen-${current}`).classList.remove('active');
  const next = current === 1 ? 3 : current + 1;
  document.getElementById(`screen-${next}`).classList.add('active');
};

// Playful "No" Button
const moveNoButton = () => {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

  noBtn.style.position = 'fixed';
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // Show funny bribe message
  bribeMsg.innerText = bribes[bribeIndex];
  bribeMsg.style.opacity = '1';
  bribeIndex = (bribeIndex + 1) % bribes.length;

  setTimeout(() => {
    bribeMsg.style.opacity = '0';
  }, 2000);
};

noBtn.addEventListener('mouseover', () => {
  if (noClickCount >= 2) {
    moveNoButton();
  }
});

noBtn.addEventListener('click', () => {
  if (noClickCount < emotionalPrompts.length) {
    mainPrompt.innerText = emotionalPrompts[noClickCount];
    mainPrompt.style.color = 'var(--primary-pink)';
    mainPrompt.style.fontSize = '1.5rem';
    noClickCount++;
  } else {
    moveNoButton();
  }
});

// "Yes" Button
yesBtn.addEventListener('click', () => {
  // 1. Show Burst Animation
  burstOverlay.style.display = 'flex';

  setTimeout(() => {
    document.getElementById('screen-3').classList.remove('active');
    document.getElementById('celebration').classList.add('active');

    // Hide photos for a clean celebration screen or keep them? 
    // Let's hide them for focus.
    document.querySelectorAll('.polaroid').forEach(p => p.style.opacity = '0');

    // 2. Continuous Celebration Particles
    setInterval(() => createHeartParticle(), 50);
  }, 600);
});

// Particles
function createHeartParticle() {
  const heart = document.createElement('div');
  heart.className = 'heart-particle';
  heart.innerHTML = ['❤️', '💖', '💝', '💕', '💗'][Math.floor(Math.random() * 5)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.bottom = '-50px';
  heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
  particlesContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 3000);
}

function createBurst(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(createHeartParticle, i * 50);
  }
}
