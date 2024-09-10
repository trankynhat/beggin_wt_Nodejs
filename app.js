const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

app.use(helmet());
app.use(cors());

const port = process.env.port || 3000;
const jwtSecret = process.env.JWT_SERCET;

// Middleware để phân tích JSON
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  jwt.verify(token, "your_jwt_secret", (err, user) => {
    if (err) return res.status(403).send("Forbidden");
    req.user = user;
    next();
  });
};
// Route bảo vệ
app.get("/protected", authenticateToken, (req, res) => {
  res.send("Bạn đã được xác thực!");
});

// Đăng nhập và tạo token
app.post("/login", (req, res) => {
  // Giả sử đây là thông tin hợp lệ
  const user = { name: req.body.name };

  const token = jwt.sign(user, jwtSecret);
  res.json({ token });
});

// Dữ liệu mẫu
let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

// GET tất cả items
app.get("/items", (req, res) => {
  res.json(items);
});

// GET một item theo ID
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item không tìm thấy");
  }
});

// POST thêm một item mới
app.post("/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT cập nhật một item theo ID
app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(404).send("Item không tìm thấy");
  }
});

// DELETE xóa một item theo ID
app.delete("/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index !== -1) {
    items.splice(index, 1);
    res.status(204).send(); // Không trả về nội dung
  } else {
    res.status(404).send("Item không tìm thấy");
  }
});

app.listen(port, () => {
  console.log("Server đang chạy tại port 3000");
});
