import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import NavBar from "./NavBar";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8 z-0">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-48">
          <div className="text-center">
            <h1 className="text-9xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 sm:text-6xl animate-pulse">
              The One Link for All Your Links
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              Make your portfolio shine with one simple link in your bio.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/signup"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="https://github.com/paridhi7/allmylinks"
                className="text-xl font-semibold leading-6 text-gray-900"
              >
                Github <FontAwesomeIcon icon={faGithub} />{" "}
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="mt-8">
              Made with ❤ by{" "}
              <a
                href="/paridhi"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-1 hover:text-indigo-600 transition-colors duration-200"
              >
                Paridhi Agarwal
              </a>
            </p>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
