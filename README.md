# 🌦️ Weather Forecasting Web Application

A **full-stack MERN Weather Forecasting application** that allows users to search for any city and view **current weather conditions, 24-hour forecasts, and air quality information**.  
The project uses the **OpenWeatherMap API** and stores search history in a MongoDB database.

---

## 🚀 Features

- 🌍 Search weather by **city name**
- 🌡️ Displays **current temperature, humidity, wind speed**
- ⏱️ **24-hour weather forecast**
- 🌫️ **Air Quality Index (AQI)** calculation using PM2.5 values
- 🗂️ Stores **search history** in MongoDB
- 📱 Fully **responsive frontend**
- 🔒 Environment variable–based API security

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- HTML, CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios

### API
- OpenWeatherMap API

---

## 📁 Project Structure

weather_forecasting/
│
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ └── weatherController.js
│ ├── models/
│ │ └── Search.js
│ ├── routes/
│ │ └── weather.js
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── public/
│ ├── src/
│ ├── .env
│ └── package.json
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/saroj019/weather_forecasting.git
cd weather_forecasting

2️⃣ Backend Setup

cd backend
npm install

Create a .env file in the backend folder:

MONGO_URI=your_mongodb_connection_string
OPENWEATHER_API_KEY=your_openweather_api_key
PORT=5000

Start the backend server:
npm start

3️⃣ Frontend Setup

cd frontend
npm install
npm start

Frontend runs on:
http://localhost:3000

Backend runs on:
http://localhost:5001

```

📊 AQI Calculation

The Air Quality Index (AQI) is calculated using PM2.5 concentration values based on US EPA AQI standards.
| AQI Range | Category                          |
| --------- | --------------------------------- |
| 0–50      | 🟢 Good                           |
| 51–100    | 🟡 Moderate                       |
| 101–150   | 🟠 Unhealthy for Sensitive Groups |
| 151–200   | 🔴 Unhealthy                      |
| 201–300   | 🟣 Very Unhealthy                 |
| 301–500   | ⚫ Hazardous                       |


🧪 API Endpoints

| Method | Endpoint                      | Description            |
| ------ | ----------------------------- | ---------------------- |
| GET    | `/api/weather?city=CityName`  | Fetch current weather  |
| GET    | `/api/forecast?city=CityName` | Fetch 24-hour forecast |
| GET    | `/api/history`                | Get search history     |



##📌 Future Enhancements

🌎 Auto-detect location weather

📈 Graph-based forecast visualization

⭐ Favorite cities feature

🌙 Dark mode support



