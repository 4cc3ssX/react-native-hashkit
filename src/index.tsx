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

/**
 * @param message The message to hash.
 * @param key The secret key.
 * @return The HMAC (encoded in hex).
 *
 * @example const result = hmacSHA256(message, key);
 */
export const hmacSHA256 = async (
  message: string,
  key: string
): Promise<string> => Hashkit.hmacSHA256(message, key);

/**
 * @param data The data to hash.
 * @return The sha256 hash.
 *
 * @example const result = sha256(data);
 */
export const sha256 = async (data: string): Promise<string> =>
  Hashkit.sha256(data);
