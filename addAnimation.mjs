import { promises } from 'fs';
import { dirname, basename } from 'path';

const addAnimation = async ({
  path,
}) => {
  try {
    console.log(path);
    const file = await promises.readFile(path);
    const copyFileName = `${dirname(path)}/copy_${basename(path)}`;

    const json = JSON.parse(file.toString());

    if (!json?.frames) throw Error('Invalid JSON or theres no "frames" prop');

    const animations = Object.entries(
      Object
        .keys(json.frames)
        .reduce((acc, key) => {
          const groupName = key.replace(/\d*.png/, '');

          if (!acc[groupName]) acc[groupName] = [];

          acc[groupName].push(key);

          return acc;
        }, {})
    ).reduce((acc, [key, val]) => {
      acc[key] = val.sort();
      return acc;
    }, {});

    const newJson = {
      ...json,
      animations,
    }

    await promises.writeFile(copyFileName, JSON.stringify(newJson, null, 2));
  } catch (err) {
    console.error(err);
  }
}

const path = process.argv.find(val => val.includes('path='));

if (!path) throw new Error('You must pass a path prop like path=<path to file>');

addAnimation({ path: path.slice(5) });