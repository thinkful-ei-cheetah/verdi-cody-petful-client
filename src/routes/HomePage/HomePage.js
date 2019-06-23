import React from 'react';
import './HomePage.css';
import PetfulApi from '../../services/PetfulApi';

export default class HomePage extends React.Component {
  async handleSubmit(e) {
    e.preventDefault();
    
    const { full_name, email, zipcode } = e.target
    const newUser = {
      full_name: full_name.value,
      email: email.value,
      zipcode: zipcode.value
    };

    localStorage.setItem('petful-user', JSON.stringify(newUser));
    await PetfulApi.createUser(newUser);
    this.props.history.push('/adoptions')
  }

  render() {
    return (
      <section className='home-page'>
        <div className='intro'>
          <h2> Welcome to AdoptMe! <span role='img' aria-label='emoji'>🐶</span></h2>
          <p>Complete the form to see nearby animals available for adoptation.  AdoptMe! uses the PetFinder Api to pull real listings in your area. Users are added to a queue a must wait until it's their turn before selecting either cat or dog for adoptation.</p>

          <p>
            There is no browsing of animals at AdoptMe! Animals that have been with us the longest are the only aniamls available for adoptation.  In this way, we make sure every animals gets a deserving home.
          </p>
        </div>
        <form action='#' id='js-user-form' onSubmit={(e) => this.handleSubmit(e)}>
          <div className='form-group'>
            <label htmlFor='full_name'>Full Name</label>
            <input type='text' name='full_name' id='full_name' required/>  
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' required/>  
          </div>

          <div className='form-group'>
            <label htmlFor='zipcode'>Zipcode</label>
            <input type='text' name='zipcode' id='zipcode' required/>  
          </div>

          <div className='form-group cta'>
            <button type='submit' className='button primary full'>Show Me The Animals</button>
          </div>
        </form>
      </section>
    )
  }
}