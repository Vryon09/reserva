import { useZxing } from "react-zxing";

type QRScannerTypes = {
  result: string;
  setResult: (result: string) => void;
};

function QRScanner({ result, setResult }: QRScannerTypes) {
  const { ref } = useZxing({
    onDecodeResult(result) {
      console.log("QR: " + result.getText());
      setResult(result.getText());
    },
  });

  return (
    <div>
      {<video ref={ref} className="scale-x-[-1] transform" />}
      {!!result && <p>{result}</p>}
    </div>
  );
}

export default QRScanner;
