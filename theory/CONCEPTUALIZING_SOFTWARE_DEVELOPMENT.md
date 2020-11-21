# What is Software
Software development is focused on the programs (or software) used in computer systems. Software developers are responsible for conceptualizing, creating, programming, documenting, testing, improving and maintaining software, software components, and frameworks [1]

I would add to this:
- software is the instructions passed to a machine for execution

# What is an Application
Software being executed by a machine.

What is data:
- software input and output

## What Business Problem Software Solves
- automation, standardization and improved efficiency
- consistency in results
- continuous availability

## More Specific Business Problems Solved Using Software
- interface to storing, computing data or sending instructions
- processing data autonomously


## Implementation Problems
Issues in implementing software solutions can relate to:
- users
- interface
- data
- legal constraints
- developers: standardization, manageability of complexity
- software: interconnectivity, logical errors, 
- hardware infrastructure: limiting factors, power, processing speed, data storage ...

## Web Software
**Problem:**
    - location independent inferface for users to a running application by using the internet[what-is-the-internet]
**Architecture:**
    - client-server architecture

## Web Software Implementation Problems
There are some specific problems that arise in trying to solve business problems with web software:

### Hardware computing limits in serving the clients requests
**Problem:**
One of the main problem in employing web software is that the server ability to respond to clients requests is limited by the hardware running the server software. There is a limit of incoming requests that can be handled in an acceptable time. After that limit is passed, the server response will be slow or it will start throwing errors.
    **Solutions:**
    1. Vertical Scaling (upgrading the hardware of the server machine: get more ram, more cpu, more bandwidth)
        - type: techt
        - limitations: 
            a. there is a physical limit on how much a machine can be upgraded
    2. Horizontal Scaling (employing more servers and distributing the requests among them)
        - requests will pass through a load balancer that will route them on available servers
        - limitations: 
            a. database horizontal scaling is difficult to manage properly
            b. software instances on each server is an independant piece that has to be maintained separateley

### Developers: Complexity management of software enviroment
**Problem:**
During software development lifetime usually there are more human developers that work on the code and the code can run on multiple machines. Bigger software projects use large dependancy trees and updating these can sometimes results in errors. This brings a complexity manageability problem. Usually, the project is hosted on multiple machines: developer machine, test servers, production servers. One source of errors is the difference in software enviroment between these 3 machines. Missing or unupdated libraries, different operating systems.
    **Solutions:**
    1. To reduce the complexity of software enviroment the software is shipped with its own contained enviroment that has all the used libraries and can run on any machine. tech: docker
    2. Package managers maintain the dependencies of libraries and packages for the specific programming languages: pip, npm, compositor ...
    


### Software Development: standardization

Sources:
[1](https://blog.devmountain.com/web-development-vs-software-development-which-is-the-better-career-choice/)
[what-is-the-internet](https://en.wikipedia.org/wiki/Internet)


REDDIT

I have undertaken the task of providing a learning model guide for software development.The reason for this being that I, myself a self-learning web software developer, found it very difficult to discern an efficient learning path through both theoretical and practical domains.

**What I think the problem with learning software development is now:**
The huge amount of material on this subject may put a beginner into "blocked by too many choices" phase. Many tutorials, articles, courses, some paid, many of them free, cover just a tiny bit. There is a great need of software engineers and many of newcomers rush in to learn the most demanded technology. In practice I have noticed that there are a lot of new developers that lack the broad understanding of technical problem and are focused on just using a particular technology as a "do it all solution".

**How I think we can improve the current learning model:**
I found the idea of article by Tomas Petricek [What should a Software Engineering course look like?](http://tomasp.net/blog/2019/software-engineering/) inspiring. If we see software as solution to solving real-world problems we can build a comprehensible tree of technologies that build upon the first branches of machine computations. Some real world problems have multiple technical solutions but all come with its limitations and pros/cons. Some new technologies appear to fix the cons or limitations, and so on. For example, scaling web based projects horizontally creates complexity problems and technologies like Kubernetes and server automation tools come in to save the day but also introduce new hurdles and have some inherent limitations.I want to offer a greater view on the real-world technologies and show how they fit together following this paradigm of problem-solution and pointing down how well each technical solution solves the problem.What do you think about this project? Any suggestions/feedbacks are welcomed and thanked for

**TL:DR**

**Problem:** 
Learning software development alone is difficult because the resources are too fragmented.
**Solution:**
Let's approach this by using a problem-solution paradigm where we can have a broader picture of all software ecosystem

https://www.reddit.com/r/computerscience/comments/j192y3/learning_software_development_by_problem_solution/
