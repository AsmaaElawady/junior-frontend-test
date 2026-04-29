import { FlatList } from 'react-native';
import UserCard from './UserCard';

export default function UserList({ users }) {
  return (
    <FlatList
      style={{ flex: 1 }}
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <UserCard user={item} />}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
  );
}