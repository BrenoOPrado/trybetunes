import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      savedName: '',
    };
  }

  username = async () => {
    const user = await getUser();
    await this.setState({
      savedName: user.name,
      loading: false,
    });
  }

  render() {
    const { loading, savedName } = this.state;
    if (loading) {
      this.username();
      return <Loading />;
    }
    return (
      <header data-testid="header-component">
        <h3>TrybeTunes</h3>
        <nav>
          <NavLink
            to="/profile"
            data-testid="link-to-profile"
            activeClassName="profilebutton"
          >
            <p data-testid="header-user-name">
              { savedName }
            </p>
          </NavLink>
          <NavLink
            to="/search"
            data-testid="link-to-search"
            activeClassName="selected_nav"
          >
            Search
          </NavLink>
          <NavLink
            to="/favorites"
            data-testid="link-to-favorites"
            activeClassName="selected_nav"
          >
            Favorites
          </NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
