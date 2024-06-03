'use client'
import Link from 'next/link';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { Session } from 'next-auth';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have more than 8 characters'),
});

export default function SignIn() {
  const [signInData, setSignInData] = useState<Session | null>(null);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const password = watch('password'); 
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const signInData = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInData?.error) {
        toast.error('Invalid email or password', {
          position: 'top-center'
        });
      } else if (signInData?.ok) {
        window.location.href = '/pages/faq'; // Redirection après la connexion réussie
      }
    } catch (error) {
      console.error('[next-auth] Error during signIn:', error);
    }
  };

  return (
    <div className="LoginContainer">
      <div className="Login">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="Enter your email..." {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}

          <label htmlFor="password">Password:</label>
          <div>
            <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password..." {...register('password')} />
          </div>
          {errors.password && <p>{errors.password.message}</p>}

          <button type="submit">Login</button>
        </form>

        <div className="forgot-password">
          <p>Forgot password?</p>
          <Link href="/auth/emailForgotPassword" className='textsin'>Change password</Link>
        </div>

        <div className="register">
          <p>Don&#39;t have an account?</p>
          <Link href="/auth/register" className='textsin'>Create a free account</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
