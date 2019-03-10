import React from "react";
import "./ImageLinkForm.css";
const ImageLinkForm = ({onInputChange, onSubmitButton}) => {
    return (
        <div className="f3">
            <p className="center">
                {'This Magic Brian will detect Faces in your pictures. Git it a try'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" onChange={onInputChange} type="text"/>
                    <button onClick={onSubmitButton} style={{ border:"none" }} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" >Detect</button>
                </div>
            </div>
        </div>
    );
}
export default ImageLinkForm;