import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <Navbar className="nav">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand className="fw-bolder text-light">
                        <h3>Task Nest</h3>
                    </Navbar.Brand>
                    <Nav>
                        <Link to={'/'} style={{ textDecoration: 'none' }} className="text-danger fs-4">
                            Logout
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
