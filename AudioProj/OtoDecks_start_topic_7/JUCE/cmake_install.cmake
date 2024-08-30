# Install script for directory: /Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/usr/local")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

# Set path to fallback-tool for dependency-resolution.
if(NOT DEFINED CMAKE_OBJDUMP)
  set(CMAKE_OBJDUMP "/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/objdump")
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for the subdirectory.
  include("/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/OtoDecks_start_topic_7/JUCE/modules/cmake_install.cmake")
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for the subdirectory.
  include("/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/OtoDecks_start_topic_7/JUCE/extras/Build/cmake_install.cmake")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/cmake/JUCE-8.0.1" TYPE FILE FILES
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/OtoDecks_start_topic_7/JUCE/JUCEConfigVersion.cmake"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/OtoDecks_start_topic_7/JUCE/JUCEConfig.cmake"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/JUCECheckAtomic.cmake"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/JUCEHelperTargets.cmake"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/JUCEModuleSupport.cmake"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/JUCEUtils.cmake"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/JuceLV2Defines.h.in"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/LaunchScreen.storyboard"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/PIPAudioProcessor.cpp.in"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/PIPAudioProcessorWithARA.cpp.in"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/PIPComponent.cpp.in"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/PIPConsole.cpp.in"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/RecentFilesMenuTemplate.nib"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/UnityPluginGUIScript.cs.in"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/checkBundleSigning.cmake"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/copyDir.cmake"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/juce_runtime_arch_detection.cpp"
    "/Users/timnaaversa/Projects/computer_science_degree_projects/AudioProj/JUCE/extras/Build/CMake/juce_LinuxSubprocessHelper.cpp"
    )
endif()

