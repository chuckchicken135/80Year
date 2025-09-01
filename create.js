const messageInput = document.getElementById("message-input");
const createBtn = document.getElementById("create-btn");
const outputGroup = document.querySelector(".output-group");
const outputLink = document.getElementById("output-link");
const copyBtn = document.getElementById("copy-btn");
const templateOptions = document.querySelectorAll(".template-option");

let selectedTemplate = "template1"; // Mẫu mặc định

// Xử lý việc chọn mẫu thiệp
templateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // Bỏ class 'active' ở tất cả các mẫu
    templateOptions.forEach((opt) => opt.classList.remove("active"));
    // Thêm class 'active' cho mẫu được chọn
    option.classList.add("active");
    selectedTemplate = option.getAttribute("data-template");
  });
});

// Xử lý khi nhấn nút "Tạo Link"
createBtn.addEventListener("click", () => {
  const message = messageInput.value;
  if (!message.trim()) {
    alert("Vui lòng nhập lời chúc!");
    return;
  }

  // 1. Đóng gói dữ liệu vào JSON
  const data = {
    message: message,
    template: selectedTemplate,
  };
  const jsonString = JSON.stringify(data);

  // 2. Mã hóa sang Base64 (hỗ trợ tiếng Việt)
  // Dùng mẹo unescape(encodeURIComponent()) để xử lý ký tự Unicode
  const encodedData = btoa(unescape(encodeURIComponent(jsonString)));

  // 3. Tạo link hoàn chỉnh
  const baseUrl = window.location.href.substring(
    0,
    window.location.href.lastIndexOf("/")
  );
  const finalUrl = `${baseUrl}/card.html?data=${encodedData}`;

  // Hiển thị link
  outputLink.value = finalUrl;
  outputGroup.style.display = "block";
});

// Xử lý sao chép link
copyBtn.addEventListener("click", () => {
  outputLink.select();
  document.execCommand("copy");
  alert("Đã sao chép link!");
});
