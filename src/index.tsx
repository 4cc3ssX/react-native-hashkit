import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-hashkit' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const Hashkit = NativeModules.Hashkit
  ? NativeModules.Hashkit
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export type AvailableAlgorithms =
  | 'md5'
  | 'sha1'
  | 'sha224'
  | 'sha384'
  | 'sha256'
  | 'sha512'
  | 'hmacSHA256';

/**
 * @param message The message to hash.
 * @param key The secret key.
 * @return The HMAC (encoded in hex).
 *
 * @example const hash = await hmacSHA256(message, key);
 */
export const hmacSHA256 = async (
  message: string,
  key: string
): Promise<string> => Hashkit.hmacSHA256(message, key);

/**
 * @param data The data to hash.
 * @return The md5 hash.
 *
 * @example const hash = await md5(data);
 */
export const md5 = async (data: string): Promise<string> => Hashkit.md5(data);

/**
 * @param data The data to hash.
 * @return The sha1 hash.
 *
 * @example const hash = await sha1(data);
 */
export const sha1 = async (data: string): Promise<string> => Hashkit.sha1(data);

/**
 * @param data The data to hash.
 * @return The sha384 hash.
 *
 * @example const hash = await sha384(data);
 */
export const sha384 = async (data: string): Promise<string> =>
  Hashkit.sha384(data);

/**
 * @param data The data to hash.
 * @return The sha224 hash.
 *
 * @example const hash = await sha224(data);
 */
export const sha224 = async (data: string): Promise<string> =>
  Hashkit.sha224(data);

/**
 * @param data The data to hash.
 * @return The sha256 hash.
 *
 * @example const hash = await sha256(data);
 */
export const sha256 = async (data: string): Promise<string> =>
  Hashkit.sha256(data);

/**
 * @param data The data to hash.
 * @return The sha512 hash.
 *
 * @example const hash = await sha512(data);
 */
export const sha512 = async (data: string): Promise<string> =>
  Hashkit.sha512(data);
