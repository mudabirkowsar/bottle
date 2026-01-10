import React from 'react'
import './Gallery.css'

function Gallery() {
  return (
    <section className="gallery2">
      {/* Hero */}
      <div className="gallery2-hero">
        <h1>Our Work & Quality</h1>
        <p>Premium water bottles, custom branding & trusted delivery</p>
      </div>

      {/* Masonry Gallery */}
      <div className="masonry">
        <div className="masonry-item tall">
          <img src="https://images.unsplash.com/photo-1560840067-ddcaeb7831d2" alt="Bottle" />
          <div className="overlay">Custom Branded Bottles</div>
        </div>

        <div className="masonry-item">
          <img src="https://m.media-amazon.com/images/I/717FFvujMPL._AC_UF894,1000_QL80_.jpg" alt="Bottle" />
          <div className="overlay">Event Packaging</div>
        </div>

        <div className="masonry-item wide">
          <img src="https://www.shoptupperware.in/cdn/shop/files/Aquasafe1LtrBottleSF4_800x.png?v=1758714800" alt="Bottle" />
          <div className="overlay">Bulk Supply</div>
        </div>

        <div className="masonry-item">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM6-AvsYXdnmBmKwWa1mQXXa1tPa0V1bQbhw&s" alt="Bottle" />
          <div className="overlay">Premium Quality</div>
        </div>

        <div className="masonry-item tall">
          <img src="https://cdn.expresspharma.in/wp-content/uploads/2017/10/20121947/pet-bottles-600.jpg" alt="Bottle" />
          <div className="overlay">Corporate Branding</div>
        </div>

        <div className="masonry-item">
          <img src="https://i0.wp.com/unlimitedgifts.in/wp-content/uploads/2024/02/bottle-ok.jpg?fit=1000%2C1000&ssl=1" alt="Bottle" />
          <div className="overlay">Hygienic Sealing</div>
        </div>
      </div>
    </section>
  )
}

export default Gallery
