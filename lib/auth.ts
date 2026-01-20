
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "./firebase.ts";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}

const LOCAL_USER_KEY = 'tp_auth_user';
const USERS_DB_KEY = 'tp_local_users_db';

const MockAuth = {
  signup: (email: string, pass: string, name: string): UserProfile => {
    const db = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
    if (db.find((u: any) => u.email === email)) throw new Error("Email already exists");
    
    const newUser = { uid: 'local-' + Date.now(), email, displayName: name, pass };
    db.push(newUser);
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
    
    const profile = { uid: newUser.uid, email: newUser.email, displayName: newUser.displayName };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
    return profile;
  },
  login: (email: string, pass: string): UserProfile => {
    const db = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
    const user = db.find((u: any) => u.email === email && u.pass === pass);
    if (!user) throw new Error("Invalid credentials");
    
    const profile = { uid: user.uid, email: user.email, displayName: user.displayName };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
    return profile;
  },
  logout: () => {
    localStorage.removeItem(LOCAL_USER_KEY);
  },
  getCurrentUser: (): UserProfile | null => {
    const data = localStorage.getItem(LOCAL_USER_KEY);
    return data ? JSON.parse(data) : null;
  }
};

export const loginUser = async (email: string, pass: string): Promise<UserProfile> => {
  if (!isFirebaseConfigured || !auth) {
    return MockAuth.login(email, pass);
  }
  const result = await signInWithEmailAndPassword(auth, email, pass);
  return {
    uid: result.user.uid,
    email: result.user.email,
    displayName: result.user.displayName
  };
};

export const signupUser = async (email: string, pass: string, name: string): Promise<UserProfile> => {
  if (!isFirebaseConfigured || !auth) {
    return MockAuth.signup(email, pass, name);
  }
  const result = await createUserWithEmailAndPassword(auth, email, pass);
  await updateProfile(result.user, { displayName: name });
  return {
    uid: result.user.uid,
    email: result.user.email,
    displayName: name
  };
};

export const logoutUser = async () => {
  if (!isFirebaseConfigured || !auth) {
    MockAuth.logout();
    return;
  }
  await signOut(auth);
};

export const subscribeToAuth = (callback: (user: UserProfile | null) => void) => {
  if (!isFirebaseConfigured || !auth) {
    callback(MockAuth.getCurrentUser());
    return () => {}; 
  }

  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      });
    } else {
      callback(null);
    }
  });
};
