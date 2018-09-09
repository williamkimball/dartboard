class apiCalls {
  static getData = section => {
    return fetch(`https://www.dartboardtravel.com/${section}`).then(e =>
      e.json()
    );
  };

  static getTripData = id => {
    return fetch(
      `https://www.dartboardtravel.com/trips/${id}?_expand=user`
    ).then(e => e.json());
  };

  static getItineraryItemData = id => {
    return fetch(`https://www.dartboardtravel.com/itineraryItem/${id}`).then(e =>
      e.json()
    );
  };

  static getItineraryItemsData = id => {
    return fetch(`https://www.dartboardtravel.com/itineraryItem`).then(e =>
      e.json()
    );
  };

  static deleteItineraryItem = event => {
    return fetch(
      `https://www.dartboardtravel.com/itineraryItem/${
        event.target.parentNode.id
      }`,
      {
        method: "DELETE"
      }
    );
  };

  static addData = (section, body) => {
    return fetch(`https://www.dartboardtravel.com/${section}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body)
    });
  };

  static getBudgetItem = event => {
    return fetch(
      `https://www.dartboardtravel.com/budget/${event.target.parentNode.id}`,
      {
        method: "GET"
      }
    ).then(e => e.json());
  };

  static deleteData = (section, id) => {
    return fetch(`https://www.dartboardtravel.com/${section}/${id}`, {
      method: "DELETE"
    });
  };

  static editData = (section, id, body) => {
    return fetch(`https://www.dartboardtravel.com/${section}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body)
    });
  };

  static getUserName = id => {
    return fetch(`https://www.dartboardtravel.com/users/${id}`)
      .then(e => e.json())
      .then(user => {
        return user.name;
      });
  };
}

module.exports = apiCalls;
