import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';
import qs from 'query-string';

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
          <Button onClick={() => redirectToGitHub()} fullWidth disabled={loadingSignIn}>
            Entrar com github
          </Button>
        </form>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}
