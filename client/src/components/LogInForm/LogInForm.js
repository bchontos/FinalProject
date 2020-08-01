import React from 'react';
import "../LogInForm/style.css";

export default function LogInForm({ email, password, onSubmit, handleInputChange }) {
    return (
        <div>
            <form>
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
                <button type="submit" onClick={onSubmit}>Log in</button>
            </form>
        </div>
    )
}
