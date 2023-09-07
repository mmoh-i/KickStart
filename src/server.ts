import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { createNewUser, signin } from './handlers/user';
import { protect } from './modules/auth';

const app = express();
// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/', (req, res) => {
  res.json({ message: 'endpoint' });
});

// Apply /api routes with protect middleware
app.use('/api', protect, router); // http://localhost:5002/api

// Apply protect middleware before routes that require it
app.post('/register', createNewUser);
app.post('/signin', signin); // Apply protect middleware here


app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({message: 'unauthorized'})
  } else if (err.type === 'input') {
    res.status(400).json({message: 'invalid input'})
  } else {
    res.status(500).json({message: 'oops, thats on us'})
  }
})
// Listen on a port
// app.listen(process.env.PORT, () => {
//   console.log('Server is running on port 5003');
// });

export default app;