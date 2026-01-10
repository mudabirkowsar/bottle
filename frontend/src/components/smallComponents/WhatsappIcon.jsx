import React from 'react'

function WhatsappIcon() {
    return (
        <div className="whatsapp-wrapper">
            <div className="whatsapp-text">Chat with us</div>
            <a
                href="https://wa.me/6006287541"
                className="whatsapp-float"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i class="fa-brands fa-whatsapp abcdef"></i>
            </a>
        </div>
    )
}

export default WhatsappIcon