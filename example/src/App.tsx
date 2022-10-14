import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { hmacSHA256, sha512 } from 'react-native-hashkit';

export default function App() {
  const [hashValue, setHashValue] = React.useState<string | undefined>();
  const [hmacSha256, setHmacSHA256] = React.useState<string | undefined>();

  React.useEffect(() => {
    sha512('sha512')
      .then((hash) => {
        console.log('sha512', hash);
        setHashValue(hash);
      })
      .catch((err) => console.log(err));
    hmacSHA256('hmac-sha256', 'hmac-sha256-key')
      .then((hmac) => {
        console.log('HMAC-sha256', hmac);
        setHmacSHA256(hmac);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text>SHA-512 Hash: {hashValue}</Text>
      </View>
      <View style={styles.result}>
        <Text>Hmac SHA-256 Hash: {hmacSha256}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  result: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#efefef',
  },
});
