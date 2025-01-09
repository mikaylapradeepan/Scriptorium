import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter(); // Router to redirect after sign-up

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle avatar selection
  const handleAvatarSelection = (avatar: string) => {
    setFormData((prevData) => ({
      ...prevData,
      avatar,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, phoneNumber, email, password, confirmPassword, avatar } = formData;

    if (!firstName || !lastName || !phoneNumber || !email || !password || !confirmPassword || !avatar) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (password.length < 8){
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const patt = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
    if (!patt.test(phoneNumber)) {
      setErrorMessage('Phone number is not in a valid form.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      let role = 'USER';
      const response = await fetch('api/user/signup', {
        method: 'POST', // Send POST request to the backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, password, phoneNumber, email, avatar, role }), // Send the form data as JSON
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to login page
        router.push('/login');
      } else {
        setErrorMessage(data.message || 'Sign-up failed.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // style generated by ChatGPT
  return (
    <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName" className="block text-lg font-medium mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className="w-full p-4 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName" className="block text-lg font-medium mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className="w-full p-4 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phoneNumber" className="block text-lg font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full p-4 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full p-4 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="block text-lg font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full p-4 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="block text-lg font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className="w-full p-4 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Avatar Selection */}
          <div className="form-group">
            <label className="block text-lg font-medium mb-2">Select Profile Picture</label>
            <div className="avatar-selection flex space-x-4">
              {['/avatars/avatar1.png', '/avatars/avatar2.png', '/avatars/avatar3.png'].map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className={`w-24 h-24 rounded-full cursor-pointer transition-all duration-300 transform ${formData.avatar === avatar ? 'ring-4 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'}`}
                  onClick={() => handleAvatarSelection(avatar)}
                />
              ))}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none disabled:bg-blue-400"
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;