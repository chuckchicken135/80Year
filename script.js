// --- Code cũ của bạn ---
const book = document.getElementById("book");
const canvas = document.getElementById("fireworks-canvas");
const ctx = canvas.getContext("2d");
const backgroundMusic = document.getElementById("background-music"); // MỚI: Lấy phần tử audio

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ... (Toàn bộ code pháo hoa và các class giữ nguyên) ...
class Firework {
  /* ... */
}
class Particle {
  /* ... */
}
function animate() {
  /* ... */
}
function handleFireworks() {
  /* ... */
}
// ... (Kết thúc phần code pháo hoa) ...

// THAY ĐỔI: Cập nhật sự kiện click để điều khiển nhạc
book.addEventListener("click", function () {
  // Dòng này vẫn giữ nguyên, nó thực hiện hành động lật trang
  this.classList.toggle("open");

  // MỚI: Thêm logic điều khiển nhạc
  if (this.classList.contains("open")) {
    // Nếu thiệp được MỞ, thì phát nhạc
    backgroundMusic.play();
  } else {
    // Nếu thiệp được ĐÓNG, thì dừng nhạc và tua về đầu
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }

  // Giữ nguyên hàm gọi pháo hoa
  setTimeout(handleFireworks, 500);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// --- BẮT ĐẦU PHẦN CODE LOGIC MỚI ---
window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedData = urlParams.get("data");

  if (encodedData) {
    // CHẾ ĐỘ XEM THIỆP
    document.getElementById("creation-container").style.display = "none";
    book.style.display = "flex";
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
    // CHẾ ĐỘ TẠO THIỆP
    setupCreationMode();
  }
};

function setupCreationMode() {
  /* ... Giữ nguyên hàm này ... */
}

// Bắt đầu chạy hiệu ứng pháo hoa
animate();
