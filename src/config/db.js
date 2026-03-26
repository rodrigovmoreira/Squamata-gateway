import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`\x1b[32m%s\x1b[0m`, `💾 MongoDB Conectado: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`\x1b[31m%s\x1b[0m`, `❌ Erro de conexão com MongoDB: ${error.message}`);
    // Encerra o processo se não conseguir conectar ao banco local
    process.exit(1);
  }
};

export default connectDB;