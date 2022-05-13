import React from 'react';
import PlayStore from '../../../images/playstore.png'
import Appstore from '../../../images/Appstore.png';
import "./Footer.css";

const Footer = () => {
    return <footer id='footer'>
        <div className='leftFooter'>
            <h4>DOWNLOAD OUT APP</h4>
            <p>Download App for Android and IOS Mobile phone</p>
            <img src={PlayStore} alt="playStore" />
            <img src={Appstore} alt="appStore" />
        </div>
        <div className='midFooter'>
            <h1>Ecommarce</h1>
            <p>amco laboris nisi ut al</p>
            <p>2022 &copy;</p>
        </div>
        <div className='rightFooter'>
            <h1>Follow Us</h1>
            <a href='#'>Instagram</a>
            <a href='#'>Facebook</a>
            <a href='#'>Youtube</a>
        </div>
    </footer>
}

export default Footer