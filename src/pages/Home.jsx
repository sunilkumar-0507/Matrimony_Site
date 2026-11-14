import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TrustHighlights from '../components/TrustHighlights';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import EnquiryForm from '../components/EnquiryForm';
import WhyChooseUs from '../components/WhyChooseUs';
import ProcessSection from '../components/ProcessSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { FloralCorner } from '../components/Decorations';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <TopBar />
      <Navbar />
      <main id="main">
        <HeroSection />
        <TrustHighlights />

        <section className="section about-enquiry" aria-label="About us and enquiry">
          <FloralCorner className="about-enquiry__floral" />
          <div className="container about-enquiry__grid">
            <div className="about-enquiry__left">
              <AboutSection />
              <ServicesSection />
            </div>
            <div className="about-enquiry__right">
              <EnquiryForm />
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <ProcessSection />
        <CallToAction />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
