import allowedOrigins from './allowedOrigins';
import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: 'GET,POST,PUT,DELETE',
};

export default corsOptions;
