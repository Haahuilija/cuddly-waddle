import Header from '../components/Header';
import Bubble from '../components/Bubble';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import EntrepreneurBubble from '@/components/EntrepreneurBubble';
import '../app/styles.css';

const IndexPage = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-wrap justify-center">
        <Bubble title="Bubble Title" content="Bubble content" text="Hello, world!" />
        <Bubble title="Bubble Title" content="Bubble content" text="Hello, world!" />
        <Bubble title="Bubble Title" content="Bubble content" text="Hello, world!" />
        <Bubble title="Bubble Title" content="Bubble content" text="Hello, world!" />
      </div>
      <ContactForm />
      <EntrepreneurBubble />
      <Footer />
    </div>
  );
};

export default IndexPage;