import React from 'react'

export default function SignUpForm({ name, email, password, onSubmit, handleInputChange }) {
    return (
        <div>
            <form>
                    <input
                        value={name}
                        name="name" 
                        onChange={handleInputChange}
                        type="text" 
                        placeholder="Name" />
                        <br />
                    <input
                        value={email}
                        name="email"
                        onChange={handleInputChange}
                        type="email" 
                        placeholder="Email" />
                        <br />
                    <input
                        value={password}
                        name="password"
                        onChange={handleInputChange} 
                        type="password" 
                        placeholder="Password" />
                        <br />
                    <button type="submit" onClick={onSubmit}>Submit</button>
                </form>
        </div>
    )
}
