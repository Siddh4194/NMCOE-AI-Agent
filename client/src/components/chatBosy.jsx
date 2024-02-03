import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Context from './context';
import Headlines from './headlines';
import StudentForm from './studentForm';
import Commands from './command';
import ClickableIcon from './eventHandling/clickGoodThumbEvent';
import CopyButton from './eventHandling/copyHandler';

export default function Chatbody(props) {
    // console.log(props.userMessage);
    const setChildren = props.setChildren;
    const children = props.children;
    const chatBodyRef = useRef(null);
    // copy the content to the clipboard
    const handleCopy = async (textToCopy) => {
        try {
          await navigator.clipboard.writeText(textToCopy);
        } catch (error) {
          // console.error('Failed to copy text:', error);
          alert('Copying to clipboard not supported.');
        }
      };
    useEffect(()=>{
        // console.log(props.botResponse);
        const tohtml =(
            props.botResponse.data.responce && 
            <div key={children.length + 1}  className="bot-message">
                <ReactMarkdown>{props.botResponse.data.responce}</ReactMarkdown>
                <div className ='botToggle'> 
                        <button onClick={()=> {handleCopy(props.botResponse.data.responce)}}>
                        <CopyButton initialClass="fa-solid fa-clipboard"/>
                        </button>
                        <button className='goodthumb' >
                            <ClickableIcon thumb={'upthumb'} userMessage={props.userMessage} botMessage={props.botResponse.data.responce} initialColor="black" className="fa-solid fa-thumbs-up" />
                        </button>
                        <button className='badthumb'>
                            <ClickableIcon thumb={'downthumb'} userMessage={props.userMessage} botMessage={props.botResponse.data.responce} initialColor="black" className="fa-solid fa-thumbs-down" />
                        </button>
                </div>
            </div>
            
          )
        setChildren([...children,tohtml]);
    },[props.botResponse])

    useEffect(() => {
        // Scroll to the bottom of the chat body when children change
        if (chatBodyRef.current) {
            const scrollOptions = {
                top: chatBodyRef.current.scrollHeight,
                behavior: 'smooth'
            };
            chatBodyRef.current.scrollTo(scrollOptions);
        }
    }, [children]);

    const pass = (n) => {
        const passArray = [
            (
                <div key={children.length + 1} className="bot-message"><div className='bot'><h3>Documents For OBC</h3><ul><li>SSC Marksheet</li><li>HSC Marksheet</li><li>Leaving Certificate</li><li>Domacile Certificate</li><li>Income Certificate</li><li>MHT-CET / JEE Scorecard</li><li>Income Certificate</li><li>Caste Certificate</li><li>Caste Validity</li><li>Non Cremy Layer Certificate</li></ul></div></div>
            ),
            (
                <div key={children.length + 1} className="bot-message"><div className='bot'><h3>Documents For OPEN</h3><ul><li>SSC Marksheet</li><li>HSC Marksheet</li><li>Leaving Certificate</li><li>Domacile Certificate</li><li>Income Certificate</li><li>MHT-CET / JEE Scorecard</li><li>Income Certificate</li><li>EWS certificate (if applied)</li></ul></div></div>
            ),
            (
                <div key={children.length + 1} className="bot-message"><div className='bot'><ul><li>SSC Marksheet</li><li>HSC Marksheet</li><li>Leaving Certificate</li><li>Domacile Certificate</li><li>Income Certificate</li><li>MHT-CET / JEE Scorecard</li><li>Income Certificate</li><li>Caste Certificate</li><li>Caste Validity</li></ul></div></div>
            ),
            (
                <div key={children.length + 1} className="bot-message"><div className='bot'> <h1 className='bot-h3'>facilities offered</h1> <p>The Central Library is our centre of Information hub with par excellence and has excellent facility with multiple copies of Latest Textbooks, Reference Books and Periodicals. For Needy students Book-Bank facility for Reserved Category Students is also available. Reference section, study rooms and Photocopying Facilities directs students easy and proper path of knowledge in pleasant atmosphere. A Computer Quick Reference is installed in the library. Internet connection is ready for accessing the information 24x7 to all branch students. The following is college asset.</p> <a className='bot-link' href='https://nmcoe.org.in/library.php'>Go to web site</a> </div></div>
            ),
            (
                <div key={children.length + 1} className="bot-message"><div className='burrons'><button onClick={() => pass(3)}>Canteen</button><button onClick={() => pass(3)}>Hostel</button><button onClick={() => pass(3)}>Mess</button></div></div>
            )
        ];
        setChildren([...children, passArray[n - 1]]);
    }

    const handleBody = (n) => {
        const newChild = [
            (
                <div className='bot-message'><div key={children.length + 1} className='bot'><ul><li>12<sup>th</sup> Pass</li><li>Min 45% aggregate marks for Open<br />Min 40% aggregate marks for Category</li><li>At least One Entrance test appearance CET/JEE</li></ul></div></div>
            ),
            (
                <div className='bot-message'><div key={children.length + 1} className='buttons'><h3 className='bot-h3'>Choose You Caste.</h3><button onClick={() => pass(2)}>OPEN</button><button onClick={() => pass(1)}>OBC/SBC</button><button onClick={() => pass(3)}>SC</button><button onClick={() => pass(3)}>ST</button><button onClick={() => pass(3)}>NT/VJDT</button></div></div>
            ),
            (
                <div className='bot-message'><div key={children.length + 1} className='bot'><h3>Courses offered.</h3><br /><p>From traditional undergraduate degrees to specialized graduate programs, there is a course for everyone.Colleges also offer a variety of extracurricular activities and opportunities for students to get involved and grow.<br />Go to Web Site </p><a className='institute' href='https://nmcoe.org.in/courses.php#'>Courses and TFWS Codes</a></div></div>
            ),
            (
                <div className='bot-message'><div key={children.length + 1} className='buttons'><h3 className='bot-h3'>Facilities.</h3><button onClick={() => pass(4)}>Library</button><button><a href='https://nmcoe.org.in/facilities.php'>Other Facilities</a></button></div></div>
            ),
            (
                <div className='bot-message'> <div key={children.length + 1} className='bot'> <p>Each and every faculty, students of institute are contributing their best to achieve the success to enhance the reputation of institute within the society.</p> <li>Excellent infrastructure.</li> <li>1:15 Teacher-Student ratio.</li> <li>Special awards for meritorious students.</li> <li>Library Facility– High text, reference books, e-journals etc.</li> <li>Hostel facilities for Boys and Girls.</li> <li>Bus Facility for students from various places.</li> <li>Programs on personality development, aptitude, communication skills, soft skills and body language.</li> <li>Programs on personality development, aptitude, communication skills, soft skills and body language.</li> <li>Well qualified and experienced teaching staff.</li> <li>All government scholarships.</li> <li>Industry standard laboratories and Workshops.</li> <li>Internet Facility with 50 mbps bandwidth.</li> <li>Training and Placement Cell.</li> </div></div>
            ),
            (
                <div className='bot-message'> <div key={children.length + 1} className='bot'> <h3>'Our college is affiliated with the University of <span className='bot-underline'><a href='https://dbatu.ac.in/'>Dr.Babasaheb Ambedkar Technological University</a></span> Lonere-402103 Tal-Mangaon Dist- Raigad (M.S.) India, which means that our students have access to the university's resources, such as its library, faculty, and research facilities.'</h3></div></div>
            ),
            (
                <div className='bot-message'> <div key={children.length + 1} className='bot'><h3>Accredited by NAAC</h3></div></div>
            ),
            (
                <div className='bot-message'> <div key={children.length + 1} className='bot'><h3>All government schemes applied in our collage.</h3><p>EBC,EWS,TFWS</p></div></div>
            )
        ];
        setChildren([...children, newChild[n - 1]]);
    }

    return (
        <div className="chatBody" ref={chatBodyRef}>
            <Context />
            <Headlines />
            <StudentForm />
            <Commands clikedButton={handleBody} />
            {children}
        </div>
    );
}
