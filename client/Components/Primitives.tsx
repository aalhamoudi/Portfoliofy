import * as React from "React"

export class Container extends React.Component<{style?: any, className?: string}, {}> {
    render() {
        var style = {
            margin: 0,
            padding: 0
        };

        return (
            <div className={"container-fluid " + this.props.className} style={this.props.style}>{this.props.children}</div>
        );
    }
}

export class Row extends React.Component<{style?: any, onWheel?: any}, {}> {
    render() {
        return (
            <div className="row" onWheel={this.props.onWheel} style={this.props.style && this.props.style}>{this.props.children}</div>
        );
    }
}

export class Column extends React.Component<{ style?: any, stacked?: boolean, size?: number }, {}> {
    render() {
        if (this.props.size !== undefined) {
            return (
                <div className={"col-12 col-sm-" + this.props.size} style={this.props.style}>{this.props.children}</div>
            );
        }
        else if (this.props.stacked) {
            return (
                <div className="col-12" style={this.props.style}>{this.props.children}</div>
            );
        }
        else {
            return (
                <div className="col" style={this.props.style}>{this.props.children}</div>
            );
        }

    }
}

export class Card extends React.Component<{ id: number, image?: string, title: string, text: string, link?: string, onClick?: (id) => any }, {}> {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                <a onClick={this.onClick}>
                    <div className="card">
                        {this.props.image &&
                            <img className="card-img-top" src={this.props.image} alt="" style={{ width: "100%" }} />}
                        <div className="card-block">
                            <h4 className="card-title">{this.props.title}</h4>
                            <p className="card-text">{this.props.text}</p>
                        </div>
                    </div>
                </a>
            </div>
        );


    }
}

export class Modal extends React.Component<{}, {}> {
    render() {
        var style = {
        };

        var closeButtonStyle = {
            position: "absolute",
            top: 30,
            right: "5%"
        };

        return (
            <div>
                <div>
                    {this.props.children}
                </div>
                <a href="#0" style={closeButtonStyle}>&times;</a>
            </div>
        );
    }
}
