
import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import { useRef } from 'react';
import * as menu from './menu.json';

const imgPaths = Array(6).fill("").map((item, index) => `${index + 1}.jpeg`)
console.log(imgPaths)


function Menu() {
  const [currentSection, setCurrentSection] = useState("Antipasti")

  function handleClick(e) {
    setCurrentSection(e.target.innerHTML)
  }
  
  return (
    <>
      <h1 class="hidden">MENU</h1>
      <div class="buttons hidden">
        <a href="#current"><button onClick={handleClick}>Antipasti</button></a>
        <a href="#current"><button onClick={handleClick}>Primi</button></a>
        <a href="#current"><button onClick={handleClick}>American Lunch</button></a>
        <a href="#current"><button onClick={handleClick}>Secondi</button></a>
        <a href="#current"><button onClick={handleClick}>Contorni</button></a>
        <a href="#current"><button onClick={handleClick}>Insalate</button></a>
      </div>
      <div id="current" className="menu hidden">
      <h2  className='name-course'>{currentSection}</h2>
        {menu[currentSection].map(function (item, index) {
          return (
            <>
              <h3 className='name-dish'>{item.name} <span className='price'>{item.price}</span></h3> 
              <p className='desc'>{item.description}</p>
            </>
          )
        })}
        {/* <h2 className="name-course">Antipasti</h2>
      <h3 className="name-dish">Vitello Tonnato</h3>
      <p className="desc">vitello cotto a bassa temperatura, salsa tonnata e capperi <span class="price">10</span></p>
      <h3 className="name-dish">Vitello Tonnato</h3>
      <p className="desc">vitello cotto a bassa temperatura, salsa tonnata e capperi <span class="price">10</span></p>
      <h3 className="name-dish">Vitello Tonnato</h3>
      <p className="desc">vitello cotto a bassa temperatura, salsa tonnata e capperi <span class="price">10</span></p> */}
      </div>
    </>
  )
}

function Gallery({ index, handleChange }) {
  const imgRef = useRef(0)

  useEffect(() => {

  }, [index])

  return (
    <div class="gallery hidden">
      <img ref={imgRef} src={`/${imgPaths[index]}`}></img>
      <button onClick={handleChange} id="next"><i class="fa-solid fa-chevron-right"></i></button>
      <button id="back"><i class="fa-solid fa-chevron-left"></i></button>
    </div>
  )
}

function App() {
  const [index, setIndex] = useState(0)
  const hasNext = index < imgPaths.length - 1;

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleClick()
    }, 2000)
    return () => clearInterval(intervalId)
  }, [index])


  function handleClick() {
    if (hasNext) {
      setIndex(index + 1)
    } else {
      setIndex(0)
    }
  }

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "-100px",
      threshold: 0.2
    };

    let callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show")
        }
        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        //   entry.isIntersecting
        //   entry.rootBounds
        //   entry.target
        //   entry.time
      });
    };

    let observer = new IntersectionObserver(callback, options);
    let target = document.querySelectorAll(".hidden");
    target.forEach((el) => observer.observe(el));
  }, [])

  return (
    <div className="App">
      <nav>
        <div id="nav-bar">
          <ul>
            <li><a href="#chi-siamo">NOI</a></li>
            <li><a href="#menu">MENU</a></li>
            <li><a href="#prenota">PRENOTA</a></li>
          </ul>
        </div>
      </nav>
      <header>
        <img class="left" src="/utens1.svg"></img>
        <img class="right" src="/utens2.svg"></img>
        <div class="hello">
          <img src="forks.png"></img>
          <p>L'ANGOLINO</p>
          <span>cucina e relax</span>
          <div class="scroller"><a href="#chi-siamo"><i class="fa-solid fa-chevron-down"></i></a></div>
        </div>
      </header>
      <main>
        <section id="chi-siamo">
          <h1 class="hidden">FILOSOFIA</h1>
          <p>Siamo un ristorante che crede nella qualità delle realtà locali e nella collaborazione tra le piccole imprese. Per questo motivo, la maggior parte dei nostri prodotti e delle materie prime proviene da attività locali. Ci impegniamo a garantire la massima qualità dei nostri piatti, utilizzando solo ingredienti freschi e di stagione. Il nostro obiettivo è offrire un'esperienza culinaria unica, che soddisfi i gusti e le esigenze di ogni cliente.</p>
          <span><img class="hidden" src="/burger.svg"></img></span>
        </section>
        <section id="cucina">
          <h1 class="hidden">CUCINA</h1>
          <p> Potrete gustare piatti della tradizione italiana rivisitati in chiave moderna, utilizzando solo ingredienti di alta qualità provenienti da attività locali. </p>
          <span><img class="hidden" src="/spaghetti.svg"></img></span>
        </section>
        <section id="gallery">
          <h1 class="hidden">GALLERY</h1>
          <p>Le immagini parlano più delle parole: scopri la nostra galleria fotografica e lasciati conquistare dai nostri piatti.</p>
          <Gallery index={index} handleChange={handleClick} />
        </section>
        <section id="menu">
          <Menu />
        </section>
        <section id="prenota">
          <h1 class="hidden">PRENOTA</h1>
          <p>Pronti a scoprire la magia del nostro ristorante?<br>
          </br>Siamo pronti ad accogliervi con il nostro meglio e a farvi vivere un'esperienza culinaria unica!</p>
          <div class="contacts hidden">
          <span class="mean" style={{animation: "bouncing2 3s infinite ease-in-out"}}><a href="https://wa.me/393483340154/?text=Ciao,%20vorrei%20prenotare%20un%20tavolo." target="_blank"><i class="fa-brands fa-whatsapp" style={{color: "green"}}></i><span>Scrivici!</span></a></span>
          <span class="mean" style={{animation: "bouncing2 3s infinite ease-in-out"}}><a href="tel:+393483340154" target="_blank"><i class="fa-solid fa-phone" style={{color: "#3C525D"}}></i><span>348 334 0154</span></a></span>
          <span class="mean"><i class="fa-solid fa-map-pin" style={{color: "#3C525D"}}></i><a href="http://maps.google.com/?q=Viale Gramsci 7, Robbio" target="_blank"><span>Viale Gramsci 7, Robbio (PV)</span></a></span>
          <span class="mean"><i class="fa-regular fa-calendar-days" style={{color: "#3C525D"}}></i><span>Aperti tutti i giorni!</span></span>
          </div>
        </section>
      </main>
      <footer>
        <div id="footer">
          <h3>
            L'ANGOLINO DI SARA ROSSETTI
          </h3>
          <p>P IVA 000000000</p>
          <p>Viale Gramsci 7, Robbio (PV)</p>
          <p>Site by Emiliano Bonezzi</p>
        </div>

      </footer>
    </div>
  );
}

export default App;
