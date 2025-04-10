import React from 'react'
import { useState } from 'react'
import Logo from '../shared/Logo'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

	const [input, setInput] = useState({ name: "", email: "", password: "" });

	const navigate = useNavigate();
	const handleChange = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	}

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:8000/user/register', input, {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true
			});
			console.log(res);
			if (res.data.success) {
				toast.success(res.data.message);
				setTimeout(() => {
					navigate('/');
				}, 1000);
			}
		}
		catch (error) {
			toast.error(error.response?.data?.message || 'An error occurred');
			console.log(error);
		}
	}


return (
	<div className='flex items-center justify-center min-h-screen bg-gray-50'>
		<Card className="w-[400px] shadow-lg">
			<CardHeader className="space-y-1">
				<div className="flex justify-center mb-4">
					<Logo />
				</div>
				<CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
				<CardDescription className="text-center">
					Enter your details below to create your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={submitHandler} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Full Name</Label>
						<Input
							id="name"
							type="text"
							name="name"
							placeholder="Enter your full name"
							className="w-full"
							value={input.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							name="email"
							placeholder="Enter your email"
							className="w-full"
							value={input.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							name="password"
							placeholder="Create a password"
							className="w-full"
							value={input.password}
							onChange={handleChange}
							required
						/>
					</div>
					<Button className="hover:cursor-pointer  bg-slate-900 w-full" type="submit">
						<p className="text-white ">Sign Up</p>
					</Button>
					<p className="text-center text-sm text-gray-600">
						Already have an account?{' '}
						<a href="/login" className="text-blue-600 hover:underline">
							Login
						</a>
					</p>
				</form>
			</CardContent>
		</Card>
	</div>
)
}

export default Signup