package com.jahnelgroup.tenselite.tenselite

import com.google.api.client.util.Value
import com.google.auth.oauth2.GoogleCredentials.fromStream
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.core.io.Resource
import java.io.File

@SpringBootApplication
class TenseLiteApplication

fun main(args: Array<String>) {

	runApplication<TenseLiteApplication>(*args)
}
