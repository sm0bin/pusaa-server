const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');

// Middleware
app.use(express.json())
app.use(cors({
    origin: [
        "http://localhost:5173",
    ],
    credentials: true
}));

// Routes
app.use('/users', userRoutes);
app.use('/', (req, res) => {
    res.send("PUSAA Server is running...");
})

// Server`
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));