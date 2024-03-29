import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import app from './app';

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
