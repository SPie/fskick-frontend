import {Fragment} from 'react';

import {Link, Outlet} from 'react-router-dom';

const Navigation = () => {
    return (
        <Fragment>
            <div>
                <div>
                    <h1>FSKick</h1>
                </div>
                <div>
                    <Link to="/">Seasons</Link>
                    <Link to="/players">Players</Link>
                </div>
            </div>

            <Outlet />

            <footer><Link to="/impressum">Impressum</Link></footer>
        </Fragment>
    );
}

export default Navigation;