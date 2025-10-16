import './About.css'

function Ab(){
    return (
        <div className="about-page">
            <div className="about-container">
                <h1>About this project</h1>

                <p className="lead">This Hospital Management System was created as a learning project to understand how a complete full-stack web application works from end to end. The goal was to keep everything clean, simple, and easy to follow — from the user interface and API endpoints to the database models that store the application data.</p>

                <h2>Why this project</h2>
                <p>This isn’t meant to be a production-ready system. Instead, it’s more like a hands-on workshop — a space to experiment, explore new ideas, and see how different components fit together. The project walks through common features such as user registration and login, appointment scheduling, role-based actions for admins and doctors, and a simple message log to track workflow events.</p>

                <h2>What you will see</h2>
                <ul>
                    <li>Patient registration and login flows</li>
                    <li>Admin and doctor dashboards with role-specific functionality</li>
                    <li>Appointment management — create, assign, accept/reject, and mark as treated</li>
                    <li>Basic audit messages so admins can keep track of doctor activities</li>
                </ul>

                <h2>Technologies used</h2>
                <ul>
                    <li>Frontend: React (Vite) with react-router for navigation</li>
                    <li>Backend: Node.js and Express for the REST API</li>
                    <li>Database: MongoDB Atlas with Mongoose for schema modeling</li>
                    <li>Authentication: bcrypt for secure password hashing and JSON Web Tokens (JWT) for authorization</li>
                    <li>Dev tooling: npm, Vite, and standard build/lint tools</li>
                </ul>

                <h2>Extending this project</h2>
                <p>If you plan to work further on this project, useful next steps include adding robust input validation, better error handling and logging, automated tests, and production-ready configuration for secrets and CORS. These improvements make the app safer and easier to maintain as it grows.</p>

                <p className="note">If you'd like, I can help you add any of those improvements step-by-step.</p>
            </div>
        </div>
    )
}

export default Ab;
