import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
        Build Your Professional Resume <br />
        <span className="text-blue-600">In Minutes</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Create, edit, and download resumes instantly with our easy-to-use MERN Stack builder.
      </p>
      
      <Link to="/editor">
        <button className="bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1">
          Create My Resume
        </button>
      </Link>
    </div>
  );
};

export default Home;