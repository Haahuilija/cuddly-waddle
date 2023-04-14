import React, { useState } from 'react';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [schedule, setSchedule] = useState('');
  const [other, setOther] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!executeRecaptcha) {
      setError('Recaptcha not loaded');
      return;
    }

    const token = await executeRecaptcha();

    const data = { name, email, message, schedule, other, token };

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
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          className="form-control"
          id="message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="schedule">Preferred Schedule:</label>
        <input
          type="text"
          className="form-control"
          id="schedule"
          value={schedule}
          onChange={(event) => setSchedule(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="other">Other:</label>
        <textarea
          className="form-control"
          id="other"
          rows={3}
          value={other}
          onChange={(event) => setOther(event.target.value)}
        ></textarea>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">
          Message sent successfully. Thank you!
        </div>
      )}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ContactForm;