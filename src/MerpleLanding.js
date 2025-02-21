import React, { useEffect, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
// Make sure to have the cat-shaped cloud image in your project, e.g., in src/assets or public folder.
import catCloudImg from './assets/cat-cloud.jpg';  // Adjust path as needed

// Keyframe for fade-in effect
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// Coming Soon Popup
const ComingSoonPopup = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  z-index: 101;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

// Page container with parallax background
const StickyHeader = styled.header`
  position: sticky;
  top: 0;
  background: rgba(0, 0, 0, 0.8); /* Dark background for the header */
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100; /* Ensure it's on top of other content */
`;

const HeaderLink = styled.a`
  color: white;
  text-decoration: none;
  margin-right: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const BuyButton = styled.button`
  background-color: #00fff6;
  color: #121212;
  border: none;
  padding: 1rem 2.5rem; /* Increased padding for bigger button */
  border-radius: 10px; /* Slightly more rounded corners */
  cursor: pointer;
  font-weight: 900; /* Extra bold font weight */
  font-size: 1.2rem; /* Slightly larger font size */
  letter-spacing: 0.1em; /* Added letter spacing */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00b3af;
  }
`;


const PageContainer = styled.div`
  background: #121212 url(${catCloudImg}) center center no-repeat; /* Dark background */
  background-size: cover;
  background-attachment: fixed;
  color: #ffffff;              /* White text color */
  font-family: 'Roboto', sans-serif; /* More readable font */
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
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState('');

  const handleSocialClick = useCallback((platform) => {
    setPopupText(`It's coming right up... soon.`);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  }, []);

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
      <StickyHeader>
        <div>
          <HeaderLink href="#">White Paper</HeaderLink>
        </div>
        <div>
          <BuyButton>BUY MERP$ NOW!</BuyButton>
        </div>
      </StickyHeader>
      {/* Hero Section */}
      <HeroSection>
        <LogoText>MERP$</LogoText>
        <WelcomeText>MERP$ is Taking a Flying Fuck at the Moon! 🚀🌕🪙</WelcomeText>
        <Tagline>Welcome to MERP$ World – where Merple, our badass, irreverent feline goddess, rules with a sneer and a heart full of radical shit. If you’re tired of crypto’s bullshit and ready to join a movement that laughs in the face of mainstream greed, you’re in the right place.</Tagline>
        <div>
          <BuyButton>JOIN US! / BUY MERP$</BuyButton>
        </div>
        <Tagline style={{marginTop: '1rem', fontStyle: 'normal', fontSize: '1.5rem'}}>One of us.</Tagline>
        <Tagline style={{marginTop: '0', fontStyle: 'normal', fontSize: '1.2rem'}}>One of us.</Tagline>
        <Tagline style={{marginTop: '0', fontStyle: 'normal', fontSize: '1rem'}}>One of us.</Tagline>
      </HeroSection>

      {/* Manifesto Section */}
      <ManifestoSection id="manifesto" visible={manifestoVisible}>
        <h2>Our Manifesto</h2>
        {/* Long, dramatic manifesto-style text */}
        <p>
          In the beginning was a cat‐shaped cloud—and from a wild mid‐wifery, MerpleCoin was born. In a world where money is already the universe’s biggest joke, we decided to make it an inside joke. We even have a white paper, and trust us—it’s as irreverently hilarious as everything else we do.
        </p>
        <p>
          We’re the insiders of outsiders. We’ve seen the so-called “serious” projects come and go and thought, “Fuck ‘em.” Instead of chasing empty promises or cookie‑cutter moon landings, we’re carving our own absurd path. We’re a community of degens, rebels, and misfits sharing a cosmic giggle—united by the belief that sometimes the only sensible response is to laugh at it all.
        </p>

        <p>
          MerpleCoin is our cheeky wink to the universe. It thrives on the radical idea that nothing truly matters—except our shared, unapologetic spirit. Whether we’re hosting a charity cat carnival or scribbling a treatise on existentialism (for the geeks, naturally), we do it our way.
        </p>

        <p>
          If you’re ready to join a movement where irreverence meets raw elegance, where you’re not just a token holder but an insider in an outsider revolution, then welcome to MerpleCoin. And if you don’t get it? Then, frankly, it wasn’t meant for you.
        </p>
      </ManifestoSection>

      {/* Tokenomics Section */}
      <TokenomicsSection>
        <h2 style={{ color: '#cff' }}>Tokenomics</h2>
        <p><strong>Total Supply:</strong> Exactly 123,581,321,345,589 MERP$ have been minted—a fixed, capped supply inspired by the sacred Fibonacci sequence. This number isn’t generated on the fly; it’s the immutable total that embodies natural order and the inevitability of growth.</p>
        <p><strong>Capped Supply:</strong> There’s no inflation here. Once these 123,581,321,345,589 tokens are distributed, that’s it. Every MERP$ is part of an exact, predetermined cosmic ledger.</p>
        <p><strong>Distribution:</strong></p>
        <ul>
          <li><strong>100% Fair Airdrop to Believers:</strong> Every token is meant for the community. We’re handing out MERP$ fairly—because if you’re a true Merper, you deserve a piece of the revolution. (A small reserve may be set aside for community initiatives, future NFT rewards, and interactive experiences.)</li>
        </ul>
        <p><strong>Interactive Ecosystem:</strong></p>
        <ul>
          <li><strong>Merp Club Lounge:</strong> Holders unlock exclusive access to our digital speakeasy, where you can chat, vote on outrageous community proposals via the “Merp Council,” and enjoy secret meme drops.</li>
          <li><strong>Merp Arcade & NFT Vault:</strong> Engage in token-gated games that reward you with additional MERP$ and limited-edition NFTs—physical swag and digital collectibles that prove you’re one of us.</li>
          <li><strong>Gamified Merp Levels:</strong> The more you interact, the higher your Merp Level becomes, unlocking special roles and perks. This isn’t just holding a token—it’s joining an evolving revolution.</li>
        </ul>
        <p><strong>Consensus Mechanism:</strong></p>
        <ul>
          <li><strong>Proof of Absurdity (PoA):</strong> In a nod to our irreverent spirit, our consensus is measured in meme-worthy, nonsensical actions. The more absurd and engaging you are, the more secure and vibrant our network becomes.</li>
        </ul>
        <p><strong>Future Upgrades:</strong></p>
        <p>As MERP$ grows, expect additional interactive features such as staking, yield farming, and dynamic NFT rewards—ensuring that MERP$ isn’t just a static token but an ever-evolving part of the Merple revolution.</p>
      </TokenomicsSection>

      {/* Community Rallying Call Section */}
      <CommunitySection>
        <h2>If you never belonged, you do here.</h2>
        <p>"Always on the outside? Well, now you're in."</p>
        <BuyButton style={{marginBottom: '1rem', backgroundColor: '#cc6600', color: 'white', textShadow: '0 0 10px #cc6600, 0 0 20px #cc6600', border: '2px solid #cc6600'}}>BUY MERP$ NOW!</BuyButton>
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
