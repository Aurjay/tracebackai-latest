// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';

// ** Icons Imports
import Google from 'mdi-material-ui/Google'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

//** Google SignIn
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { auth } from '../../../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Analytics } from '@vercel/analytics/react'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Predefined list of allowed email addresses
  const allowedEmails = [
    'priyagnanasekaran81@gmail.com',
    'deepakaurjay7@gmail.com',
    'ddps628@gmail.com'
  ]

  // Email Password Login function.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(e) {
    e.preventDefault()

    // Check if the entered email is in the allowedEmails list
    if (allowedEmails.includes(email)) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert('Logged In')
          router.push('../../dashboard')
        })
        .catch(error => {
          console.log(error)
          alert(error.message)
        })
    } else {
      alert('Traceback.ai is accessible only for project members.Please contact admin.')
    }
  }

  // Google SignIn function
  const provider = new GoogleAuthProvider()

// Google SignIn function
const signIn = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const userEmail = user.email;

  // Check if the user's email is in the allowedEmails list
  const isAllowedEmail = allowedEmails.includes(userEmail);
  if (isAllowedEmail) {
    console.log(user);
    router.push('/dashboard');
  } else {
    // Sign out the user if email is not allowed
    await signOut(auth);
    alert('Traceback.ai is accessible only for project members.Please contact admin.');
  }
};


  const [user, loading] = useAuthState(auth)

  if (loading) {
    return <div>Loading</div>
  }
  if (user) {
    router.push('/dashboard')
  }

  return (
    <Box className="content-center">
      <Analytics />
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 48 48"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M48 0H0v48h48V0ZM16 10a2 2 0 1 0 0 4h6v22a2 2 0 1 0 4 0V14h6a2 2 0 1 0 0-4H16Z"
                clipRule="evenodd"
              />
            </svg>
            <Typography
              variant="h6"
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <form onSubmit={handleLogin}>
            <Divider sx={{ my: 1 }}>Login with Google Account</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href="/" passHref>
                <IconButton component="a" onClick={signIn}>
                  <Google sx={{ color: '#db4437' }} />
                </IconButton>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrations />
    </Box>
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
