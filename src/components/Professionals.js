import { useState } from 'react';


export default function Profissionais() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Todos');
  const [selectedApproach, setSelectedApproach] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const specialties = [
    'Todos', 'Psicologia', 'Psiquiatria', 'Terapia', 'Aconselhamento', 'Coaching'
  ];

  const approaches = [
    'Todos', 'TCC', 'Humanista', 'Psicanálise', 'Gestalt', 'EMDR', 'Mindfulness'
  ];

  const professionals = [
    {
      id: 1,
      name: "Dra. Maria Silva",
      specialty: "Psicóloga Clínica",
      approach: "TCC e Humanista",
      expertise: "Questões de gênero e sexualidade, ansiedade, depressão",
      experience: "8 anos",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      reviews: 47,
      price: "R$ 150/sessão",
      languages: "Português, Inglês",
      modality: "Online e Presencial (SP)",
      lgbtqSpecialized: true
    },
    {
      id: 2,
      name: "Dr. João Santos",
      specialty: "Psiquiatra",
      approach: "Medicina Integrativa",
      expertise: "Saúde mental trans, TH, depressão resistente",
      experience: "12 anos",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      reviews: 32,
      price: "R$ 250/consulta",
      languages: "Português, Espanhol",
      modality: "Presencial (RJ)",
      lgbtqSpecialized: true
    },
    {
      id: 3,
      name: "Dra. Ana Costa",
      specialty: "Psicóloga",
      approach: "Gestalt e EMDR",
      expertise: "Trauma, TEPT, população LGBTQIA+",
      experience: "6 anos",
      photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.7,
      reviews: 28,
      price: "R$ 120/sessão",
      languages: "Português",
      modality: "Online",
      lgbtqSpecialized: true
    },
    {
      id: 4,
      name: "Dr. Pedro Almeida",
      specialty: "Terapeuta",
      approach: "Humanista e Existencial",
      expertise: "Jovens LGBTQIA+, coming out, aceitação familiar",
      experience: "5 anos",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      reviews: 39,
      price: "R$ 130/sessão",
      languages: "Português, LIBRAS",
      modality: "Online e Presencial (RS)",
      lgbtqSpecialized: true
    },
    {
      id: 5,
      name: "Dra. Carla Rodrigues",
      specialty: "Psicóloga",
      approach: "Psicanálise e TCC",
      expertise: "Relações LGBTQIA+, terapia de casal",
      experience: "10 anos",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      reviews: 56,
      price: "R$ 160/sessão",
      languages: "Português, Francês",
      modality: "Online",
      lgbtqSpecialized: true
    },
    {
      id: 6,
      name: "Dr. Marcos Oliveira",
      specialty: "Aconselhador",
      approach: "Mindfulness e ACT",
      expertise: "Ansiedade, stress, minorias sexuais",
      experience: "4 anos",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      rating: 4.6,
      reviews: 22,
      price: "R$ 100/sessão",
      languages: "Português",
      modality: "Online",
      lgbtqSpecialized: true
    }
  ];

  const filteredProfessionals = professionals.filter(professional => {
    const matchesSpecialty = selectedSpecialty === 'Todos' || 
      professional.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    
    const matchesApproach = selectedApproach === 'Todos' || 
      professional.approach.toLowerCase().includes(selectedApproach.toLowerCase());
    
    const matchesSearch = professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.expertise.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSpecialty && matchesApproach && matchesSearch;
  });

  return (
    <div>
  <div id="professionals-section" className="professionals-page" >
    
        <header className="professionals-header">
          <div className="container">
            <h1>Profissionais</h1>
            <p>Encontre especialistas parceiros do MindCare com foco em questões LGBTQIA+</p>
          </div>
        </header>

        {/* Filtros */}
        <section className="filters-section">
          <div className="container">
            <div className="filters-grid">
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Buscar por nome ou especialidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Especialidade:</label>
                <select 
                  value={selectedSpecialty} 
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  {specialties.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Abordagem:</label>
                <select 
                  value={selectedApproach} 
                  onChange={(e) => setSelectedApproach(e.target.value)}
                >
                  {approaches.map(approach => (
                    <option key={approach} value={approach}>{approach}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Lista de Profissionais */}
        <section className="professionals-list">
          <div className="container">
            <div className="results-info">
              <p>
                {filteredProfessionals.length} profissional{filteredProfessionals.length !== 1 ? 'es' : ''} encontrado{filteredProfessionals.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="professionals-grid">
              {filteredProfessionals.map(professional => (
                <div key={professional.id} className="professional-card">
                  <div className="card-header">
                    <img 
                      src={professional.photo} 
                      alt={professional.name}
                      className="professional-photo"
                    />
                    <div className="professional-info">
                      <h3>{professional.name}</h3>
                      <span className="specialty">{professional.specialty}</span>
                      <div className="rating">
                        <div className="stars">
                          {'★'.repeat(Math.floor(professional.rating))}
                          {'☆'.repeat(5 - Math.floor(professional.rating))}
                        </div>
                        <span>({professional.reviews} avaliações)</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="expertise">
                      <strong>Especialização:</strong> {professional.expertise}
                    </div>
                    
                    <div className="details">
                      <div className="detail-item">
                        <i className="fas fa-clock"></i>
                        <span>{professional.experience} de experiência</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-graduation-cap"></i>
                        <span>{professional.approach}</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-globe"></i>
                        <span>{professional.languages}</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-video"></i>
                        <span>{professional.modality}</span>
                      </div>
                    </div>

                    <div className="lgbtq-badge">
                      <i className="fas fa-rainbow"></i>
                      Especializado em LGBTQIA+
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="price">{professional.price}</div>
                    <button className="btn-contact">
                      <i className="fas fa-calendar"></i>
                      Agendar Consulta
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="professionals-cta">
          <div className="container">
            <h2>Não encontrou o profissional ideal?</h2>
            <p>Nossa equipe pode ajudar a encontrar o especialista perfeito para suas necessidades</p>
            <div className="cta-buttons">
              <button className="btn-primary">
                <i className="fas fa-headset"></i>
                Falar com Nossa Equipe
              </button>
              <button className="btn-secondary">
                <i className="fas fa-question-circle"></i>
                Tirar Dúvidas
              </button>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .professionals-page {
          min-height: 100vh;
          background: var(--light);
        }
        
        .professionals-header {
          background: linear-gradient(135deg, var(--primary), var(--primary-light));
          color: white;
          padding: 80px 0 60px;
          margin-top: 40px;
          text-align: center;
        }
        
        .professionals-header h1 {
          font-size: 3rem;
          margin-bottom: 20px;
        }
        
        .professionals-header p {
          font-size: 1.2rem;
          opacity: 0.9;
        }
        
        .filters-section {
          padding: 40px 0;
          background: white;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .filters-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 20px;
          align-items: end;
        }
        
        .search-box {
          position: relative;
        }
        
        .search-box i {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text);
        }
        
        .search-box input {
          width: 100%;
          padding: 12px 15px 12px 45px;
          border: 2px solid var(--gray);
          border-radius: 8px;
          font-size: 1rem;
        }
        
        .filter-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: var(--dark);
        }
        
        .filter-group select {
          width: 100%;
          padding: 12px;
          border: 2px solid var(--gray);
          border-radius: 8px;
          background: white;
        }
        
        .professionals-list {
          padding: 60px 0;
        }
        
        .results-info {
          margin-bottom: 30px;
        }
        
        .professionals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 30px;
        }
        
        .professional-card {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .professional-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
        }
        
        .card-header {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .professional-photo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .professional-info h3 {
          margin: 0 0 5px 0;
          color: var(--dark);
        }
        
        .specialty {
          color: var(--primary);
          font-weight: 600;
          display: block;
          margin-bottom: 8px;
        }
        
        .rating {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .stars {
          color: #FFD700;
          font-size: 0.9rem;
        }
        
        .rating span {
          font-size: 0.8rem;
          color: var(--text);
        }
        
        .card-body {
          margin-bottom: 20px;
        }
        
        .expertise {
          margin-bottom: 15px;
          line-height: 1.5;
        }
        
        .details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 15px;
        }
        
        .detail-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
        }
        
        .detail-item i {
          color: var(--primary);
          width: 16px;
        }
        
        .lgbtq-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--primary-light);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .price {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--primary);
        }
        
        .btn-contact {
          background: linear-gradient(135deg, var(--primary), var(--primary-light));
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s;
        }
        
        .btn-contact:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(109, 40, 217, 0.3);
        }
        
        .professionals-cta {
          background: var(--gray);
          padding: 80px 0;
          text-align: center;
        }
        
        .professionals-cta h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: var(--dark);
        }
        
        .professionals-cta p {
          font-size: 1.1rem;
          margin-bottom: 30px;
          color: var(--text);
        }
        
        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
        }
        
        .btn-primary, .btn-secondary {
          padding: 15px 30px;
          border-radius: 8px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, var(--primary), var(--primary-light));
          color: white;
          border: none;
        }
        
        .btn-secondary {
          background: transparent;
          color: var(--primary);
          border: 2px solid var(--primary);
        }
        
        .btn-primary:hover, .btn-secondary:hover {
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .filters-grid {
            grid-template-columns: 1fr;
          }
          
          .professionals-grid {
            grid-template-columns: 1fr;
          }
          
          .card-header {
            flex-direction: column;
            text-align: center;
          }
          
          .professional-photo {
            align-self: center;
          }
          
          .cta-buttons {
            flex-direction: column;
          }
          
          .professionals-header h1 {
            font-size: 2.2rem;
          }
        }
      `}</style>
  </div>
  );
}