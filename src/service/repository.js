import firebase from 'firebase';

function saveData(userId, postItem) {
  firebase.database().ref(`${userId}/posts/${postItem.id}`).set(postItem);
}

function removeData(userId, postItem) {
  firebase.database().ref(`${userId}/posts/${postItem.id}`).remove();
}

function syncData(userId, onUpdate) {
  const ref = firebase.database().ref(`${userId}/posts/`);

  ref.on('value', snapshot => {
    const value = snapshot.val();
    value && onUpdate(value);
  });

  return () => ref.off();
}

export { saveData, removeData, syncData };
