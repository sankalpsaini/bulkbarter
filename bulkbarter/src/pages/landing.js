export default function Landing() {
  return (
    <div className="bg-[#273458] h-screen">
      <header>
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex flex-1 justify-end hover:text-gray-900">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-[#c1a865]"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl pt-44">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#c1a865] sm:text-6xl">
              Buy together and save big on groceries
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Bulkbarter combines your shopping trips with others, getting you
              bulk prices without having to buy in bulk.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#c1a865] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-200"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
