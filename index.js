// index.js
const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/errorMiddleware');
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin:[process.env.APP_URL], 
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true
})); 
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret: process.env.APP_KEY, 
    resave: false, 
    saveUninitialized: false, 
    cookie:{
        // Session Expiry Time 24mins
        expires: 60 * 60 * 24,
        // Enable only for HTTPS
        secure: true,
        // Prevent client-side access to cookies
        httpOnly: true,
        // Mitigate CSRF attacks
        sameSite: 'strict'
    }
}))



// Error middleware
app.use(errorMiddleware);

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
	if (req.session.user) {
		next();
	} else {
		res.redirect("/login");
	}
};

// Routes
app.use('/login', loginRoutes);
app.use('/users', userRoutes);

app.get('/getSessionInfos', isAuthenticated, function(req,res,next){
   res.send(req.session);
});

app.get("/logout", (req, res) => {
	// Destroy the session and redirect to the login page
	req.session.destroy(() => {
		res.clearCookie("sessionId");
	});
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
