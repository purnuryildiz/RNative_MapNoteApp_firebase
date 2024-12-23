import * as Yup from 'yup';
const AddNoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(15, 'Too Short!')
    .max(300, 'Too Long!')
    .required('Required'),
  time: Yup.string().required('Required'),
  date: Yup.string().required('Required'),
});
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password is too short!')
    .required('Password is required'),
});
const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Full Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password is too short!')
    .required('Password is required'),
});

export {AddNoteSchema, SignInSchema, SignUpSchema};
