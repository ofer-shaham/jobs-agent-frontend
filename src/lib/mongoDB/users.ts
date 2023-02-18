import { UserOptions } from '../user';
import clientPromise from './mongoDB';

export const createUser = async (userData: UserOptions) => {
  const jobsDB = (await clientPromise).db('job-agent-db');
  const users = jobsDB.collection('Users');
  console.log(userData);
  try {
    const res = await users.updateOne(
      {
        userID: userData.userID
      },
      {
        $set: {
          ...userData
        }
      },
      {
        upsert: true
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
