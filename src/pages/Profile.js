import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      dataUser: {},
      loading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      dataUser: user,
      loading: false,
    });
  }

  render() {
    const { dataUser, loading } = this.state;
    const page = (
      <main>
        <img
          src={ dataUser.image }
          alt={ `imagem não carregada de ${dataUser.name}` }
          data-testid="profile-image"
        />
        <h3>{ dataUser.name }</h3>
        <h4>{ dataUser.email }</h4>
        <p>{ dataUser.description }</p>
      </main>
    );
    return (
      <div data-testid="page-profile" className="profile-page">
        <Header />
        <div>
          <h2>Perfil:</h2>
          <NavLink to="/profile/edit">
            <button type="button">Editar perfil</button>
          </NavLink>
        </div>
        {
          (loading) ? <Loading /> : page
        }
      </div>
    );
  }
}

export default Profile;
