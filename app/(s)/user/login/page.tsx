import React from 'react'
import Loginform from './loginform'
import Container from '@/components/Container'
import { getCurrentUser } from '@/actions/getcurrentuser'
const Login = async () => {
    const user = await getCurrentUser()
    return (
        <div className=' pt-8 h-screen'>
            <Container>
                <Loginform user={user ? user : null} />

            </Container>
        </div>
    )
}

export default Login