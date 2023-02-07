import { useState, FormEvent, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { googleSignInStart, emailSignInStart } from '../../store/user/user.acton'
import { AuthError, AuthErrorCodes } from 'firebase/auth'

import { SignInContainer, ButtonsContainer } from './sign-in-form.style'

const defaultFormfields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormfields)
  const { email, password } = formFields
  const dispatch = useDispatch()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      dispatch(emailSignInStart(email, password))
      resetFormField()
    } catch (error) {

      if ((error as AuthError).code === AuthErrorCodes.USER_DELETED) {
        alert('no user associated with this email')
      }
      if ((error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD) {
        alert('incorrect password for email')
      }
      console.log(error);
    }

  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const resetFormField = () => {
    setFormFields(defaultFormfields)
  }

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart())
  }

  return (
    <SignInContainer >
      <h2>Already have an accaount?</h2>
      <span>
        Sing in with your email and password
      </span>
      <form onSubmit={handleSubmit} >
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
        <ButtonsContainer>
          <Button type='submit'>Sign in</Button>
          <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} >Google sign in</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm