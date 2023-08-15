import * as yup from "yup";

export const vacationSchema = yup.object().shape({
  vacation_id: yup.number().required(),
  destination: yup.string().max(100).required(),
  description: yup.string().max(1000).required(),
  start_date: yup
    .date()
    .transform((value, originalValue) => {
      return new Date(originalValue);
    })
    .min(new Date().toISOString())
    .required(),
  end_date: yup
    .date()
    .transform((value, originalValue) => {
      return new Date(originalValue);
    })
    .min(yup.ref("start_date"), "End date cannot be before Start date")
    .required(),
  price: yup.number().max(10000).positive().min(1).required(),
  image_path: yup.string().url().required(),
});

export const oldVacationSchema = yup.object().shape({
  vacation_id: yup.number().required(),
  destination: yup.string().max(100).required(),
  description: yup.string().max(1000).required(),
  start_date: yup
    .date()
    .transform((value, originalValue) => {
      return new Date(originalValue);
    })
    .required(),
  end_date: yup
    .date()
    .transform((value, originalValue) => {
      return new Date(originalValue);
    })
    .min(yup.ref("start_date"), "End date cannot be before Start date")
    .required(),
  price: yup.number().max(10000).positive().min(1).required(),
  image_path: yup.string().url().required(),
});
