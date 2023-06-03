import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const LandingPage: React.FC = () => {
  return (
    <div className="pt-40 flex flex-col justify-center items-center">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to All My Links!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your one-stop solution for sharing all your important links with the
          world.
        </p>
      </div>
      <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
        <div className="rounded-md shadow">
          <a
            href="/signup"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            Get Started
          </a>
        </div>
      </div>
      <div className="mt-10">
        <p className="text-center text-sm text-gray-500">
          If you like this project, give it a ⭐ on{" "}
          <a
            href="https://github.com/paridhi7/allmylinks"
            className="underline text-indigo-600 hover:text-indigo-500"
          >
            Github <FontAwesomeIcon icon={faGithub} />
          </a>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
