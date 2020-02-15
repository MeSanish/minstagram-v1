import storage from './storage';
import axiosInstance from './axios';
import { history } from '../components/Router';

export async function handleLogin({ email, password }: { email: string; password: string; }) {
  try {
    const response = await axiosInstance.post('/v1/users/authorize', {
      email,
      password
    }).then(({data }) => data)
    .catch((error) => {
      throw error;
    })
    storage.setItem('minstagram-web', JSON.stringify(response));
    return
  } catch (error) {
    throw error;
  }
}

export function handleLogout() {
  storage.clear();
  history.push('/login')
}

export function checkAuthentication() {
  let isAuthorized = false;
  const storageItem = storage.getItem('minstagram-web')
  if(storageItem) {
    const { accessToken } = JSON.parse(storageItem) as { accessToken: string; }
    if(accessToken) {
      isAuthorized = true
    }
  }
  return isAuthorized;
}