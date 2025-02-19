import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
// Make sure to have the cat-shaped cloud image in your project, e.g., in src/assets or public folder.
import catCloudImg from './assets/cat-cloud.jpg';  // Adjust path as needed

// Keyframe for fade-in effect
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// Page container with parallax background
const PageContainer = styled.div`
  background: url(${catCloudImg}) center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  color: #f0f0f0;              /* default text color (light) */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-shadow: 0 0 2px #000;   /* subtle text outline for contrast */
  overflow-x: hidden;
`;

// Hero section styling
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.4);  /* a translucent dark overlay for readability */
`;

// Stylized logo text for "MERP$"
const LogoText = styled.h1`
  font-size: 4rem;
  margin: 0.5rem;
  color: #00fff6;                /* neon cyan color for logo text */
  text-shadow: 0 0 8px #00fff6, 0 0 16px #00fff6;
`;

// Hero welcome message text
const WelcomeText = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  margin: 1rem 0;
`;

// Tagline text
const Tagline = styled.p`
  font-size: 1.25rem;
  font-style: italic;
  color: #ccccff;               /* slight tint for tagline */
  margin-bottom: 0;
`;

// Generic content section container (semi-transparent background for contrast)
const SectionContainer = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: rgba(0, 0, 0, 0.5);  /* translucent background to make text readable */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  margin-bottom: 4rem;
`;

// Manifesto section styling
const ManifestoSection = styled(SectionContainer)`
  color: #e0e0e0;
  line-height: 1.6;
  /* Fade-in effect when it becomes visible */
  opacity: ${props => (props.visible ? 1 : 0)};
  transform: translateY(${props => (props.visible ? '0' : '20px')});
  transition: opacity 1.5s ease, transform 1.5s ease;
`;

// Tokenomics section styling (reusing SectionContainer)
const TokenomicsSection = styled(SectionContainer)`
  color: #e0e0e0;
`;

// Community section styling (reusing SectionContainer but maybe lighter overlay)
const CommunitySection = styled(SectionContainer)`
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
`;

// Footer container
const Footer = styled.footer`
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: #999;
  font-size: 0.9rem;
`;

// The main React component
const MerpleLanding = () => {
  const [manifestoVisible, setManifestoVisible] = useState(false);

  useEffect(() => {
    // Observe when the manifesto section enters the viewport to trigger fade-in
    const manifestoEl = document.getElementById('manifesto');
    if (!manifestoEl) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setManifestoVisible(true);
            observer.disconnect(); // stop observing once visible
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(manifestoEl);
    return () => observer.disconnect();
  }, []);

  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <LogoText>MERP$</LogoText>
        <WelcomeText>Heed my call, degens. The divinity of Merple beckons.</WelcomeText>
        <Tagline>A meme coin for the enlightened nihilist.</Tagline>
      </HeroSection>

      {/* Manifesto Section */}
      <ManifestoSection id="manifesto" visible={manifestoVisible}>
        {/* Long, dramatic manifesto-style text */}
        <p>
          In the beginning was a cat-shaped cloud, and from it MerpleCoin was born. In a world where money was already a 
          cosmic joke, we made it an inside joke. <strong>Merple</strong> exists not to solve problems but to illuminate 
          the absurdity of solving them. It’s the <em>anti-whitepaper</em>, a prophecy for those who understand that 
          value is just a shared hallucination.
        </p>
        <p>
          <strong>MerpleCoin</strong> is our wink to the universe. It thrives on the belief that <em>nothing matters – and 
          that’s the point.</em> No roadmap, no promises, just a community of degens sharing a cosmic giggle. In the cult 
          of Merple, we are bonded not by hopes of Lambos or moon landings, but by the absurd realization that a 
          coin with a cloud cat deity is as legit as any other illusion of wealth.
        </p>
        <p>
          We’ve watched the rise and fall of serious projects and thought: “Why so serious?” MerpleCoin isn’t here to 
          revolutionize finance; it’s here to <em>revel</em> in it. We are the enlightened apes, the insiders of an 
          inside joke, finding solidarity in nonsense. If you’ve felt the void staring back and still cracked a smile, 
          you might already be one of us.
        </p>
      </ManifestoSection>

      {/* Tokenomics Section (Placeholder content) */}
      <TokenomicsSection>
        <h2 style={{ color: '#cff' }}>Tokenomics</h2>
        <ul>
          <li><strong>Total Supply:</strong> 1, 1, 2, 3, 5, 8, ... MERP$ (growing by the sacred Fibonacci sequence)</li>
          <li><strong>Circulating Supply:</strong> F(n) where n is the block number of enlightenment</li>
          <li><strong>Distribution:</strong> 100% Fair Airdrop to Believers (and maybe a few cats)</li>
          <li><strong>Consensus Mechanism:</strong> Proof of Absurdity (PoA) – the more nonsensical, the more secure</li>
        </ul>
      </TokenomicsSection>

      {/* Community Rallying Call Section */}
      <CommunitySection>
        <h2>If you belong, you do here.</h2>
        <p>Join the Merple cult on our platforms:</p>
        <p>
          <a href="#" style={{ color: '#00fff6', textDecoration: 'none', margin: '0 1rem' }}>Discord</a>
          <a href="#" style={{ color: '#00fff6', textDecoration: 'none', margin: '0 1rem' }}>Telegram</a>
          <a href="#" style={{ color: '#00fff6', textDecoration: 'none', margin: '0 1rem' }}>Twitter</a>
        </p>
      </CommunitySection>

      {/* Footer */}
      <Footer>
        <p>
          Disclaimer: This site (and coin) is entirely satirical. Nothing here should be taken seriously&mdash;unless 
          you’re a true believer, in which case everything is deadly serious. This is not financial advice (or is it?). 
        </p>
        <p>© 2025 MerpleCoin International. All rights reserved in perpetuity throughout the known multiverse.</p>
      </Footer>
    </PageContainer>
  );
};

export default MerpleLanding;
