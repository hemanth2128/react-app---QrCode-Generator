import { useState } from "react";
export const QrCode = () => 
  {
    const [img,setImg] = useState("");
    const [loading,setLoading] = useState(false);
    const [qrData,setQrData]=useState("https://Youtube.com");
    const [qrSize, setQrSize]=useState("300");
    
    async function generateQR(){
      setLoading(true);
      try{
        const url=`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;
        setImg(url);
      }
      catch(error){
        console.log("Error generating QR Code",error);
      }
      finally{
        setLoading(false);
      }
    }
    function downloadQR(){
      fetch(img)
      .then((response) => response.blob())
      .then((blob)=>
        { const link= document.createElement("a");
          link.href=URL.createObjectURL(blob);
          link.download="qr-code.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          } );
}

  return (
    <div className="app-container">
         <h2> QR Code Generator</h2>
         {loading && <p>Please Wait...</p>}
          {img &&<img src={img}/>}
        <div>
         
            <label htmlFor="dataInput" className="input-label"> Data For QR Code </label><br/>
               <input type="text" value={qrData} id="dataInput" placeholder="Enter Your Data" onChange={(e)=>setQrData(e.target.value)}/>
            <br/><br/><label htmlFor="sizeInput" className="input-label" >Image For (eg.,150)   </label><br/>
               <input type="text" value={qrSize} onChange={(e)=>setQrSize(e.target.value)} id="sizeInput" placeholder="Enter the Size"></input>

            <br/><br/>   <button className="gen" disabled={loading}   onClick={generateQR}> Generate QR Code </button>
                          <button className="down" onClick={downloadQR}> Download QR Code </button>
        <p className="footer">Designed By <a href="">Hemanth</a></p>
        </div>
      

    </div>
  )
}
export default QrCode;