import { firebaseDatabase } from '@/service/firebase';

function saveData(userId, postItem) {
  firebaseDatabase.ref(`${userId}/posts/${postItem.id}`).set(postItem);
}

function removeData(userId, postItem) {
  firebaseDatabase.ref(`${userId}/posts/${postItem.id}`).remove();
}

function syncData(userId, onUpdate) {
  const ref = firebaseDatabase.ref(`${userId}/posts/`);
  ref.on(
    'value',
    snapshot => {
      const value = snapshot.val();
      value && onUpdate(value);
    },
    error => console.log(error),
  );

  return () => ref.off();
}

export { saveData, removeData, syncData };
