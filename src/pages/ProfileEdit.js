import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image: '',
      description: '',
      email: '',
      loading: true,
      disabled: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      name: user.name,
      description: user.description,
      image: user.image,
      email: user.email,
      loading: false,
    });
    this.inputRules();
  }

  inputRules = () => {
    const {
      name,
      email,
      description,
      image,
    } = this.state;
    if (name !== '' && image !== '' && description !== ''
    && email !== '' && email.endsWith('.com')
    && email.includes('@')) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  inputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.inputRules());
  }

  buttonClick = async () => {
    const {
      name,
      email,
      image,
      description,
    } = this.state;
    const { history } = this.props;
    const newUser = {
      name,
      email,
      image,
      description,
    };
    this.setState({
      loading: true,
    });
    await updateUser(newUser);
    history.push('/profile');
  }

  render() {
    const {
      name,
      email,
      image,
      description,
      loading,
      disabled,
    } = this.state;
    const page = (
      <div>
        <h1>Editar perfil:</h1>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              name="name"
              data-testid="edit-input-name"
              value={ name }
              onChange={ (event) => this.inputChange(event) }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              data-testid="edit-input-email"
              value={ email }
              onChange={ (event) => this.inputChange(event) }
            />
          </label>
          <label htmlFor="description">
            Descição:
            <textarea
              name="description"
              data-testid="edit-input-description"
              value={ description }
              onChange={ (event) => this.inputChange(event) }
            />
          </label>
          <label htmlFor="image">
            Url da imagem:
            <input
              type="text"
              name="image"
              data-testid="edit-input-image"
              value={ image }
              onChange={ (event) => this.inputChange(event) }
            />
          </label>
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ disabled }
            onClick={ () => this.buttonClick() }
          >
            Salvar
          </button>
        </form>
      </div>
    );
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          (loading) ? <Loading /> : page
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
