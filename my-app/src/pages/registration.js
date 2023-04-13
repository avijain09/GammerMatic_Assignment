import React, { useState} from "react";
import RegistrationForm from "../forms/RegistrationForm";
import Cropper from "../forms/cropper";

const initialState = {
    FirstName: "",
    LastName:"",
    email:"",
};

const RegisterUser = () => {
    const [values, setValues] = useState(initialState);
       

   

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        
    };

   

    return (
        <div className="container-fluid">
            <div className="row">
                
                {/* <div><Cropper/></div> */}


                <div className="col-md-10">
                    

                   

                    <RegistrationForm
                        
                        handleChange={handleChange}
                        values={values}
                        setValues={setValues}
                    />

                    

                </div>
            </div>
        </div>
    );
};

export default RegisterUser;