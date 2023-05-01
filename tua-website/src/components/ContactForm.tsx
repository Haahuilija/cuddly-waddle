import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [schedule, setSchedule] = useState('');
  const [other, setOther] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data: { token } } = await axios.post('../api/recaptcha');
      console.log('reCAPTCHA token:', token);
      if (!token) {
        console.error('reCAPTCHA token is not being passed to the server');
        throw new Error('reCAPTCHA token not being passed to the server');
      }
      const response = await fetch('/api/handleFormSubmit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, message, schedule, other })
      });
      console.log('reCAPTCHA token passed in request headers');
      if (response.ok) {
        setSubmitStatus('Message sent successfully');
        setName('');
        setEmail('');
        setMessage('');
        setSchedule('');
        setOther('');
      } else {
        setSubmitStatus('Error sending message 1');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('Error sending message 2');
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
          rows={8}
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
          rows={5}
          value={other}
          onChange={(event) => setOther(event.target.value)}
        ></textarea>
      </div>
      <button
        className="g-recaptcha"
        data-sitekey="6Letzo8lAAAAAEV5hmLvRtKRenOEkLy8p0cgfh8A"
        type="submit">
        Lähetä
      </button>
      {submitStatus && <p>{submitStatus}</p>}
    </form>
  );
};

export default ContactForm;