import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBKrSj5XUFr3KLtUrcreiZYFFireB0hyT0',
  authDomain: 'dspse-auth-development.firebaseapp.com',
  projectId: 'dspse-auth-development',
  storageBucket: 'dspse-auth-development.appspot.com',
  messagingSenderId: '812364162651',
  appId: '1:812364162651:web:068e4d0ab584ffc0e6817e',
  measurementId: 'G-XSTP10HS19'
};

let app;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);

export { auth };
