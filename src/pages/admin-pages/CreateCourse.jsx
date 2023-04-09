import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../enviroment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.string().required("Date is required"),
});

const initialValues = {
  name: "",
  description: "",
  date: dayjs(),
};

const CreateCourse = () => {
  // Functions
  const createCourse = async ({ name, description, date }) => {
    try {
      let body = {
        name,
        description,
        Date: date.format("YYYY-MM-DD"),
      };
      const token = localStorage.getItem("token");
      const { status } = await axios.post(API_URL + "/course/", body, {
        headers: {
          "x-token": token,
        },
      });
      if (status === 200) {
        toast.success("Course created successfully!");
        window.history.back();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <main className="xs:p-5 sm:p-20 h-screen grid place-items-center">
      <div className="w-full h-[80%]">
        <button
          onClick={() => window.history.back()}
          className="text-white shadow-black/40 shadow-lg bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] rounded-md p-2 relative z-40"
        >
          Return
        </button>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            createCourse(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setValues,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col bg-white p-10 space-y-6"
            >
              <h1 className="font-bold text-3xl relative before:absolute before:w-[40px] before:h-[3px] before:left-1/2 before:translate-x-[-50%] before:bg-[#6a43ff] before:rounded-lg before:-bottom-2 text-center">
                Create a new Course
              </h1>
              <TextField
                name="name"
                label="Full Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.name) && touched.name}
                helperText={touched.name && errors.name}
                variant="standard"
                required
              />
              <TextField
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                multiline
                rows={4}
                error={Boolean(errors.description) && touched.description}
                helperText={touched.description && errors.description}
                variant="standard"
                required
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast={true}
                  value={values.date}
                  onChange={(newDate) =>
                    setValues({ ...values, date: newDate })
                  }
                />
              </LocalizationProvider>
              <button
                type="submit"
                className="text-white shadow-black/40 shadow-lg bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] rounded-full p-2"
              >
                CREATE COURSE
              </button>
            </form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default CreateCourse;
