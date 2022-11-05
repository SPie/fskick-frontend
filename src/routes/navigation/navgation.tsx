import {Link, Outlet} from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="bg-black text-gray-100">
            <div className="min-h-screen">
              <nav className="bg-gradient-to-b from-gray-900 to-gray-300 via-gray-600">
                <div className="flex items-center">
                  <div>
                    <h1 className="lg:text-5xl text-2xl font-bold px-3 md:px-5 md:py-5">
                      <Link to="/">FSKick</Link>
                    </h1>
                  </div>
                  <div className="ml-10 flex items-baseline md:space-x-4 text-sm md:text-xl font-medium">
                    <Link to="/" className="pr-3 py-2 rounded-md">Seasons</Link>
                    <Link to="/players" className="pr-3 py-2 rounded-md">Players</Link>
                  </div>
                </div>
              </nav>

              <Outlet />

            </div>

            <footer className="text-center text-xs"><Link to="/imprint">Imprint</Link></footer>
        </div>
    );
}

export default Navigation;