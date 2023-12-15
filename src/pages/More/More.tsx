import React, { useState } from "react";

const More: React.FC = () => {
  const emailAddress = "aliasifzade@gmail.com";
  const emailAddress2 = "mirjabbarbadalov@gmail.com";

  const [isFrontendOpen, setIsFrontendOpen] = useState(true);
  const [isBackendOpen, setIsBackendOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleSection = (section: string) => {
    setIsFrontendOpen(section === "frontend" ? !isFrontendOpen : false);
    setIsBackendOpen(section === "backend" ? !isBackendOpen : false);
    setIsContactOpen(section === "contact" ? !isContactOpen : false);
  };

  return (
    <div className="ml-20 flex flex-col justify-center items-center w-[850px]">
      {/* Frontend Box */}
      <div
        className={`border rounded p-5 shadow-lg m-4 w-[800px] flex-wrap ${
          isFrontendOpen ? "bg-blue-100" : ""
        }`}
        onClick={() => toggleSection("frontend")}
      >
        <h2 className="text-2xl mb-3 font-bold cursor-pointer">
          Client Technologies 🌐
        </h2>
        {isFrontendOpen && (
          <div className="border rounded p-5 m-4 w-[800px] flex-wrap">
            <ul>
              <li>
                <strong>React:</strong> Powering our sleek and dynamic user
                interface.
              </li>
              <li>
                <strong>Vite:</strong> Streamlining development with a speedy
                build tool for optimized production builds.
              </li>
              <li>
                <strong>TypeScript:</strong> Adding reliability and sanity to
                our JavaScript.
              </li>
              <li>
                <strong>Tailwind CSS:</strong> Styling made easy with our
                utility-first framework.
              </li>
            </ul>
            {/* State Management */}
            <h2>State Management:</h2>
            <ul>
              <li>
                <strong>Redux Toolkit:</strong> Simplifying state management in
                our React app.
              </li>
              <li>
                <strong>React Redux:</strong> Seamless connection of React
                components to the Redux store.
              </li>
            </ul>
            {/* Routing */}
            <h2>Routing:</h2>
            <ul>
              <li>
                <strong>React Router:</strong> Effortless navigation and routing
                in our React applications.
              </li>
            </ul>
            {/* Linting */}
            <h2>Linting:</h2>
            <ul>
              <li>
                <strong>ESLint:</strong> Maintaining a clean and error-free
                codebase.
              </li>
            </ul>
            {/* Build Tools */}
            <h2>Build Tools:</h2>
            <ul>
              <li>
                <strong>Vite:</strong> Empowering both development and
                production builds for efficiency.
              </li>
            </ul>
            {/* CSS Processing */}
            <h2>CSS Processing:</h2>
            <ul>
              <li>
                <strong>PostCSS:</strong> Effortless transformation of styles.
              </li>
            </ul>
            {/* Other Dependencies */}
            <h2>Other Dependencies:</h2>
            <ul>
              <li>
                <strong>Axios:</strong> Handling HTTP requests seamlessly with
                Axios.
              </li>
              <li>
                <strong>Socket.IO Client:</strong> Enabling real-time
                communication between clients and servers.
              </li>
            </ul>
            {/* TypeScript Definitions */}
          </div>
        )}
      </div>
      {/* Backend Box */}
      <div
        className={`border rounded p-5 shadow-lg m-4 w-[800px] ${
          isBackendOpen ? "bg-green-100" : ""
        }`}
        onClick={() => toggleSection("backend")}
      >
        <h2 className="text-2xl mb-3 font-bold cursor-pointer">
          Server Technologies 🖥️
        </h2>
        {isBackendOpen && (
          <div className="flex flex-col flex-wrap">
            <div className=" w-[800px] flex flex-col flex-wrap p-8">
              <ul>
                <li>
                  <strong>Node.js:</strong> Runtime for executing JavaScript
                  code on the server-side.
                </li>
                <li>
                  <strong>Express:</strong> Fast, unopinionated, minimalist web
                  framework for Node.js.
                </li>

                <li>
                  <strong>Mongodb:</strong> a NoSQL database that provides a
                  flexible, schema-less data model and is widely used for its
                  scalability and ease of development.
                </li>

                <li>
                  <strong>Passport:</strong> a Node.js authentication middleware
                  that simplifies the integration of various authentication
                  strategies, such as username and password, social media
                  logins, and third-party authentication providers, into web
                  applications.
                </li>
                <li>
                  <strong>JWT:</strong> library for creating, verifying, and
                  decoding JSON Web Tokens (JWTs), commonly used for secure and
                  compact representation of authentication and authorization
                  claims in web development
                </li>
                <li>
                  <strong>Bcrypt:</strong> password hashing library in Node.js
                  that securely hashes and verifies passwords, providing a
                  robust and adaptive cryptographic technique to safeguard user
                  credentials in applications.
                </li>
                <li>
                  <strong>Socket.io:</strong> JavaScript library that enables
                  real-time, bidirectional communication between clients and
                  servers, facilitating the creation of interactive and dynamic
                  web applications with features like live updates, chat
                  functionality, and collaborative editing.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* Contact */}
      <div
        className={`border rounded p-5 shadow-lg m-4 w-[800px] ${
          isContactOpen ? "bg-yellow-100" : ""
        }`}
        onClick={() => toggleSection("contact")}
      >
        <h2 className="text-2xl mb-3 font-bold cursor-pointer">
          Contact Us 🧙‍♀️🧙‍♀️
        </h2>
        {isContactOpen && (
          <p className="">
            If you have any questions or want to discuss any aspect of our
            project, feel free to reach out at:
            <div className="flex flex-col gap-5 mt-5">
              <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
              <a href={`mailto:${emailAddress2}`}>{emailAddress2}</a>
            </div>
          </p>
        )}
      </div>
    </div>
  );
};

export default More;
