function validation(values) {
      // alert("")
      let error = {}

      if (values.email === "") {
            error.email = "Email should not be empty"
      }
      // else if (!/\S+@\S+\.\S+/.test(values.email))
      //       error.email = "Email is not valid"
      else {
            error.email = ""
      }
      if (values.password === "") {
            error.password = " Password should not be empty"
      }
      else {
            error.password = ""
      }
      return error;
}
export default validation