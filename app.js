import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import petRoutes from './routes/petRoutes.js';
import methodOverride from 'method-override';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static("public"));
// app.use(express.static(join(__dirname, 'public')));


app.use('/pets', petRoutes);

app.get('/', (req, res) => {
  res.redirect('/pets');
});

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
