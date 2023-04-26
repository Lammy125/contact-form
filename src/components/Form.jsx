import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Progress from "./Progress";

const Form = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: "",
    subject: "",
    message: "",
    email: "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    message: yup.string().required("Message is required"),
    email: yup
      .string()
      .required("Email address is required")
      .email("Enter a valid email address"),
  });

  const onSubmit = async (values) => {
    console.log(values);
    var config = {
      method: "post",

      url: "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    };

    setIsLoading(true);

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        setTimeout(() => {
          setIsLoading(false);
          toast.success("Submission successfully");
        }, 300);
        // localStorage.setItem("token", response.data.token);

        setIsLoading(false);
        resetForm();
        navigate("/");
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error.response.data);
        toast.error(error.response.data);
      });
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h3>Fill in your details</h3>
        </div>
        <div className="details">
          <label className="info">Name</label>
          <input
            type="text"
            value={values.name}
            placeholder="Name"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="centerSpan">
            <span className="nameSpan">{touched.name && errors.name}</span>
          </div>
        </div>
        <div className="details">
          <label className="infoEmail">Email</label>
          <input
            type="email"
            value={values.email}
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="centerSpan">
            <span className="emailSpan">{touched.email && errors.email}</span>
          </div>
        </div>
        <div className="details">
          <label className="info">Subject</label>
          <input
            type="text"
            value={values.subject}
            placeholder="Subject"
            name="subject"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="details">
          <label className="info">Message</label>
          <input
            type="text"
            value={values.message}
            placeholder="Message"
            name="message"
            onChange={handleChange}
            onBlur={handleBlur}
            className="inputMessage"
          />
          <div className="centerSpan">
            <span className="messageSpan">
              {touched.message && errors.message}
            </span>
          </div>
        </div>
        <button className="btn" type="submit">
          {isLoading && <Progress />}
          {!isLoading && "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
