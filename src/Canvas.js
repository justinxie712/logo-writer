import React, { Component } from 'react';

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 200,
            y: 200,
            direction: "up",
            color: "black",
            error: null,
            hasError: false,
            rotation: 0
        };
        this.reset = this.reset.bind(this);
        this.moveForward = this.moveForward.bind(this);
        this.right = this.right.bind(this);
        this.left = this.left.bind(this); 
        this.changeColor = this.changeColor.bind(this);
        this.runCommand = this.runCommand.bind(this);
        this.makeCursor = this.makeCursor.bind(this);
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        var ctx = canvas.getContext("2d");
        var img = document.getElementById("arrow");
        ctx.drawImage(img ,this.state.x - 12.5, this.state.y - 20, 25, 25);
    }


    componentDidUpdate(prevProps) {
        if(this.props.lastCommand !== null) {
            if (prevProps.lastCommand !== this.props.lastCommand) {
                this.runCommand(this.props.lastCommand)
            }
        }
    }

    makeCursor() {
        const canvas = this.refs.canvas;
        var ctx = canvas.getContext("2d");
        var img = document.getElementById("arrow");
        ctx.translate(this.state.x, this.state.y);
        
        switch(this.state.direction) {
            case "up":
                ctx.drawImage(img,0,0, 25, 25);
                break;
            case "right":
                ctx.rotate(90*Math.PI/180);
                ctx.drawImage(img,0,0, 25, 25);
                break;
            case "down":
                ctx.rotate(180*Math.PI/180);
                ctx.drawImage(img,0,0, 25, 25);
                break;
            case "left":
                ctx.rotate(270*Math.PI/180);
                ctx.drawImage(img,0,0, 25, 25);
                break;
            default:
        }
        
    }

    // Changes the Direction to the right of it's current position
    right = () => {
        let newDirection = "";

        switch(this.state.direction) {
            case "up":
                newDirection = "right"
                break;
            case "right":
                newDirection = "down"
                break;
            case "down":
                newDirection = "left"
                break;
            case "left":
                newDirection = "up"
                break;
            default:
        }
        this.setState({
            direction: newDirection
        });
    }

    // Changes the Direction to the left of it's current position
    left = () => {
        let newDirection = "";

        switch(this.state.direction) {
            case "up":
                newDirection = "left"
                break;
            case "left":
                newDirection = "down"
                break;
            case "down":
                newDirection = "right"
                break;
            case "right":
                newDirection = "up"
                break;
            default:
        }
        this.setState({
            direction: newDirection
        });
    }

    // Resets the canvas back to initial state
    reset = () => {
        this.setState({
            x: 200,
            y: 200,
            direction: "up",
            color: "black",
            error: null,
            hasError: false
        });
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 400, 400);
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.state.color;
        ctx.beginPath();
        ctx.moveTo(this.state.x, this.state.y);
        var img = document.getElementById("arrow");
        ctx.drawImage(img , 200-12.5, 200-20, 25, 25);
    }

    // Changes the color of the lines
    changeColor = (newColor) => {
        this.setState({
            color: newColor
        });
    }

    // Draws line the length of the given input, sets the x and y coordinates of the state
    moveForward = (len) => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        var up = document.getElementById("arrow");
        var left = document.getElementById("arrow-left");
        var right = document.getElementById("arrow-right");
        var down = document.getElementById("arrow-down");

        let canvasBack = document.createElement("canvas");
        canvasBack.width = canvas.width;
        canvasBack.height = canvas.height;
        canvasBack.ctx = canvasBack.getContext("2d");

        ctx.lineWidth = 3;
        ctx.strokeStyle = this.state.color;
        ctx.beginPath();
        ctx.moveTo(this.state.x, this.state.y);
        let newX = 0;
        let newY = 0;
        switch(this.state.direction) {
            case "up":
                newY = this.state.y - len
                ctx.lineTo(this.state.x, newY);
                ctx.stroke();
                canvasBack.ctx.drawImage(canvas,0,0);
                
                ctx.drawImage(up,this.state.x - 12.5, newY - 20, 25, 25);
                this.setState((prevState) => {
                    return {
                        y: prevState.y - len
                    }
                });
                break;
            case "right":
                newX = this.state.x + len
                ctx.lineTo(newX, this.state.y);
                ctx.stroke();
                canvasBack.ctx.drawImage(canvas,0,0);

                ctx.drawImage(right, newX, this.state.y - 12.5, 25, 25);
                this.setState((prevState) => {
                    return {
                        x: prevState.x + len
                    }
                });
                break;
            case "down":
                newY = this.state.y + len
                ctx.lineTo(this.state.x, newY);
                ctx.stroke();
                canvasBack.ctx.drawImage(canvas,0,0);

                ctx.drawImage(down, this.state.x - 12.5, newY, 25, 25);
                this.setState((prevState) => {
                    return {
                        y: prevState.y + len
                    }
                });
                break;
            case "left":
                newX = this.state.x - len;
                ctx.lineTo(newX, this.state.y);
                ctx.stroke();
                canvasBack.ctx.drawImage(canvas,0,0);
                
                ctx.drawImage(left, newX - 25, this.state.y - 12.5, 25, 25);
                this.setState((prevState) => {
                    return {
                        x: prevState.x - len
                    }
                });
                break;
            default:
        }
        ctx.drawImage(canvasBack,0,0);
    }

    // Takes the most recent command and runs it based on RegEx pattern
    runCommand = (command) => {
        const forward = /forward\(\d+\)/g;
        const left = /left\(\)/g;
        const right = /right\(\)/g;
        const reset = /reset\(\)/g;
        const colorPattern = /color\(\b(white|red|blue|green|black)\b\)/g;

        if (command.match(forward)) {
            let value = parseInt(command.match(/\d+/g)[0]);
            this.moveForward(value);
        }
        else if (command.match(left)) {
            this.left();
        }
        else if (command.match(right)) {
            this.right();
        }
        else if (command.match(reset)) {
            this.reset();
        }
        else if (command.match(colorPattern)) {
            let newColor = command.match(/\b(white|red|blue|green|black)\b/g)[0];
            this.changeColor(newColor);
        }
        else {
            let err = "\"" + command + "\"" + " has a syntax error. Please fix it."
            this.setState({
                error: err,
                hasError: true
            });
        }
    }

    render() {
        return(
            <div>
                <img id="arrow" width="25" height="25" src="https://image.flaticon.com/icons/png/128/626/626075.png" alt="arrow" style={{opacity: 0}}></img>
                <img id="arrow-right" width="25" height="25" src="https://image.flaticon.com/icons/png/128/608/608308.png" alt="arrow" style={{opacity: 0}}></img>
                <img id="arrow-left" width="25" height="25" src="https://image.flaticon.com/icons/png/128/608/608283.png" alt="arrow" style={{opacity: 0}}></img>
                <img id="arrow-down" width="25" height="25" src="https://image.flaticon.com/icons/png/128/626/626013.png" alt="arrow" style={{opacity: 0}}></img>
                <canvas ref="canvas" width={400} height={400} style={{border: "4px solid black", position: "fixed", right: "3%", top: "0%", zIndex: 100}}/>
                {this.state.hasError ? <h1>Error: {this.state.error}</h1> : null}
            </div>
        )
    }
  }
  export default Canvas