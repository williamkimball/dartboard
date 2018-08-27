class apiCalls {
  static getData = section => {
    return fetch(`http://localhost:5002/${section}`).then(e => e.json());
  };

  static getTripData = id => {
    return fetch(`http://localhost:5002/trips/${id}?_expand=user`).then(e =>
      e.json()
    );
  };

  static getItineraryItemData = id => {
    return fetch(`http://localhost:5002/itineraryItem/${id}`).then(e =>
      e.json()
    );
  };

  static getItineraryItemsData = id => {
    return fetch(`http://localhost:5002/itineraryItem`).then(e => e.json());
  };

  static deleteItineraryItem = event => {
    return fetch(
      `http://localhost:5002/itineraryItem/${event.target.parentNode.id}`,
      {
        method: "DELETE"
      }
    );
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

  static getBudgetItem = event => {
    return fetch(`http://localhost:5002/budget/${event.target.parentNode.id}`, {
      method: "GET"
    }).then(e => e.json());
  };

  static deleteData = (section, id) => {
    return fetch(`http://localhost:5002/${section}/${id}`, {
      method: "DELETE"
    });
  };

  static editData = (section, id, body) => {
    return fetch(`http://localhost:5002/${section}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body)
    });
  };

  static getUserName = id => {
    return fetch(`http://localhost:5002/users/${id}`)
      .then(e => e.json())
      .then(user => {
        return user.name;
      });
  };
}

module.exports = apiCalls;
