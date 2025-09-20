import { useState } from "react";
import { useZxing } from "react-zxing";

function QRScanner() {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      console.log("QR: " + result.getText());
      setResult("QR: " + result.getText());
    },
  });

  return (
    <div>
      <video ref={ref} className="scale-x-[-1] transform" />
      {!!result && <p>{result}</p>}
    </div>
  );
}

export default QRScanner;
