# JUCE project

Now with .jucer and cmake versions.

## Command-line cmake 

To build with CMake purely in the terminal/ powershell etc., you can run the following commands:

```
cmake -B build .
cmake --build build --config Debug # or Release
```
The exectable should appear in build/OtoDecks_artefacts 

## CMake and Visual Studio Code

My personal preference is to open the folder containing the CMakeLists.txt file in Visual Studio Code, and to use its CMake capabilities to manage the build. More info here:

https://code.visualstudio.com/
https://github.com/microsoft/vscode-cmake-tools

## Generating IDE projects with CMake

Alternatively, you can use CMake to generate an IDE project for you, just like Projucer.

E.g. for windows/ Visual Studio Community 2022: 

```
cmake -G "Visual Studio Community 2022" -B build .
# -> then open the .sln file in the build folder with Visual Studio
```
For macos/ Xcode:

```
cmake -G "Xcode" -B  build .
# -> then open the Xcode project generated in the build folder with Xcode
```


See JUCE cmake examples here: 

https://github.com/juce-framework/JUCE/tree/master/examples/CMake
