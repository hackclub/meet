import { promises as fs } from 'fs';
import path from 'path';

const cacheTime = 5 * 60 * 1000;
const cacheFile = '/tmp/.cache.json'

const getCache = async () => {
  try {
    const cache = JSON.parse(await fs.readFile(cacheFile));
    if (cache.timestamp + cacheTime > Date.now())
      return cache.data;
    else
      return null;
  } catch(ex) {
    console.log(ex);
    return null;
  }
}

const storeCache = async data => {
  const dataString = JSON.stringify({ timestamp: Date.now(), data});
  await fs.writeFile(cacheFile, dataString);
}

export default async function fetchUsers() {
  const cache = await getCache();
  if (cache) return cache;

  let users = await fetch(
    "https://scrapbook.hackclub.com/api/users/"
  ).then((r) => r.json());
  users = users.filter(u => u.updatesCount > 5)
  await storeCache(users);
  return users;
}
