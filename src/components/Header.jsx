import React from 'react';
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
          <button type="button" data-testid="header-user-name" className="profilebutton">
            { savedName }
          </button>
        </nav>
      </header>
    );
  }
}

export default Header;
