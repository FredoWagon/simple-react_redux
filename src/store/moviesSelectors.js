export const moviesSelectors = ({movies}) => movies;

export const moviesFiltered = ({movies, filter}) => {
   
    if (filter.category !== null) {
        return movies.filter(movie => movie.title.toLowerCase().includes(filter.title.toLowerCase())).filter(movie => movie.category === filter.category);
    } else {
        return movies.filter(movie => movie.title.toLowerCase().includes(filter.title.toLowerCase()));
    }
   
}

export const moviesCategories = ({movies}) => {
    const categories = movies.map(movie => movie.category);
    const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }
    const uniqueCategories = categories.filter(unique)
    return uniqueCategories
}