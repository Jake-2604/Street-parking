import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = ({ latitude, longitude }) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    return (
        <div>
            <QRCode value={googleMapsUrl} />
        </div>
    );
};

export default QRCodeComponent;

