import firestore from '@react-native-firebase/firestore';

export async function getCollection(name: string) {
  const collection = await firestore().collection(name).get();
  return collection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}
