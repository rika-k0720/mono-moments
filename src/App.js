import './App.css';
import { useEffect, useRef, useState } from 'react';

function useScrollAnimation() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function useTyping(parts) {
  const [displayed, setDisplayed] = useState([]);
  useEffect(() => {
    let partIndex = 0;
    let charIndex = 0;
    const timer = setInterval(() => {
      if (partIndex < parts.length) {
        const currentPart = parts[partIndex];
        if (charIndex < currentPart.text.length) {
          setDisplayed(prev => {
            const next = [...prev];
            if (!next[partIndex]) {
              next[partIndex] = { text: '', color: currentPart.color };
            }
            next[partIndex] = {
              text: currentPart.text.slice(0, charIndex + 1),
              color: currentPart.color
            };
            return next;
          });
          charIndex++;
        } else {
          partIndex++;
          charIndex = 0;
        }
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);
  return displayed;
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <ul className="nav-links-left">
        <li><a href="#concept" onClick={() => setIsOpen(false)}>Concept</a></li>
        <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
      </ul>
      <div className="logo">
        <img src={require('./logo.png')} alt="MONO MOMENTS" className="logo-img" />
      </div>
      <ul className="nav-links-right">
        <li><a href="#works" onClick={() => setIsOpen(false)}>Works</a></li>
        <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
      </ul>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        &#9776;
      </button>
      <ul className={`nav-links-mobile ${isOpen ? 'open' : ''}`}>
        <li><a href="#concept" onClick={() => setIsOpen(false)}>Concept</a></li>
        <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
        <li><a href="#works" onClick={() => setIsOpen(false)}>Works</a></li>
        <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
      </ul>
    </header>
  );
}

function Hero() {
  const parts = useTyping([
    { text: 'A touch of ', color: '#ffffff' },
    { text: 'colour', color: '#ff8c00' },
    { text: ' in quiet moment', color: '#ffffff' }
  ]);
  return (
    <div className="hero">
      <img src={require('./sunset.png')} alt="sunset" className="hero-img" />
      <div className="hero-text">
        <h1>MONO<br />MOMENTS</h1>
        <p>
          {parts.map((part, i) => (
            <span key={i} style={{ color: part.color }}>{part.text}</span>
          ))}
        </p>
      </div>
    </div>
  );
}

function Concept() {
  const ref = useScrollAnimation();
  return (
    <div className="concept fade-in" id="concept" ref={ref}>
      <h2 className="section-title">CONCEPT</h2>
      <div className="concept-content">
        <div className="concept-title-block">
          <p className="concept-main">MONO<br />MOMENTS</p>
          <p className="concept-sub">A touch of <span className="accent">colour</span> in quiet moment</p>
        </div>
        <div className="concept-text-block">
          <p className="concept-text">
            それは、シンプルの中に宿る光を見つける旅。<br /><br />
            洗練された空間、青と白だけの空、<br />
            何気ない日常のワンシーン。<br />
            そういったものの中にふと現れる<br />
            一筋の光に、私はいつも心を奪われてきた。<br /><br />
            サンセットオレンジを選んだのは、<br />
            太陽が好きだから。<br />
            教員時代にうつ病を経験し、<br />
            太陽の光がどれほど人の心を動かすか<br />
            身をもって知ったから。<br /><br />
            暗闇の中にある光だからこそ、美しい。<br />
            モノクロの世界に差す一色だからこそ、響く。<br /><br />
            同じような価値観を持つ誰かの心に、<br />
            少しでも届く作品を作りたい。<br />
            それが、MONO MOMENTSに込めた想いです。
          </p>
        </div>
      </div>
    </div>
  );
}

function About() {
  const ref = useScrollAnimation();
  return (
    <div className="about fade-in" id="about" ref={ref}>
      <h2 className="section-title">ABOUT ME</h2>
      <div className="about-content">
        <img src={require('./rikako.png')} alt="rika" className="about-img" />
        <div className="about-text">
          <div className="about-row">
            <span className="about-label">RIKA</span>
            <span className="about-desc">
              Former teacher → Now living the nomad life🌏<br />
              Favorite place: Chiang Mai, Thailand🇹🇭<br />
              Loves food, travel & working out🏃‍♀️<br />
              Hopelessly devoted to rice & coffee🍚☕<br />
              24 y/o living life at full speed😆
            </span>
          </div><div className="about-row">
            <span className="about-label">TITLE</span>
            <span className="about-desc">Freelance Web Creator🌏</span>
          </div>
          <div className="about-row">
            <span className="about-label">TOOLS</span>
            <span className="about-desc">Studio / Notion / Slack / Git / GitHub / Canva / Docker</span>
          </div>
          <div className="about-row">
            <span className="about-label">SKILLS</span>
            <span className="about-desc">HTML / CSS / JavaScript / React / Node.js / PHP / Symfony / EC-CUBE / Web制作 / Canva</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Works() {
  const ref = useScrollAnimation();
  return (
    <div className="works fade-in" id="works" ref={ref}>
      <h2 className="section-title">WORKS</h2>
      <div className="coming-soon">
        <p className="coming-text">COMING SOON</p>
        <p className="coming-sub">現在制作実績を準備中です。</p>
      </div>
    </div>
  );
}

function Contact() {
  const ref = useScrollAnimation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (name !== '' && email !== '' && message !== '') {
      setSubmitted(true);
    }
  }

  return (
    <div className="contact fade-in" id="contact" ref={ref}>
      <h2 className="section-title">CONTACT</h2>
      {submitted ? (
        <p className="success-msg">ありがとうございます！後ほどご連絡いたします🙏</p>
      ) : (
        <div className="contact-form">
          <input
            className="form-input"
            type="text"
            placeholder="お名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="form-input"
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className="form-textarea"
            placeholder="メッセージ"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="contact-btn" onClick={handleSubmit}>
            送信する
          </button>
        </div>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <img src={require('./logo.png')} alt="MONO MOMENTS" className="footer-logo-img" />
      <p className="footer-copy">© 2026 Rika. All Rights Reserved.</p>
    </footer>
  );
}
function App() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.classList.add('cursor-follower');
    document.body.appendChild(follower);

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cursor.remove();
      follower.remove();
    };
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <Concept />
      <About />
      <Works />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;