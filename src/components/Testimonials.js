import { useState, useEffect } from 'react';

export default function Testimonials() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prevIndex) => 
        (prevIndex + 1) % 3 // 3 é o número total de depoimentos
      );
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const moveTestimonial = (index) => {
    setTestimonialIndex(index);
  };

  return (
    <section id="depoimentos" className="section testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Quem usou, aprovou</h2>
          <p className="section-subtitle">Veja o que pessoas da comunidade estão falando sobre nossos serviços</p>
        </div>
        
        <div className="testimonial-container">
          <div 
            className="testimonial-track" 
            style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
          >
            <div className="testimonial-card">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                alt="Lucas" 
                className="testimonial-avatar" 
              />
              <p className="testimonial-text">
                "O Guia me ajudou a encontrar psicólogos inclusivos que realmente entendem as questões LGBT+. 
                Finalmente me sinto compreendido e seguro para falar sobre todos os aspectos da minha vida."
              </p>
              <span className="testimonial-author">Lucas, 19 anos</span>
            </div>
            
            <div className="testimonial-card">
              <img 
                src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                alt="Mariana" 
                className="testimonial-avatar" 
              />
              <p className="testimonial-text">
                "Como mulher trans, é incrível ver conteúdo pensado para nossas necessidades de forma respeitosa. 
                A plataforma me conectou com profissionais especializados em questões de gênero."
              </p>
              <span className="testimonial-author">Mariana, 27 anos</span>
            </div>
            
            <div className="testimonial-card">
              <img 
                src="https://images.unsplash.com/photo-1567532939604-b6b5b0db1604?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                alt="João" 
                className="testimonial-avatar" 
              />
              <p className="testimonial-text">
                "Agora tenho acesso a informações de saúde confiáveis sem medo de preconceito. 
                O chatbot me orientou de forma rápida quando precisei de ajuda urgente."
              </p>
              <span className="testimonial-author">João, 34 anos</span>
            </div>
          </div>
          
          <div className="testimonial-nav">
            <div 
              className={`testimonial-dot ${testimonialIndex === 0 ? 'active' : ''}`} 
              onClick={() => moveTestimonial(0)}
            ></div>
            <div 
              className={`testimonial-dot ${testimonialIndex === 1 ? 'active' : ''}`} 
              onClick={() => moveTestimonial(1)}
            ></div>
            <div 
              className={`testimonial-dot ${testimonialIndex === 2 ? 'active' : ''}`} 
              onClick={() => moveTestimonial(2)}
            ></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonials {
          background-color: var(--gray);
        }
        
        .testimonial-container {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }
        
        .testimonial-track {
          display: flex;
          transition: transform 0.5s ease;
        }
        
        .testimonial-card {
          flex: 0 0 100%;
          padding: 30px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          margin: 0 15px;
          text-align: center;
        }
        
        .testimonial-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 20px;
          border: 4px solid var(--primary-light);
        }
        
        .testimonial-text {
          font-style: italic;
          margin-bottom: 20px;
          font-size: 1.1rem;
          line-height: 1.8;
        }
        
        .testimonial-author {
          font-weight: 700;
          color: var(--primary);
        }
        
        .testimonial-nav {
          display: flex;
          justify-content: center;
          margin-top: 30px;
          gap: 10px;
        }
        
        .testimonial-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ddd;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .testimonial-dot.active {
          background: var(--primary);
        }
      `}</style>
    </section>
  );
}