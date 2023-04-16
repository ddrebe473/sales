import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async(uri: string) => {
  const options: ConnectOptions = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  };

  return mongoose.connect(uri, options)
    .then(() => console.log('Database Connected'))
    .catch((err: any) => console.log(err));
};

module.exports = connectDB;