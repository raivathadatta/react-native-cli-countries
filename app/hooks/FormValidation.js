// useFormValidation.js
import {useFormik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  dob: Yup.date().required('Date of Birth is required'),
  images: Yup.mixed().required('Images are required'),
  sex: Yup.string().required('Sex is required'),
  address: Yup.string().required('Address is required'),
  fatherName: Yup.string().required('Father name is required'),
  idCard: Yup.string().required('ID Card is required'),
  bloodGroup: Yup.string().required('Blood group is required'),
  nationality: Yup.string().required('Nationality is required'),
});

const useFormValidation = () => {
  return useFormik({
    initialValues: {
      phone: '',
      dob: '',
      images: '',
      sex: '',
      address: '',
      fatherName: '',
      idCard: '',
      bloodGroup: '',
      nationality: '',
    },
    validationSchema,
    onSubmit: values => {
      console.log(values);
    },
  });
};

export default useFormValidation;
