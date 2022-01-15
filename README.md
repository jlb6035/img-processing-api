# Image Processing API
This project is a image processing api built in node, express, and typescript. The application allows users to send in an image and have it resized.
![Image of Products](https://github.com/jlb6035/img-processing-api/blob/main/assets/images/screenshot.png?raw=true?raw=true)


## Development server

Run `npm run start` to run the server. Place your images in the folder assets/images/full. Navigate to `http://localhost:3000/api/images?filename=YOURFILENAME&width=WIDTH&height=HEIGHT`. Please replace filename, width, and height parameters with your values. The resized file should be available in assets/images/thumbnail


## Build

Run `npm run build` to build the project. The build  will be stored in the `build/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via Jasmine