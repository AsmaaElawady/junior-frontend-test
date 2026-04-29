import { useEffect } from 'react';
import { View, Button, SafeAreaView, StyleSheet } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { fetchUsers, loadMore } from './src/redux/users/userSlice';
import SearchBar from './src/components/user/SearchBar';
import UserList from './src/components/user/UserList';
import Loader from './src/components/common/Loader';
import { store } from './src/redux/store';

function Main() {
  const dispatch = useDispatch();
  const { filtered, visibleCount, status } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === 'loading') return <Loader />;

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <UserList users={filtered.slice(0, visibleCount)} />
      {visibleCount < filtered.length && (
        <Button title="Load More" onPress={() => dispatch(loadMore())} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}    