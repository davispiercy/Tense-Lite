package com.jahnelgroup.tenselite.tenselite.security

import com.google.api.client.util.Value
import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseOptions
import java.io.FileInputStream
import java.io.IOException
import java.lang.Object
import com.google.firebase.FirebaseApp
import com.google.firebase.auth.FirebaseAuth
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.Resource
import java.io.File


@Configuration
class FirebaseConfig {
    @Value("classpath:service-account.json")
    var serviceAccount: Resource? = null

    @Bean
    @Throws(IOException::class)

    fun firebaseAuth(): FirebaseAuth {

        val options = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(File("C:/Users/dpiercy/Downloads/tense-lite-creds.json").inputStream()))
            .build()
        val firebaseApp = FirebaseApp.initializeApp(options)
        return FirebaseAuth.getInstance(firebaseApp)
    }

}
