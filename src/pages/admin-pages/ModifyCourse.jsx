import React from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../enviroment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
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

const ModifyCourse = () => {
  const { id } = useParams();
  // States
  const [formData, setFormData] = useState(initialValues);
  // Functions
  const modifyCourse = async ({ name, description, date }) => {
    try {
      let body = {
        name,
        description,
        Date: date.format("YYYY-MM-DD"),
      };
      const token = localStorage.getItem("token");
      const { status } = await axios.put(API_URL + `/course/${id}`, body, {
        headers: {
          "x-token": token,
        },
      });
      if (status === 200) {
        toast.success("Course modified successfully!");
        window.history.back();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getCourse = useCallback(async () => {
    try {
      const {
        data: { Date, name, description },
      } = await axios.get(API_URL + `/course/${id}`);
      setFormData({ date: dayjs(Date), name, description });
    } catch (error) {
      toast.error(error.message);
    }
  }, [id]);
  useEffect(() => {
    getCourse();
  }, [getCourse]);
  return (
    <main className="xs:p-5 sm:p-20 h-screen grid place-items-center">
      <div className="w-full h-[80%]">
        <button
          onClick={() => window.history.back()}
          className="text-white shadow-black/40 shadow-lg bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] rounded-md p-2 relative z-40"
        >
          Return
        </button>
        {formData && (
          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values, { setSubmitting }) => {
              modifyCourse(values);
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
                <h1 className="font-bold text-3xl relative before:absolute before:w-[40px] before:h-[3px] before:left-1/2 before:translate-x-[-50%] before:bg-[#6a43ff] before:rounded-lg before:-bottom-2 text-center py-2">
                  Modify Course
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
                  MODIFY COURSE
                </button>
              </form>
            )}
          </Formik>
        )}
      </div>
    </main>
  );
};

export default ModifyCourse;
