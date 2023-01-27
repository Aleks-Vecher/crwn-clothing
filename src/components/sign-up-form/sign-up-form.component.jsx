import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-up-form.style.scss'

const defaultFormfields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormfields)
  const { displayName, email, password, confirmPassword } = formFields

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('passwords do noot match')
      return
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, { displayName })
      resetFormField()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user,email already in use')
      }
      console.log('user creation encountered an error', error)
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields((formFields) => { return { ...formFields, [name]: value } })
  }

  const resetFormField = () => {
    setFormFields(defaultFormfields)
  }

  return (
    <div className='sign-up-container' >
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
    </div>
  )
}

export default SignUpForm