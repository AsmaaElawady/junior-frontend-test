import { TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { searchUsers } from '../../redux/users/userSlice';

export default function SearchBar() {
  const dispatch = useDispatch();

  return (
    <TextInput
      placeholder="Search by name..."
      style={styles.input}
      onChangeText={(text) => dispatch(searchUsers(text))}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
});