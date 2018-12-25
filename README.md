This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Logo-Writer Simulator Application
## By Justin Xie

## How it was built
1. Used ReactJS
2. Comprises of three main components
  * Main App Component
  * CodeMirror React Component (imported from: https://github.com/JedWatson/react-codemirror)
  * HTML Canvas Component

# Directions
## Commands
The list of commands are shown below:
  * forward(x)
    - draw a line *x* pixels in the current direction
  * color(x)
    - change the color subsequent line(s) a different color
    - colors include: red, green, black, blue, and yellow
  * right()
    - rotates the current direction 90 degrees to the right
  * left()
    - rotates the current direction 90 degrees to the left
  * clear()
    - clears the canvas and reverts to default settings and location

## Demonstration
In the CodeMirror code editor, the user writes a single valid command per line. Here you can see that the commands
rendering an image based on the list of commands.

Arrows are attached to the end of each line, facing the current direction, and indicating the end of the line segment.

![Demo](demonstration.png)

If the users chooses to reset their work in the midst of coding it, they can do so with the reset() method.

![Reset](on-reset.png)

If the user makes a mistake, an error message will pop up below the editor, informing them to correct their mistakes.

![Error](on-error.png)

## Coding Process/Reflection
Inspired to challenge myself and take on bold, new and exciting challenges, I faces a few challenges while developing this personal project, mainly because I have not worked with code editor technologies before,
such as CodeMirror. I wasn't very experienced with HTML Canvas either, and having to learn how to integrate these components together represented the bulk of the challenge.

However, I am proud of the project I made given my lack of experience.
