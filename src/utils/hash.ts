/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as bcrypt from 'bcrypt';

const Hash = {
  /**
   * Hashes a string using bcrypt.
   * @param string - The string to hash.
   * @returns A promise that resolves to the hashed string.
   */
  hashString: async (string: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(string, salt);
  },
  /**
   * Compares a string with a hashed string using bcrypt.
   * @param string - The string to compare.
   * @param hashedString - The hashed string to compare against.
   * @returns A promise that resolves to true if the strings match, false otherwise.
   */
  compareString: async (
    string: string,
    hashedString: string,
  ): Promise<boolean> => {
    return await bcrypt.compare(string, hashedString);
  },

  /**
   * Hashes an object using bcrypt.
   * @param object - The object to hash.
   * @returns A promise that resolves to the hashed object.
   */
  hashObject: async (object: object): Promise<string> => {
    const stringifiedObject = JSON.stringify(object);
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(stringifiedObject, salt);
  },

  /**
   * Compares an object with a hashed object using bcrypt.
   * @param object - The object to compare.
   * @param hashedObject - The hashed object to compare against.
   * @returns A promise that resolves to true if the objects match, false otherwise.
   */
  compareObject: async (
    object: object,
    hashedObject: string,
  ): Promise<boolean> => {
    const stringifiedObject = JSON.stringify(object);
    return await bcrypt.compare(stringifiedObject, hashedObject);
  },
};

export default Hash;
