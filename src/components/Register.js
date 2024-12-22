import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{3,24}$/;
const COLLEGE_REGEX = /^[A-z][A-z0-9- ]{3,23}$/;
const ROLLNO_REGEX = /^(?=.*[0-9]).{0,12}$/;
const NO_REGEX = /^(?=.*[0-9]).{0,10}$/;
const EMAIL_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{3,24}$/;

const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [college, setCollege] = useState('');
    const [validCollege, setValidCollege] = useState(false);
    const [collegeFocus, setCollegeFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [rollno, setRollNo] = useState('');
    const [validRollNo, setValidRollNo] = useState(false);
    const [rollNoFocus, setRollNoFocus] = useState(false);

    const [no, setNo] = useState('');
    const [validNo, setValidNo] = useState(false);
    const [NoFocus, setNoFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidCollege(COLLEGE_REGEX.test(college));
    }, [college])
    
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    useEffect(() => {
        setValidRollNo(ROLLNO_REGEX.test(rollno));
    }, [rollno])

    useEffect(() => {
        setValidNo(NO_REGEX.test(no));
    }, [no])


    useEffect(() => {
        setErrMsg('');
    }, [user, pwd,college,email,rollno,no])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = COLLEGE_REGEX.test(college);
        const v4 =  EMAIL_REGEX.test(email);
        const v5 = ROLLNO_REGEX.test(rollno);
        const v6 =  NO_REGEX.test(no);
        if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            // TODO: remove console.logs before deployment
            console.log(user,pwd,college,email);
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUser('');
            setPwd('');
            setRollNo('');
            setNo('');
            setCollege('');
            setEmail('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="login">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="College">
                            College Name :
                            <FontAwesomeIcon icon={faCheck} className={validCollege ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validCollege || !college ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="College"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setCollege(e.target.value)}
                            value={college}
                            required
                            aria-invalid={validCollege ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setCollegeFocus(true)}
                            onBlur={() => setCollegeFocus(false)}
                        />
                         <p id="uidnote" className={collegeFocus && college && !validCollege ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                        </p>
                        <label htmlFor="Email">
                            Email ID:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail|| !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                       <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                           
                            Must be Thapar Email ID <br />
                        </p>


                        <label htmlFor="password">
                           Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="Number">
                            Contact No.:
                            <FontAwesomeIcon icon={faCheck} className={validNo && no ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validNo|| !no ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="Number"
                            onChange={(e) => setNo(e.target.value)}
                            value={no}
                            required
                            aria-invalid={validNo? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setNoFocus(true)}
                            onBlur={() => setNoFocus(false)}
                        />
                        <p id="confirmnote" className={NoFocus && !validNo ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                           Enter valid Contact No.<br/>
                        </p>
                       
                       <label htmlFor="RollNumber">
                            Roll No.:
                            <FontAwesomeIcon icon={faCheck} className={validRollNo && rollno ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validRollNo|| !rollno ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="RollNumber"
                            onChange={(e) => setRollNo(e.target.value)}
                            value={rollno}
                            required
                            aria-invalid={validRollNo? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setRollNoFocus(true)}
                            onBlur={() => setRollNoFocus(false)}
                        />
                       

                        <button disabled={!validName || !validPwd || !validNo ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/">Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register
