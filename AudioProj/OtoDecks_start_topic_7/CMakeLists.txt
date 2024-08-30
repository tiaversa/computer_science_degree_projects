cmake_minimum_required(VERSION 3.22)

project(OTODECKS VERSION 0.0.1)

# Add the JUCE subdirectory
add_subdirectory(../JUCE JUCE)

# Create the GUI application target
juce_add_gui_app(OtoDecks
    PRODUCT_NAME "OtoDecks")

# Generate the JUCE header file
juce_generate_juce_header(OtoDecks)

# Add source files
target_sources(OtoDecks
    PRIVATE
        Source/Main.cpp
        Source/MainComponent.cpp)

# Define compile definitions
target_compile_definitions(OtoDecks
    PRIVATE
        JUCE_WEB_BROWSER=0
        JUCE_USE_CURL=0
        JUCE_APPLICATION_NAME_STRING="$<TARGET_PROPERTY:OtoDecks,JUCE_PRODUCT_NAME>"
        JUCE_APPLICATION_VERSION_STRING="$<TARGET_PROPERTY:OtoDecks,JUCE_VERSION>")

# Link JUCE libraries
target_link_libraries(OtoDecks
    PRIVATE
        juce::juce_gui_extra
        juce::juce_audio_basics
        juce::juce_audio_devices
        juce::juce_audio_formats
        juce::juce_audio_processors
        juce::juce_audio_utils
    PUBLIC
        juce::juce_recommended_config_flags
        juce::juce_recommended_lto_flags
        juce::juce_recommended_warning_flags)
