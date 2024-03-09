
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./server/routes/auth.routes.js";
import userRoutes from "./server/routes/user.routes.js";
import connectDB from "./server/DB/databaseConfigs.js";


const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;


dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
	res.send("Server Running");
});
app.post('/post-to-google-sheet', async (req, res) => {
	try {
	  const response = await fetch('https://script.google.com/macros/s/AKfycbwsvc3U4tgJvAeO-Jq_0oF1lt995XR3UOdKCTwQWGxFUua485Blqo02IRCPWRUfl1laVw/exec', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(req.body)
	  });
	  const data = await response.text();
	  res.send(data);
	} catch (error) {
	  console.error('Error:', error);
	  res.status(500).send('Internal server error');
	}
  });

app.post('/post-to-google-sheet-contact', async (req, res) => {
	try {
	  const response = await fetch('https://script.google.com/macros/s/AKfycbyhIia2bOEjrPVUk2oN3snIbJuZwLrlqsn6QpjqP7fJT_G0wO_eFkn3nntMS3hTehSMeQ/exec', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(req.body)
	  });
	  const data = await response.text();
	  res.send(data);
	} catch (error) {
	  console.error('Error:', error);
	  res.status(500).send('Internal server error');
	}
  });
  
app.listen(PORT, () => {
	connectDB();
	console.log(`Server Running on port ${PORT}`);
});