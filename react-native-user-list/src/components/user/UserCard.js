import { View, Text, StyleSheet } from 'react-native';
import { formatAddress } from '../../utils/formatAddress';

import React, { memo } from 'react';

const UserCard = ({ user }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.email}</Text>
      <Text>{formatAddress(user.address)}</Text>
    </View>
  );
};

export default memo(UserCard);

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});