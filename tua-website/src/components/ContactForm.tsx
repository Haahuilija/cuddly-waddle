import { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [schedule, setSchedule] = useState('');
  const [other, setOther] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    try {
      await axios.post('/api/sendEmail', { name, email, message, schedule, other });
      setIsSent(true);
      setName('');
      setEmail('');
      setMessage('');
      setSchedule('');
      setOther('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bubble">
      <h2>Ota yhteyttä</h2>
      {isSent && (
        <p className="text-green-500">Kiitos viestistäsi, vastaamme mahdollisimman pian.</p>
      )}
      {!isSent && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nimi</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Sähköpostiosoite</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="message">Millainen teksti on kyseessä</label>
            <textarea
              id="message"
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="schedule">Toivottu aikataulu</label>
            <input
              type="text"
              id="schedule"
              required
              value={schedule}
              onChange={(event) => setSchedule(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="other">Muuta</label>
            <textarea
              id="other"
              value={other}
              onChange={(event) => setOther(event.target.value)}
            />
          </div>
          <button type="submit" disabled={isSending}>
            {isSending ? 'Lähetetään...' : 'Lähetä'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;