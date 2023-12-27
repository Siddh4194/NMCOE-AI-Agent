import React from 'react';

export default function Headlines(props) {
    return(
        <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-4 col-md-4 col-sm-12  info">
                            <h4 className="bg-color">Exprimental Model 🛞</h4>
                            <p>
                            <span style={{fontWeight: 500}}>I'm Campuse Guid, your creative and helpful collaborator.</span> 
                            I have limitations and won't always get it right, but your feedback will help me to improve. Give feedBack From the right corner tab.
                            </p>
                        </div>
                        <div className="col-12 col-lg-4 col-md-4 col-sm-12  info">
                            <h4>Purpose</h4>
                            <p>Give informarion to the students about the campuse and admission process and give information about our collage.Students can ask the questions from the tabs and inputs.The chatbot is designed to help students with the admission process.The chatbot can provide students with resources and support.</p>
                        </div>
                        <div className="col-12 col-lg-4 col-md-4 col-sm-12  info">
                            <h4>🤗 Interested for admission</h4>
                            <p>If you are <span style={{fontWeight: 500, textDecoration: 'underline', borderBottom: '2px solid rgb(72, 72, 214)'}}>interested for admission</span>.Fill below form with right information our admission cell contact you shortly.</p>
                        </div>
                    </div>
                </div>
    )
}