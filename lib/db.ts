
import { 
  collection, 
  getDocs, 
  addDoc, 
  serverTimestamp
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase.ts";

export interface MenuItem {
  id?: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
  category: string;
}

export interface OrderData {
  orderId: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totals: {
    subtotal: number;
    delivery: number;
    grandTotal: number;
  };
  notes: string;
  createdAt?: any;
}

const ORDERS_STORAGE_KEY = 'tp_orders_local';

export const getMenuItems = async (): Promise<MenuItem[]> => {
  if (!isFirebaseConfigured || !db) {
    console.warn("Firebase not configured. Returning empty menu.");
    return [];
  }

  try {
    const querySnapshot = await getDocs(collection(db, 'menu'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as MenuItem));
  } catch (error: any) {
    console.error("Error fetching menu from Firestore:", error);
    return [];
  }
};

export const saveOrder = async (order: OrderData) => {
  if (!isFirebaseConfigured || !db) {
    const orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
    orders.push({ ...order, createdAt: new Date().toISOString(), status: 'pending' });
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return "local-id-" + Date.now();
  }

  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    return docRef.id;
  } catch (error: any) {
    console.warn("Firestore order save failed. Saving locally.", error);
    const orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
    orders.push({ ...order, createdAt: new Date().toISOString(), status: 'pending' });
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return "local-id-" + Date.now();
  }
};

export { isFirebaseConfigured };
