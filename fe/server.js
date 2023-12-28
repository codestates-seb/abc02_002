const express = require("express");
const jsonServer = require("json-server");
const path = require("path");

const app = express();

// JSON Server 미들웨어를 생성합니다.
const jsonServerMiddleware = jsonServer.defaults();

// JSON Server 설정
const jsonServerRouter = jsonServer.router(path.join(__dirname, "db.json")); // db.json 파일 경로 지정

// JSON Server의 미들웨어를 Express 앱에 등록합니다.
app.use("/api", jsonServerMiddleware); // /api 경로로 JSON Server의 미들웨어를 사용합니다.

// Express 서버와 JSON Server를 동시에 실행합니다.
app.use("/api", jsonServerRouter); // /api 경로로 JSON Server를 사용합니다.

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
