import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import qs from 'query-string';
import AuthLayout from '../../layouts/Auth';
import GitHubImg from './../../assets/images/github.jpeg';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { Row, Title, Label } from '../../components/Auth';
import Link from '../../components/Link';
import styled from 'styled-components';
import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';
import useSignUp from '../../hooks/api/useSignUp';
import { gapi } from 'gapi-script';
import useSignIn from '../../hooks/api/useSignIn';
import { GoogleLogin } from 'react-google-login';

export default function Enroll() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUserData } = useContext(UserContext);
  const { signIn } = useSignIn();

  const { loadingSignUp, signUp } = useSignUp();

  const navigate = useNavigate();

  const { eventInfo } = useContext(EventInfoContext);

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({ clientId: '750862169817-mu8c0jhpk48758igum5nagbp90ppt6na.apps.googleusercontent.com' });
    });
  }, []);

  async function redirectToGitHub() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const params = {
      response_type: 'code',
      scope: 'user',
      client_id: '8b03db19625ccc7dad31',
      redirect_uri: 'http://localhost:3000/sign-in',
    };
    const queryStrings = qs.stringify(params);
    const authURL = `${GITHUB_URL}?${queryStrings}`;
    window.location.href = authURL;
  }

  async function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast('As senhas devem ser iguais!');
    } else {
      try {
        await signUp(email, password);
        toast('Inscrito com sucesso! Por favor, faça login.');
        navigate('/sign-in');
      } catch (error) {
        toast('Não foi possível fazer o cadastro!');
      }
    }
  }

  async function signInOrsignUp({ email, password }) {
    try {
      await signUp(email, password);

      signInGitHub(email, password);
    } catch (erro) {
      signInGitHub(email, password);
    }
  }

  async function signInGitHub(email, password) {
    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast('Não foi possível fazer o login!');
    }
  }

  const responseGoogle = (response) => {
    const body = {
      email: response.wt.cu,
      password: response.wt.NT.toString(),
    };
    signInOrsignUp(body);
  };
  const onFailure = (error) => {
    console.log(error);
  };
  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Inscrição</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Repita sua senha"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignUp}>
            Inscrever
          </Button>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Github onClick={() => redirectToGitHub()}>
              <img alt="github" src={GitHubImg} /> Entrar com github
            </Github>
            <StyledGoogleLogin
              clientId="750862169817-mu8c0jhpk48758igum5nagbp90ppt6na.apps.googleusercontent.com"
              buttonText="Entrar com Google"
              onSuccess={responseGoogle}
              onFailure={onFailure}
            />
          </div>
        </form>
      </Row>
      <Row>
        <Link to="/sign-in">Já está inscrito? Faça login</Link>
      </Row>
    </AuthLayout>
  );
}
const Github = styled.button`
  max-width: 48%;
  display: flex;
  align-items: center;
  img {
    width: 20px;
    margin-right: 5px;
  }
  background-color: black;
  color: white;
  padding: 6px 16px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  font-size: 0.875rem;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  border: 0;
  cursor: pointer;
  margin: 0;

  margin-top: 10px;
  &:hover {
    background-color: rgb(0 0 0 / 72%);
  }
`;
const StyledGoogleLogin = styled(GoogleLogin)`
  max-width: 48%;
  display: flex;
  align-items: center;
  img {
    width: 20px;
    margin-right: 5px;
  }
  background-color: #f5f0f0;
  color: black;
  padding: 6px 16px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  font-size: 0.875rem;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  border: 0;
  cursor: pointer;
  margin: 0;
  margin-top: 10px;
  &:hover {
    background-color: rgb(0 0 0 / 10%);
  }
`;
