import React from 'react';
import Header from '../components/Header';
import Bubble from '../components/Bubble';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import EntrepreneurBubble from '../components/EntrepreneurBubble';
import '../app/styles.css';

const IndexPage = () => {
  return (
    <div>
      <Header />
      <h1 className='description_h1'>Kielenhuolto ja selkeä kieli - monen mielestä varmasti maailman kuivinta hommaa, mun mielestä kuitenkin ihan parasta!</h1>
      <div className="bubbles-container">
        <div className="bubble-container">
          <div className="bubble">Mitä?</div>
          <ul>
            <li>Tarjoan osaamistani ja innostustani tekstien käsittelyä kohtaan myös sinun käyttöösi.</li>
            <li>Tekstisi voi olla esimerkiksi opinnäytetyö, lehtiartikkeli tai verkkosivuille tuleva tiedote.</li>
            <li>Luen tekstisi läpi, korjaan siitä esimerkiksi mahdolliset kirjoitus- ja kielioppivirheet, jäsentelen tekstin rakenteen sujuvaksi ja ehdotan toisenlaisia lauserakenteita.</li>
          </ul>
        </div>
        <div className="bubble-container">
          <div className="bubble">Miksi kirjoitetun tekstin selkeys, virheettömyys ja helppolukuisuus on tärkeää?</div>
          <ul>
            <li>Selkeän kielen periaatteiden mukaisesti kirjoitettu teksti tavoittaa lukijan todennäköisemmin kuin teksti, jossa näitä seikkoja ei ole huomioitu.</li>
            <li>Yhteydenottojen määrä asiakaspalveluun vähenee, kun asiakas ymmärtää, mitä hänen tulee tehdä.</li>
            <li>Jäsennelty ja kielellisesti virheetön teksti on helppoa ja miellyttävää luettavaa.</li>
            <li>Virheetön teksti antaa sinusta ja yrityksestäsi ammattimaisen kuvan.</li>
            <li>Saavutettavuus ei koskea ainoastaan värikontrasteja ja kuvien alt-tekstejä: se kattaa myös ymmärrettävän kielen.</li>
          </ul>
        </div>
        <div className="bubble-container">
          <div className="bubble">Hinnasto</div>
          <ul>
            <li>Laskutan tekemästäni työstä 55e/h UKKO.fi-kevytyrittäjänä. </li>
            <li>Työtunnit määräytyvät tekstisi pituuden ja korjaustarpeen määrän perusteella. </li>
            <li>Minimilaskutus on yksi tunti.</li>
          </ul>
        </div>
        <div className="bubble-container">
          <div className="bubble">Minä</div>
          <ul>
            <li>Olen koulutukseltani filosofian maisteri (2022).</li>
            <li>Työskentelen päivätyökseni viestinnän parissa.</li>
            <li>Kiinnostukseni kielenhuoltoon ja selkeään kieleen kumpuaa opinnoistani ja halustani oikaista byrokratian kiemuroita mahdollisimman asiakaslähtöiseen, ymmärrettävään muotoon.</li>
          </ul>
        </div>
      </div>
      <ContactForm />
      <EntrepreneurBubble />
      <Footer />
    </div>
  );
};

export default IndexPage;