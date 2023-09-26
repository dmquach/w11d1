import { useEffect, useState } from "react"
import './index.css'

const Form = () => {
    const [user, setUser] = useState({
       name: "",
       email: "",
       phoneNum: "",
       phoneEmpty: true,
       phoneType: "",
       staff: "",
       bio: ""
    }
    )

    const [notification, setNotification] = useState(false)

    const handleOnChange = () => {
        setNotification(!notification)
        console.log("notifcation", notification)
    }

    const [errors, setErrors] = useState([]);

    const validate = () => {
        let errors = {};
        const phoneRE = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}")

        if (!user.name) {
            document.getElementById('form-name').style.backgroundColor = 'red'
            errors.name = ["Name cannot be blank"]
        } else {
            document.getElementById('form-name').style.backgroundColor = 'transparent'
        }
        // if (!user.email || !user.email.includes("@") || !user.email.includes(".")) errors.push("Must have an valid email");
        // if (user.phoneNum && !user.phoneNum.match(phoneRE)) errors.push("Number must be properly formatted");
        // if (user.phoneNum && !user.phoneType) errors.push("Must include phone type");
        // if (user.bio.length > 280) errors.push("Bio must be less than 280 characters");

        return errors;
    }

    const handleSubmit = e => {
        e.preventDefault();

        user.notification = notification;
        user.timeSubmitted = new Date()

        const errorsVar = validate();
        setErrors(errorsVar);

        if (!user.phoneNum) user.phoneType = ""

        if (errorsVar.length !== 0) {
            console.log(errorsVar)
        } else {
            delete user.phoneEmpty
            console.log(user);
        }
    }

    return (
        <>


        <form className='form' onChange={handleSubmit} key='form'>

            <label id="form-name">Name:
            <input type="text"
            value={user.name}
            onChange={e => setUser({...user, name: e.currentTarget.value})}
            />
            </label>
            <p className="errors">{errors.name}</p>

            <label>Email:
            <input type="text"
            value={user.email}
            id="form-email"
            onChange={e => setUser({...user, email: e.currentTarget.value})}
            />
            </label>
            <br />

            <label>Phone number:
            <input type="tel"
            value={user.phoneNum}
            id="form-phone-num"
            placeholder="xxx-xxx-xxxx"
            onChange={e => setUser({...user, phoneNum: e.currentTarget.value, phoneEmpty: (e.currentTarget.value) ? false : true})}
            />
            </label>
            <br />

            <label id="form-phone-type">Phone type:
            <select
            value={user.phoneType}

            onChange={e => setUser({...user, phoneType: e.currentTarget.value})}
            disabled={user.phoneEmpty}
            >
                <option value="" disabled></option>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Mobile">Mobile</option>
            </select>
            </label>
            <br />

            <label>Staff:
            <input type="radio"
            value='Instructor'
            id="form-staff"
            onChange={e => setUser({...user, staff: e.currentTarget.value})}
            checked={user.staff === 'Instructor'}/>Instructor
            <input type="radio"
            value='Student'
            onChange={e => setUser({...user, staff: e.currentTarget.value})}
            checked={user.staff === 'Student'}/>Student
            </label>
            <br />

            <label>Bio
            <input type="textarea"
            value={user.bio}
            id="form-bio"
            onChange={e => setUser({...user, bio: e.currentTarget.value})}
            />
            </label>
            <br />

            <label>Sign up for email notifications
            <input type="checkbox"
            id="form-notification"
            checked={notification}
            onChange={handleOnChange}
            />
            </label>
            <br />
            <button>Create User</button>
        </form>
        </>
    )
}

export default Form;
