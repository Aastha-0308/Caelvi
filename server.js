import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';

import path from 'path';
import { existsSync } from 'fs';

// CONFIG IMPORTS
import { MONGO_URI, PORT, SESSION_SECRET} from './config.js';
// database imports
import { connectDB } from './database/index.js';
// mdwares imports
import denyAuthenticated from './mdwares/denyAuthenticated.js';
// Routers imports
import AuthRouter from './routes/auth.js';
import UserRouter from './routes/user.js';
import EchoRouter from './routes/echo.js';
import NestRouter from './routes/nest.js';
// ese type karo hints dikhai denge wohi hai wo 
await connectDB();


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl:MONGO_URI }),
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.flash = req.flash('message'); 
  res.locals.session = req.session;
  next();
});
app.use(express.static('public'))
app.set('view engine', 'ejs');


app.get('/',denyAuthenticated, (req,res) => {return res.render('home')})

// ROUTES 
app.use(AuthRouter)
app.use(UserRouter)
app.use(EchoRouter)
app.use(NestRouter)

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`))