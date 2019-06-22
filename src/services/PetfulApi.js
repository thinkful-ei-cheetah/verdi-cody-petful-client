import config from '../config';

const PetfulApi = {
  async listUsers() {
    const res = await fetch(`${config.REACT_APP_API_BASE}/users`)
    if (!res.ok) {
      res.json().then(e => Promise.reject(e))
    }
    return res.json();
  },

  async createUser(user) {
    const res = await fetch(`${config.REACT_APP_API_BASE}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    if (!res.ok) {
      res.json().then(e => Promise.reject(e))
    }
    return res.json();
  },

  async fetchAnimals() {
    const userObj = localStorage.getItem('petful-user');
    const zipcode = JSON.parse(userObj).zipcode;
    const res = await fetch(`${config.REACT_APP_API_BASE}/adoptions?zipcode=${zipcode}`)
    if (!res.ok) {
      res.json().then(e => Promise.reject(e))
    }
    return res.json();
  },

  async fetchAnimal(animal) {
    const res = await fetch(`${config.REACT_APP_API_BASE}/adoptions/${animal}`)
    if (!res.ok) {
      res.json().then(e => Promise.reject(e))
    }
    return res.json();
  },

  async adopt(animal) {
    const res = await fetch(`${config.REACT_APP_API_BASE}/adoptions/${animal}`, {
      method: 'DELETE'
    })
    if (!res.ok) {
      res.json().then(e => Promise.reject(e))
    }
    return res.json();
  },


}

export default PetfulApi