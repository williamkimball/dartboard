class apiCalls {
  static getData = (section) => {
    return fetch(`http://localhost:5002/${section}`).then(e => e.json());
  };

  static getTripData = (id) => {
    return fetch(`http://localhost:5002/trips/${id}?_expand=user`).then(e => e.json());
  };

  static addData = (section, body) => {
    
    return fetch(`http://localhost:5002/${section}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body)
    });
  };
  static getUserName = id => {
    
    return fetch(`http://localhost:5002/users/${id}`).then(e =>
      e.json()
    ).then(user => {
      return user.name} )
  };
}

module.exports = apiCalls;

// export default class APIHandler {
//     static getData = section => {
//         return fetch(`http://localhost:5002/${section}`).then(e => e.json());
//     };
//     static editData = (section, id, body) => {
//         return fetch(`http://localhost:5002/${section}/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(body)
//         });
//     };
//     static deleteData = (section, id) => {
//         return fetch(`http://localhost:5002/${section}/${id}`, {
//             method: "DELETE"
//         });
//     };
//     static addData = (section, body) => {
//         return fetch(`http://localhost:5002/${section}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json; charset=utf-8"
//             },
//             body: JSON.stringify(body)
//         });
//     };
//     static archiveTask = (id, body) => {
//         return fetch(`http://localhost:5002/tasks/${id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(body)
//         });
//     };

//     static myFriends = () => {
//         return fetch(`http://localhost:5002/friends`)
//             .then(e => e.json())
//             .then(friends => {
//                 const fList = [];
//                 let User = JSON.parse(localStorage.getItem("credentials"));
//                 if (User === null) {
//                     User = JSON.parse(sessionStorage.getItem("credentials"));
//                     User = User.userId;
//                 } else {
//                     User = User.userId;
//                 }
//                 friends.forEach(friend => {
//                     if (friend.yourId == User) {
//                         fList.push(friend.userId);
//                     }
//                 });
//                 return fList;
//             });
//     };
//     static allFriends = () => {
//         return fetch(`http://localhost:5002/friends`)
//             .then(e => e.json())
//             .then(friends => {
//                 console.log(friends);
//                 const fList = [];
//                 let User = JSON.parse(localStorage.getItem("credentials"));
//                 if (User === null) {
//                     User = JSON.parse(sessionStorage.getItem("credentials"));
//                     User = User.userId;
//                 } else {
//                     User = User.userId;
//                 }
//                 friends.forEach(friend => {
//                     if (friend.yourId == User) {
//                         fList.push(friend.userId);
//                     }
//                 });
//                 return fList;
//             });
//     };
//     static getTaskUserId = idNumber => {
//         return fetch(
//           `http://localhost:5002/tasks?userId=${idNumber}&completed=false`
//         ).then(e => e.json());
//       };
// }
