import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [schedule, setSchedule] = useState('');
  const [other, setOther] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = { name, email, message, schedule, other };

    try {
      const response = await axios.post('/api/sendEmail', data);
      if (response.status === 200) {
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
        setSchedule('');
        setOther('');
      } else {
        setError('An error occurred');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nimi:</label>
        <input
          type="text"
          className="form-control form-input"
          id="name"
          placeholder="Etunimi Sukunimi"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Sähköposti:</label>
        <input
          type="email"
          className="form-control form-input"
          id="email"
          placeholder="Sähköpostiosoite johon haluatte meidän vastaavan"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Millainen teksti kyseessä:</label>
        <textarea
          className="form-control form-input"
          id="message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="schedule">Aikataulu:</label>
        <input
          type="text"
          className="form-control form-input"
          id="schedule"
          placeholder="Esim. Kahden viikon sisään, 10.9 mennessä"
          value={schedule}
          onChange={(event) => setSchedule(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="other">Muuta:</label>
        <textarea
          className="form-control form-input"
          id="other"
          placeholder="Muuta huomioitavaa, jos sellaista on"
          rows={3}
          value={other}
          onChange={(event) => setOther(event.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary submit-btn">
        Lähetä
      </button>
    </form>
  );
};

export default ContactForm;