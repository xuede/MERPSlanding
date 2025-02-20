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
  background: #121212 url(${catCloudImg}) center center no-repeat; /* Dark background */
  background-size: cover;
  background-attachment: fixed;
  color: #ffffff;              /* White text color */
  font-family: 'Bebas Neue', sans-serif; /* Modern font */
  text-shadow: 0 0 3px #000;   /* Slightly stronger text shadow */
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
  font-size: 6rem; /* Increased size */
  margin: 0.5rem;
  color: #00fff6;                /* neon cyan color for logo text */
  text-shadow: 0 0 12px #00fff6, 0 0 24px #00fff6; /* Stronger glow */
  letter-spacing: 0.1em; /* Added letter spacing */
`;

// Hero welcome message text
const WelcomeText = styled.h2`
  font-size: 3.5rem; /* Increased size */
  font-weight: 500; /* Slightly bolder */
  margin: 1.5rem 0; /* Increased margin */
  letter-spacing: 0.05em;
`;

// Tagline text
const Tagline = styled.p`
  font-size: 1.5rem; /* Increased size */
  font-style: italic;
  color: #b3b3ff;               /* Lighter tint for tagline */
  margin-bottom: 0;
  font-weight: 300; /* Lighter weight */
`;

// Generic content section container (semi-transparent background for contrast)
const SectionContainer = styled.section`
  max-width: 900px; /* Wider container */
  margin: 2rem auto; /* Increased top/bottom margin */
  padding: 3rem 2rem; /* Increased padding */
  background: rgba(255, 255, 255, 0.05); /* Lighter, slightly translucent white background */
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.6); /* More pronounced shadow */
  border-radius: 12px; /* More rounded corners */
  border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border */
  backdrop-filter: blur(10px); /* Apply blur to the background */
`;

// Manifesto section styling
const ManifestoSection = styled(SectionContainer)`
  color: #e0e0e0;
  line-height: 1.8; /* Increased line height for better readability */
  /* Fade-in effect when it becomes visible */
  opacity: ${props => (props.visible ? 1 : 0)};
  transform: translateY(${props => (props.visible ? '0' : '20px')});
  transition: opacity 1.5s ease, transform 1.5s ease;
  p {
    font-size: 1.1rem; /* Slightly larger paragraph text */
  }
`;

// Tokenomics section styling (reusing SectionContainer)
const TokenomicsSection = styled(SectionContainer)`
  color: #e0e0e0;
  h2 {
    color: #cff; /* Neon color for the title */
    font-size: 2.5rem; /* Larger title */
    text-shadow: 0 0 10px #cff, 0 0 20px #cff; /* Neon glow effect */
    margin-bottom: 1.5rem; /* Spacing below title */
  }
  ul {
    list-style-type: none; /* Remove default bullet points */
    padding-left: 0; /* Remove default padding */
  }
  li {
    margin-bottom: 0.75rem; /* Spacing between list items */
    font-size: 1.1rem; /* Slightly larger list text */
  }
  strong {
    color: #fff; /* Highlight important text in list */
  }
`;

// Community section styling (reusing SectionContainer but maybe lighter overlay)
const CommunitySection = styled(SectionContainer)`
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
  h2 {
    font-size: 2.5rem; /* Larger title */
    color: #00fff6; /* Neon cyan for title */
    text-shadow: 0 0 10px #00fff6, 0 0 20px #00fff6; /* Neon glow */
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
  a {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    margin: 0.5rem;
    color: #00fff6;
    text-decoration: none;
    border: 2px solid #00fff6;
    border-radius: 8px;
    transition: background-color 0.3s ease, color 0.3s ease;
    &:hover {
      background-color: #00fff6;
      color: #121212;
      text-shadow: none;
    }
  }
`;

// Footer container
const Footer = styled.footer`
  text-align: center;
  padding: 3rem 1rem; /* Increased padding */
  background: #111; /* Slightly lighter footer background */
  color: #ccc; /* Lighter text color */
  font-size: 1rem; /* Slightly larger font size */
  line-height: 1.7; /* Increased line height */
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
