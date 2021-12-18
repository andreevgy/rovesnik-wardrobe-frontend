import {useCallback, useEffect, useRef, useState} from "react";
import QrScanner from "qr-scanner";

const QrCodeScanner = ({ onScan }) => {
    const videoElem = useRef(null);
    const qrScanner = useRef(null);
    const [hasCamera, setHasCamera] = useState(false);
    const [isFlashSupported, setIsFlashSupported] = useState(false);
    const [isFlashOn, setIsFlashOn] = useState(false);
    const [error, setError] = useState(null);

    const onScannedCode = useCallback((code) => {
        qrScanner.current.stop();
        onScan(code);
    }, [onScan])

    useEffect(() => {
        QrScanner.hasCamera().then(hc => {
            setHasCamera(hc);
            if (hc) {
                qrScanner.current = new QrScanner(videoElem.current, onScannedCode);
                qrScanner.current.start().then(() => {
                    qrScanner.current.hasFlash().then(r => {
                        console.log(r);
                        setIsFlashSupported(r);
                        if (r) {
                            setIsFlashOn(qrScanner.current.isFlashOn());
                        }
                    })
                });

            }
        });
        return () => {
            if (qrScanner.current) {
                qrScanner.current.destroy();
                qrScanner.current = null;
            }
        }
    }, [onScannedCode])

    const restartScan = useCallback(() => {
        setError(null);
        qrScanner.current.start();
    }, [setError]);

    if (!hasCamera) {
        return <h2>
            Сайт не может получить доступ к камере, отсканируй через удобное тебе приложение!
        </h2>
    }

    return <div>
        {isFlashSupported && <button onClick={() => qrScanner.current.toggleFlash()}>{isFlashOn ? 'Выключить' : 'Включить'} вспышку</button>}
        <video id="qr-scanner" ref={videoElem} height={200} width={300} />
        {error && <div>
            <div>{error}</div>
            <button onClick={restartScan}>Попробовать еще раз</button>
        </div>}
    </div>
}

export default QrCodeScanner;