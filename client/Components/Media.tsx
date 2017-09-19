import * as React from "react"
import * as $ from "jquery"

import { Row, Column } from "./Primitives"


export class ResponsiveImage extends React.Component<{link: string}, {}> {
    render() {
        var imgStyle = {
            height: "auto",
            maxHeight: "75vh",
            display: "block",
            margin: "auto"
        };

        return (
            <img src={this.props.link} className="img-fluid" style={imgStyle}/>
        );
    }
}

export class GalleryImage extends React.Component<{ id: string, link: string }, {}> {
    handleClick() {
        $("#" + this.props.id).appendTo("body");
    }

    render() {
        var imgStyle = {
            width: "100%",
            height: "auto",
            cursor: "pointer"
        };



        return (
            <div>
                <img src={this.props.link} className="img-fluid" style={imgStyle} data-toggle="modal" data-target={"#" + this.props.id} onClick={this.handleClick.bind(this)} />
                <div className="modal fade" id={this.props.id} tabIndex={-1} role="dialog" style={{marginTop: 50}}>
                    <div className="modal-dialog modal-lg" role="document" style={{}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{position: "absolute", right: 10}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ResponsiveImage link={this.props.link} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class ImageGallery extends React.Component<{}, {}> {
    constructor() {
        super();
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(e) {
        e.stopPropagation();

        let position = 0;
        let element = null;

        if (e.target.parentElement.classList.contains("row")) {
            element = e.target.parentElement;
        }
        else if (e.target.parentElement.parentElement.parentElement.classList.contains("row")) {
            element = e.target.parentElement.parentElement.parentElement;
        }


        if (element !== null) {
            var reg = /[-]?[0-9]+/;
            if (element.style.transform !== null) {
                if (element.style.transform.match(reg) !== null)
                    position = parseInt(element.style.transform.match(reg)[0]);
            } else
                position = 0;


            if (e.deltaY < 0) {
                if (position < 0)
                    element.style.transform = "translateY(" + (position + 100) + "px)";
            }
                
            else
                element.style.transform = "translateY(" + (position - 100) + "px)";

        }

    }

    render() {
        return (
            <Row style={{ margin: 0 }}>
                {React.Children.map(this.props.children, (child, index) => {
                    return <div className="col-6 col-sm-4" style={{ padding: 10 }} key={index}>{child}</div>;
                })}
            </Row>
        );
    }
}
