import React from 'react';
import './AdoptionsPage.css';
import PetfulApi from '../../services/PetfulApi';
import gravatar from 'gravatar';


export default class AdoptionsPage extends React.Component {
  state = {
    users: [],
    dog: {},
    cat: {},
    recentlyAdopted: [],
    counter: 0,
    intervalId: null
  }

  async componentDidMount() {
    const userReq = PetfulApi.listUsers();
    const animalReq = PetfulApi.fetchAnimals();

    const [users, animals] = await Promise.all([userReq, animalReq])

    const intervalId = setInterval(() => {
      this.adopt('dog');
    }, 10000)

    this.setState({
      users,
      dog: animals.dog,
      cat: animals.cat,
      intervalId
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.users.length !== 0 && this.state.users.length === 0) {
      const newUsers = await PetfulApi.refreshUsers();
      this.setState({ users: newUsers })
    }
  }

  adopt = async (animal) => {
    const response = await PetfulApi.adopt(animal)
    const newAnimal = await PetfulApi.fetchAnimal(animal)

    this.setState({
      recentlyAdopted: [response, ...this.state.recentlyAdopted],
      [animal]: newAnimal[animal],
      users: this.state.users.slice(1),
      counter: this.state.counter + 1
    }, this.cancelInterval)
  }

  cancelInterval = () => {
    const { counter } = this.state;
    if (counter >= 4) {
      clearInterval(this.state.intervalId)
    }
  }

  avatar(email) {
    return gravatar.url(email, { s: '100', r: 'x', d: 'retro', protocol: 'https' }, true);
  }

  renderUsers = (users) => {
    return users.map((user, i) => {
      return <div className='user' key={i}>
        <img src={this.avatar(user.email)} alt='user-profile-img' />
        <h4>{user.full_name}</h4>
      </div>
    })
  }

  renderAnimal = (animal) => {
    return (<div className='animal'>
      <img src={animal.photo} alt='animal-profile-img' className='responsive'></img>
      <h2>Name: {animal.name}</h2>
      <p>Size: {animal.size}</p>
      <p>Gender: {animal.gender}</p>
      <p>Description: {animal.description}</p>
    </div>);
  }

  renderRecentlyAdopted = () => {
    return (
      this.state.recentlyAdopted.map((result, i) => {
        return <div className='adopted' key={i}>
          <p>{result.user.full_name} adopted {result.animal.name}</p>
        </div>
      })

    )
  }

  render() {
    const { users, dog, cat } = this.state;

    return (
      <section className='adoptions-page'>
        <div className='users'>
          <h2>User Queue</h2>
          {this.renderUsers(users)}
        </div>

        <div className='animals'>
          <h2>Up Next to Adopt</h2>
          <div className='animal-wrapper'>
            <div className='dog-queue'>
              {this.renderAnimal(dog)}
              <button className='button primary' onClick={() => this.adopt('dog')}>Adopt Me!</button>
            </div>
            <div className='cat-queue'>
              {this.renderAnimal(cat)}
              <button className='button primary' onClick={() => this.adopt('cat')}>Adopt Me!</button>
            </div>
          </div>
        </div>

        <div className='recently-adopted'>
            <h2>Recently Adopted</h2>
          <div className='wrapped-adopted'>
            {this.renderRecentlyAdopted()}
          </div>
        </div>
      </section>
    )
  }
}