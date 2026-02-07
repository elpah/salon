import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRoute from "./routes/adminRoutes.js";
// import clientRoute from "./routes/clientRoutes.js";
// import webhookRoute from "./routes/webhookRoute.js";


dotenv.config();
const app = express();
// app.use("/webhook", webhookRoute);

// CORS and JSON parsing for other routes
app.use(cors());
app.use(express.json());
app.use("/admin/api/", adminRoute);
// app.use("/client/api/", clientRoute);

app.get("/health", (_, res) => res.json({ ok: true }));

app.listen(8000, () => console.log("Backend running on http://localhost:8000"));

export default app;
