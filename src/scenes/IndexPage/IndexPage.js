import QrScanner from 'qr-scanner';
import {useCallback, useEffect, useRef, useState} from "react";
import QrCodeScanner from "../../components/QrCodeScanner";

const IndexPage = () => {
    // const videoElem = useRef(null);
    // const qrScanner = useRef(null);
    // const [error, setError] = useState(null);
    //
    // const onScannedCode = useCallback((code) => {
    //     qrScanner.current.stop();
    //     if (!code.startsWith('http://localhost:3000/loginNumber')) {
    //         setError('Некорректный qr-код');
    //     } else {
    //         window.location.replace(code);
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     qrScanner.current = new QrScanner(videoElem.current, onScannedCode);
    //     qrScanner.current.start();
    //     return () => {
    //         qrScanner.current.destroy();
    //         qrScanner.current = null;
    //     }
    // }, [onScannedCode])
    //
    // const restartScan = useCallback(() => {
    //     setError(null);
    //     qrScanner.current.start();
    // }, [setError]);

    return <div>
        <QrCodeScanner onScan={console.log} />
    </div>
}

export default IndexPage;