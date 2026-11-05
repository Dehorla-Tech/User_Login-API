import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
       res.status(200).json({
    success: true,
    message: "Hello World",
    service: "User Login API",
  });
})

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy and ready to accept requests",
  });
});

app.post("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "POST request received successfully",
    receivedData: req.body,
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  // Testing only...
  res.status(200).json({
    success: true,
    message: "Login test successful",
    username,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Application error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

export default app;