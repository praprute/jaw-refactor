import React, { useState } from 'react';
import MetaTags from 'react-meta-tags';
import ReactDrawer from 'react-drawer';
import { Col, Container, Row, Button, Card, CardBody, CardTitle } from "reactstrap"
import 'react-drawer/lib/react-drawer.css';
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

function UiDrawer(props) {
    const [position, setPosition] = useState();
    const [open, setOpen] = useState(false);

    const toggleTopDrawer = () => {
        setPosition('top');
        setOpen(!open)
    }
    const toggleBottomDrawer = () => {
        setPosition('bottom');
        setOpen(!open)
    }
    const toggleLeftDrawer = () => {
        setPosition('left');
        setOpen(!open)
    }
    const toggleRightDrawer = () => {
        setPosition('right');
        setOpen(!open)
    }
    const onDrawerClose = () => {
        setOpen(false);
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Drawer | Skote - React Admin & Dashboard Template</title>
                </MetaTags>
                <div className="container-fluid">
                    <Breadcrumbs title="Ui" breadcrumbItem="Drawer" />
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Drawer</CardTitle>
                                    <p className="card-title-desc">
                                        Navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected.
                                    </p>
                                    <Button
                                        color="primary"
                                        className=""
                                        onClick={toggleTopDrawer} disabled={open}
                                    >
                                        Top
                                        </Button>{" "}
                                    <Button
                                        color="primary"
                                        className=""
                                        onClick={toggleBottomDrawer} disabled={open}
                                    >
                                        Bottom
                                        </Button>{" "}
                                    <Button
                                        color="primary"
                                        className=""
                                        onClick={toggleLeftDrawer} disabled={open}
                                    >
                                        Left
                                        </Button>{" "}
                                    <Button
                                        color="primary"
                                        className=""
                                        onClick={toggleRightDrawer} disabled={open}
                                    >
                                        Right
                                    </Button>{" "}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
            <ReactDrawer
                open={open}
                position={position}
                onClose={onDrawerClose}
            >
                <ul className="drawer-main-menu list-unstyled">
                    <li className="drawer-menu">
                        <a className="" href="/">
                            <i className="bx bx-home-circle"></i><span>Dashboards</span>
                        </a>
                    </li>
                    <li className="drawer-menu"><a className="" href="#">
                        <i className="bx bx-calendar"></i><span>Calendar</span></a>
                    </li>
                    <li className="drawer-menu"><a className="" href="#">
                        <i className="bx bx-chat"></i><span>Chat</span></a>
                    </li>
                    <li className="drawer-menu">
                        <a className="" href="#">
                            <i className="bx bx-file"></i><span>File Manager</span>
                        </a>
                    </li>
                    <li className="drawer-menu">
                        <a className="" href="#">
                            <i className="bx bx-store"></i><span>Ecommerce</span>
                        </a>
                    </li>
                </ul>
            </ReactDrawer>
        </React.Fragment>
    );
}

export default UiDrawer;