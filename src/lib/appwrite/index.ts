import { Client, Databases, Query } from 'appwrite';
import { env } from '~/env';
import type { Schedule } from '~/types';

const client = new Client();

const databases = new Databases(client);

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(env.APPWRITE_PROJECT_ID);

export const getSchedule = async (address: string) => {
  const res = await databases.listDocuments('public', 'users', [
    Query.equal('address', address),
    Query.limit(1),
  ]);

  return res.documents.at(0) ?? null;
};

export const createSchedule = async (address: string, data: Schedule) => {
  const res = await databases.createDocument('public', 'users', '', data);
  return res;
};

export const updateSchedule = async (address: string, data: Schedule) => {
  const schedule = await getSchedule(address);
  if (!schedule) {
    const res = await createSchedule(address, data);
    return res.$id;
  } else {
    const res = await databases.updateDocument(
      'public',
      'users',
      schedule.$id,
      data
    );
    return res.$id;
  }
};
