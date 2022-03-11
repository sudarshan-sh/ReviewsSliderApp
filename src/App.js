import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if(index > people.length - 1){
        index = 0;
      }
      return index;
    })
  }
  const prevSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex - 1;
      if(index < 0){
        index = people.length - 1;
      }
      return index;
    })
  }

  // this will run for auto slide, whenever index changes
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((oldIndex) => {
        let index = oldIndex + 1;
          if(index > people.length - 1){
            index = 0;
          }
          return index;
      })
    }, 3000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <section className="section">
      <div className="title">
      <h2>
        <span>/</span>reviews
      </h2>
      </div>

      <div className="section-container">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;

          let position = 'nextSlide';
          if(personIndex === index){
            position = 'activeSlide';
          }
          if(personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)){
            position = 'prevSlide';
          }
          
          return <article key={id} className={position}>
            <img src={image} alt={name} className='person-img' />
            <h4 className='person-name'>{name}</h4>
            <p className='person-title'>{title}</p>
            <p className='person-text'>{quote}</p>
            <FaQuoteRight className='icon'/>
          </article>
        })}
        <button className="prev" onClick={prevSlide}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={nextSlide}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
