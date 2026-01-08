import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';

function Project() {
    const projects = [
        {
            id: 1,
            title: "Gamers-Connect",
            image: "https://marketplace.canva.com/EAE-rfspHQM/1/0/1600w/canva-blue-and-purple-cyberpunk-game-zone-desktop-background-QUVVB5lzUWo.jpg",
            description: "A gamer-focused social networking platform built with React.js featuring modern UI, user profiles, event management system, and real-time chat. Fully responsive design for all devices.",
            github: "#",
            live: "#"
        },
        {
            id: 2,
            title: "Bookstore",
            image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ac0719152551919.63218886992b6.gif",
            description: "Online bookstore application with full CRUD operations, Google Login authentication, and secure checkout process. Responsive interface for seamless shopping experience.",
            github: "#",
            live: "#"
        },
        {
            id: 3,
            title: "Table Track – Restaurant Management Website",
            image: "https://tse4.mm.bing.net/th/id/OIP.gpYHPqqeVRwDpyi2QXHwaAHaD4?pid=Api&P=0&h=180",
            description: "A responsive restaurant management web app built with React.js and Tailwind CSS, featuring table, menu, and order management. Integrated with JSON Server for full API functionality and collaborative team development using GitHub",
            github: "https://github.com/Dileep-krishna/table-track-task",
            live: "https://resturent-bookin-frontend.vercel.app"
        },
        {
            id: 4,
            title: "Weather App",
            image: "https://i.pinimg.com/originals/bd/72/d1/bd72d10c741dde2ce2684577ffa0d86f.gif",
            description: "Real-time weather forecasting application with interactive maps, location-based forecasts, and severe weather alerts. Supports multiple cities and detailed metrics.",
            github: "#",
            live: "https://wether-app-gules.vercel.app"
        },
        {
            id: 5,
            title: "Resume Builder",
            image: "https://miro.medium.com/v2/resize:fit:1024/1*2-VCsvRuL_RS1fNBsKnCjw.jpeg",
            description: "A dynamic Resume Builder application developed using React, Bootstrap, and Material UI, featuring full CRUD functionality. Designed an intuitive user interface that allows users to easily create, edit, and manage resumes efficiently..",
            github: "https://github.com/Dileep-krishna/protfolio-builder",
            live: "https://protfolio-builder-vert.vercel.app"
        },
        {
            id: 6,
            title: "Recipe Finder",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            description: "Recipe discovery platform with ingredient-based search, dietary filters, step-by-step cooking instructions, and user rating system.",
            github: "#",
            live: "#"
        },
        {
            id: 7,
            title: "Fitness Tracker",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            description: "Comprehensive fitness application with workout plans, progress tracking, calorie counter, and integration with wearable devices.",
            github: "#",
            live: "#"
        },
        {
            id: 8,
            title: "E-Commerce Platform",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            description: "Full-featured e-commerce solution with shopping cart, payment gateway integration, order management, and admin dashboard.",
            github: "#",
            live: "#"
        },
        {
            id: 9,
            title: "Portfolio Website",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            description: "Modern portfolio website with dark/light mode toggle, project showcase, blog section, and contact form with email integration.",
            github: "#",
            live: "#"
        },
        {
            id: 10,
            title: "Chat Application",
            image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            description: "Real-time chat application with group chats, file sharing, message encryption, and online status indicators using WebSocket technology.",
            github: "#",
            live: "#"
        }
    ];

    return (
        <div className='project-container' style={{
            backgroundImage: "url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
            padding: "20px 0"
        }}>
            <Container fluid>
                <div className="d-flex flex-column flex-lg-row">
                    {/* Left Side - Header and Information */}
                    <div className="left-side col-lg-3 mb-4 mb-lg-0 pe-lg-4" style={{ minHeight: '100vh' }}>
                        {/* Header Section */}
                        <div className="sticky-top pt-4" style={{ top: '20px' }}>
                            <div className="mb-5">
                                <h1 className="text-warning display-4 fw-bold">My Projects</h1>
                                <p className="text-light lead">A collection of my recent work and projects</p>
                            </div>
                            
                            {/* Back Button */}
                            <div className="mb-5">
                                <Link to="/" className="text-decoration-none">
                                    <Button variant="danger" size="lg" className="px-5 py-3">
                                        <i className="bi bi-arrow-left me-2"></i>
                                        Back to Home
                                    </Button>
                                </Link>
                            </div>
                            
                            {/* Statistics Section */}
                            <div className="text-light mb-5">
                                <h4 className="text-warning mb-4">Project Stats</h4>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Total Projects:</span>
                                    <span className="fw-bold">{projects.length}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Completed:</span>
                                    <span className="fw-bold text-success">10</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>In Progress:</span>
                                    <span className="fw-bold text-warning">0</span>
                                </div>
                            </div>
                            
                            {/* Technologies Used */}
                            <div className="text-light mb-5">
                                <h4 className="text-warning mb-4">Technologies</h4>
                                <div className="d-flex flex-wrap gap-2">
                                    <span className="badge bg-primary p-2">React.js</span>
                                    <span className="badge bg-success p-2">Bootstrap</span>
                                    <span className="badge bg-info p-2">JavaScript</span>
                                    <span className="badge bg-warning p-2">HTML/CSS</span>
                                    <span className="badge bg-danger p-2">API Integration</span>
                                    <span className="badge bg-secondary p-2">GitHub</span>
                                </div>
                            </div>
                            
                            {/* Contact Information */}
                            <div className="text-light">
                                <h4 className="text-warning mb-4">Get In Touch</h4>
                                <div className="mb-3">
                                    <i className="bi bi-envelope me-2 text-warning"></i>
                                    <a href="mailto:dileepkrishna7178@gmail.com" className="text-light text-decoration-none">
                                        dileepkrishna7178@gmail.com
                                    </a>
                                </div>
                                <div className="mb-3">
                                    <i className="bi bi-github me-2 text-warning"></i>
                                    <a href="https://github.com/Dileep-krishna" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">
                                        GitHub Profile
                                    </a>
                                </div>
                                <div className="text-center mt-4 pt-3 border-top border-light">
                                    <p className="mb-0 text-warning">
                                        <i className="bi bi-code-slash me-2"></i>
                                        Made by Dileep Krishna
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Projects Grid */}
                    <div className="right-side col-lg-9">
                        {/* Projects Grid */}
                        <Row xs={1} md={2} className="g-4">
                            {projects.map((project) => (
                                <Col key={project.id}>
                                    <Card className="h-100 shadow-lg border-0 project-card">
                                        <Card.Img
                                            variant="top"
                                            src={project.image}
                                            style={{ 
                                                height: '200px', 
                                                objectFit: 'cover',
                                                borderTopLeftRadius: '0.375rem',
                                                borderTopRightRadius: '0.375rem'
                                            }}
                                        />
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="text-primary fw-bold">
                                                {project.title}
                                            </Card.Title>
                                            <Card.Text className="flex-grow-1">
                                                {project.description}
                                            </Card.Text>
                                            <div className="d-flex justify-content-between mt-auto pt-3">
                                                <a 
                                                    href={project.github} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-decoration-none"
                                                >
                                                    <Button variant="outline-primary" className="px-4">
                                                        <i className="bi bi-github me-2"></i>
                                                        GitHub
                                                    </Button>
                                                </a>
                                                <a 
                                                    href={project.live} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-decoration-none"
                                                >
                                                    <Button variant="success" className="px-4">
                                                        <i className="bi bi-rocket-takeoff me-2"></i>
                                                        Live Demo
                                                    </Button>
                                                </a>
                                            </div>
                                        </Card.Body>
                                        <Card.Footer className="text-muted text-center">
                                            Project #{project.id}
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {/* Additional Footer (Optional) */}
                        <div className="text-center mt-5 pt-4 d-lg-none">
                            <a href="mailto:dileepkrishna7178@gmail.com" className="text-warning text-decoration-none">
                                <i className="bi bi-envelope me-2"></i>
                                Made by Dileep Krishna
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Project;