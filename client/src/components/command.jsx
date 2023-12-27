import React from 'react';

export default function Commands(props) {
    const handleCommand = (no)=>{
        props.clikedButton(no);
    }
    return (
        <div className="bot-message buttons">
            <button className="eleg" onClick={() => handleCommand(1)}>Eligibility Criteria</button>
            <button className='dr-1' onClick={() => handleCommand(2)}>Document Required</button>
            <button className="program" onClick={() => handleCommand(3)}>Program Offered</button>
            <button className="facilities" onClick={() => handleCommand(4)}>Facilities Offered</button><br/>
            <button className="salient" onClick={() => handleCommand(5)}>Salient Feature</button>
            <button className="affiliate" onClick={() => handleCommand(6)}>Affiliation</button>
            <button className="acredition" onClick={() => handleCommand(7)}>Accreditation</button>
            <button className="scholarship" onClick={() => handleCommand(8)}>Government Scholarship</button>
        </div>
    );
}
