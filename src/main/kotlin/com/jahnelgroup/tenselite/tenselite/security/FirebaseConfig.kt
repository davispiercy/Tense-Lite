package com.jahnelgroup.tenselite.tenselite.security


import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.auth.FirebaseAuth
import org.hibernate.internal.util.ConfigHelper.getResourceAsStream
import org.springframework.context.annotation.Bean
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.Resource
import java.io.IOException


@Configuration
class FirebaseConfig {
    //val serviceAccount: FileInputStream = FileInputStream("classpath:tense-lite-creds.json");
    @Value("classpath:tense-lite-creds.json")
    var tenseCreds: Resource? = null
    @Bean
    @Throws(IOException::class)

    fun firebaseAuth(): FirebaseAuth {

        val options = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(tenseCreds!!.getInputStream()))
            .build()
        val firebaseApp = FirebaseApp.initializeApp(options)
        return FirebaseAuth.getInstance(firebaseApp)
    }

}
