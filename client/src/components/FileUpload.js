import { useState } from "react";
import axios from  "axios";
import "./FileUpload.css"
const FileUpload = ({contract, account,provider}) => {
    const[file,setFile]=useState(null);
    const[fileName,setFileName]=useState("No image selected");
    //handleSubmit function
    // const handleSubmit=async(e)=>{
    //     e.preventDefault();
    //     if(file){
    //         try{
    //             const formData = new formData();
    //             formData.append("file",file);

    //             const resFile = await axios({
    //                 method: "post",
    //                 url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    //                 data: formData,
    //                 headers: {
    //                   pinata_api_key: "7626335045592e8a248a",
    //                   pinata_secret_api_key: "1a2c06076fe7391a10e1cb281fe59495fbd52deacde084607948d38231feae83",
    //                   "Content-Type": "multipart/form-data",
    //                 },
    //               });
    //               const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
    //               console.log(ImgHash);
    //               contract.add(account,ImgHash);
    //               alert("Successfully Image Uploaded");
    //               setFileName("No image selected");
    //               setFile(null);
    //         }catch(e){
    //             alert("Unable to upload the Pinata");
    //         }
    //     }
    //     alert("Successfully Image Uploaded");
    //             setFileName("No image selected");
    //             setFile(null);
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
          try {
            const formData = new FormData();
            formData.append("file", file);
    
            const resFile = await axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                pinata_api_key: `f8596ad5a14ea5a07571`,
                pinata_secret_api_key: `2500eb85285bca456a064a9da751d3182b9081dcc5aa72d7fcc575dfd7f7d846`,
                "Content-Type": "multipart/form-data",
              },
            });
           const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
         // const ImgHash =  `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`; 
            console.log(ImgHash);
            // const signer = contract.connect(provider.getSigner());
            const signer = contract.connect(provider.getSigner());
            signer.add(account, ImgHash); //contract function
            alert("Successfully image uploaded to pinata");
            setFileName("No image selected");
            setFile(null);
          } catch (error) {
            console.log(error);
            alert("Unable To Upload image.");
          }
        }
      };
    // this retrieveFile function helps to --> fetch image data easily as image is in png form so we want it in data format

    const retrieveFile = (e)=> {
        const data = e.target.files[0]; //files array of files object
       //console.log(data)
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend= () =>{
            setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };
    return (
    <div className="top">
        <form className="form" onSubmit={handleSubmit}>
           <label htmlFor="file-upload" className="choose">
             Choose image
            </label> 
            <input
             disabled={!account} 
             type="file" 
             id="file-upload" name="data" 
             onChange={retrieveFile}
            />
            <span className="textArea">Image:{fileName}</span>
            <button type="submit" className="upload" disabled={!file}>
                 Upload file</button>
        </form>

    </div>
    );
}
export default FileUpload;