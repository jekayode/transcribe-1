# Dragon Revenge

## Overview

The aim of this project is to build a web application with Oracle JET that allows users to upload an MP3 to be transcribed by Amazon Transcribe and Google Cloud Speech To Text.

> Figma design: https://www.figma.com/file/IZv6d5CgB8f2gnuVTyyoDAqO/Transcribe
 > <br>
> Oracle JET Getting Started: http://www.oracle.com/webfolder/technetwork/jet/globalGetStarted.html
 > <br>
> Knockout.js: http://learn.knockoutjs.com/#/?tutorial=intro

There are 3 sub-teams in this project.

| Team name              | Team lead (slack username) |
| ---------------------- | -------------------------- |
| Repository Maintainers | @Jeremiah                  |
| Frontend               | @Syfon                     |
| API/Backend            | @Chibuokem                 |

## Instructions

1.  <strong>Do not commit to the master branch.</strong> Create a branch with a meaningful name, make your changes in it, commit and send a pull request. Your team lead will ensure that there are no merge conflicts and your code does not break anything before requesting a maintainer to merge your pull request.
2.  Each sub-team lead should create tasks as Github issues on this repository. Sub-team members can then request to be assigned to those issues. The format for a issue is '[SUBTEAMNAME]: [Issue description]'. Example: 'Frontend: The upload button does not match what is in the Figma design.'

## Running the project

1.  Ensure you have OJET installed. To do so, run `npm install -g @oracle/ojet-cli`.
2.  I cloned this repository locally to `C:\Users\Mbah Clinton\Documents\OJET\` so in the commandline I will run `cd C:\Users\Mbah Clinton\Documents\OJET\transcribe`.
3.  Run `npm install`. If there are any errors, retry with the commandline running as an Administrator.
4.  To run the application, run `ojet serve`.
5.  The application should now be visible at http://localhost:8000/
