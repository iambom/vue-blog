import firebase from 'firebase';

function saveData(userId, postItem) {
  firebase.database().ref(`${userId}/posts/${postItem.id}`).set(postItem);
}

function removeData(userId, postItem) {
  console.log('removeData ', userId, postItem);
  firebase.database().ref(`${userId}/posts/${postItem.id}`).remove();
}

export { saveData, removeData };
