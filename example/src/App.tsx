import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { hmacSHA256, sha256 } from 'react-native-hashkit';

export default function App() {
  const [sha256Hash, setSHA256Hash] = React.useState<string | undefined>();
  const [hmacSha256, setHmacSHA256] = React.useState<string | undefined>();

  React.useEffect(() => {
    sha256('sha256')
      .then((hash) => {
        setSHA256Hash(hash);
      })
      .catch((err) => console.log(err));
    hmacSHA256('hmac-sha256', 'hmac-sha256-key')
      .then((hmac) => {
        setHmacSHA256(hmac);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text>SHA-256 Hash: {sha256Hash}</Text>
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
