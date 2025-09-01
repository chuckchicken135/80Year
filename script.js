const book = document.getElementById("book");
const canvas = document.getElementById("fireworks-canvas");
const ctx = canvas.getContext("2d");
const backgroundMusic = document.getElementById("background-music");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
const particles = [];
let isFireworksActive = false;
let stopFireworksTimeout;

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = (Math.random() * canvas.height) / 2;
    this.speed = 8;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
  }
  update() {
    this.y -= this.speed;
    if (this.y <= this.targetY) {
      this.explode();
      return true;
    }
    this.draw();
    return false;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  explode() {
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(this.x, this.y, this.color));
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 5 + 1;
    this.angle = Math.random() * Math.PI * 2;
    this.color = color;
    this.alpha = 1;
    this.friction = 0.97;
    this.gravity = 0.08;
  }
  update() {
    this.speed *= this.friction;
    this.y += this.gravity;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.alpha -= 0.02;
    this.draw();
    return this.alpha <= 0;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isFireworksActive && Math.random() < 0.05) {
    fireworks.push(new Firework());
  }
  for (let i = fireworks.length - 1; i >= 0; i--) {
    if (fireworks[i].update()) {
      fireworks.splice(i, 1);
    }
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].update()) {
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(animate);
}

function handleFireworks() {
  if (book.classList.contains("open")) {
    if (!isFireworksActive) {
      isFireworksActive = true;
      stopFireworksTimeout = setTimeout(() => {
        isFireworksActive = false;
      }, 15000);
    }
  } else {
    isFireworksActive = false;
    clearTimeout(stopFireworksTimeout);
  }
}

book.addEventListener("click", function () {
  this.classList.toggle("open");
  if (this.classList.contains("open")) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }
  setTimeout(handleFireworks, 500);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedData = urlParams.get("data");

  if (encodedData) {
    document.getElementById("creation-container").style.display = "none"; // Ẩn form tạo thiệp
    try {
      const jsonString = decodeURIComponent(escape(atob(encodedData)));
      const cardData = JSON.parse(jsonString);

      const messageElement = document.getElementById("card-message");
      messageElement.innerHTML = cardData.msg.replace(/\n/g, "<br>");
      messageElement.style.opacity = "1";
      messageElement.style.transform = "translateX(-50%) translateY(0)";
    } catch (error) {
      document.getElementById("card-message").innerText =
        "Lỗi: Nội dung thiệp không hợp lệ.";
    }
  } else {
    setupCreationMode();
  }
};

function setupCreationMode() {
  document.getElementById("generate-btn").addEventListener("click", () => {
    const message = document.getElementById("message-input").value;
    if (!message.trim()) {
      alert("Vui lòng nhập lời chúc!");
      return;
    }

    const cardData = { msg: message };
    const jsonString = JSON.stringify(cardData);
    const encodedData = btoa(unescape(encodeURIComponent(jsonString)));

    const baseUrl = window.location.href.split("?")[0];
    const viewUrl = `${baseUrl}?data=${encodedData}`;

    const resultBox = document.getElementById("result-box");
    const generatedLinkInput = document.getElementById("generated-link");
    generatedLinkInput.value = viewUrl;
    resultBox.style.display = "block";
  });

  document.getElementById("copy-btn").addEventListener("click", () => {
    const linkInput = document.getElementById("generated-link");
    linkInput.select();
    document.execCommand("copy");
    alert("Đã sao chép link!");
  });
}

animate();
