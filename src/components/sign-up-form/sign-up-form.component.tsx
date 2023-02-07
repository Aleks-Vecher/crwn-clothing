import { useState, FormEvent, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { signUpStart } from '../../store/user/user.acton'
import { AuthError, AuthErrorCodes } from 'firebase/auth'
import { SignUpContainer } from  './sign-up-form.style'

const defaultFormfields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormfields)
  const { displayName, email, password, confirmPassword } = formFields
  const dispatch = useDispatch()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('passwords do noot match')
      return
    }
    try {
      dispatch(signUpStart(email, password, displayName))
      resetFormField()
    } catch (error) {
      if ((error as AuthError ).code === AuthErrorCodes.EMAIL_EXISTS ) {
        alert('Cannot create user,email already in use')
      }
      console.log('user creation encountered an error', error)
    }

  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields((formFields) => { return { ...formFields, [name]: value } })
  }

  const resetFormField = () => {
    setFormFields(defaultFormfields)
  }

  return (
    <SignUpContainer >
      <h2>Don't have an accaount</h2>
      <span>
        Sing up with your email and password
      </span>
      <form onSubmit={handleSubmit} >
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <FormInput
          label='Confirm password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <Button type='submit'>Sign up</Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm