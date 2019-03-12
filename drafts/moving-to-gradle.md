# From Maven to Gradle

Gradle is the next build and dependency management system for Java and related programming languages after Ant and Maven, but it's not restricted to JVM based lanaguages like Maven. So I thought I'll give it a go. This article is about the basics I learned about Gradle, how it is different to Maven.

## Setting Up
## Installation
I use a debian system and installation is fairly easy:
```bash
sudo apt-get install gradle
```
For your particular machine you can read the installation instructions on [Gradle's Install Page](installtion).

### Using with Eclipse
I have installed a Gradle plugin called [Buildship](buildship). You can download and configure it from Eclipse Marketplace Client.

## Creating a new project
You can create a new project from the Eclipse's new project wizard.  A project similar to Maven project will be created but instead of single `pom.xml` file, you will be provided with four Gradle related files and some more Gradle related stuff. This is because, when we used the Eclipse's New Project Wizard, it created a new Java Project, more specifically it ran:
```bash
gradle init --type java-application # type could be one of java-application | java-library | scala-library | groovy-library | basic
```
 The project directory is something like this:
 ```bash
├── build.gradle # 1: This is like your pom.xml file
├── gradle    # 2: Gradle generated files (ignore them)
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── gradlew.bat
├── settings.gradle # 3: All the gradle config data goes here
└── src/ # 4: Default Java Source directory
```
The `build.gradle` file is pretty nicely commented, it properly denotes what goes where.

# TODO!



[installation]:(https://gradle.org/install/)
[buildship]: (https://projects.eclipse.org/projects/tools.buildship)