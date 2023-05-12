// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

//** Google SignIn 
import { getAuth, signInWithPopup, GoogleAuthProvider,signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from "../../../utils/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import { Analytics } from '@vercel/analytics/react';


// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
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

// Email Password Login function.

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')

  function handleLogin(rep) {
    console.log("rep",rep)
    rep.preventDefault()
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{

      return alert("logged In")

      router.push("../../dashboard")
      
    })
    .catch((error) => {
      console.log(error);

      return alert(error.message)

    });
  }


  //Google SignIn function

  const provider = new GoogleAuthProvider()

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user)

  }
  const [user,loading] = useAuthState(auth)

  if (loading){
    return <div> Loading</div>
  }
  if (user){
    
    router.push("/dashboard")

  }

  //function to handle forgot password.
  function openInNewTabPasswordreset(){
    return alert("Try hard to remember...You can do it")
  };




  return (
    
    <Box className='content-center'>
            <Analytics />
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="currentColor" fillRule="evenodd" d="M48 0H0v48h48V0ZM16 10a2 2 0 1 0 0 4h6v22a2 2 0 1 0 4 0V14h6a2 2 0 1 0 0-4H16Z" clipRule="evenodd" /></svg>
            <Typography
              variant='h6'
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
          {/* <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 500, marginBottom: 2.0, ml: 10}}>
              Welcome to {themeConfig.templateName}
            </Typography>
          </Box> */}

          <form>

            <Divider sx={{ my: 1 }}>Login with Google Account</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Facebook sx={{ color: '#497ce2' }} />
                </IconButton>
              </Link> */}
              {/* <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Twitter sx={{ color: '#1da1f2' }} />
                </IconButton>
              </Link> */}
              {/* <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Github
                    sx={{ color: theme => (theme.palette.mode === 'dark' ? '#272727' : theme.palette.grey[300]) }}
                  />
                </IconButton>
              </Link> */}
              <Link href='/' passHref>
                <IconButton component='a' onClick={signIn}>
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
