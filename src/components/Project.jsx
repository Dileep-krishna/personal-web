import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Spinner, Badge, Modal, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';

import profile from "./profile.jpeg"; 

function Project() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [backgroundIndex, setBackgroundIndex] = useState(0);

    // Array of beautiful background images
    const backgroundImages = [
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2068&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?q=80&w=2076&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
    ];

    // Rotate background images
    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 8000); // Change image every 8 seconds
        
        return () => clearInterval(interval);
    }, []);

    // API call to get all projects
    useEffect(() => {
        getAllProjects();
    }, []);

    const getAllProjects = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:4000/all-project');
            
            if (response.data.success) {
                // If the API returns data in response.data.data
                const projectData = response.data.data || response.data.projects || [];
                setProjects(projectData);
            } else {
                setProjects([]);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            setError('Failed to load projects. Please try again later.');
            // Fallback to static data if API fails
            setProjects(getStaticProjects());
        } finally {
            setLoading(false);
        }
    };

    // Fallback static data
    const getStaticProjects = () => [
        {
            id: 1,
            title: "Gamers-Connect",
            image: "https://marketplace.canva.com/EAE-rfspHQM/1/0/1600w/canva-blue-and-purple-cyberpunk-game-zone-desktop-background-QUVVB5lzUWo.jpg",
            description: "A gamer-focused social networking platform built with React.js featuring modern UI, user profiles, event management system, and real-time chat. Fully responsive design for all devices.",
            github: "#",
            live: "#"
        },
        // ... rest of your static projects
    ];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (filter === 'all') return matchesSearch;
        if (filter === 'live') return matchesSearch && project.live && project.live !== '#';
        if (filter === 'github') return matchesSearch && project.github && project.github !== 'github.com/Dileep-krishna?tab=repositories';
        return matchesSearch;
    });

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setShowProjectModal(true);
    };

    const ProjectModal = () => (
        <Modal 
            show={showProjectModal} 
            onHide={() => setShowProjectModal(false)}
            centered
            size="lg"
            className="project-modal"
        >
            {selectedProject && (
                <>
                    <Modal.Header 
                        closeButton 
                        style={{ 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            borderBottom: 'none'
                        }}
                    >
                        <Modal.Title className="d-flex align-items-center">
                            <i className="bi bi-stack me-2"></i>
                            {selectedProject.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: 0 }}>
                        <div className="position-relative">
                            <img 
                                src={`http://localhost:4000/imguploads/${selectedProject.image}`} 
                                alt={selectedProject.title}
                                style={{ 
                                    width: '100%', 
                                    height: '300px', 
                                    objectFit: 'cover' 
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: '20px',
                                left: '20px',
                                background: 'rgba(0,0,0,0.7)',
                                padding: '10px 20px',
                                borderRadius: '20px',
                                color: 'white'
                            }}>
                                <Badge bg="primary">Project #{selectedProject.id}</Badge>
                            </div>
                        </div>
                        <div className="p-4">
                            <h5 className="mb-3">Project Description</h5>
                            <p>{selectedProject.description}</p>
                            
                            <div className="d-flex gap-3 mb-4">
                                {selectedProject.technologies && selectedProject.technologies.map((tech, index) => (
                                    <Badge key={index} bg="secondary" pill>
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <Button 
                                        href={selectedProject.github} 
                                        target="_blank"
                                        variant="outline-dark"
                                        className="w-100 d-flex align-items-center justify-content-center"
                                        disabled={!selectedProject.github || selectedProject.github === '#'}
                                    >
                                        <i className="bi bi-github me-2"></i>
                                        View Code
                                    </Button>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <Button 
                                        href={selectedProject.live} 
                                        target="_blank"
                                        variant="primary"
                                        className="w-100 d-flex align-items-center justify-content-center"
                                        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                                        disabled={!selectedProject.live || selectedProject.live === '#'}
                                    >
                                        <i className="bi bi-rocket-takeoff me-2"></i>
                                        Live..
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </>
            )}
        </Modal>
    );

    return (
        <div className='project-container' style={{
            minHeight: '100vh',
            padding: '20px 0',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <style>
                {`
                /* Animated Background */
                .animated-background {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -2;
                    opacity: 0.6;
                }
                
                .background-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, 
                        rgba(15, 12, 41, 0.95) 0%, 
                        rgba(48, 43, 99, 0.93) 50%, 
                        rgba(36, 36, 62, 0.96) 100%);
                    z-index: -1;
                }
                
                @keyframes fadeInOut {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.7; }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.1); opacity: 0.5; }
                }
                
                .floating-element {
                    position: absolute;
                    background: rgba(102, 126, 234, 0.1);
                    border: 1px solid rgba(102, 126, 234, 0.2);
                    border-radius: 20px;
                    animation: float 6s ease-in-out infinite;
                    z-index: -1;
                }
                
                .pulsing-element {
                    position: absolute;
                    background: radial-gradient(circle, rgba(118, 75, 162, 0.3) 0%, rgba(118, 75, 162, 0) 70%);
                    border-radius: 50%;
                    animation: pulse 8s ease-in-out infinite;
                    z-index: -1;
                }
                
                /* Project Card Animations */
                .project-card {
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    background: rgba(255, 255, 255, 0.05);
                    overflow: hidden;
                    position: relative;
                }
                
                .project-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #667eea, #764ba2);
                    transform: scaleX(0);
                    transition: transform 0.3s ease;
                }
                
                .project-card:hover::before {
                    transform: scaleX(1);
                }
                
                .project-card:hover {
                    transform: translateY(-15px) scale(1.02);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
                    border-color: rgba(102, 126, 234, 0.3);
                }
                
                .project-card .card-img-top {
                    transition: transform 0.6s ease;
                }
                
                .project-card:hover .card-img-top {
                    transform: scale(1.1);
                }
                
                .tech-badge {
                    transition: all 0.3s ease;
                }
                
                .tech-badge:hover {
                    transform: translateY(-2px);
                }
                
                .glass-effect {
                    background: rgba(255, 255, 255, 0.08);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                }
                
                .glass-effect:hover {
                    background: rgba(255, 255, 255, 0.12);
                    border-color: rgba(102, 126, 234, 0.4);
                }
                
                .project-modal .modal-content {
                    border-radius: 15px;
                    overflow: hidden;
                    border: none;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: slideUp 0.3s ease-out;
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Typewriter effect for titles */
                .typewriter {
                    overflow: hidden;
                    border-right: 3px solid #667eea;
                    white-space: nowrap;
                    animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
                }
                
                @keyframes typing {
                    from { width: 0 }
                    to { width: 100% }
                }
                
                @keyframes blink-caret {
                    from, to { border-color: transparent }
                    50% { border-color: #667eea }
                }
                
                /* Shimmer effect */
                .shimmer {
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.1) 50%,
                        rgba(255, 255, 255, 0) 100%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                }
                
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                `}
            </style>

            {/* Animated Background Images */}
            <div className="animated-background">
                {backgroundImages.map((image, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundAttachment: 'fixed',
                            opacity: index === backgroundIndex ? 1 : 0,
                            transition: 'opacity 1.5s ease-in-out',
                            filter: 'blur(2px) brightness(0.7)'
                        }}
                    />
                ))}
            </div>

            {/* Gradient Overlay */}
            <div className="background-overlay"></div>

            {/* Floating Elements */}
            <div className="floating-element" style={{
                top: '10%',
                left: '5%',
                width: '100px',
                height: '100px'
            }}></div>
            
            <div className="floating-element" style={{
                top: '70%',
                right: '10%',
                width: '150px',
                height: '150px'
            }}></div>
            
            <div className="pulsing-element" style={{
                top: '30%',
                right: '20%',
                width: '200px',
                height: '200px'
            }}></div>
            
            <div className="pulsing-element" style={{
                bottom: '20%',
                left: '20%',
                width: '120px',
                height: '120px'
            }}></div>

            <Container fluid className="px-lg-5" style={{ position: 'relative', zIndex: 1 }}>
                <div className="d-flex flex-column flex-lg-row">
                    {/* Left Side - Header and Information */}
                    <div className="left-side col-lg-3 mb-4 mb-lg-0 pe-lg-4">
                        <div className="sticky-top pt-4" style={{ top: '20px' }}>
                            {/* Header Section */}
                            <div className="mb-5">
                                <div className="d-flex align-items-center gap-3">
                                    {/* Circular Image */}
                                    <img
                                        src={profile}
                                        alt="Profile"
                                        className="rounded-circle border shimmer"
                                        style={{
                                            width: "55px",
                                            height: "55px",
                                            objectFit: "cover",
                                            animation: 'pulse 4s ease-in-out infinite'
                                        }}
                                    />

                                    {/* Text */}
                                    <div>
                                        <h1
                                            className="text-white fw-bold mb-0"
                                            style={{ fontSize: "2.5rem" }}
                                        >
                                            <span className="typewriter">My Projects</span>
                                        </h1>
                                        <p className="text-light opacity-75 mb-0 mt-2">
                                            Crafted with passion and precision
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Back Button */}
                            <div className="mb-5">
                                <Link to="/" className="text-decoration-none">
                                    <Button 
                                        variant="outline-light" 
                                        size="lg" 
                                        className="w-100 py-3 d-flex align-items-center justify-content-center glass-effect"
                                        style={{
                                            borderRadius: '12px',
                                            borderWidth: '2px',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.transform = 'translateX(-5px)';
                                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.transform = 'translateX(0)';
                                            e.target.style.background = 'transparent';
                                        }}
                                    >
                                        <i className="bi bi-arrow-left me-3 fs-4"></i>
                                        Back to Home
                                    </Button>
                                </Link>
                            </div>
                            
                            {/* Statistics Section */}
                            <div className="glass-effect rounded-3 p-4 mb-5">
                                <h4 className="text-warning mb-4 d-flex align-items-center">
                                    <i className="bi bi-bar-chart-fill me-2 shimmer" style={{ animationDelay: '0.5s' }}></i>
                                    Project Analytics
                                </h4>
                                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-light border-opacity-25">
                                    <span className="text-light">Total Projects</span>
                                    <Badge pill bg="primary" className="fs-6 px-3 py-2">
                                        {projects.length}
                                    </Badge>
                                </div>
                            </div>
                            
                            {/* Technologies Used */}
                            <div className="glass-effect rounded-3 p-4 mb-5">
                                <h4 className="text-warning mb-4 d-flex align-items-center">
                                    <i className="bi bi-tools me-2"></i>
                                    Tech Stack
                                </h4>
                                <div className="d-flex flex-wrap gap-2">
                                    {['React.js', 'Bootstrap', 'JavaScript', 'Node.js', 'MongoDB', 'Express', 'API', 'Git'].map((tech, index) => (
                                        <Badge 
                                            key={index} 
                                            bg="secondary" 
                                            className="tech-badge p-2 px-3"
                                            style={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                border: 'none',
                                                cursor: 'pointer',
                                                animationDelay: `${index * 0.1}s`
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'translateY(-2px) scale(1.1)';
                                                e.target.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'translateY(0) scale(1)';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Contact Information */}
                            <div className="glass-effect rounded-3 p-4">
                                <h4 className="text-warning mb-4 d-flex align-items-center">
                                    <i className="bi bi-chat-dots-fill me-2"></i>
                                    Let's Connect
                                </h4>
                                <div className="mb-3">
                                    <a href="mailto:dileepkrishna7178@gmail.com" className="text-light text-decoration-none d-flex align-items-center">
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            borderRadius: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '10px',
                                            animation: 'pulse 2s ease-in-out infinite'
                                        }}>
                                            <i className="bi bi-envelope text-white"></i>
                                        </div>
                                        <span>dileepkrishna7178@gmail.com</span>
                                    </a>
                                </div>
                                <div className="mb-3">
                                    <a href="https://github.com/Dileep-krishna" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none d-flex align-items-center">
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            background: '#333',
                                            borderRadius: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '10px',
                                            animation: 'pulse 2s ease-in-out infinite',
                                            animationDelay: '0.5s'
                                        }}>
                                            <i className="bi bi-github text-white"></i>
                                        </div>
                                        <span>GitHub Profile</span>
                                    </a>
                                </div>
                                <div className="text-center mt-4 pt-3 border-top border-light border-opacity-25">
                                    <p className="mb-0 text-warning d-flex align-items-center justify-content-center">
                                        <i className="bi bi-heart-fill me-2 text-danger" style={{ animation: 'pulse 1s ease-in-out infinite' }}></i>
                                        Made by Dileep Krishna
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Projects Grid */}
                    <div className="right-side col-lg-9">
                        {/* Search and Filter Section */}
                        <div className="glass-effect rounded-3 p-4 mb-4">
                            <div className="row align-items-center">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <InputGroup>
                                        <InputGroup.Text style={{ 
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            border: 'none',
                                            color: 'white'
                                        }}>
                                            <i className="bi bi-search"></i>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Search projects..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                color: 'white',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                                                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.2)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                    </InputGroup>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-wrap gap-2">
                                        {['all', 'live', 'github'].map((filterType, index) => (
                                            <Button
                                                key={filterType}
                                                variant={filter === filterType ? 'primary' : 'outline-light'}
                                                onClick={() => setFilter(filterType)}
                                                className="text-capitalize"
                                                style={{
                                                    background: filter === filterType 
                                                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                                                        : 'transparent',
                                                    border: filter === filterType ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
                                                    animationDelay: `${index * 0.1}s`,
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (filter !== filterType) {
                                                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                                        e.target.style.transform = 'translateY(-2px)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (filter !== filterType) {
                                                        e.target.style.background = 'transparent';
                                                        e.target.style.transform = 'translateY(0)';
                                                    }
                                                }}
                                            >
                                                {filterType === 'all' ? 'All Projects' : 
                                                 filterType === 'live' ? '' : ''}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status" style={{ 
                                    width: '3rem', 
                                    height: '3rem',
                                    animation: 'pulse 1s ease-in-out infinite'
                                }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="text-light mt-3" style={{ animation: 'fadeInOut 2s ease-in-out infinite' }}>
                                    Loading amazing projects...
                                </p>
                            </div>
                        )}

                        {/* Error State */}
                        {error && !loading && (
                            <div className="alert alert-danger glass-effect" role="alert">
                                {error}
                            </div>
                        )}

                        {/* Projects Grid */}
                        {!loading && !error && (
                            <>
                                <Row xs={1} md={2} xl={3} className="g-4">
                                    {filteredProjects.map((project, index) => (
                                        <Col key={project._id || project.id || index} style={{
                                            animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
                                        }}>
                                            <Card 
                                                className="h-100 shadow-lg border-0 project-card"
                                                onClick={() => handleProjectClick(project)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="position-relative overflow-hidden">
                                                    <Card.Img
                                                        variant="top"
                                                        src={`http://localhost:4000/imguploads/${project.image}`}
                                                        style={{ 
                                                            height: '200px', 
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        right: '10px',
                                                        background: 'rgba(0,0,0,0.7)',
                                                        borderRadius: '20px',
                                                        padding: '5px 15px',
                                                        backdropFilter: 'blur(10px)'
                                                    }}>
                                                        <Badge bg="transparent" className="text-white">
                                                            #{project.id || index + 1}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <Card.Body className="d-flex flex-column">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <Card.Title className="text-white fw-bold">
                                                            {project.title}
                                                        </Card.Title>
                                                        <div className="d-flex gap-1">
                                                            {project.live && project.live !== '#' && (
                                                                <i className="bi bi-rocket-takeoff text-success" style={{ animation: 'float 3s ease-in-out infinite' }}></i>
                                                            )}
                                                            {project.github && project.github !== '#' && (
                                                                <i className="bi bi-github text-light"></i>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Card.Text className="text-light opacity-75 flex-grow-1" style={{
                                                        fontSize: '0.9rem',
                                                        lineHeight: '1.5'
                                                    }}>
                                                        {project.description.length > 120 
                                                            ? `${project.description.substring(0, 120)}...` 
                                                            : project.description}
                                                    </Card.Text>
                                                    <div className="d-flex justify-content-between mt-3 pt-3 border-top border-light border-opacity-25">
                                                        <Button 
                                                            variant="outline-light" 
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                window.open(project.github, '_blank');
                                                            }}
                                                            disabled={!project.github || project.github === '#'}
                                                            className="glass-effect"
                                                        >
                                                            <i className="bi bi-github me-1"></i>
                                                            Code
                                                        </Button>
                                                        <Button 
                                                            variant="primary" 
                                                            size="sm"
                                                            style={{
                                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                                border: 'none'
                                                            }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                window.open(project.live, '_blank');
                                                            }}
                                                            disabled={!project.live || project.live === '#'}
                                                            className="glass-effect"
                                                        >
                                                            <i className="bi bi-rocket-takeoff me-1"></i>
                                                            Live....
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>

                                {/* Empty State */}
                                {filteredProjects.length === 0 && (
                                    <div className="text-center py-5" style={{ animation: 'fadeInOut 3s ease-in-out infinite' }}>
                                        <div style={{
                                            width: '150px',
                                            height: '150px',
                                            margin: '0 auto 30px',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backdropFilter: 'blur(10px)',
                                            animation: 'pulse 2s ease-in-out infinite'
                                        }}>
                                            <i className="bi bi-folder-x text-light" style={{ fontSize: '4rem' }}></i>
                                        </div>
                                        <h4 className="text-light mb-3">No Projects Found</h4>
                                        <p className="text-light opacity-75 mb-4">Try adjusting your search or filter</p>
                                        <Button 
                                            variant="outline-light"
                                            onClick={() => {
                                                setSearchTerm('');
                                                setFilter('all');
                                            }}
                                            className="glass-effect"
                                        >
                                            <i className="bi bi-arrow-clockwise me-2"></i>
                                            Reset Filters
                                        </Button>
                                    </div>
                                )}

                                {/* Results Count */}
                                <div className="mt-4 text-light opacity-75 glass-effect p-3 rounded-3">
                                    <i className="bi bi-info-circle me-2 text-info"></i>
                                    Showing {filteredProjects.length} of {projects.length} projects
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Container>

            {/* Project Detail Modal */}
            <ProjectModal />
        </div>
    );
}

export default Project;