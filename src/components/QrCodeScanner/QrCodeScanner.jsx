import {useCallback, useEffect, useRef, useState} from "react";
import QrScanner from "qr-scanner";
import Button from "../Button";

const QrCodeScanner = ({ onScan }) => {
    const videoElem = useRef(null);
    const qrScanner = useRef(null);
    const [isCurrentlyScanning, setIsCurrentlyScanning] = useState(false);
    const [hasCamera, setHasCamera] = useState(false);
    const [isFlashSupported, setIsFlashSupported] = useState(false);
    const [isFlashOn, setIsFlashOn] = useState(false);

    useEffect(() => {
        QrScanner.hasCamera().then(hc => {
            setHasCamera(hc);
        });
    }, [])

    const stopScan = useCallback(() => {
        if (qrScanner.current) {
            qrScanner.current.destroy();
            qrScanner.current = null;
        }
        setIsCurrentlyScanning(false);
    }, []);

    const startScan = useCallback(() => {
        if (hasCamera) {
            setIsCurrentlyScanning(true);
            // Todo костыль
            setTimeout(() => {
                qrScanner.current = new QrScanner(videoElem.current, (code) => {
                    stopScan();
                    onScan(code);
                });
                qrScanner.current.start().then(() => {
                    qrScanner.current.hasFlash().then(r => {
                        setIsFlashSupported(r);
                        if (r) {
                            setIsFlashOn(qrScanner.current.isFlashOn());
                        }
                    })
                });
            }, 0)
        }
    }, [hasCamera, setIsCurrentlyScanning, setIsFlashSupported, onScan, stopScan]);

    if (!hasCamera) {
        return <h2>Кажется, у тебя нет камеры, или доступ к ней заблокирован. Можешь отсканировать код встроенной камерой/удобным приложением.</h2>
    }

    return <div>
        {!isCurrentlyScanning && <Button onClick={() => startScan()}>Отсканировать код</Button>}
        {isCurrentlyScanning && <video style={{ objectFit: 'fill' }} id="qr-scanner" ref={videoElem} width="100%" />}
        {isFlashSupported && <Button onClick={() => qrScanner.current.toggleFlash()}>{isFlashOn ? 'Выключить' : 'Включить'} вспышку</Button>}
        {isCurrentlyScanning && <Button onClick={() => stopScan()}>Закрыть сканер</Button>}
    </div>
}

export default QrCodeScanner;