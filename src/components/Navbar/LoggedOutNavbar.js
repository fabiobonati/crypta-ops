import Link from "next/link";
import Image from "next/image";

const LoggedOutNavbar = () => {
  return (
    <nav className="w-screen top-0 mx-auto font-semibold bg-white bg-opacity-50 sticky z-50 backdrop-blur-md flex flex-row justify-center">
      <div className="w-[75vw] my-3">
        <div className="flex flex-row justify-center items-center">
          <div className="w-1/3">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={50} height={50} />
            </Link>
          </div>
          <div className="w-1/3">
            <ul className="flex flex-row justify-around">
              <li className="">
                <Link
                  href="/market"
                  className="py-2 px-4 hover:bg-slate-300 hover:rounded-full hover:bg-opacity-25"
                >
                  Market
                </Link>
                {
                  //? pagina API Binance -> listone di tutte le cripto con prezzo istantaneo
                }
              </li>
              <li className="">
                <Link
                  href="/"
                  className="py-2 px-4 hover:bg-slate-300 hover:rounded-full hover:bg-opacity-25"
                >
                  Forum
                </Link>
                {
                  //? reddit like forum
                }
              </li>
              <li className="">
                <Link
                  href="/"
                  className="py-2 px-4 hover:bg-slate-300 hover:rounded-full hover:bg-opacity-25"
                >
                  Support
                </Link>
                {
                  //? pagina con contatti e FAQ
                }
              </li>
            </ul>
          </div>
          <div className="w-1/3">
            <ul className="flex flex-row justify-end space-x-4 font-normal p-2">
              <li>
                <Link
                  href="/"
                  className="group text-black transition-all duration-200 ease-in-out"
                >
                  <span className="pb-1 bg-left-bottom bg-gradient-to-r from-pink-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-200 ease-out">
                    Login
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white bg-pink-500 rounded-full py-2 px-4 hover:bg-pink-600"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoggedOutNavbar;
