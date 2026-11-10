plugins { kotlin("multiplatform") version "2.0.21" }

repositories { mavenCentral() }

kotlin {
    jvm()                        // Android consumes the JVM/Android artifact
    // iOS targets need a macOS runner; enable locally or on a macos-latest CI job:
    // iosArm64(); iosSimulatorArm64(); iosX64()

    sourceSets {
        commonTest.dependencies { implementation(kotlin("test")) }
    }
}
