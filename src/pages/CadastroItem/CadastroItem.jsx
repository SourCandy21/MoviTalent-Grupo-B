import { useState } from 'react'
import btimg from '../../assets/BTimg.png'
import './CadastroItem.css'

export default function CadastroItem() {
  console.log("CadastroItem.jsx renderizado");
  const [images, setImages] = useState([]);
  const [condicao, setCondicao] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 3);
      setImages(filesArray);
    }
  };

  return (
    <div className="mobile-container">
      {/* Form */}
      <main className="form-content">
        <form onSubmit={(e) => e.preventDefault()}>
          
          {/* Upload Area */}
          <label className="upload-container">
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleImageChange} 
              className="hidden-input"
            />
            <div className="upload-placeholder">
              <span className="upload-icon"><img src={btimg} alt="Upload" /></span>
              <p className="upload-text">Faça o upload de fotos</p>
              <small className="upload-subtext">selecione até 3 fotos</small>
            </div>
          </label>

          {images.length > 0 && (
            <div className="images-preview-row" style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              {images.map((file, idx) => (
                <img 
                  key={idx} 
                  src={URL.createObjectURL(file)} 
                  alt={`Preview ${idx + 1}`} 
                  style={{ width: '65px', height: '65px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #ddd' }} 
                />
              ))}
            </div>
          )}

          {/* Text Inputs */}
          <div className="input-group">
            <input type="text" placeholder="Título do item" className="form-input" required />
          </div>

          <div className="input-group">
            <textarea placeholder="Digite a descrição do item" className="form-textarea" rows="4" required />
          </div>

          {/* Checkboxes inline */}
          <div className="checkbox-row">
            <label className="custom-checkbox">
              <input type="checkbox" />
              <span>Sou Proprietário(a)</span>
            </label>
            <label className="custom-checkbox">
              <input type="checkbox" />
              <span>Item encontrado</span>
            </label>
          </div>

          {/* Selects estilizados para Mobile */}
          <div className="input-group">
            <div className="select-wrapper">
              <select defaultValue="" className="form-select" required>
                <option value="" disabled>Categoria (Lista de categorias)</option>
                <option value="moveis">Móveis</option>
                <option value="eletro">Eletrodomésticos</option>
                <option value="eletronicos">Eletrônicos</option>
                <option value="eletro">Roupas</option>
                <option value="livros">Livros</option>
                <option value="eletro">Construção</option>
              </select>
            </div>
          </div>

          {/* Condition Radio Buttons (Estilo Segmented Control/Tags) */}
          <div className="radio-group-container">
            <p className="section-label">Condição do item:</p>
            <div className="radio-segmented-control">
              {['Novo', 'Semi-novo', 'Usado'].map((opção) => (
                <label key={opção} className={`radio-tag ${condicao === opção ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="condicao" 
                    value={opção} 
                    checked={condicao === opção}
                    onChange={() => setCondicao(opção)}
                  />
                  {opção}
                </label>
              ))}
            </div>
          </div>

          <div className="input-group">
            <div className="select-wrapper">
              <select defaultValue="" className="form-select" required>
                <option value="" disabled>Forma de Retirada</option>
                <option value="buscar">Buscar no local gratuitamente</option>
                <option value="combinar">A combinar</option>
                <option value="combinar">Aceitar lances</option>
              </select>
            </div>
          </div>

          {/* Map Preview */}
          <div className="map-section">
            <span className="section-label">Localização do Item</span>
            <div className="map-placeholder">
              {/* Substitua pela sua integração real de mapa */}
              <iframe 
                title="Mapa de localização"
                src="https://maps.google.com/maps?q=-23.5051,-47.4522&z=14&output=embed" 
                width="100%" 
                height="130" 
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen="" 
                loading="lazy"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="btn-div">

          <button type="submit" className="submit-btn">Cadastrar</button>
          </div>

        </form>
      </main>
    </div>
  );
}