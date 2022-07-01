import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../component/Loading';

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

Login.propsTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
      state: undefined,
    }),
    push: PropTypes.func.isRequired,
    replace: PropTypes.func,
  }),
};

export default Login;
