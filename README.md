
# Task Login VSI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

## Live Demo

A live demo of this app is hosted at [https://login-vsi-task.web.app/]

## To create and run local development copy

Run `git clone https://github.com/geekfanboy/task_loginvsi.git`
Navigate to the created folder and run `npm install` to ensure libraries used are installed

### Additional Libraries Used
- CSS Framework : Spectre.css [https://picturepan2.github.io/spectre/]
- State Management: ngrx [https://ngrx.io/]
- Generating Unique Ids: UUID [https://www.npmjs.com/package/uuid]

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Future Improvements

With the time available and as we try to keep the use of unnecessary external JS/TS library to a minimum, some improvements are deferred. NGRX is given special exception so as to have a robust state management system already party of architecture.

Some suggested future developments:
    - confirmation guards (especially on saves/deletes)
    - use of more permanent storage
    - responsiveness : current version is optimized only up to screens with minimum 1024px width. 
    - currency used is currently hardcoded
    - more unit tests
    - Refactoring w/ to work more complex system in mind
    - purpose of billing v. edit page needs to be defined better as they currently share a lot of functionalities 
    - more spreadhseet type functionality (sorting/filtering etc)

