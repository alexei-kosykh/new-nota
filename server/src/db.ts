import { MongoClient } from 'mongodb';

const URL: string =
  'mongodb+srv://alexeikosykh97:M9T4NmrDGcl5vtPi@cluster0.ul5wlao.mongodb.net/time-reserv?retryWrites=true&w=majority';

let dbConnection: any;

export const connectToDb = () => {
  MongoClient.connect(URL)
    .then((client) => {
      console.log('DB connected');
      dbConnection = client.db();
    })
    .catch((err) => console.log('DB error', err));
};

export const getDb = () => dbConnection;
