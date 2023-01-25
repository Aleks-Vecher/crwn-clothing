import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

import './sign-in-form.style.scss'

const defaultFormfields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormfields)
  const { email, password } = formFields

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password)
      resetFormField()
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          alert('no user associated with this email')
          break
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break
        default:
          console.log(error);
      }
    }

  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const resetFormField = () => {
    setFormFields(defaultFormfields)
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()
  }

  return (
    <div className='sign-up-container' >
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
        <div className='buttons-container' >
          <Button type='submit'>Sign in</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle} >Google sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm