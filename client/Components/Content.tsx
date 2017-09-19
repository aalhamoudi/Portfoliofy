import * as React from "React"
import { browserHistory } from 'react-router';

import $ from "jquery"

import { Container, Row, Column } from "./Primitives"
import { NavBar, NavLink } from "./Navigation"
import { ScrollIndicator, HorizontalScrollIndicator } from "./Controls"
import { ResponsiveImage, GalleryImage, ImageGallery } from "./Media"

export class Area extends React.Component<{style?: any}, {}> {
    render() {
        var style = {
            height: "100vh",
            width: "100vw",
            minWidth: "360px !important",
            backgroundColor: "black",
            margin: 0,
            padding: 0
        };

        return (
            <Container className={this.props.style} style={style}>
                {this.props.children}
            </Container>
        );
    }
}

export class ScrollingArea extends React.Component<{path: string}, {views: string[], currentView: number}> {
    constructor(context) {
        super(context);
        this.context = context;
        this.scrollUp = this.scrollUp.bind(this);
        this.scrollDown = this.scrollDown.bind(this);
        this.scrollTo = this.scrollTo.bind(this);

    }

    componentDidMount() {
        this.setState({
            views: ["", "About", "Projects"],
            currentView: 0
        });

        $(document).on("ScrollingArea:scrollUp", this.scrollUp);
        $(document).on("ScrollingArea:scrollDown", this.scrollDown);
        $(window).on("ScrollingArea:scrollTo", this.scrollTo);

        $("#Intro-link").click(() => this.setState({ views: this.state.views, currentView: 0 }));
        $("#About-link").click(() => this.setState({ views: this.state.views, currentView: 1 }));
        $("#Projects-link").click(() => this.setState({ views: this.state.views, currentView: 2 }));

        $(document).on("swipe", function () { window.alert("swipe") })
    }

    scrollUp() {
        if (this.state.currentView > 0) {
            browserHistory.push(this.props.path + "/" + this.state.views[--this.state.currentView]);
        }
        
        
    }

    scrollDown() {
        if (this.state.currentView < (this.state.views.length - 1)) {
            browserHistory.push(this.props.path + "/" + this.state.views[++this.state.currentView]);
        }
    }

    scrollTo() {
        console.log(browserHistory.getCurrentLocation());
    }

    render() {
        var style = {
        };

        return (
            <Area>
                {this.props.children}
                <ScrollIndicator />
            </Area>
        );
    }
}


export class View extends React.Component<{ id: string, bgImage?: string, bgColor?: string, padding?: string}, {scrollDirection: string, lastScrollPosition: number}> {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        $("#" + this.props.id + "-link").addClass("highlighted-link");
    }

    componentWillUnmount() {
        $("#" + this.props.id + "-link").removeClass("highlighted-link");
    }

    handleScroll(event) {
        if (event.deltaY < 0)
            $(document).trigger("ScrollingArea:scrollUp");
        else
            $(document).trigger("ScrollingArea:scrollDown");
    }

    toString() {
        return this.props.id;
    }

    getTitle() {
        return this.props.id;
    }

    getLink() {
        if (this.props.id === "home")
            return "/" + this.props.id;
        else
            return "/portfolio/" + this.props.id;
    }

    render() {
        var imgStyle = {
            backgroundImage: "url(" + this.props.bgImage + ")",
            backgroundColor: this.props.bgColor,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundAttachement: "fixed",
            padding: this.props.padding,
            height: "100%"
        };

        var colorStyle = {
            backgroundColor: this.props.bgColor,
            padding: this.props.padding,
            height: "100%"
        };

        var defaultStyle = {
            height: "100%"
        };

        var style;

        if (this.props.bgImage)
            style = imgStyle;
        else if (this.props.bgColor)
            style = colorStyle;
        else
            style = defaultStyle;

        return (
            <Container className="animated zoomIn" style={{height: "100%", padding: 0, minWidth: 360}}>
                <div id={this.props.id} style={style && style} onWheel={this.handleScroll}>
                    {this.props.children}
                </div>
            </Container>   
        );
    }
}


export class Section extends React.Component<{id: string, bgImage?: string, bgColor?: string, padding?: string}, {}> {
    render() {
        var imgStyle = {
            backgroundImage: "url(" + this.props.bgImage + ")",
            backgroundColor: this.props.bgColor,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundAttachement: "fixed",
            padding: this.props.padding,
            height: "calc(100% - 54px)"
        };

        var colorStyle = {
            backgroundColor: this.props.bgColor,
            padding: this.props.padding
        };

        var style;

        if (this.props.bgImage)
            style = imgStyle;
        else if (this.props.bgColor)
            style = colorStyle;

        return (
            <section className="section" id={this.props.id} style={style && style}>
                {this.props.children}
            </section>
        );
    }
}


export class Header extends React.Component<{ bgImage?: string, bgColor?: string, fullscreen?: boolean, padding?: string}, {}> {
    render() {
        var imgStyle = {
            backgroundImage: "url(" + this.props.bgImage + ")",
            backgroundColor: this.props.bgColor,     
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundAttachement: "fixed",
            padding: this.props.padding
        };

        var colorStyle = {
            backgroundColor: this.props.bgColor,
            padding: this.props.padding
        };

        var style;

        if (this.props.bgImage)
            style = imgStyle;
        else if (this.props.bgColor)
            style = colorStyle;

        if (this.props.fullscreen)
            style.height = "95vh";

        return (
            <header id="header" className="section" style={style && style}>
                {this.props.children}
            </header>
        );
    }
}

export class Footer extends React.Component<{}, {}> {
    render() {
        var style = {
            backgroundColor: "#333",
            minHeight: 150,
            textAlign: "center",
            color: "white"
        };

        return (
            <footer id="header" className="section fp-auto-height" style={style}>
                <div className="col-xs-12">
                    {this.props.children}
                </div>
                <div className="col-xs-12">
                    <h4>© Portfolio, 2016 - All rights reserved</h4>
                </div>
            </footer>
        );
    }
}

export class Carousel extends React.Component<{ id?: string }, {}> {
    componentDidMount() {
        if (/Mobi/.test(navigator.userAgent)) {
            $(".carousel-control-prev").hide();
            $(".carousel-control-next").hide();
            $(".carousel-inner").addClass("mobile-carousel");
        }
    }
    render() {
        return (
            <div id={this.props.id} className="carousel slide" data-ride="carousel" data-interval="false" style={{ height: "100%", paddingTop: 54 }}>
                <ol className="carousel-indicators">
                    {React.Children.map(this.props.children, (child, index) => {
                        return <li data-target={"#" + this.props.id} data-slide-to={index} className={index === 0? "active" : ""}/>;
                    })}
                </ol>
                <div className="carousel-inner" role="listbox" style={{ height: "100%", padding: "25px 100px 125px 100px" }}>
                    {this.props.children}
                </div>
                <a className="carousel-control-prev" href={"#" + this.props.id} role="button" data-slide=
                    "prev" style={{ width: 100 }}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href={"#" + this.props.id} role="button" data-slide=
                   "next" style={{width: 100}}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}

export class CarouselElement extends React.Component<{ active?: boolean }, {}> {
    render() {
        var cls = "carousel-item";
        if (this.props.active)
            cls += " active";

        return (
            <div className={cls} style={{ height: "100%"}}>
                {this.props.children}
            </div>
        );
    }
}


export class Journal extends React.Component<{}, {}> {
    render() {
        var containerStyle = {
            textAlign: "center",
            backgroundColor: "black",
            height: "100%",
            padding: 0
        };

        var listStyle = {
            listStyle: "none",
            height: "100%",
            margin: 0,
            padding: 0,
            overflow: "auto",
            whiteSpace: "nowrap"
        };

        var closeStyle = {
            position: "absolute",
            top: 60,
            right: 30,
            fontSize: "3em",
            color: "white",
            display: "none",
            cursor: "pointer"
        };
        return (
            <div className="container-fluid" style={containerStyle}>
                <ul className="row-fluid" style={listStyle}>
                    {this.props.children}
                </ul>
                <HorizontalScrollIndicator />
                <span id="closeButton" style={closeStyle}>&times;</span>
            </div>
        );
    }
}

export class Article extends React.Component<{ title: string, description: string, image: string }, {}> {
    constructor() {
        super();
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleContentClick = this.handleContentClick.bind(this);
    }

    handleClick(e) {
        var items = e.target.parentElement.parentElement.children.length;
        for (var i = 0; i < items; i++) {
            if (e.target.parentElement.parentElement.children[i] !== e.target.parentElement) {
                e.target.parentElement.parentElement.children[i].style.display = "none";
            }
        }
        e.target.parentElement.onwheel = this.handleScroll;
        e.persist();

        $("#horizontalScrollIndicator").hide();
        $("#" + this.props.title + "-element").removeClass("col-sm-4");

        if (/Mobi/.test(navigator.userAgent)) {
            $("#" + this.props.title + "-content").show();
            $("#" + this.props.title + "-article").hide();
            $("#" + this.props.title + "-background").hide();
        }

        var closeButton = $("#closeButton");
        closeButton.show();
        closeButton.click((event) => {
            for (var i = 0; i < items; i++) {
                    e.target.parentElement.parentElement.children[i].style.display = "inline-block";
            }
            closeButton.hide();

            $("#" + this.props.title + "-content").hide();
            $("#" + this.props.title + "-article").show();
            $("#" + this.props.title + "-background").show();

            $("#horizontalScrollIndicator").show();
            $("#" + this.props.title + "-element").addClass("col-sm-4");

            e.target.parentElement.onwheel = null;

            if (/Mobi/.test(navigator.userAgent)) {
                $("#" + this.props.title + "-content").hide();
                $("#" + this.props.title + "-article").show();
                $("#" + this.props.title + "-background").show();
            }
        });
    }

    handleContentClick(e) {
        e.stopPropagation();
    }
    
    handleMouseOver(e) {
        e.stopPropagation();
        $("#" + this.props.title + "-background").css("background-color", "transparent");
    }

    handleMouseOut(e) {
        e.stopPropagation();
        $("#" + this.props.title + "-background").css("background-color", "black");

    }

    handleScroll(event) {
        event.stopPropagation();

        if (/Mobi/.test(navigator.userAgent)) {
            return;
        }

        if (event.deltaY < 0) {
            $("#" + this.props.title + "-content").hide();
            $("#" + this.props.title + "-article").show();
            $("#" + this.props.title + "-background").show();
        } else {
            $("#" + this.props.title + "-content").show();
            $("#" + this.props.title + "-article").hide();
            $("#" + this.props.title + "-background").hide();
        }
    }

    render() {
        var itemStyle = {
            backgroundImage: "url(" + this.props.image + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            padding: 0,
            cursor: "pointer",
            display: "inline-block"
        };
        var articleStyle = {
            position: "relative",
            top: "50%",
            color: "white"
        };
        var dimStyle = {
            backgroundColor: "black",
            opacity: 0.5,
            width: "100%",
            height: "100%",
            position: "absolute"
        }
        var contentStyle = {
            display: "none",
            width: "100%",
            height: "calc(100%)",
            minWidth: "576px !important",
            backgroundSize: "cover",
            filter: "blur(0px) !important",
        }
        return (
            <li id={this.props.title + "-element"} className="col-12 col-sm-4" style={itemStyle} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                <div id={this.props.title + "-background"} style={dimStyle}></div>
                <article className="animated zoomIn" id={this.props.title + "-article"} style={articleStyle}>
                    <h1 style={{ textShadow: "5px 5px 50px black" }}>{this.props.title}</h1>
                </article>
                <div id={this.props.title + "-content"} style={contentStyle} onClick={this.handleContentClick} >
                    <div style={{ backgroundColor: "black", opacity: 0.25, width: "100%", height: "100%", position: "absolute" }}></div>
                    <div className="animated zoomIn" style={{ width: "100%", height: "100%" }}>
                        {this.props.children}
                    </div>
                </div>
            </li>
        );
    }
}


export class Highlights extends React.Component<{}, {}> {
    render() {
        var style = {
            color: "white",
            textAlign: "center",
            padding: "150px 50px 0 50px",
            width: "100%",
            height: "calc(100% - 75px)",
            overflow: "auto"
        };
        return (
            <Section id="highlights-section" bgImage="/images/background.svg">
                <div id="highlights" style={style}>

                    <div className="row">
                        {this.props.children}
                    </div>
                </div>

                </Section>
        );
    }
}

export class Highlight extends React.Component<{image: string, title: string}, {}> {
    render() {
        var style = {
            padding: "10px 0",
            margin: 0,
            whiteSpace: "normal"
        };
        return (
            <div className="col-lg-3 col-md-4 col-sm-6 col-12" style={style}>
                <i className={"fa " + this.props.image + " fa-4x"} style={{fontSize: "6em"}}/>
                <h3>{this.props.title}</h3>
                <p>{this.props.children}</p>
            </div>  
        );
    }
}

export class Projects extends React.Component<{}, {}> {
    render() {
        var style = {
            margin: 0,
            padding: "100px 100px 100px 100px",
            fontSize: "1.5em"

        };

        

        return (
            <Carousel id="projectsCarousel">
                {React.Children.map(this.props.children, (child, index) => {
                    if (index === 0)
                        return (
                            <CarouselElement active={true} key={index}>
                                <TabPanel id={(child as any).props.name}>
                                    <Tab title="Info">
                                        <h2 style={{ textAlign: "center", fontStyle: "italic" }}>{(child as any).props.name}</h2>
                                        <p style={{ marginBottom: "0.5rem" }}><span style={{ fontWeight: "bold"}}>Description: </span>{(child as any).props.description}</p>
                                        <p style={{ marginBottom: "0.5rem" }}><span style={{ fontWeight: "bold"}}>Link: </span><a href={(child as any).props.link}>{(child as any).props.link}</a></p>
                                        <hr style={{ width: "100%", margin: "0.5rem 0"}}/>
                                        <Row style={{textAlign: "center", margin: 0}}>
                                            <Column style={{ padding: 0 }}>
                                                <h3>Features</h3>
                                                <ul style={{listStyle: "none", padding: 0}}>
                                                    {(child as any).props.features.map((item, index) => <li style={{margin: "10px 0"}} key={index}>{item}</li>)}
                                                </ul>
                                            </Column>
                                            <Column style={{ padding: 0 }}>
                                                <h3>Technologies</h3>
                                                <ul style={{ listStyle: "none", padding: 0 }}>
                                                    {(child as any).props.technologies.map((item, index) => <li style={{ margin: "10px 0" }} key={index}>{item}</li>)}
                                                </ul>
                                            </Column>
                                        </Row>
                                        {(child as any).props.children}
                                    </Tab>
                                    {(child as any).props.images.length > 0 &&
                                        <Tab title="Images">
                                            <ImageGallery>
                                                {(child as any).props.images.map((image, index) => <GalleryImage id={image.replace(/\/[0-9a-zA-Z]+\//, '').replace(/\.[0-9a-zA-Z]+/, "")} link={image} key={index} />)}
                                            </ImageGallery>
                                        </Tab>
                                    }
                                </TabPanel>
                            </CarouselElement>
                        );
                    else
                        return (
                            <CarouselElement key={index}>
                                <TabPanel id={(child as any).props.name}>
                                    <Tab title="Info">
                                        <h2 style={{ textAlign: "center", fontStyle: "italic" }}>{(child as any).props.name}</h2>
                                        <p style={{ marginBottom: "0.5rem" }}><span style={{ fontWeight: "bold" }}>Description: </span>{(child as any).props.description}</p>
                                        <p style={{ marginBottom: "0.5rem" }}><span style={{ fontWeight: "bold" }}>Link: </span><a href={(child as any).props.link}>{(child as any).props.link}</a></p>
                                        <hr style={{ width: "100%", margin: "0.5rem 0" }} />
                                        <Row style={{ textAlign: "center", margin: 0 }}>
                                            <Column style={{ padding: 0 }}>
                                                <h3>Features</h3>
                                                <ul style={{ listStyle: "none", padding: 0 }}>
                                                    {(child as any).props.features.map((item, index) => <li style={{ margin: "10px 0" }} key={index}>{item}</li>)}
                                                </ul>
                                            </Column>
                                            <Column style={{ padding: 0 }}>
                                                <h3>Technologies</h3>
                                                <ul style={{ listStyle: "none", padding: 0 }}>
                                                    {(child as any).props.technologies.map((item, index) => <li style={{ margin: "10px 0" }} key={index}>{item}</li>)}
                                                </ul>
                                            </Column>
                                        </Row>
                                        {(child as any).props.children}
                                    </Tab>
                                    {(child as any).props.images.length > 0 &&
                                    <Tab title="Images">
                                        <ImageGallery>
                                            {(child as any).props.images.map((image, index) => <GalleryImage id={image.replace(/(\/?[0-9a-zA-Z]+\/)+/, '').replace(/\.[0-9a-zA-Z]+/, "")} link={image} key={index} />)}
                                        </ImageGallery>
                                    </Tab>
                                    }
                                </TabPanel>
                            </CarouselElement>
                        );
                })

                }
            </Carousel>
);
}
}

export class Project extends React.Component<{name: string, description: string, link: string, features?: string[], technologies?: string[], images: string[]}, {}> {
    constructor() {
        super();
    }


    render() {
        let projectStyle = {

        };
        return (
            <div style={projectStyle}>
                {this.props.children}
            </div>
        );
    }
}

export class ProjectInfo extends React.Component<{}, {}> {
    render() {
        var infoStyle = {
            
        };
        return (
            <div style={infoStyle}>

            </div>    
        );
    }
}



export class TabPanel extends React.Component<{ id?: string }, {}> {
    constructor() {
        super();
    }

    handleSwitchTab(e) {
        //if (e.target.text === "Images")
    }

    renderTabs() {
        let linkStyle = {
            color: "black"
        };
        return (
            <ul className="nav nav-tabs nav-fill" style={{position: "absolute", bottom: 0, right: 0}}>
                {React.Children.map(this.props.children, (child, index) => {
                    let c = child as any;
                    if (child !== null) {
                        if (index === 0)
                            return <li key={index} className="nav-item"><a style={linkStyle} className="nav-link active" data-toggle="tab" href={"#" + this.props.id + "-" + c.props.title}>{c.props.title}</a></li>;
                        else
                            return <li key={index} className="nav-item"><a style={linkStyle} className="nav-link" data-toggle="tab" onClick={this.handleSwitchTab} href={"#" + this.props.id + "-" + c.props.title}>{c.props.title}</a></li>;
                    }
                })}
            </ul>
        );
    }

    renderContent() {
        var panelStyle = {
            padding: 20,
            fontSize: "1.5em",
            height: "calc(100% - 25px)"

        };

        var paneStyle = {
            overflow: "auto",
            height: "100%"
        };
        return (
            <div className="tab-content" style={panelStyle}>
                {React.Children.map(this.props.children, (child, index) => {
                    let c = child as any;
                    if (child !== null) {
                        if (index === 0)
                            return <div className="tab-pane active" id={this.props.id + "-" + c.props.title} style={paneStyle}>{c.props.children}</div>;
                        else
                            return <div className="tab-pane" id={this.props.id + "-" + c.props.title} style={paneStyle}>{c.props.children}</div>;
                    }
                })}
            </div>
        );
    }
    render() {
        return (
            <div id="tabPanel" style={{width: "100%", backgroundColor: "white", opacity: 0.9}}>
                {this.renderTabs()}
                {this.renderContent()}
            </div>
        );
    }
}

export class Tab extends React.Component<{title: string}, {}> {
    render() {
            return (
                <div></div>
            );
        }
}

export class Timeline extends React.Component<{}, {}> {
    render() {
        var timelineStyle = {
            position: "relative",
            margin: "0 auto",
            padding: "2em 0",
            height: "90%",
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "normal"
        };
        var lineStyle = {
            position: "absolute",
            top: 90,
            left: "50%",
            height: "80%",
            width: 4,
            backgroundColor: "white",
            opacity: 0.5
        };
        return (
            <div className="container-fluid" style={timelineStyle as any}>
                <span style={lineStyle}></span>
                {this.props.children}
            </div>
        );
    }
}

export class Timepoint extends  React.Component<{time: string, icon: string, title: string, description?: string}, {}> {
    render() {
        var timepointStyle = {
            width: 750,
            margin: "75px auto",
            color: "white"
        };
        var timeStyle = {
            fontSize: "2em",
            textAlign: "right",
            padding: "0 5px 0 0",
            marginTop: 25
        };
        var imageStyle = {
            position: "relative",
            backgroundColor: "gray",
            maxWidth: 60,
            height: 60,
            border: "3px solid white",
            borderRadius: "50px",
            textAlign: "center",
            marginTop: 20
        };
        var iconStyle = {
            position: "relative",
            top: 11, 
            left: -4
        };
        var contentStyle = {
            padding: 0
        };
        return (
            <div className="row" style={timepointStyle}>
                <div className="col" style={timeStyle}>
                    <time>{this.props.time}</time>
                </div>
                <div className="col" style={imageStyle}>
                    <i className={"fa " + this.props.icon + " fa-2x"} style={iconStyle}></i>
                </div>
                <div className="col" style={contentStyle}>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.description}</p>
                </div>
            </div>    
        );
    }
}