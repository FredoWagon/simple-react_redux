import './App.css';
import { Provider } from 'react-redux';
import store from './store'
import { MovieListStore } from './components/MovieList';
import { FilterComponentStore } from './components/FilterComponent';
import { fetchMovies } from './store/moviesReducer';

//fetch movie and add to movie reducer state
store.dispatch(fetchMovies)

function App() {
  return (
    <Provider store={store}>
      <FilterComponentStore />
      <MovieListStore />
    </Provider>
  );
}

export default App;
