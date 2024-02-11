function validation(values) {
      // alert("")
      // alert("")
      // alert("")
      // alert("")
      let error = {}

      if (values.username === "") {
            error.username = "Username should not be empty"
      }
      else {
            error.username = ""
      }
      if (values.email === "") {
            error.email = "Email should not be empty"
      }
      // else if (!email_pattern.test(values.email)) {
      //       error.email = "Email Didn't match"
      // }
      else {
            error.email = ""
      }
      if (values.password === "") {
            error.password = " Password should not be empty"
      }
      // else if (!password_pattern.test(values.password)) {
      //       error.password = "Password didn't match"
      // }
      else {
            error.password = ""
      }
      return error;
}
export default validation
