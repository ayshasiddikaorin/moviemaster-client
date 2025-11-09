import MovieCard from "../../components/MovieCard";

const dummyMovies = [
  { id: 1, title: "Inception", year: 2010 },
  { id: 2, title: "The Dark Knight", year: 2008 },
];

const AllMoviesPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dummyMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default AllMoviesPage;
