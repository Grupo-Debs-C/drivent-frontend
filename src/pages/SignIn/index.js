import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../../layouts/Auth';
import styled from 'styled-components';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';
import qs from 'query-string';
import GitHubImg from './../../assets/images/github.jpeg';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import useSignUp from '../../hooks/api/useSignUp';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();
  const { signUp } = useSignUp();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({ clientId: '750862169817-mu8c0jhpk48758igum5nagbp90ppt6na.apps.googleusercontent.com' });
    });
  }, []);

  useEffect(async function gitHubVerify() {
    const { code } = qs.parseUrl(window.location.href).query;
    if (code) {
      try {
        const { data } = await axios.post('http://localhost:4000/github', { code });

        const body = {
          email: data.email,
          password: data.id.toString(),
        };
        signInOrsignUp(body);
      } catch (error) {
        toast('Não foi possível fazer o login!');
      }
    }
  }, []);

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

    try {
      const userData = await signIn(email, password);

      setUserData(userData);

      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
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
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>
            Entrar
          </Button>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
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
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
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
