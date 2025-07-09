import dotenvFlow from 'dotenv-flow';
import env from 'env-var';

dotenvFlow.config();

const PORT = env.get('PORT').required().asPortNumber();
const MONGO_URI = env.get('MONGO_URI').required().asString();
const SESSION_SECRET = env.get('SESSION_SECRET').required().asString();

const GMAIL_USER = env.get('GMAIL_USER').required().asString();
const GMAIL_PASS = env.get('GMAIL_PASS').required().asString();



const CLOUDINARY_CLOUD_NAME = env.get('CLOUDINARY_CLOUD_NAME').required().asString();
const CLOUDINARY_API_KEY    = env.get('CLOUDINARY_API_KEY').required().asString();
const CLOUDINARY_API_SECRET = env.get('CLOUDINARY_API_SECRET').required().asString();

export { PORT, MONGO_URI, SESSION_SECRET, GMAIL_USER, GMAIL_PASS, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } 