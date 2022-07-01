import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      lessThanThree: true,
      loading: false,
    };
  }

  inputChange = ({ target }) => {
    const minNun = 3;
    this.setState({
      inputValue: target.value,
    }, () => {
      if (target.value.length >= minNun) {
        this.setState({
          lessThanThree: false,
        });
      } else {
        this.setState({
          lessThanThree: true,
        });
      }
    });
  }

  clickButton = () => {
    const { inputValue } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: inputValue });
      history.push('/search');
    });
  }

  render() {
    const {
      inputValue,
      lessThanThree,
      loading,
    } = this.state;
    if (loading) return (<Loading />);
    return (
      <div data-testid="page-login" className="login_page">
        <h4>Login</h4>
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ (event) => this.inputChange(event) }
            value={ inputValue }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            onClick={ () => this.clickButton() }
            disabled={ lessThanThree }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
